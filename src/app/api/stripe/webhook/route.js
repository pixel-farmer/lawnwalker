import { fulfillCheckoutSession } from '@/lib/orders'
import { getStripe } from '@/lib/stripe'

export const runtime = 'nodejs'

export async function POST(request) {
  const stripe = getStripe()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripe || !webhookSecret) {
    return Response.json(
      { error: 'Stripe webhook is not configured.' },
      { status: 500 }
    )
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return Response.json({ error: 'Missing Stripe signature.' }, { status: 400 })
  }

  let event

  try {
    const body = await request.text()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Stripe webhook signature verification failed:', error)
    return Response.json({ error: 'Invalid webhook signature.' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        await fulfillCheckoutSession(session)
        break
      }
      default:
        break
    }

    return Response.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook handler error:', error)
    return Response.json({ error: 'Webhook handler failed.' }, { status: 500 })
  }
}
