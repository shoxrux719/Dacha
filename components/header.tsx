"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CurrencySwitcher } from "@/components/currency-switcher"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#about", label: t("nav.about") },
    { href: "#gallery", label: t("nav.gallery") },
    { href: "#amenities", label: t("nav.amenities") },
    { href: "#booking", label: t("nav.bookNow") },
    { href: "#reviews", label: t("nav.reviews") },
    { href: "#location", label: t("nav.location") },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-serif font-semibold">
          <span className={cn(isScrolled ? "text-foreground" : "text-white")}>
            Villa Serenity
          </span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors",
                isScrolled ? "text-foreground" : "text-white/90"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop switchers */}
        <div className="hidden lg:flex items-center gap-1">
          <LanguageSwitcher isScrolled={isScrolled} />
          <CurrencySwitcher isScrolled={isScrolled} />
          <ThemeToggle isScrolled={isScrolled} />
        </div>

        {/* Mobile header buttons */}
        <div className="lg:hidden flex items-center gap-2">
          {isMobileMenuOpen && (
            <>
              <LanguageSwitcher isScrolled={true} />
              <CurrencySwitcher isScrolled={true} />
            </>
          )}

          <ThemeToggle isScrolled={isScrolled} />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu
                className={cn(
                  "h-6 w-6",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              />
            )}
          </Button>
        </div>
      </div>


      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md transition-all duration-300 overflow-hidden",
          isMobileMenuOpen
            ? "max-h-[500px] border-b border-border"
            : "max-h-0"
        )}
      >
        <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
