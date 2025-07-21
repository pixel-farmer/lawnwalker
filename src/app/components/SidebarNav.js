'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PixelArrow from '../components/PixelArrow'
import { useSoundPreference } from '../context/SoundContext'

export default function SidebarNav() {
  const pathname = usePathname()
  const isWork = pathname === '/home' || pathname.startsWith('/projects')
  const isAbout = pathname === '/about'
  const { playSound, isAudioInitialized, soundEnabled } = useSoundPreference()

  const handleClick = () => {
    if (isAudioInitialized && soundEnabled) {
      playSound('/sounds/chime2.mp3', 0.6, false)
    }
  }

  return (
    <>
      {/* Title at top of page */}
      <div className="fixed left-8 top-10 text-xl md:text-xl text-left font-thin text-white z-50">
        <div>Lawn Walker</div>
        <div className="pt-8 text-sm">[Visual Designer]</div>
        <div className="pt-2 text-sm">[Creative Developer]</div>
      </div>

      {/* Always-visible nav links */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 space-y-4 font-mono text-xl text-white">
        <div className="flex items-center gap-2">
          <span className="w-4 text-cyan-400 transition-opacity duration-300">
            {isWork && <PixelArrow className="w-7 h-7" />}
          </span>
          <Link href="/projects/ava" onClick={handleClick} className="block">
            Work
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 text-cyan-400 transition-opacity duration-300">
            {isAbout && <PixelArrow className="w-7 h-7" />}
          </span>
          <Link href="/about" onClick={handleClick} className="block">
            About
          </Link>
        </div>
      </nav>
    </>
  )
}
