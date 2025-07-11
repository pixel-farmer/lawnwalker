'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const SoundContext = createContext()

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('soundEnabled')
    if (stored !== null) {
      setSoundEnabled(stored === 'true')
    }
  }, [])

  const disableSound = () => {
    setSoundEnabled(false)
    localStorage.setItem('soundEnabled', 'false')
  }

  const enableSound = () => {
    setSoundEnabled(true)
    localStorage.setItem('soundEnabled', 'true')
  }

  return (
    <SoundContext.Provider value={{ soundEnabled, enableSound, disableSound }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSoundPreference() {
  return useContext(SoundContext)
}
