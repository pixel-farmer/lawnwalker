'use client'

import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { MeshReflectorMaterial } from '@react-three/drei'

export default function TexturedCube() {
  const cubeRef = useRef()
  const texture = useLoader(TextureLoader, '/textures/avaface1.png')

  // Animate cube rotation
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.005
      cubeRef.current.rotation.x += 0.002
    }
  })

  return (
    <>
      {/* 🎲 Cube */}
      <mesh ref={cubeRef} position={[0, 1.7, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* 🔁 Reflective Plane below the cube */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
        />
      </mesh>
    </>
  )
}
