'use client'

import './globals.css'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'], weight: ['200', '300', '400', '500'] })

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isAboutPage = pathname === '/about'
  const isPaintingsPage = pathname === '/projects/paintings/viewproject' || pathname.startsWith('/projects/paintings')
  const isCrucibleHousePage = pathname === '/crucible-house' || pathname.startsWith('/crucible-house')

  return (
    <html lang="en" style={{ backgroundColor: '#ffffff' }} className="bg-white">
      <body
        className={`${inter.className} antialiased bg-white text-gray-900`}
        style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}
      >
        {/* Minimalist Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-lg md:text-xl font-light tracking-wide text-gray-900 hover:text-gray-600 transition-colors font-headline">
                Lawn Walker
              </Link>
              <div className="flex items-center gap-8 md:gap-12">
                <Link 
                  href="/" 
                  className={`text-sm md:text-base font-light tracking-wide transition-colors font-headline ${
                    isHomePage ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  href="/projects/paintings/viewproject" 
                  className={`text-sm md:text-base font-light tracking-wide transition-colors font-headline ${
                    isPaintingsPage ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Gallery
                </Link>
                <Link 
                  href="/about" 
                  className={`text-sm md:text-base font-light tracking-wide transition-colors font-headline ${
                    isAboutPage ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Biography
                </Link>
                <a 
                  href="https://lawnwalker.bigcartel.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base font-light tracking-wide transition-colors font-headline text-gray-600 hover:text-gray-900"
                >
                  Shop
                </a>
                <Link 
                  href="/crucible-house" 
                  className={`text-sm md:text-base font-light tracking-wide transition-colors font-headline ${
                    isCrucibleHousePage ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Crucible House
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pt-16 md:pt-20 bg-white min-h-screen" style={{ backgroundColor: '#ffffff' }}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white"
            style={{ backgroundColor: '#ffffff' }}
          >
            {children}
          </motion.div>
        </div>
      </body>
    </html>
  )
}
