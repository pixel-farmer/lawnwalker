'use client'

import useSound from 'use-sound'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSoundPreference } from '../context/SoundContext' // ✅ step 1

export default function ProjectNav() {
  const pathname = usePathname()
  const { soundEnabled } = useSoundPreference() // ✅ step 2

  const [playHover] = useSound('/sounds/swipe.mp3', {
    soundEnabled, // ✅ step 3
  })

  return (
    <main className="min-h-screen flex flex-col items-center bg-opacity-0 px-6">
      <section id="projects" className="max-w-xl w-full px-4 mr-40">
        <h2 className="text-xl md:text-xl mb-4 mt-8 text-left text-white font-thin">
          SELECTED WORK
        </h2>
        <ul className="space-y-2">
          {[ 
            { title: 'I am AVA', href: '/projects/ava' },
            { title: 'Pixel Farmer', href: '/projects/pixel' },
            { title: 'The Lab', href: '/projects/cube' },
          ].map((project, index) => (
            <li key={index} className="group text-left">
              <Link
                href={project.href}
                onMouseEnter={() => playHover()}
                className="text-xl md:text-3xl font-thin text-cyan-500 hover:text-cyan-300 transition duration-300 inline-block transform hover:transform hover:translate-x-2"
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
