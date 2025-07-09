'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import PixelArrow from '../../components/PixelArrow'
import TexturedCube from '../../components/TexturedCube'

export default function AvaLanding() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <TexturedCube />
      <p className="mt-10 max-w-2xl text-xl text-center text-gray-300 font-thin">
        I am AVA, a virtual singer.
      </p>

<div className="h-2" />

<Link href="/projects/ava/viewproject" className="flex items-center gap-1 text-cyan-500 hover:text-cyan-300 z-10">
  <span>View Project</span>
  <PixelArrow className="w-7 h-7" />
</Link>


    </main>
  )
}
