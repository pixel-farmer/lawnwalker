'use client'

import { createContext, useContext, useRef, useState, useEffect } from 'react'

const SoundContext = createContext()

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isAudioInitialized, setIsAudioInitialized] = useState(false)
  const audioContextRef = useRef(null)
  const soundRef = useRef(null) // For UI sounds
  const musicRef = useRef(null) // For background music

  useEffect(() => {
    const stored = localStorage.getItem('soundEnabled')
    if (stored !== null) {
      setSoundEnabled(stored === 'true')
    }
  }, [])

  const initializeAudio = async () => {
    if (!audioContextRef.current && !isAudioInitialized) {
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

  const playSound = async (src, volume = 0.5, loop = false) => {
    if (!soundEnabled || !isAudioInitialized) return
    try {
      const { Howl } = await import('howler')
      if (soundRef.current) {
        soundRef.current.unload()
      }
      soundRef.current = new Howl({
        src: [src],
        volume,
        loop,
      })
      soundRef.current.play()
    } catch (error) {
      console.error('Error playing UI sound:', error)
    }
  }

  const playMusic = async (src, volume = 0.2, loop = true) => {
    if (!soundEnabled || !isAudioInitialized) return
    try {
      const { Howl } = await import('howler')
      if (musicRef.current) {
        musicRef.current.unload()
      }
      musicRef.current = new Howl({
        src: [src],
        volume,
        loop,
      })
      musicRef.current.play()
    } catch (error) {
      console.error('Error playing music:', error)
    }
  }

  const stopSound = () => {
    if (soundRef.current) {
      soundRef.current.stop()
      soundRef.current.unload()
    }
  }

  const stopMusic = () => {
    if (musicRef.current) {
      musicRef.current.stop()
      musicRef.current.unload()
    }
  }

  const enableSound = async () => {
    if (!isAudioInitialized) {
      await initializeAudio()
    }
    setSoundEnabled(true)
    localStorage.setItem('soundEnabled', 'true')
  }

  const disableSound = () => {
    setSoundEnabled(false)
    localStorage.setItem('soundEnabled', 'false')
    stopSound()
    stopMusic()
  }

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error)
      }
      stopSound()
      stopMusic()
    }
  }, [])

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        enableSound,
        disableSound,
        initializeAudio,
        playSound,
        stopSound,
        playMusic,
        stopMusic,
        isAudioInitialized,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}

export function useSoundPreference() {
  return useContext(SoundContext)
}