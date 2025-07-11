'use client'

import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { CameraHelper } from 'three'

export default function ShadowCameraHelper({ lightRef }) {
  const { scene } = useThree()

  useEffect(() => {
    if (lightRef.current && lightRef.current.shadow && lightRef.current.shadow.camera) {
      const helper = new CameraHelper(lightRef.current.shadow.camera)
      scene.add(helper)

      return () => {
        scene.remove(helper)
        helper.dispose?.()
      }
    }
  }, [lightRef, scene])

  return null
}
