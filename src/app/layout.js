'use client'

import './globals.css'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
  const pathname = usePathname()

  function NavLink({ href, children }) {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`flex items-center space-x-2 ${
          isActive ? 'text-white font-semibold' : 'text-white'
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
      <body className="bg-black text-white font-sans overflow-x-hidden relative">
        {/* Background image */}
        <div
          className="fixed inset-0 -z-10 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/main-bg.jpg')" }}
        />

        <div className="flex min-h-screen relative z-0">
          {/* Left Sidebar */}
          <nav
            className="w-32 md:w-48 px-4 fixed left-0 top-1/2 transform -translate-y-1/2 flex flex-col space-y-8 bg-opacity-0"
            aria-label="Primary Navigation"
          >
            <NavLink href="/">Work</NavLink>
            <NavLink href="/about">About</NavLink>

            <div className="mt-auto text-xs text-gray-600">© {new Date().getFullYear()}</div>
          </nav>

          {/* Main Content */}
          <main className="ml-32 md:ml-48 flex-grow px-6 py-12">
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
