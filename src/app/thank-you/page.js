'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ThankYouPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen max-w-2xl mx-auto px-6 md:px-12 py-20 bg-white" style={{ backgroundColor: '#ffffff' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">
          Thank You
        </h1>
        <p className="text-lg text-gray-700 font-light leading-relaxed mb-8">
          Your message has been sent successfully. I&apos;ll get back to you as soon as I can.
        </p>
        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-light underline"
        >
          Return to Paintings →
        </Link>
      </motion.div>
    </main>
  )
}
