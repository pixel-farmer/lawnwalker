import {
  getMaxQuantity,
  getPrimaryImage,
  getProductBySlug,
  getProductSize,
  getProductTypeLabel,
  isPurchasable,
} from '@/app/data/products'
import { mergeProductInventory } from '@/lib/product-status'
import { getSoldInventoryMap } from '@/lib/inventory'
import { getStripe } from '@/lib/stripe'
import { getSiteUrl } from '@/lib/site-url'

function getAbsoluteImageUrl(imagePath, siteUrl) {
  if (!imagePath) return null
  if (imagePath.startsWith('http')) return imagePath
  if (!siteUrl.startsWith('https://')) return null
  return `${siteUrl}${imagePath}`
}

async function validateCartItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return { error: 'Your cart is empty.' }
  }

  const inventoryMap = await getSoldInventoryMap()
  const validatedItems = []

  for (const item of items) {
    if (!item?.slug || typeof item.slug !== 'string') {
      return { error: 'Invalid cart item.' }
    }

    const staticProduct = getProductBySlug(item.slug)
    const product = mergeProductInventory(staticProduct, inventoryMap)

    if (!product) {
      return { error: `Product "${item.slug}" was not found.` }
    }

    if (!isPurchasable(product)) {
      return {
        error: `${product.title} is no longer available for purchase.`,
      }
    }

    const quantity = Number(item.quantity)

    if (!Number.isFinite(quantity) || !Number.isInteger(quantity) || quantity < 1) {
      return { error: `Invalid quantity for ${product.title}.` }
    }

    const maxQuantity = getMaxQuantity(product)

    if (quantity > maxQuantity) {
      return {
        error:
          maxQuantity === 1
            ? `${product.title} is a one-of-one original and can only be purchased once.`
            : `Only ${maxQuantity} of ${product.title} are available.`,
      }
    }

    validatedItems.push({ product, quantity })
  }

  return { validatedItems }
}

export async function POST(request) {
  try {
    const stripe = getStripe()

    if (!stripe) {
      return Response.json(
        {
          error:
            'Checkout is not configured. Add STRIPE_SECRET_KEY to your environment.',
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { validatedItems, error } = await validateCartItems(body.items)

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    const siteUrl = getSiteUrl(request)
    const lineItems = validatedItems.map(({ product, quantity }) => {
      const imageUrl = getAbsoluteImageUrl(getPrimaryImage(product), siteUrl)
      const productData = {
        name: product.title,
        description: `${getProductTypeLabel(product)} · ${product.medium} · ${getProductSize(product)}`,
      }

      if (imageUrl) {
        productData.images = [imageUrl]
      }

      return {
        price_data: {
          currency: 'usd',
          unit_amount: product.price,
          product_data: productData,
        },
        quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      metadata: {
        cart_items: JSON.stringify(
          validatedItems.map(({ product, quantity }) => ({
            slug: product.slug,
            title: product.title,
            quantity,
            unit_amount: product.price,
          }))
        ),
      },
    })

    if (!session.url) {
      return Response.json(
        { error: 'Unable to start checkout. Please try again.' },
        { status: 500 }
      )
    }

    return Response.json({ url: session.url })
  } catch (checkoutError) {
    console.error('Stripe checkout error:', checkoutError)
    return Response.json(
      { error: 'Unable to start checkout. Please try again.' },
      { status: 500 }
    )
  }
}
