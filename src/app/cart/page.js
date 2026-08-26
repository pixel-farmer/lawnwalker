'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  formatPrice,
  getMaxQuantity,
  getPrimaryImage,
  getProductTypeLabel,
  getProductSize,
  isOneOfOne,
} from '@/app/data/products'
import { useCart } from '@/app/context/CartContext'

export default function CartPage() {
  const { lineItems, subtotal, updateQuantity, removeItem, clearCart, isHydrated } =
    useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  async function handleCheckout() {
    if (isCheckingOut || lineItems.length === 0) return

    setCheckoutError('')
    setIsCheckingOut(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lineItems.map(({ slug, quantity }) => ({ slug, quantity })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed. Please try again.')
      }

      if (!data.url) {
        throw new Error('Checkout failed. Please try again.')
      }

      window.location.href = data.url
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : 'Checkout failed. Please try again.'
      )
      setIsCheckingOut(false)
    }
  }

  if (!isHydrated) {
    return (
      <main className="min-h-screen px-8 md:px-12 pt-2 pb-16 max-w-4xl mx-auto w-full">
        <p className="text-gray-500 font-light">Loading cart...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen text-gray-600 px-8 md:px-12 pt-2 pb-16 max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-xl font-bold text-gray-500 tracking-tight font-headline mb-10">
          Cart
        </h1>

        {lineItems.length === 0 ? (
          <div className="space-y-4">
            <p className="text-gray-500 font-light text-lg">Your cart is empty.</p>
            <Link
              href="/shop"
              className="inline-block text-sm text-gray-600 hover:text-gray-900 underline font-light"
            >
              Browse the shop →
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <ul className="divide-y divide-gray-100">
              {lineItems.map(({ slug, quantity, product }) => {
                const showQuantityControl = !isOneOfOne(product)

                return (
                  <li key={slug} className="flex gap-5 py-6">
                    <Link
                      href={`/shop/${product.slug}`}
                      className="relative block h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-50"
                    >
                      <Image
                        src={getPrimaryImage(product)}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="88px"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${product.slug}`}
                        className="text-lg text-gray-700 hover:text-gray-900 font-headline"
                      >
                        {product.title}
                      </Link>
                      <p className="text-sm text-gray-500 font-light mt-1">
                        {getProductTypeLabel(product)} · {product.medium} ·{' '}
                        {getProductSize(product)}
                      </p>
                      <p className="text-sm text-gray-600 font-light mt-1">
                        {formatPrice(product.price)}
                      </p>

                      <div className="mt-4 flex items-center gap-4">
                        {showQuantityControl ? (
                          <label className="text-sm text-gray-500 font-light flex items-center gap-2">
                            Qty
                            <input
                              type="number"
                              min="1"
                              max={getMaxQuantity(product)}
                              value={quantity}
                              onChange={(event) =>
                                updateQuantity(slug, Number(event.target.value))
                              }
                              className="w-16 border border-gray-300 rounded px-2 py-1 text-gray-900 font-light"
                            />
                          </label>
                        ) : (
                          <span className="text-sm text-gray-400 font-light">
                            Original — one of a kind
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeItem(slug)}
                          className="text-sm text-gray-500 hover:text-gray-900 underline font-light"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-700 font-light shrink-0">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </li>
                )
              })}
            </ul>

            <div className="border-t border-gray-100 pt-6 space-y-4">
              <div className="flex items-center justify-between text-base">
                <span className="text-gray-600 font-light">
                  Subtotal ({lineItems.reduce((n, item) => n + item.quantity, 0)}{' '}
                  {lineItems.reduce((n, item) => n + item.quantity, 0) === 1
                    ? 'item'
                    : 'items'})
                </span>
                <span className="text-gray-800 font-light">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="px-6 py-2.5 rounded bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white text-sm font-light tracking-wide transition-colors"
                >
                  {isCheckingOut ? 'Redirecting to checkout...' : 'Checkout'}
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  disabled={isCheckingOut}
                  className="px-6 py-2.5 rounded border border-gray-300 text-gray-600 hover:text-gray-900 disabled:opacity-50 text-sm font-light tracking-wide transition-colors"
                >
                  Clear cart
                </button>
              </div>

              {checkoutError && (
                <p className="text-sm text-red-600 font-light">{checkoutError}</p>
              )}

              <p className="text-sm text-gray-500 font-light">
                Secure checkout powered by Stripe.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </main>
  )
}
