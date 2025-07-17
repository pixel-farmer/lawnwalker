'use client'

import { useRouter } from 'next/navigation'
import { Canvas } from '@react-three/fiber'
import BubbleDistortion from './components/BubbleDistortion'
import { useRef } from 'react'
import { Howl } from 'howler'

export default function LandingPage() {
  const router = useRouter()
  const soundRef = useRef(null)

  const enterWithSound = () => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: ['/sounds/onesecondsilence.mp3'],
        volume: 0.5
      })
    }
    soundRef.current.play()
    router.push('/projects/ava')
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 mr-60">
      <button
        onClick={enterWithSound}
        className="group hover:scale-105 transition-transform duration-300"
        aria-label="Enter with sound"
        style={{ cursor: 'pointer' }}
      >
        <Canvas
          style={{ width: 700, height: 700, background: 'transparent' }}
          gl={{ alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 5]} />
          <BubbleDistortion imageSrc="/textures/enter.png" />
        </Canvas>
      </button>
    </main>
  )
}
