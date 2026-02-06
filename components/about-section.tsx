"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Users, Maximize, Bed } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const highlights = [
    { icon: Maximize, label: t("about.area"), value: "350 m²" },
    { icon: Bed, label: t("about.bedrooms"), value: "4" },
    { icon: Users, label: t("about.maxGuests"), value: "10" },
  ]

  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src="/modern-luxury-living-room-interior-with-large-wind.jpg"
                alt="Elegant interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4 font-medium">{t("about.subtitle")}</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 leading-tight">
              {t("about.title1")}
              <br />
              <span className="italic">{t("about.title2")}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{t("about.description1")}</p>
            <p className="text-muted-foreground leading-relaxed mb-10">{t("about.description2")}</p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 border border-border rounded-xl"
                >
                  <item.icon className="w-6 h-6 mx-auto mb-3 text-primary" />
                  <p className="text-2xl font-semibold mb-1">{item.value}</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
