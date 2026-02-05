  'use client'

  import { motion, AnimatePresence } from 'framer-motion'
  import { useEffect, useState } from 'react'
export default function   AdminEntryScene({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState(true)

    useEffect(() => {
      const t = setTimeout(() => setShow(false), 1300)
      return () => clearTimeout(t)
    }, [])

    return (
      <>
        <AnimatePresence>
          {show && (
            <motion.div
              className="fixed inset-0 z-[9999] bg-[#080b11] overflow-hidden"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* GRID */}
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.04 }}
                transition={{ duration: 0.4 }}
              />

              {/* SCAN LINE */}
              <motion.div
                className="absolute left-0 right-0 h-[2px] bg-cyan-400/40"
                initial={{ top: '-10%' }}
                animate={{ top: '110%' }}
                transition={{ duration: 0.9, ease: 'linear' }}
              />

              {/* LIGHT SWEEP */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
                }}
                initial={{ x: '-120%' }}
                animate={{ x: '120%' }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              {/* CONTENT */}
              <div className="relative z-10 flex h-full items-center justify-center">
                <div className="text-center">
                  {/* ADMIN */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[11px] tracking-[0.45em] text-cyan-300"
                  >
                    ADMIN SYSTEM
                  </motion.div>

                  {/* GLITCH TITLE */}
                  <motion.div
                    initial={{ opacity: 0, letterSpacing: '0.6em' }}
                    animate={{ opacity: 1, letterSpacing: '0.2em' }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="mt-3 text-white text-xl font-mono relative"
                  >
                    ACCESS GRANTED
                    <motion.span
                      className="absolute inset-0 text-cyan-400"
                      animate={{ x: [-1, 1, -1, 0] }}
                      transition={{ duration: 0.15, delay: 0.45 }}
                    >
                      ACCESS GRANTED
                    </motion.span>
                  </motion.div>

                  {/* PROGRESS BAR */}
                  <motion.div
                    className="mx-auto mt-6 h-[2px] w-48 bg-white/10 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                  >
                    <motion.div
                      className="h-full bg-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!show && children}
      </>
    )
  }
