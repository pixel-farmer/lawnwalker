'use client'

import './globals.css'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import MusicPlayer from './components/MusicPlayer'
import SidebarNav from './components/SidebarNav'
import ProjectNav from './components/ProjectNav'
import { SoundProvider } from './context/SoundContext'
import { useCustomScroll } from './hooks/useCustomScroll' // Import the hook

const inter = Inter({ subsets: ['latin'], weight: ['200', '300', '400'] })

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const noBackgroundPaths = ['/projects/cube']
  const hideBackground = noBackgroundPaths.some(path => pathname.startsWith(path))
  const isHomePage = pathname === '/'

  return (
    <html lang="en">
      <body
        style={{ backgroundColor: '#ffffff', position: 'relative' }}
        className={`${inter.className} antialiased text-gray-600`}
      >
        <SoundProvider>
          {/* Always show MusicPlayer in bottom corner */}
          <div className="fixed bottom-4 right-4 z-50">
            <MusicPlayer />
          </div>

          {isHomePage ? (
            // Full screen for homepage with navigation overlay
            <div className="w-screen h-screen relative">
              {children}
              {/* Navigation overlay for homepage */}
              <div className="absolute top-0 left-0 z-40">
                <SidebarNav />
              </div>
              <div className="absolute top-0 right-0 z-40">
                <ProjectNav />
              </div>
            </div>
          ) : (
            // Normal layout for other pages
            <div className="flex min-h-screen relative z-0 ">
              <SidebarNav />
              <main className="ml-32 md:ml-48 flex-grow">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pathname}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </main>
              <div className="shrink-0">
                <ProjectNav />
              </div>
            </div>
          )}
        </SoundProvider>
      </body>
    </html>
  )
}
