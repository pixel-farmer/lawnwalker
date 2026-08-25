'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  getMaxQuantity,
  getProductBySlug,
  isPurchasable,
} from '@/app/data/products'
import { mergeProductWithSoldSlugs } from '@/lib/product-status'

const CartContext = createContext(null)
const STORAGE_KEY = 'lawnwalker-cart'

function getEffectiveProduct(slug, soldSlugs) {
  const product = getProductBySlug(slug)
  if (!product) return null
  return mergeProductWithSoldSlugs(product, soldSlugs)
}

function clampQuantity(product, quantity) {
  const max = getMaxQuantity(product)
  return Math.min(Math.max(1, quantity), max)
}

function sanitizeCart(rawItems, soldSlugs) {
  if (!Array.isArray(rawItems)) return []

  return rawItems
    .map((item) => {
      if (!item?.slug) return null

      const product = getEffectiveProduct(item.slug, soldSlugs)
      if (!product || !isPurchasable(product)) return null

      const quantity = Number(item.quantity) || 1
      return {
        slug: item.slug,
        quantity: clampQuantity(product, quantity),
      }
    })
    .filter(Boolean)
}

function readStoredCart() {
  if (typeof window === 'undefined') return []

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

async function fetchSoldSlugs() {
  try {
    const response = await fetch('/api/inventory')
    if (!response.ok) return new Set()

    const data = await response.json()
    return new Set(Array.isArray(data.soldSlugs) ? data.soldSlugs : [])
  } catch {
    return new Set()
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [soldSlugs, setSoldSlugs] = useState(new Set())
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function hydrateCart() {
      const storedItems = readStoredCart()
      const nextSoldSlugs = await fetchSoldSlugs()

      if (cancelled) return

      setSoldSlugs(nextSoldSlugs)
      setItems(sanitizeCart(storedItems, nextSoldSlugs))
      setIsHydrated(true)
    }

    hydrateCart()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, isHydrated])

  const addItem = useCallback(
    (slug, quantity = 1) => {
      const product = getEffectiveProduct(slug, soldSlugs)
      if (!isPurchasable(product)) return

      setItems((current) => {
        const existing = current.find((item) => item.slug === slug)

        if (existing) {
          const nextQuantity = clampQuantity(
            product,
            existing.quantity + quantity
          )

          if (nextQuantity === existing.quantity) {
            return current
          }

          return current.map((item) =>
            item.slug === slug ? { ...item, quantity: nextQuantity } : item
          )
        }

        return [
          ...current,
          { slug, quantity: clampQuantity(product, quantity) },
        ]
      })
    },
    [soldSlugs]
  )

  const removeItem = useCallback((slug) => {
    setItems((current) => current.filter((item) => item.slug !== slug))
  }, [])

  const updateQuantity = useCallback(
    (slug, quantity) => {
      const product = getEffectiveProduct(slug, soldSlugs)

      if (!product || !isPurchasable(product) || quantity < 1) {
        setItems((current) => current.filter((item) => item.slug !== slug))
        return
      }

      setItems((current) =>
        current.map((item) =>
          item.slug === slug
            ? { ...item, quantity: clampQuantity(product, quantity) }
            : item
        )
      )
    },
    [soldSlugs]
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  )

  const lineItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = getEffectiveProduct(item.slug, soldSlugs)
          if (!product || !isPurchasable(product)) return null
          return { ...item, product }
        })
        .filter(Boolean),
    [items, soldSlugs]
  )

  const subtotal = useMemo(
    () =>
      lineItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    [lineItems]
  )

  const value = useMemo(
    () => ({
      items,
      lineItems,
      itemCount,
      subtotal,
      isHydrated,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      lineItems,
      itemCount,
      subtotal,
      isHydrated,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
