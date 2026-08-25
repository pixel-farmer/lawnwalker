'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  formatPrice,
  getPrimaryImage,
  getProductTypeLabel,
  isPurchasable,
} from '@/app/data/products'

export default function ArtworkCard({ product }) {
  const available = isPurchasable(product)
  const imageClasses = available
    ? 'object-cover transition-transform duration-300 group-hover:scale-105'
    : 'object-cover opacity-50 grayscale-[20%]'

  const details = (
    <>
      <div className="relative overflow-hidden rounded-lg mb-4">
        <Image
          src={getPrimaryImage(product)}
          alt={product.title}
          width={400}
          height={500}
          className={`w-full h-80 ${imageClasses}`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {!available && (
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-light tracking-[0.15em] uppercase text-gray-600 bg-white/90 rounded-sm">
            Sold
          </span>
        )}
      </div>

      <div className="space-y-2">
        <h3
          className={`text-xl font-medium font-headline ${
            available
              ? 'text-gray-600 group-hover:text-gray-800 transition-colors'
              : 'text-gray-500 group-hover:text-gray-700 transition-colors'
          }`}
        >
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 font-light">
          {getProductTypeLabel(product)} · {product.medium}
        </p>
        <p className="text-sm text-gray-500 font-light">{product.dimensions}</p>
        <p
          className={`text-sm font-light ${
            available ? 'text-gray-600' : 'text-gray-400 tracking-wide uppercase'
          }`}
        >
          {available ? formatPrice(product.price) : 'Sold'}
        </p>
      </div>
    </>
  )

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      {details}
    </Link>
  )
}
