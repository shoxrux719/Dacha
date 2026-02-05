"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function EntryScene({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              {/* YOUR PLACE */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-white text-2xl tracking-[0.4em] font-light"
              >
              YOUR PLACE
              </motion.div>

              {/* divider */}
              <motion.div
                className="mx-auto my-5 h-[1px] bg-white/60"
                initial={{ width: 0 }}
                animate={{ width: 160 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />

              {/* Villa Serenity */}
              <motion.div
                initial={{ opacity: 0, y: 16, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
                transition={{
                  delay: 0.9,
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-white text-5xl font-serif"
                style={{
                  textShadow: "0 0 20px rgba(255,255,255,0.2)",
                }}
              >
               R.A.U VILLA
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!show && children}
    </>
  )
}
