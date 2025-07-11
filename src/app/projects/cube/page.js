'use client'

import { Canvas } from '@react-three/fiber'
import TexturedCube from '../../components/TexturedCube'
// import { softShadows } from '@react-three/drei'
// softShadows() // Uncomment to enable softer shadows

export default function CubeLanding() {
  return (
<main
  className="flex flex-col items-center justify-center min-h-screen"
  style={{ background: 'transparent' }}
>
  <Canvas
    shadows
    style={{ width: 700, height: 700, padding: 0, boxSizing: 'content-box' }}
    camera={{ position: [4, 4, 9], fov: 50 }}
  >
    {/* Lights */}
    <ambientLight intensity={0.4} />
    <directionalLight
      position={[3, 5, 3]}
      intensity={1.2}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
      shadowBias={-0.001}
    />
    <pointLight position={[0, 5, 0]} intensity={0.5} />

    <TexturedCube />
  </Canvas>

  {/* White text and margin to bring it closer */}
  <p className="mt-0 text-white font-thin">Nothing but a cube for now.</p>
</main>
  )
}
