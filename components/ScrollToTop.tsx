'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggle = () => {
      setVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', toggle)
    return () => window.removeEventListener('scroll', toggle)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
          className="
            fixed bottom-6 right-6 z-50
            h-14 w-14 rounded-full
            bg-[#355E3B] backdrop-blur-xl
            border border-white/10
            shadow-[0_0_30px_rgba(255,255,255,0.15)]
            text-white
            flex items-center justify-center
            hover:scale-110 hover:shadow-[0_0_45px_rgba(255,255,255,0.25)]
            transition
          "
        >
          <ArrowUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
