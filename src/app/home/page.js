'use client'

import { Canvas } from '@react-three/fiber'
import BubbleDistortion from '../components/BubbleDistortion'
import Link from 'next/link'
import PixelArrow from '../components/PixelArrow'

export default function AvaLanding() {
  return (
    <main className="flex flex-col items-center min-h-screen relative">

<Canvas style={{ width: 700, height: 700 }}>
  <ambientLight intensity={0.5} />
  <directionalLight position={[2, 2, 5]} />
  <BubbleDistortion imageSrc="/textures/avaface1.png"/>
</Canvas>

      <p className="mt-10 max-w-2xl text-xl text-center text-gray-300 font-thin z-10">
        I am AVA, a virtual artist.
      </p>

      <div className="h-2" />

      <Link href="/projects/ava/viewproject" className="flex items-center gap-1 text-cyan-500 hover:text-cyan-300 z-10">
        <span>View Project</span>
        <PixelArrow className="w-7 h-7" />
      </Link>

    </main>
  )
}
