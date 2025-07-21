'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'
import Bubble from './components/Bubble'
import { useSoundPreference } from './context/SoundContext'
import MusicPlayer from './components/MusicPlayer'

function MouseTracker({ mouse }) {
  const { camera } = useThree()
  const raycaster = new THREE.Raycaster()
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  const point = new THREE.Vector3()

  useFrame(({ mouse: ndc }) => {
    if (!mouse?.current || !camera) return
    raycaster.setFromCamera(ndc, camera)
    raycaster.ray.intersectPlane(plane, point)
    mouse.current.copy(point)
  })

  return null
}

function Bubbles({ mouse }) {
  const bubbleData = [
    { pos: [-1.2, 0.4, 0], scale: 0.4 },
    { pos: [0.7, 1.1, 0], scale: 0.35 },
    { pos: [1.3, -0.4, 0], scale: 0.3 },
    { pos: [-0.8, 1.3, 0], scale: 0.25 },
    { pos: [0, 0, 0], scale: 0.5 },
  ]

  return (
    <>
      {bubbleData.map((b, i) => (
        <Bubble key={i} position={b.pos} scale={b.scale} mouse={mouse} />
      ))}
    </>
  )
}

export default function LandingPage() {
  const { initializeAudio, enableSound, isAudioInitialized } = useSoundPreference()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const mouse3D = useRef(new THREE.Vector3())

  const handleClick = async () => {
    if (!isAudioInitialized) {
      await initializeAudio()
      await enableSound()
    }
  }

  return (
    <main
      className="flex items-center justify-center min-h-screen relative"
      onClick={handleClick}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: 500, height: 500 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} />
        <Suspense fallback={null}>
          <MouseTracker mouse={mouse3D} />
          <Bubbles mouse={mouse3D} />
        </Suspense>
      </Canvas>

      {!isAudioInitialized && (
        <div
          style={{
            position: 'fixed',
            top: mousePos.y + 12,
            left: mousePos.x + 20,
            pointerEvents: 'none',
            color: 'gray',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
          }}
        >
          Click to enable sound
        </div>
      )}
      <MusicPlayer />
    </main>
  )
}