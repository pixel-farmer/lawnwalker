'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three'

// Function to create a simple particle texture (soft circle)
function createParticleTexture() {
  const size = 32
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,0.8)')
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

export default function BubbleDistortion({ imageSrc = '/textures/enter.png' }) {
  const bubbleMesh = useRef()
  const particlesMesh = useRef()
  const texture = useLoader(TextureLoader, imageSrc)
  const particleTexture = useMemo(() => createParticleTexture(), [])

  // Uniforms for bubble
  const bubbleUniforms = useMemo(() => ({
    uTexture: { value: texture },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uTime: { value: 0 }
  }), [texture])

  // Uniforms for particles
  const particleUniforms = useMemo(() => ({
    uTexture: { value: particleTexture },
    uTime: { value: 0 }
  }), [particleTexture])

  // Generate particle positions
  const particleCount = 100
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8 // Spread particles in a larger area
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2 - 2 // Place behind bubble (z = -2)
      sizes[i] = Math.random() * 0.1 + 0.05 // Random size between 0.05 and 0.15
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geometry
  }, [])

  useFrame((state) => {
    if (bubbleMesh.current) {
      bubbleMesh.current.material.uniforms.uMouse.value = new THREE.Vector2(state.mouse.x, state.mouse.y)
      bubbleMesh.current.material.uniforms.uTime.value = state.clock.elapsedTime
    }
    if (particlesMesh.current) {
      particlesMesh.current.material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <>
      {/* Bubble Mesh */}
      <mesh ref={bubbleMesh}>
        <planeGeometry args={[6, 6, 64, 64]} />
        <shaderMaterial
          transparent
          uniforms={bubbleUniforms}
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
            uniform float uTime;
            varying vec2 vUv;
            varying vec3 vNormal;

            void main() {
              vec4 tex = texture2D(uTexture, vUv);

              // Create circular mask
              float radius = 0.48;
              float dist = distance(vUv, vec2(0.5, 0.5));
              float edgeFade = smoothstep(radius, radius + 0.02, dist);
              float alpha = tex.a * (1.0 - edgeFade);

              // Fresnel effect for edge glow
              float edgeDist = distance(vUv, vec2(0.5, 0.5));
              float edgeGlow = smoothstep(0.47, 0.5, edgeDist);
              float fresnel = pow(edgeDist, 2.0) * edgeGlow * 1.5;

              // Pale, pastel color shifting
              vec3 glowColor = vec3(
                0.75 + 0.35 * sin(uTime * 0.3 + 0.0),
                0.65 + 0.25 * sin(uTime * 0.35 + 2.0),
                0.8 + 0.2 * sin(uTime * 0.4 + 4.0)
              );

              vec3 finalColor = mix(tex.rgb, glowColor, fresnel * 0.85);

              gl_FragColor = vec4(finalColor, alpha);
            }
          `}
        />
      </mesh>

      {/* Particle Mesh */}
     <points ref={particlesMesh}>
  <bufferGeometry attach="geometry" {...particleGeometry} />
  <shaderMaterial
    transparent
    uniforms={particleUniforms}
    vertexShader={`
      uniform float uTime;
      attribute float size;
      varying vec2 vUv;
      varying float vAlpha;

      void main() {
        vUv = uv;
        vec3 pos = position;
        // Gentle floating animation with slightly increased motion
        pos.x += sin(uTime * 0.4 + position.y * 2.0) * 0.2; // Increased from 0.0 to 0.2
        pos.y += cos(uTime * 0.3 + position.x * 1.5) * 0.15; // Increased from 0.05 to 0.15
        pos.z += sin(uTime * 0.5 + position.z * 2.0) * 0.1; // Increased from 0.1 to 0.1 (kept subtle)
        vAlpha = 0.5 + 0.2 * sin(uTime + position.x + position.y); // Subtle twinkling
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * 50.0; // Adjust size based on distance
      }
    `}
    fragmentShader={`
      uniform sampler2D uTexture;
      uniform float uTime;
      varying vec2 vUv;
      varying float vAlpha;

      void main() {
        vec4 tex = texture2D(uTexture, gl_PointCoord);

      // Create circular mask
        float radius = 0.48;
        float dist = distance(vUv, vec2(0.5, 0.5));
        float edgeFade = smoothstep(radius, radius + 0.02, dist);
        float alpha = tex.a * (1.0 - edgeFade);

      // Fresnel effect for edge glow
        float edgeDist = distance(vUv, vec2(0.5, 0.5));
        float edgeGlow = smoothstep(0.7, 0.5, edgeDist); // Sharper edge detection
        float fresnel = pow(edgeDist, 2.0) * edgeGlow; // Softer falloff for fresnel
        /* float fresnel = pow(edgeDist, 2.0) * edgeGlow * 1.5; // Boosted fresnel for stronger edge */

        // Soft pastel colors matching bubble
        vec3 glowColor = vec3(
        0.75 + 0.35 * sin(uTime * 0.3 + 0.0), // Soft pinkish tone
        0.65 + 0.25 * sin(uTime * 0.35 + 2.0), // Pale bluish tone
        0.8 + 0.2 * sin(uTime * 0.4 + 4.0) // Light purplish tone
        );

        // Combine with base texture, emphasize edge glow
        vec3 finalColor = mix(tex.rgb, glowColor, fresnel * 0.85);  // Stronger glow influence

        gl_FragColor = vec4(finalColor * tex.rgb, tex.a * vAlpha * 0.5); // Very subtle opacity
      }
    `}
  />
</points>
    </>
  )
}