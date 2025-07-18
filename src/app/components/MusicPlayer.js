'use client'

import { useState, useEffect } from 'react'
import { useSoundPreference } from '../context/SoundContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const { isAudioInitialized, soundEnabled, playSound, stopSound, enableSound, disableSound } = useSoundPreference()

  useEffect(() => {
    console.log('MusicPlayer useEffect:', { isAudioInitialized, soundEnabled, isPlaying })
    if (isAudioInitialized && soundEnabled && !isPlaying) {
      playSound('/music/ambient2.mp3', 0.2, true)
      setIsPlaying(true)
    }
  }, [isAudioInitialized, soundEnabled, playSound])

  const togglePlayback = () => {
    console.log('togglePlayback:', { isAudioInitialized, isPlaying, soundEnabled })
    if (!isAudioInitialized) {
      console.log('AudioContext not initialized, cannot toggle playback')
      return
    }
    if (isPlaying) {
      stopSound()
      setIsPlaying(false)
      disableSound()
    } else {
      playSound('/music/ambient2.mp3', 0.2, true)
      setIsPlaying(true)
      enableSound()
    }
  }

  return (
    <button
      onClick={togglePlayback}
      className="fixed bottom-20 right-20 z-50 w-10 h-10 rounded-full border border-white/60 flex items-center justify-center hover:scale-105 transition-transform duration-300 bg-black/40 backdrop-blur-md"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isPlaying ? (
          <motion.svg
            key="bars"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className="flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.rect
                key={i}
                x={4 + i * 4}
                y={2}
                width="2"
                height="12"
                rx="1"
                fill="white"
                animate={{
                  height: [6, 12, 6],
                  y: [9, 6, 9],
                }}
                transition={{
                  duration: 1.2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.svg>
        ) : (
          <motion.svg
            key="pause"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <line
              x1="6"
              y1="12"
              x2="18"
              y2="12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  )
}