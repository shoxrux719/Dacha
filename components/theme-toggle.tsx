"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  isScrolled?: boolean
}

export function ThemeToggle({ className, isScrolled = true }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500",
        "hover:bg-primary/10 active:scale-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className,
      )}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {theme === "light" ? (
            <Sun
              className={cn("w-5 h-5 transition-colors duration-300", isScrolled ? "text-foreground" : "text-white")}
            />
          ) : (
            <Moon
              className={cn("w-5 h-5 transition-colors duration-300", isScrolled ? "text-foreground" : "text-white")}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}
