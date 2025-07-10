'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three'

export default function BubbleDistortion() {
  const mesh = useRef()
  const mouse = useRef([0, 0])
  const texture = useLoader(TextureLoader, '/textures/avaface1.png')

  useFrame(({ mouse: m }) => {
    mouse.current = [m.x, m.y]
    if (mesh.current) {
      mesh.current.material.uniforms.uMouse.value = new THREE.Vector2(m.x, m.y)
    }
  })

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uTime: { value: 0 }
  }), [texture])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[6, 6, 64, 64]} /> // Smaller plane
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={/* glsl */`
         uniform vec2 uMouse;
          uniform float uTime;
          varying vec2 vUv;
          varying vec3 vNormal;

        void main() {
          vUv = uv;
          vNormal = normal;

          vec3 pos = position;
          float dist = distance(uv, uMouse * 0.5 + 0.5); // mouse remapped to [0, 1]
          float distortionStrength = 1.2 - smoothstep(0.0, 0.4, dist); // Only distort near mouse
          pos.z += sin(dist * 10.0 - uTime * 2.0) * 0.2 * distortionStrength;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={/* glsl */`
uniform sampler2D uTexture;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vec4 tex = texture2D(uTexture, vUv);

           // Create circular mask - center visible, edges hidden
            float radius = 0.5;
            float dist = distance(vUv, vec2(0.5, 0.5));
            float circleMask = smoothstep(radius + 0.01, radius, dist);
            
            // UV-based Fresnel effect (works with plane geometry)
            float centerDist = distance(vUv, vec2(0.5, 0.5));
            float fresnel = smoothstep(0.4, 0.5, centerDist);
            vec3 glowColor = vec3(0.4, 0.8, 1.0); // Blue glow

  // Mix the glow and original texture
  vec3 finalColor = tex.rgb + fresnel * glowColor * 0.2;

  // Output with transparency outside circle
  gl_FragColor = vec4(finalColor, circleMask);
}

        `}
      />
    </mesh>
  )
}
