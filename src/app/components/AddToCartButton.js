'use client'

import { useState } from 'react'
import { useCart } from '@/app/context/CartContext'
import { getMaxQuantity, isPurchasable } from '@/app/data/products'

export default function AddToCartButton({ product }) {
  const { addItem, lineItems } = useCart()
  const [added, setAdded] = useState(false)

  if (!isPurchasable(product)) {
    const label =
      product.status === 'sold'
        ? 'Sold'
        : product.status === 'not_for_sale'
          ? 'Not for sale'
          : 'Unavailable'

    return (
      <button
        type="button"
        disabled
        className="px-6 py-2.5 rounded bg-gray-200 text-gray-500 text-sm font-light tracking-wide cursor-not-allowed"
      >
        {label}
      </button>
    )
  }

  const cartItem = lineItems.find((item) => item.slug === product.slug)
  const atMax = cartItem && cartItem.quantity >= getMaxQuantity(product)

  function handleClick() {
    if (atMax) return

    addItem(product.slug)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={atMax}
      className="px-6 py-2.5 rounded bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white text-sm font-light tracking-wide transition-colors"
    >
      {atMax ? 'In cart' : added ? 'Added to cart' : 'Add to cart'}
    </button>
  )
}
