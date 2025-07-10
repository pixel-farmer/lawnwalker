'use client'

import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

export default function FogPlane() {
  const texture = useLoader(TextureLoader, '/textures/fog512.png') // adjust path if needed
  const ref = useRef()

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.0005 // subtle motion for realism
    }
  })

  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <planeGeometry args={[25, 25]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </mesh>
  )
}
