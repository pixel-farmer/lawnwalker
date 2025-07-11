'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three'

export default function BubbleDistortion({ imageSrc = '/textures/enter.png' }) {
  const mesh = useRef()
  const texture = useLoader(TextureLoader, imageSrc)

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uTime: { value: 0 }
  }), [texture])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uMouse.value = new THREE.Vector2(state.mouse.x, state.mouse.y)
      mesh.current.material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[6, 6, 64, 64]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`
          uniform vec2 uMouse;
          uniform float uTime;
          varying vec2 vUv;
          varying vec3 vNormal;

          void main() {
            vUv = uv;
            vNormal = normal;

            vec3 pos = position;
            float dist = distance(uv, uMouse * 0.5 + 0.5);
            float distortionStrength = 1.2 - smoothstep(0.0, 0.4, dist);
            pos.z += sin(dist * 10.0 - uTime * 2.0) * 0.2 * distortionStrength;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          varying vec2 vUv;
          varying vec3 vNormal;

          void main() {
            vec4 tex = texture2D(uTexture, vUv);

            float radius = 0.5;
            float dist = distance(vUv, vec2(0.5, 0.5));
            float circleMask = smoothstep(radius + 0.01, radius, dist);
            
            float centerDist = distance(vUv, vec2(0.5, 0.5));
            float fresnel = smoothstep(0.4, 0.5, centerDist);
            vec3 glowColor = vec3(0.4, 0.8, 1.0);

            vec3 finalColor = tex.rgb + fresnel * glowColor * 0.2;

            gl_FragColor = vec4(finalColor, circleMask);
          }
        `}
      />
    </mesh>
  )
}