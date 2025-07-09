'use client'

import { useRouter } from 'next/navigation'
import useSound from 'use-sound'

export default function LandingPage() {
  const router = useRouter()
  const [playSilent] = useSound('/sounds/onesecondsilence.mp3')

  const enterWithSound = () => {
    playSilent() // primes audio permissions
    router.push('/home') // or just '/' if your main content lives there
  }

  const enterWithoutSound = () => {
    router.push('/home')
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white space-y-6">
      <button
        onClick={enterWithSound}
        className="px-6 py-3  bg-gray-700 hover:bg-gray-600 text-white"
      >
        Enter
      </button>
      <button
        onClick={enterWithoutSound}
        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white"
      >
        Enter without Sound
      </button>
    </main>
  )
}
