'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function TexturedCube() {
  const cubeRef = useRef()

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.005
      cubeRef.current.rotation.x += 0.002
    }
  })

  return (
    <>
      {/* 🧊 Shiny Cube */}
      <mesh ref={cubeRef} position={[0, 2, 0]} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial
          color="#66ddff"
          metalness={0.7}
          roughness={0.4}
          clearcoat={1}
          clearcoatRoughness={0.03}
        />
      </mesh>

      {/* ⬛ Matte Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[6, 6]} />
<shadowMaterial transparent opacity={0.3} />
      </mesh>
    </>
  )
}
