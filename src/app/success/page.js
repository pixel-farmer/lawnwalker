'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/app/context/CartContext'

function VerifyingMessage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 md:px-12 py-20 max-w-2xl mx-auto text-center">
      <p className="text-gray-500 font-light text-lg">Verifying your payment...</p>
    </main>
  )
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const { clearCart, isHydrated } = useCart()
  const [status, setStatus] = useState('verifying')

  useEffect(() => {
    if (!isHydrated) return

    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      setStatus('missing')
      return
    }

    let cancelled = false

    async function verifySession() {
      const maxAttempts = 4

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        try {
          const response = await fetch(
            `/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`
          )
          const data = await response.json()

          if (cancelled) return

          if (data.paid) {
            clearCart()
            setStatus('verified')
            return
          }

          if (attempt < maxAttempts - 1) {
            await new Promise((resolve) => window.setTimeout(resolve, 1000))
          }
        } catch {
          if (attempt < maxAttempts - 1) {
            await new Promise((resolve) => window.setTimeout(resolve, 1000))
          }
        }
      }

      if (!cancelled) {
        setStatus('unverified')
      }
    }

    verifySession()

    return () => {
      cancelled = true
    }
  }, [searchParams, clearCart, isHydrated])

  if (!isHydrated || status === 'verifying') {
    return <VerifyingMessage />
  }

  if (status === 'verified') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-8 md:px-12 py-20 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight font-headline">
            Thank you for your purchase.
          </h1>
          <p className="text-lg text-gray-600 font-light leading-relaxed mb-4">
            Your payment has been received.
          </p>
          <p className="text-base text-gray-500 font-light leading-relaxed mb-10">
            I&apos;ll be in touch regarding your order and shipping.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/shop"
              className="text-sm text-gray-600 hover:text-gray-900 underline font-light"
            >
              Continue shopping
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 underline font-light"
            >
              Return home
            </Link>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 md:px-12 py-20 max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 tracking-tight font-headline">
          Payment verification needed
        </h1>
        <p className="text-base text-gray-500 font-light leading-relaxed mb-10 max-w-md mx-auto">
          We were unable to verify your payment details. If you completed your
          purchase, please contact me and I will be happy to help.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/cart"
            className="text-sm text-gray-600 hover:text-gray-900 underline font-light"
          >
            Return to cart
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 underline font-light"
          >
            Return home
          </Link>
        </div>
      </motion.div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<VerifyingMessage />}>
      <SuccessContent />
    </Suspense>
  )
}
