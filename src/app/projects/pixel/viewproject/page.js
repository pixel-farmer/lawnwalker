'use client'

import Image from 'next/image'
import Link from 'next/link'
import PixelArrow from '../../../components/PixelArrow'
import { motion } from 'framer-motion'

export default function ViewProject() {
  return (
    <main className="min-h-screen flex flex-col items-start justify-start text-white px-8 md:px-2 pt-2 space-y-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-5xl md:text-6xl font-light tracking-tight"
      >
        Pixel Farmer
      </motion.h1>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        className="max-w-2xl text-slate-300 text-lg font-thin leading-relaxed"
      >
        <b>Voxel 3D Modeling | Animation | NFT</b>
        <p>Pixel Farmer is my personal NFT collection, created using MagicaVoxel and Blender. Each piece is a one-of-one digital sculpture, minted on the Ethereum blockchain via the boutique NFT marketplace, Foundation. As both artist and community member, I actively built visibility and secured sales through ongoing engagement on Twitter (now X), connecting directly with fellow artists and collectors in the NFT space.</p>
        
        

<Link href="https://foundation.app/@Pixel-Farmer" className="flex items-center gap-1 text-cyan-500 hover:text-cyan-300 z-10">
  <span>View Live</span>
  <PixelArrow className="w-7 h-7" />
</Link>

      </motion.div>

      {/* Project Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        className="w-full"
      >
        <Image
          src="/pixel-collection.jpg"
          alt="Pixel Farmer NFT Collection"
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
