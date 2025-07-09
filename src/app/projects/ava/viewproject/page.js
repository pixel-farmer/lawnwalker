'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ViewProject() {
  return (
    <main className="min-h-screen flex flex-col items-start justify-start text-white px-8 md:px-32 pt-32 space-y-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-5xl md:text-6xl font-light tracking-tight"
      >
        I am AVA
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        className="max-w-2xl text-slate-300 text-lg font-thin leading-relaxed"
      >
        AVA is an experimental brand rooted in fluid identity and sonic storytelling.
        This project blends visual design, generative animation, and immersive audio to explore emotion through abstraction.
      </motion.p>

      {/* Project Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        className="w-full"
      >
        <Image
          src="/ava-website.jpg"
          alt="AVA Project Visual"
          width={879}
          height={628}
          className="h-auto object-contain rounded-lg shadow-lg"
          priority
        />
      </motion.div>

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
      </motion.div>
    </main>
  )
}
