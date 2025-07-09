'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import PixelArrow from '../../components/PixelArrow'

export default function AvaLanding() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center px-6">
      {/* Animated Image */}
      <motion.div
  initial={{ rotate: 0, opacity: 0, y: -100 }}
  animate={{ rotate: 0, opacity: 1, y: 0 }}
  transition={{ type: 'spring', stiffness: 60, damping: 12, duration: 0.8 }}
  className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[800px] max-w-full z-0"
      >
        <Image
          src="/project-ava.png"
          alt="Project Ava Graphic"
          width={500}
          height={500}
          className="w-full h-auto"
        />
      </motion.div>

      {/* Text Content */}

<div className="h-64" />

<Link href="/projects/ava/viewproject" className="flex items-center gap-1 text-cyan-500 hover:text-cyan-300 z-10">
  <span>View Project</span>
  <PixelArrow className="w-7 h-7" />
</Link>


    </main>
  )
}
