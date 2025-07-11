'use client'

import { useRouter } from 'next/navigation'
import { Canvas } from '@react-three/fiber'
import BubbleDistortion from './components/BubbleDistortion'
import useSound from 'use-sound'

export default function LandingPage() {
  const router = useRouter()
  const [playSilent] = useSound('/sounds/onesecondsilence.mp3')

  const enterWithSound = () => {
    playSilent() // primes audio permissions
    router.push('/projects/ava') // or just '/' if your main content lives there
  }

  const enterWithoutSound = () => {
    router.push('/projects/ava')
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white space-y-6">
      <button
        onClick={enterWithSound}
        className="group hover:scale-105 transition-transform duration-300"
        style={{ cursor: 'pointer' }}
      >
        <Canvas style={{ width: 600, height: 600 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} />
        <BubbleDistortion imageSrc="/textures/enter.jpg"/>
      </Canvas>
      </button>
      <button
        onClick={enterWithoutSound}
        className="px-6 py-3 text-white"
      >

      </button>
    </main>
  )
}
