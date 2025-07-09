'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useRef } from 'react'

function Cube() {
  const mesh = useRef()

    const textures = useLoader(TextureLoader, [
    '/textures/avaface1.png',
    '/textures/avaface2.png',
    '/textures/avaface3.png',
    '/textures/avaface4.png',
    '/textures/avaface5.png',
    '/textures/avaface6.png',
  ])

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01
      mesh.current.rotation.x += 0.005
    }
  })

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[3, 3, 3]} />
      {/** One material per face in the correct order */}
      {textures.map((tex, i) => (
        <meshStandardMaterial key={i} attach={`material-${i}`} map={tex} />
      ))}
    </mesh>
  )
}

export default function TexturedCube() {
  return (
    <Canvas style={{ width: 600, height: 600 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} />
      <Cube />
    </Canvas>
  )
}
