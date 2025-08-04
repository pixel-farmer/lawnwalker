'use client'

import Image from 'next/image'
import Link from 'next/link'
import PixelArrow from '../../../components/PixelArrow'
import { motion } from 'framer-motion'

export default function ViewProject() {
  return (
    <main className="min-h-screen flex flex-col items-start text-white px-8 md:px-2 pt-2 space-y-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-5xl text-slate-800 md:text-6xl font-light tracking-tight"
      >
        I am AVA
      </motion.h1>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        className="max-w-2xl text-slate-800 text-lg font-thin leading-relaxed"
      >
        <b>AI Music Creation | Machinima Filming | Video Editing | Motion Design</b>
        <p>Meet AVA — a virtual artist. Through machinima built in Second Life, AVA crafts cinematic journeys using original lyrics, AI-generated music and vocals, 
        and immersive 3D environments. Each piece is a collaboration between human creativity and emerging technology — a glimpse 
        into the future of performance and storytelling.</p>
        

<Link href="https://www.youtube.com/@avaexists" className="flex items-center gap-1 text-cyan-500 hover:text-cyan-300 z-10">
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
