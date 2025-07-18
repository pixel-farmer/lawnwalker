'use client'

import { createContext, useContext, useRef, useState, useEffect } from 'react'

const SoundContext = createContext()

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const audioContextRef = useRef(null)
  const [isAudioInitialized, setIsAudioInitialized] = useState(false)
  const soundRef = useRef(null)

  // Load sound preference from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('soundEnabled')
    if (stored !== null) {
      setSoundEnabled(stored === 'true')
    }
  }, [])

  // Initialize AudioContext on user gesture
  const initializeAudio = async () => {
    if (!audioContextRef.current && !isAudioInitialized && soundEnabled) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }
        setIsAudioInitialized(true)
      } catch (error) {
        console.error('Error initializing AudioContext:', error)
      }
    }
  }

  // Play sound if enabled and AudioContext is initialized
  const playSound = async (src, volume = 0.5) => {
    if (!soundEnabled) return
    if (!isAudioInitialized) {
      await initializeAudio()
    }
    try {
      if (!soundRef.current) {
        const { Howl } = await import('howler')
        soundRef.current = new Howl({
          src: [src],
          volume,
          autoplay: true,
        })
      } else {
        soundRef.current.src = src
        soundRef.current.play()
      }
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }

  // Toggle sound preference
  const disableSound = () => {
    setSoundEnabled(false)
    localStorage.setItem('soundEnabled', 'false')
    if (soundRef.current) {
      soundRef.current.stop()
    }
  }

  const enableSound = () => {
    setSoundEnabled(true)
    localStorage.setItem('soundEnabled', 'true')
  }

  // Cleanup AudioContext and Howler on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch((err) => console.error('Error closing AudioContext:', err))
      }
      if (soundRef.current) {
        soundRef.current.unload()
      }
    }
  }, [])

  return (
    <SoundContext.Provider value={{ soundEnabled, enableSound, disableSound, initializeAudio, playSound, isAudioInitialized }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSoundPreference() {
  return useContext(SoundContext)
}