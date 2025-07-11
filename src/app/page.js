'use client'

import { useRouter } from 'next/navigation'
import { Canvas } from '@react-three/fiber'
import BubbleDistortion from './components/BubbleDistortion'
import useSound from 'use-sound'

export default function LandingPage() {
  const router = useRouter()
  const [playSilent] = useSound('/sounds/onesecondsilence.mp3')

  const enterWithSound = () => {
    playSilent() // 🔊 primes audio permissions
    router.push('/projects/ava')
  }

  const enterWithoutSound = () => {
    router.push('/projects/ava')
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 mr-60">
      {/* 🔘 Enter with Sound (Bubble) */}
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

      {/* 🔇 Enter without Sound (text button) */}
{/*       <button
        onClick={enterWithoutSound}
        className="text-white text-sm hover:text-cyan-400 transition duration-200"
        
      >
        [ENTER WITHOUT SOUND]
      </button> */}
    </main>
  )
}
