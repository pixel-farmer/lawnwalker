'use client'

import * as THREE from 'three'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useRef, useEffect, useState, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'

function RabbitModel({ position = [0, 0, 0], scale = 0.4 }) {
  const group = useRef(null)
  const { scene, animations } = useGLTF('/models/rabbit.glb')
  const { actions } = useAnimations(animations, group)
  
  // Mouse interaction state
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(scale)
  const basePos = new THREE.Vector3(...position)

  // Rotation limits (in radians)
  const MAX_X_ROTATION = Math.PI / 3 // 60 degrees
  const MIN_X_ROTATION = -Math.PI / 3 // -60 degrees

  // Ear wiggle animations
  useEffect(() => {
    const wiggleA = actions.EarWiggleA
    const wiggleB = actions.EarWiggleB

    if (!wiggleA || !wiggleB) return

    wiggleA.setLoop(THREE.LoopOnce, 1)
    wiggleA.clampWhenFinished = true

    wiggleB.setLoop(THREE.LoopOnce, 1)
    wiggleB.clampWhenFinished = true

    let timeout

    const playRandomWiggle = () => {
      wiggleA.stop()
      wiggleB.stop()

      const wiggle = Math.random() > 0.5 ? wiggleA : wiggleB

      wiggle.reset().play()

      const duration = wiggle.getClip().duration * 1000
      const nextDelay = duration + 2000 + Math.random() * 3000

      timeout = setTimeout(playRandomWiggle, nextDelay)
    }

    playRandomWiggle()

    return () => clearTimeout(timeout)
  }, [actions])

  // Mouse event handlers
  const handlePointerDown = (event) => {
    console.log('Pointer down on rabbit!')
    event.stopPropagation()
    setIsDragging(true)
    setDragStart({ x: event.clientX, y: event.clientY })
  }

  const handlePointerMove = (event) => {
    if (isDragging) {
      console.log('Pointer move on rabbit!', event.clientX, event.clientY)
      event.stopPropagation()
      const deltaX = event.clientX - dragStart.x
      const deltaY = event.clientY - dragStart.y
      
      setTargetRotation(prev => {
        const newX = Math.max(MIN_X_ROTATION, Math.min(MAX_X_ROTATION, prev.x + deltaY * 0.02))
        return {
          x: newX,
          y: prev.y + deltaX * 0.02
        }
      })
      
      setDragStart({ x: event.clientX, y: event.clientY })
    }
  }

  const handlePointerUp = (event) => {
    console.log('Pointer up on rabbit!')
    event.stopPropagation()
    setIsDragging(false)
  }

  const handleWheel = (event) => {
    console.log('Wheel on rabbit!', event.deltaY)
    event.stopPropagation()
    const zoomDelta = event.deltaY * 0.0005 // Reduced zoom sensitivity
    setZoom(prev => Math.max(0.1, Math.min(2.0, prev - zoomDelta)))
  }

  // Global mouse tracking
  useEffect(() => {
    const handleGlobalMouseMove = (event) => {
      if (isDragging) {
        console.log('Global mouse move!', event.clientX, event.clientY)
        const deltaX = event.clientX - dragStart.x
        const deltaY = event.clientY - dragStart.y
        
        setTargetRotation(prev => {
          const newX = Math.max(MIN_X_ROTATION, Math.min(MAX_X_ROTATION, prev.x + deltaY * 0.02))
          return {
            x: newX,
            y: prev.y + deltaX * 0.02
          }
        })
        
        setDragStart({ x: event.clientX, y: event.clientY })
      }
    }

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        console.log('Global mouse up!')
        setIsDragging(false)
      }
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, dragStart])

  useFrame(() => {
    if (!group.current) return

    const groupPos = group.current.position

    // Smooth interpolation between current and target rotation
    rotation.x = THREE.MathUtils.lerp(rotation.x, targetRotation.x, 0.1)
    rotation.y = THREE.MathUtils.lerp(rotation.y, targetRotation.y, 0.1)

    // Apply rotation to the group
    group.current.rotation.x = rotation.x
    group.current.rotation.y = rotation.y

    // Apply zoom
    group.current.scale.setScalar(zoom)

    // Float slightly
    groupPos.y += Math.sin(Date.now() * 0.001 + basePos.x) * 0.0015

    // Ease back to base position
    groupPos.lerp(basePos, 0.02)

    // Debug rotation application
    if (isDragging) {
      console.log('Applying smooth rotation:', rotation.x, rotation.y, 'to animated rabbit')
    }
  })

  return (
    <group 
      ref={group} 
      position={position} 
      scale={[scale, scale, scale]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
    >
      <primitive object={scene} scale={1} position={[0, 0, 0]} />
    </group>
  )
}

export default function Rabbit({ position, scale }) {
  return (
    <Suspense fallback={null}>
      <RabbitModel position={position} scale={scale} />
    </Suspense>
  )
}

// Preload the model
useGLTF.preload('/models/rabbit.glb') 