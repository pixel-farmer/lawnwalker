'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Bubble({ position = [0, 0, 0], scale = 0.4, mouse }) {
  const mesh = useRef()
  const material = useRef()
  const basePos = new THREE.Vector3(...position)
  const tempVec = new THREE.Vector3()

  useFrame(() => {
    if (!mesh.current || !mouse?.current) return

    const meshPos = mesh.current.position
    const dir = tempVec.subVectors(meshPos, mouse.current)
    const distance = dir.length()

    // Repel when close
    if (distance < 1.2) {
      dir.normalize().multiplyScalar(0.003)
      meshPos.add(dir)
    }

    // Ease back to base position
    meshPos.lerp(basePos, 0.02)

    // Float slightly
    meshPos.y += Math.sin(Date.now() * 0.001 + basePos.x) * 0.0015

    // Subtle glow near mouse
    const targetGlow = distance < 1.2 ? 0.4 : 0
    if (material.current) {
      material.current.emissiveIntensity = THREE.MathUtils.lerp(material.current.emissiveIntensity, targetGlow, 0.1)
    }
  })

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        ref={material}
        color="#59c5f0"
        transparent
        opacity={0.2}
        metalness={0.7}
        roughness={0.3}
        emissive="#90d6f1ff"
        emissiveIntensity={0}
        envMapIntensity={1}
      />
    </mesh>
  )
}
