'use client'

import './globals.css'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'], weight: ['200', '300', '400', '500'] })

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isAboutPage = pathname === '/about'

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-white text-gray-900`}
      >
        {/* Minimalist Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-lg md:text-xl font-light tracking-wide text-gray-900 hover:text-gray-600 transition-colors">
                Lawn Walker
              </Link>
              
              <div className="flex items-center gap-8 md:gap-12">
                <Link 
                  href="/" 
                  className={`text-sm md:text-base font-light tracking-wide transition-colors ${
                    isHomePage ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Paintings
                </Link>
                <Link 
                  href="/about" 
                  className={`text-sm md:text-base font-light tracking-wide transition-colors ${
                    isAboutPage ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pt-16 md:pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </body>
    </html>
  )
}
