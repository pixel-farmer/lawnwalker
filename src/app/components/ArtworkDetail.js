'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import AddToCartButton from '@/app/components/AddToCartButton'
import {
  formatPrice,
  getPrimaryImage,
  getProductTypeLabel,
  isPurchasable,
} from '@/app/data/products'

function SoldIndicator() {
  return (
    <div className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-sm">
      <span className="text-sm font-light tracking-[0.2em] uppercase text-gray-400">
        Sold
      </span>
    </div>
  )
}

export default function ArtworkDetail({ product }) {
  const available = isPurchasable(product)
  const allImages = product.images
  const [activeImage, setActiveImage] = useState(getPrimaryImage(product))

  return (
    <main className="min-h-screen text-gray-600 px-8 md:px-12 pt-2 pb-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/shop"
          className="inline-block mb-10 text-sm text-gray-500 hover:text-gray-900 transition-colors font-light"
        >
          ← Back to shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-4">
            <div
              className={`relative w-full overflow-hidden rounded-lg bg-gray-50 ${
                available ? '' : 'opacity-90'
              }`}
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  className={`object-cover ${available ? '' : 'opacity-60 grayscale-[15%]'}`}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {!available && (
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-light tracking-[0.15em] uppercase text-gray-600 bg-white/90 rounded-sm">
                  Sold
                </span>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {allImages.map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={`relative shrink-0 w-20 h-24 overflow-hidden rounded-md bg-gray-50 transition-opacity ${
                      activeImage === image
                        ? 'ring-1 ring-gray-400 opacity-100'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`View ${product.title} detail`}
                    aria-current={activeImage === image}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8 lg:pt-2">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-medium text-gray-700 font-headline tracking-tight">
                {product.title}
              </h1>

              <dl className="space-y-2 text-sm font-light">
                <div className="flex gap-3">
                  <dt className="text-gray-400 w-24 shrink-0">Type</dt>
                  <dd className="text-gray-600">{getProductTypeLabel(product)}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-gray-400 w-24 shrink-0">Year</dt>
                  <dd className="text-gray-600">{product.year}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-gray-400 w-24 shrink-0">Medium</dt>
                  <dd className="text-gray-600">{product.medium}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-gray-400 w-24 shrink-0">Dimensions</dt>
                  <dd className="text-gray-600">{product.dimensions}</dd>
                </div>
                {product.price != null && (
                  <div className="flex gap-3">
                    <dt className="text-gray-400 w-24 shrink-0">Price</dt>
                    <dd className="text-gray-600">{formatPrice(product.price)}</dd>
                  </div>
                )}
                <div className="flex gap-3">
                  <dt className="text-gray-400 w-24 shrink-0">Availability</dt>
                  <dd className={available ? 'text-gray-600' : 'text-gray-400 uppercase tracking-wide'}>
                    {available ? 'Available' : 'Sold'}
                  </dd>
                </div>
              </dl>
            </div>

            {product.description && (
              <p className="text-gray-500 font-light leading-relaxed text-base md:text-lg max-w-md">
                {product.description}
              </p>
            )}

            <div>
              {available ? <AddToCartButton product={product} /> : <SoldIndicator />}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
