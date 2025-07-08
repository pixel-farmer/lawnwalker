'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SidebarNav() {
  const pathname = usePathname()
  const isWork = pathname === '/' || pathname.startsWith('/projects')
  const isAbout = pathname === '/about'

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 space-y-4 font-mono text-xl text-white">
      <div className="flex items-center gap-2">
        {isWork && <span className="text-cyan-400">&gt;</span>}
        <Link href="/">Work</Link>
      </div>
      <div className="flex items-center gap-2">
        {isAbout && <span className="text-cyan-400">&gt;</span>}
        <Link href="/about">About</Link>
      </div>
    </nav>
  )
}
