'use client'

import './globals.css'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isWork = pathname === '/' || pathname.startsWith('/projects')
  const isAbout = pathname === '/about'

  function NavLink({ href, children }) {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`flex items-center space-x-2 ${
          isActive ? 'text-white font-light' : 'text-white'
        }`}
      >
        <span aria-hidden="true" className={`${isActive ? 'opacity-100' : 'opacity-0'} transition`}>
          &gt;
        </span>
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <html lang="en">
      <body className="bg-black text-xl text-white font-light font-sans overflow-x-hidden relative">
        {/* Background image */}
        <div
          className="fixed inset-0 -z-10 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/main-bg.jpg')" }}
        />

        <div className="flex min-h-screen relative z-0">
          {/* Left Sidebar */}
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
{/*             <div className="mt-auto text-xs text-gray-600">© {new Date().getFullYear()}</div> */}
          {/* Main Content */}
          <main className="ml-32 md:ml-48 flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={typeof window !== 'undefined' ? window.location.pathname : 'page'}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </body>
    </html>
  )
}
