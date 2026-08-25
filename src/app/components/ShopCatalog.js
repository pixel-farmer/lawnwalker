'use client'

import { motion } from 'framer-motion'
import ShopGrid from '@/app/components/ShopGrid'

export default function ShopCatalog({ products }) {
  return (
    <main className="min-h-screen flex flex-col items-start text-gray-600 px-8 md:px-12 pt-2 pb-16 space-y-12 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="space-y-6"
      >
        <h1 className="text-xl md:text-xl font-bold text-gray-500 tracking-tight font-headline">
          Shop
        </h1>
        <p className="max-w-2xl text-gray-500 text-lg font-thin leading-relaxed">
          Welcome to the shop. More products coming soon.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
        className="w-full"
      >
        <ShopGrid products={products} />
      </motion.div>
    </main>
  )
}
