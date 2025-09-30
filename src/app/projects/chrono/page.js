'use client'

import { Canvas } from '@react-three/fiber'
import BubbleDistortion from '../../components/BubbleDistortion'
import Link from 'next/link'

export default function ChronoLanding() {
  return (
    <main className="flex flex-col items-center min-h-screen mt-10 mr-20">


    <Link href="/projects/chrono/viewproject" passHref>
      <button
        className="group hover:scale-105 transition-transform duration-300"
        style={{ cursor: 'pointer' }}
      >
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} 
        style={{ width: 700, height: 700, background: 'transparent' }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} />
        <BubbleDistortion imageSrc="/textures/graphic-design-thumb.png"/>
      </Canvas>
      </button>
    </Link>

    </main>
  )
}
