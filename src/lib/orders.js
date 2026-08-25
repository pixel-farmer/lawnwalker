import { getProductBySlug, isOneOfOne } from '@/app/data/products'
import { getPool } from '@/lib/db'

function parseCartItems(session) {
  const raw = session.metadata?.cart_items
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function getShippingAddress(session) {
  const address =
    session.collected_information?.shipping_details?.address ||
    session.shipping_details?.address ||
    session.customer_details?.address ||
    null

  return address ? JSON.stringify(address) : null
}

export async function fulfillCheckoutSession(session) {
  if (session.payment_status !== 'paid') {
    return { skipped: true, reason: 'payment_not_paid' }
  }

  const pool = getPool()
  if (!pool) {
    throw new Error('Database is not configured.')
  }

  const cartItems = parseCartItems(session)
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const orderResult = await client.query(
      `INSERT INTO orders (
        stripe_session_id,
        stripe_payment_intent_id,
        customer_email,
        customer_name,
        shipping_address,
        amount_total,
        currency,
        payment_status
      ) VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, $8)
      ON CONFLICT (stripe_session_id) DO NOTHING
      RETURNING id`,
      [
        session.id,
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id || null,
        session.customer_details?.email || session.customer_email || null,
        session.customer_details?.name || null,
        getShippingAddress(session),
        session.amount_total ?? 0,
        session.currency || 'usd',
        session.payment_status,
      ]
    )

    let orderId = orderResult.rows[0]?.id
    let created = Boolean(orderId)

    if (!orderId) {
      const existing = await client.query(
        'SELECT id FROM orders WHERE stripe_session_id = $1',
        [session.id]
      )
      orderId = existing.rows[0]?.id

      if (!orderId) {
        throw new Error('Unable to resolve order for checkout session.')
      }
    }

    if (created) {
      for (const item of cartItems) {
        if (!item?.slug) continue

        const product = getProductBySlug(item.slug)
        const title = item.title || product?.title || item.slug
        const quantity = Number(item.quantity) || 1
        const unitAmount =
          Number(item.unit_amount) ?? Number(product?.price) ?? 0

        await client.query(
          `INSERT INTO order_items (
            order_id,
            product_slug,
            product_title,
            quantity,
            unit_amount
          ) VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (order_id, product_slug) DO NOTHING`,
          [orderId, item.slug, title, quantity, unitAmount]
        )

        if (product && isOneOfOne(product)) {
          await client.query(
            `INSERT INTO product_inventory (
              product_slug,
              status,
              sold_at,
              order_id
            ) VALUES ($1, 'sold', NOW(), $2)
            ON CONFLICT (product_slug) DO NOTHING`,
            [item.slug, orderId]
          )
        }
      }
    }

    await client.query('COMMIT')

    return { orderId, created }
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}
