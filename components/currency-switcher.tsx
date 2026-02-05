"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Coins, Check } from "lucide-react"
import { useCurrency, type Currency } from "@/contexts/currency-context"
import { cn } from "@/lib/utils"

interface CurrencySwitcherProps {
  className?: string
  isScrolled?: boolean
}

const currencyInfo: Record<Currency, { symbol: string; name: string }> = {
  USD: { symbol: "$", name: "US Dollar" },
  RUB: { symbol: "₽", name: "Russian Ruble" },
  UZS: { symbol: "сўм", name: "Uzbek Som" },
}

export function CurrencySwitcher({ className, isScrolled = true }: CurrencySwitcherProps) {
  const { currency, setCurrency } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)

  const currencies: Currency[] = ["USD", "RUB", "UZS"]

  return (
    <div className={cn("relative", className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300",
          "hover:bg-primary/10 active:scale-95",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          isScrolled ? "text-foreground" : "text-white",
        )}
        whileTap={{ scale: 0.95 }}
        aria-label="Change currency"
        aria-expanded={isOpen}
      >
        <Coins className="w-4 h-4" />
        <span className="text-sm font-medium">{currency}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute right-0 top-full mt-2 z-50 min-w-[180px] overflow-hidden rounded-xl bg-card border border-border shadow-lg backdrop-blur-xl"
            >
              {currencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => {
                    setCurrency(curr)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-sm transition-colors",
                    "hover:bg-primary/5",
                    currency === curr && "bg-primary/10 text-primary",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-center font-semibold">{currencyInfo[curr].symbol}</span>
                    <span className="font-medium">{currencyInfo[curr].name}</span>
                  </div>
                  {currency === curr && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Check className="w-4 h-4 text-primary" />
                    </motion.div>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
