'use client'

import { createContext, useContext, useRef, useState, useEffect } from 'react'

const SoundContext = createContext()

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const audioContextRef = useRef(null)
  const [isAudioInitialized, setIsAudioInitialized] = useState(false)
  const soundRef = useRef(null)

  useEffect(() => {
    const stored = localStorage.getItem('soundEnabled')
    if (stored !== null) {
      setSoundEnabled(stored === 'true')
    }
  }, [])

  const initializeAudio = async () => {
    if (!audioContextRef.current && !isAudioInitialized && soundEnabled) {
      try {
        console.log('Initializing AudioContext')
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
          console.log('AudioContext resumed')
        }
        setIsAudioInitialized(true)
      } catch (error) {
        console.error('Error initializing AudioContext:', error)
      }
    } else {
      console.log('AudioContext initialization skipped:', { isAudioInitialized, soundEnabled })
    }
  }

  const playSound = async (src, volume = 0.5, loop = false) => {
    if (!soundEnabled) {
      console.log('Sound disabled, skipping playSound')
      return
    }
    if (!isAudioInitialized) {
      console.log('AudioContext not initialized, cannot play sound')
      return
    }
    try {
      console.log(`Playing sound: ${src}, volume: ${volume}, loop: ${loop}`)
      if (!soundRef.current) {
        const { Howl } = await import('howler')
        soundRef.current = new Howl({
          src: [src],
          volume,
          loop,
          autoplay: false,
        })
        soundRef.current.play()
      } else {
        soundRef.current.src = src
        soundRef.current.loop(loop)
        soundRef.current.play()
      }
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }

  const stopSound = () => {
    if (soundRef.current) {
      console.log('Stopping sound')
      soundRef.current.stop()
    }
  }

  const disableSound = () => {
    setSoundEnabled(false)
    localStorage.setItem('soundEnabled', 'false')
    stopSound()
  }

  const enableSound = () => {
    setSoundEnabled(true)
    localStorage.setItem('soundEnabled', 'true')
  }

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
    <SoundContext.Provider value={{ soundEnabled, enableSound, disableSound, initializeAudio, playSound, stopSound, isAudioInitialized }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSoundPreference() {
  return useContext(SoundContext)
}