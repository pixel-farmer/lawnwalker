'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PixelArrow from '../components/PixelArrow'
import useSound from 'use-sound'

export default function SidebarNav() {
  const pathname = usePathname()
  const isLanding = pathname === '/'
  const isWork = pathname === '/home' || pathname.startsWith('/projects')
  const isAbout = pathname === '/about'

const [playClick] = useSound('../../sounds/chime2.mp3')

  return (
    <>
    {/* Title at top of page */}
    <div className="fixed left-8 top-20 text-xl md:text-xl text-left font-thin text-white z-50">
      Lawn Walker
    </div>

    <nav className="fixed left-8 top-1/2 -translate-y-1/2 space-y-4 font-mono text-xl text-white">

      {!isLanding && (
        <>
      <div className="flex items-center gap-2">
        <span className="w-4 text-cyan-400 transition-opacity duration-300">
        {isWork && <PixelArrow className="w-7 h-7" />}
        </span>
        <Link href="/home" onClick={playClick} className="block">Work</Link>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 text-cyan-400 transition-opacity duration-300">
        {isAbout && <PixelArrow className="w-7 h-7" />}
        </span>
        <Link href="/about" onClick={playClick} className="block">About</Link>
      </div>
      </>
      )}
    </nav>
    </>
  )
}
