'use client'

import { useRouter } from 'next/navigation'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import { useSoundPreference } from './context/SoundContext'

function FloatingBubble({ position, scale }) {
  const mesh = useRef()

  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.position.y = position[1] + Math.sin(clock.elapsedTime + position[0]) * 0.15
    mesh.current.rotation.y += 0.005
    mesh.current.rotation.x += 0.003
  })

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#59c5f0"
        transparent
        opacity={0.6}
        roughness={0.3}
        metalness={0.7}
        envMapIntensity={1}
      />
    </mesh>
  )
}

function BubblesGroup() {
  const bubbles = [
    { pos: [-1.2, 0, 0], scale: 0.5 },
    { pos: [1, 0.7, -0.3], scale: 0.35 },
    { pos: [0, 1, 0.3], scale: 0.4 },
    { pos: [-0.7, 1.3, -0.8], scale: 0.3 },
    { pos: [1.3, 1, 0.7], scale: 0.35 },
    { pos: [0.8, 0.5, -1], scale: 0.25 },
  ]

  return (
    <>
      {bubbles.map(({ pos, scale }, idx) => (
        <FloatingBubble key={idx} position={pos} scale={scale} />
      ))}
    </>
  )
}

export default function LandingPage() {
  const router = useRouter()
  const { initializeAudio } = useSoundPreference()
  const canvasRef = useRef()
  const [audioInitialized, setAudioInitialized] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current?.gl?.domElement
    if (canvas) {
      const handleContextLost = (event) => {
        event.preventDefault()
        console.warn('WebGL context lost, attempting to restore...', new Error().stack)
      }
      const handleContextRestored = () => {
        console.log('WebGL context restored')
      }
      canvas.addEventListener('webglcontextlost', handleContextLost)
      canvas.addEventListener('webglcontextrestored', handleContextRestored)
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost)
        canvas.removeEventListener('webglcontextrestored', handleContextRestored)
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      if (canvasRef.current?.gl) {
        const gl = canvasRef.current.gl
        gl.getExtension('WEBGL_lose_context')?.loseContext()
        console.log('WebGL context cleanup on unmount')
      }
    }
  }, [])

  const handleUserClick = async () => {
    try {
      await initializeAudio()
      setAudioInitialized(true)
    } catch (error) {
      console.error('Audio initialization failed:', error)
    }
  }

  // Track mouse position for label
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen relative gap-6 mr-60"
      onClick={!audioInitialized ? handleUserClick : undefined}
      onMouseMove={!audioInitialized ? handleMouseMove : undefined}
      style={{ cursor: !audioInitialized ? 'pointer' : 'default' }}
    >
      <Canvas
        ref={canvasRef}
        style={{ width: 500, height: 500, background: 'transparent' }}
        gl={{ alpha: true, preserveDrawingBuffer: false, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} />
        <BubblesGroup />
      </Canvas>

      {!audioInitialized && (
        <div
          style={{
            position: 'fixed',
            top: mousePos.y + 12,
            left: mousePos.x + 20,
            pointerEvents: 'none',
            color: 'gray',
            fontSize: '0.75rem',
            backgroundColor: 'transparent',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            fontWeight: '400',
            fontFamily: 'monospace',
            zIndex: 9999,
          }}
        >
          Click to enable sound
        </div>
      )}
    </main>
  )
}
