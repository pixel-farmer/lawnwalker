/* 'use client'

import { useEffect, useState } from 'react'
import useSound from 'use-sound'

export default function Home() {
  const [playHover, { sound }] = useSound('/sounds/swipe.mp3')
  const [isPrimed, setIsPrimed] = useState(false)

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPrimed && sound) {
        sound.play().then(() => {
          sound.stop() // Stop it immediately, now it's primed
          setIsPrimed(true)
        }).catch(() => {
          // Expected if user hasn't interacted
        })
      }
    }

    window.addEventListener('pointerdown', handleFirstInteraction)
    return () => window.removeEventListener('pointerdown', handleFirstInteraction)
  }, [sound, isPrimed])

  return (
    <main className="min-h-screen flex flex-col items-center bg-opacity-0 text-white px-6 border-0">
      <section id="projects" className="max-w-xl w-full px-4" style={{ marginLeft: '600px' }}>
        <h2 className="text-xl md:text-xl mb-4 mt-8 text-left font-thin">
          SELECTED WORK
        </h2>
        <ul className="space-y-2">
          {[
            { title: "I am AVA", href: "/projects/ava" },
            { title: "Pixel Farmer", href: "/projects/pixel" },
            { title: "Portfolio System UI", href: "/projects/system-ui" },
          ].map((project, index) => (
            <li key={index} className="group text-left">
              <a
                href={project.href}
                onMouseEnter={() => isPrimed && playHover()}
                className="text-xl md:text-3xl font-thin text-cyan-500 hover:text-cyan-300 transition duration-300 inline-block transform group-hover:translate-x-2"
              >
                {project.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
 */

'use client'

import useSound from 'use-sound'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Home() {
  const pathname = usePathname()
  const [hoverReady, setHoverReady] = useState(false)

  // Main hover sound
  const [playHover] = useSound('/sounds/swipe.mp3', { volume: 0.5 })

  // Silent file just for priming
  const [playSilent] = useSound('/sounds/onesecondsilence.mp3')

  useEffect(() => {
    const primeAudio = () => {
      playSilent()
      setHoverReady(true)
    }

    window.addEventListener('pointerdown', primeAudio, { once: true })

    return () => window.removeEventListener('pointerdown', primeAudio)
  }, [pathname, playSilent])

  return (
    <main className="min-h-screen flex flex-col items-center text-white px-6">
      <section id="projects" className="max-w-xl w-full px-4" style={{ marginLeft: '600px' }}>
        <h2 className="text-xl md:text-xl mb-4 mt-8 text-left font-thin">SELECTED WORK</h2>
        <ul className="space-y-2">
          {[
            { title: "I am AVA", href: "/projects/ava" },
            { title: "Pixel Farmer", href: "/projects/pixel" },
            { title: "Portfolio System UI", href: "/projects/system-ui" },
          ].map((project, index) => (
            <li key={index} className="group text-left">
              <a
                href={project.href}
                onMouseEnter={() => {
                  if (hoverReady) playHover()
                }}
                className="text-xl md:text-3xl font-thin text-cyan-500 hover:text-cyan-300 transition duration-300 inline-block transform group-hover:translate-x-2"
              >
                {project.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
