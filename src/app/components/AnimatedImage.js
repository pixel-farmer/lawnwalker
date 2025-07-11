'use client'

import { useEffect, useState } from 'react'

export default function AnimatedImage({ 
  frameCount = 5, 
  frameRate = 12, 
  basePath = '/textures/profile/', 
  frameExtension = '.png',
  width = 300,
  height = 300
}) {
  const [currentFrame, setCurrentFrame] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % frameCount)
    }, 1000 / frameRate)
    
    return () => clearInterval(interval)
  }, [frameCount, frameRate])

  const imageSrc = `${basePath}frame_${String(currentFrame).padStart(3, '0')}${frameExtension}`

  return (
    <div 
      className="bg-cover bg-center transition-all duration-75"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${imageSrc})`
      }}
    />
  )
}