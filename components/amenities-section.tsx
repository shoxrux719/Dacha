"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Wifi, Waves, Flame, UtensilsCrossed, Snowflake, Tv, Car, TreePine, Bath } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function AmenitiesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const amenities = [
    { icon: Wifi, labelKey: "amenities.wifi", descKey: "amenities.wifiDesc" },
    { icon: Waves, labelKey: "amenities.pool", descKey: "amenities.poolDesc" },
    { icon: Bath, labelKey: "amenities.jacuzzi", descKey: "amenities.jacuzziDesc" },
    { icon: Flame, labelKey: "amenities.bbq", descKey: "amenities.bbqDesc" },
    { icon: UtensilsCrossed, labelKey: "amenities.kitchen", descKey: "amenities.kitchenDesc" },
    { icon: Snowflake, labelKey: "amenities.climate", descKey: "amenities.climateDesc" },
    { icon: Tv, labelKey: "amenities.tv", descKey: "amenities.tvDesc" },
    { icon: Car, labelKey: "amenities.parking", descKey: "amenities.parkingDesc" },
    { icon: TreePine, labelKey: "amenities.garden", descKey: "amenities.gardenDesc" },
  ]

  return (
    <section id="amenities" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4 font-medium">{t("amenities.subtitle")}</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light">
            {t("amenities.title1")} <span className="italic">{t("amenities.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.labelKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group p-8 border border-border rounded-xl hover:border-primary/30 hover:bg-card transition-all duration-300"
            >
              <amenity.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-medium mb-2">{t(amenity.labelKey as any)}</h3>
              <p className="text-muted-foreground">{t(amenity.descKey as any)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
