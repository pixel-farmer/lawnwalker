'use client'

import './globals.css'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import MusicPlayer from './components/MusicPlayer'
import SidebarNav from './components/SidebarNav'
import ProjectNav from './components/ProjectNav'
import { SoundProvider } from './context/SoundContext'

const inter = Inter({ subsets: ['latin'], weight: ['200', '300', '400'] })

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const showProjectNav = pathname && (pathname.startsWith('/projects') || pathname === '/home')
  const showMusicPlayer = pathname !== '/' && pathname !== '/landing'
  const showSidebarNav = pathname !== '/' && pathname !== '/landing' // Hide SidebarNav on / and /landing
  const noBackgroundPaths = ['/projects/cube']
  const hideBackground = noBackgroundPaths.some(path => pathname.startsWith(path))

  return (
    <html lang="en">
      <body style={{ backgroundColor: '#367' }} className={`${inter.className} antialiased text-white`}>
        <SoundProvider>
          {showMusicPlayer && <MusicPlayer />}
          {!hideBackground && (
            <div
              className="fixed inset-0 -z-10 bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: "url('/city-bg.jpg')" }}
            />
          )}
          <div className="flex min-h-screen relative z-0">
            {showSidebarNav && <SidebarNav />}
            <main className={showSidebarNav ? 'ml-32 md:ml-48 flex-grow' : 'flex-grow'}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </main>
            {showProjectNav && (
              <div className="shrink-0">
                <ProjectNav />
              </div>
            )}
          </div>
        </SoundProvider>
      </body>
    </html>
  )
}