'use client'

import Image from 'next/image'
import Link from 'next/link'
import PixelArrow from '../../../components/PixelArrow'
import { motion } from 'framer-motion'

export default function ViewProject() {
  return (
    <main className="min-h-screen flex flex-col items-start text-gray-600 px-8 md:px-2 pt-2 space-y-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-5xl text-gray-600 md:text-6xl font-light tracking-tight"
      >
        Graphic Design
      </motion.h1>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        className="max-w-2xl text-gray-600 text-lg font-thin leading-relaxed"
      >
        <b>Brand Identity | Print Design | Logo Design</b>
        <p>A collection of my graphic design work spanning various mediums and styles. From brand identities and logo design to print materials and digital graphics, these projects showcase my approach to visual communication and creative problem-solving.</p>
        



      </motion.div>

      {/* Project Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        className="w-full"
      >
        <Image
          src="/textures/logos.jpg"
          alt="Graphic Design Portfolio"
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
