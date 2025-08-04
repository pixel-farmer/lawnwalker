'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import Rabbit from './components/Rabbit'
import { useSoundPreference } from './context/SoundContext'
import MusicPlayer from './components/MusicPlayer'

function Rabbits() {
  const rabbitData = [
    { pos: [-1.2, 0.4, 0], scale: 0.85 },
    { pos: [0.7, 1.1, 0], scale: 0.756 },
    { pos: [1.3, -0.4, 0], scale: 0.663 },
    { pos: [-0.8, 1.3, 0], scale: 0.569 },
    { pos: [0, 0, 0], scale: 1.138 },
  ]

  return (
    <>
      {rabbitData.map((r, i) => (
        <Rabbit key={i} position={r.pos} scale={r.scale} />
      ))}
    </>
  )
}

export default function LandingPage() {
  const { initializeAudio, enableSound, isAudioInitialized, soundEnabled } = useSoundPreference()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleClick = async () => {
    if (!isAudioInitialized) {
      await initializeAudio()
      await enableSound()
    }
  }

  return (
    <div 
      className="w-screen h-screen relative"
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      onClick={handleClick}
    >
      <Canvas 
        camera={{ position: [4, 3, 6], fov: 45 }} 
        className="w-full h-full"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} />
        <Suspense fallback={null}>
          <Rabbits />
        </Suspense>
      </Canvas>

      {/* Sound indicator - shows until audio is initialized */}
      {!isAudioInitialized && (
        <div
          style={{
            position: 'fixed',
            top: mousePos.y + 12,
            left: mousePos.x + 20,
            pointerEvents: 'none',
            color: '#1f2937',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            zIndex: 1000,
            textShadow: '0 0 4px rgba(255, 255, 255, 0.8)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          Click to enable sound
        </div>
      )}
      <MusicPlayer />
    </div>
  )
}