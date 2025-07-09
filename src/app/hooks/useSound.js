// hooks/useSound.js
import { useCallback, useRef } from 'react'

export default function useSound(src) {
  const soundRef = useRef(null)

  const play = useCallback(() => {
    if (!soundRef.current) {
      soundRef.current = new Audio(src)
    }
    soundRef.current.currentTime = 0
    soundRef.current.play()
  }, [src])

  return play
}
