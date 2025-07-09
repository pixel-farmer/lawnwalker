'use client'

import './globals.css'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import SidebarNav from './components/SidebarNav'

const inter = Inter({ subsets: ['latin'], weight: ['200', '300', '400'] })

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isWork = pathname === '/' || pathname.startsWith('/projects')
  const isAbout = pathname === '/about'

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-white`}>
        {/* Background image */}
        <div
          className="fixed inset-0 -z-10 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/main-bg.jpg')" }}
        />

        <div className="flex min-h-screen relative z-0">
          {/* Left Sidebar */}
<SidebarNav />
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
