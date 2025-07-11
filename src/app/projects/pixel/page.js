'use client'

import { Canvas } from '@react-three/fiber'
import BubbleDistortion from '../../components/BubbleDistortion'
import Link from 'next/link'
import PixelArrow from '../../components/PixelArrow'

export default function PixelLanding() {
  return (
    <main className="flex flex-col items-center min-h-screen mt-10 mr-20">

<Link href="/projects/pixel/viewproject" passHref>
      <button
        className="group hover:scale-105 transition-transform duration-300"
        style={{ cursor: 'pointer' }}
      >
      <Canvas style={{ width: 700, height: 700 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} />
        <BubbleDistortion imageSrc="/textures/pixel-thumb.png"/>
      </Canvas>
      </button>
      </Link>



{/*       <div className="h-2" />

      <Link href="/projects/pixel/viewproject" className="flex items-center gap-1 text-cyan-500 hover:text-cyan-300 z-10">
        <span>View Project</span>
        <PixelArrow className="w-7 h-7" />
      </Link> */}

    </main>
  )
}
