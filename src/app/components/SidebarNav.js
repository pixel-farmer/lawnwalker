'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PixelArrow from '../components/PixelArrow'
import useSound from 'use-sound'

export default function SidebarNav() {
  const pathname = usePathname()
  const isWork = pathname === '/' || pathname.startsWith('/projects')
  const isAbout = pathname === '/about'

const [playClick] = useSound('../../sounds/chime2.mp3')

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 space-y-4 font-mono text-xl text-white">
      <div className="flex items-center gap-2">
        {isWork && <PixelArrow className="w-7 h-7" />}
        <Link href="/" onClick={playClick}>Work</Link>
      </div>
      <div className="flex items-center gap-2">
        {isAbout && <PixelArrow className="w-7 h-7" />}
        <Link href="/about" onClick={playClick}>About</Link>
      </div>
    </nav>
  )
}
