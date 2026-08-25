import { getStripe } from '@/lib/stripe'

export async function GET(request) {
  const sessionId = request.nextUrl.searchParams.get('session_id')

  if (!sessionId || typeof sessionId !== 'string') {
    return Response.json({ paid: false })
  }

  const stripe = getStripe()

  if (!stripe) {
    return Response.json({ paid: false }, { status: 500 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const paid =
      session.payment_status === 'paid' && session.status === 'complete'

    return Response.json({ paid })
  } catch (error) {
    console.error('Stripe session verification error:', error)
    return Response.json({ paid: false })
  }
}
