'use client'

import { useRouter } from 'next/navigation'
import { Canvas } from '@react-three/fiber'
import BubbleDistortion from './components/BubbleDistortion'
import { useRef, useEffect } from 'react'
import { useSoundPreference } from './context/SoundContext'

export default function LandingPage() {
  const router = useRouter()
  const { initializeAudio } = useSoundPreference()
  const canvasRef = useRef()

  const handleEnter = async () => {
    try {
      await initializeAudio()
      router.push('/projects/ava')
    } catch (error) {
      console.error('Error initializing audio:', error)
      router.push('/projects/ava')
    }
  }

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

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 mr-60">
      <button
        onClick={handleEnter}
        className="group hover:scale-105 transition-transform duration-300"
        aria-label="Enter site"
        style={{ cursor: 'pointer' }}
      >
        <Canvas
          ref={canvasRef}
          style={{ width: 500, height: 500, background: 'transparent' }} // Reduced size
          gl={{ alpha: true, preserveDrawingBuffer: false, powerPreference: 'low-power' }} // Optimize GPU usage
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 5]} />
          <BubbleDistortion imageSrc="/textures/enter.png" />
        </Canvas>
      </button>
    </main>
  )
}