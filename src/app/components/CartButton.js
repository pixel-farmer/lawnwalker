'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'

export default function CartButton() {
  const pathname = usePathname()
  const { itemCount, isHydrated } = useCart()
  const isActive = pathname === '/cart'

  return (
    <Link
      href="/cart"
      className={`relative text-sm md:text-base font-light tracking-wide transition-colors font-headline ${
        isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
      }`}
      aria-label={`Cart${itemCount ? `, ${itemCount} item${itemCount === 1 ? '' : 's'}` : ''}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z"
          />
        </svg>
        Cart
      </span>
      {isHydrated && itemCount > 0 && (
        <span className="absolute -top-2 -right-3 min-w-[1.125rem] h-[1.125rem] px-1 rounded-full bg-gray-900 text-white text-[10px] leading-[1.125rem] text-center font-normal">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
