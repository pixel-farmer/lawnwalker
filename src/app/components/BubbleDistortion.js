'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three'

export default function BubbleDistortion({ imageSrc = '/textures/enter.png' }) {
  const bubbleMesh = useRef()
  const texture = useLoader(TextureLoader, imageSrc)

  const bubbleUniforms = useMemo(() => ({
    uTexture: { value: texture },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uTime: { value: 0 }
  }), [texture])

  useFrame((state) => {
    if (bubbleMesh.current) {
      bubbleMesh.current.material.uniforms.uMouse.value = new THREE.Vector2(state.mouse.x, state.mouse.y)
      bubbleMesh.current.material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  useEffect(() => {
    return () => {
      if (bubbleMesh.current) {
        bubbleMesh.current.geometry.dispose()
        bubbleMesh.current.material.dispose()
      }
      texture.dispose()
    }
  }, [texture])

  return (
    <mesh ref={bubbleMesh}>
      <planeGeometry args={[6, 6, 32, 32]} /> {/* Reduced to 32x32 segments */}
      <shaderMaterial
        transparent
        uniforms={bubbleUniforms}
        vertexShader={`
          uniform vec2 uMouse;
          uniform float uTime;
          varying vec2 vUv;

          void main() {
            vUv = uv;
            vec3 pos = position;
            float dist = distance(uv, uMouse * 0.5 + 0.5);
            float distortionStrength = 1.0 - smoothstep(0.0, 0.4, dist); // Reduced strength
            pos.z += sin(dist * 8.0 - uTime * 1.5) * 0.15 * distortionStrength; // Reduced distortion
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          uniform float uTime;
          varying vec2 vUv;

          void main() {
            vec4 tex = texture2D(uTexture, vUv);
            float radius = 0.48;
            float dist = distance(vUv, vec2(0.5, 0.5));
            float edgeFade = smoothstep(radius, radius + 0.02, dist);
            float alpha = tex.a * (1.0 - edgeFade);
            float edgeDist = distance(vUv, vec2(0.5, 0.5));
            float edgeGlow = smoothstep(0.47, 0.5, edgeDist);
            float fresnel = pow(edgeDist, 2.0) * edgeGlow * 1.0; // Reduced fresnel
            vec3 glowColor = vec3(
              0.75 + 0.25 * sin(uTime * 0.3), // Reduced amplitude
              0.65 + 0.2 * sin(uTime * 0.35 + 2.0),
              0.8 + 0.15 * sin(uTime * 0.4 + 4.0)
            );
            vec3 finalColor = mix(tex.rgb, glowColor, fresnel * 0.7); // Reduced glow
            gl_FragColor = vec4(finalColor, alpha);
          }
        `}
      />
    </mesh>
  )
}