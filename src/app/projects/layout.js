'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function ProjectsLayout({ children }) {
  const pathname = usePathname()

  return (
    <main className="ml-32 md:ml-48 flex-grow">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="w-full max-w-5xl mx-auto p-8"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
