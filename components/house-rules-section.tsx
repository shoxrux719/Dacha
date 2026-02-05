"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, Cigarette, Dog, Volume2, PartyPopper, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function HouseRulesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const rules = [
    { icon: Clock, titleKey: "houseRules.checkInOut", descKey: "houseRules.checkInOutDesc" },
    { icon: PartyPopper, titleKey: "houseRules.events", descKey: "houseRules.eventsDesc" },
    { icon: AlertCircle, titleKey: "houseRules.damage", descKey: "houseRules.damageDesc" },
  ]

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4 font-medium">{t("houseRules.subtitle")}</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light">
            {t("houseRules.title1")} <span className="italic">{t("houseRules.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-secondary flex items-center justify-center rounded-xl">
                <rule.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">{t(rule.titleKey as any)}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{t(rule.descKey as any)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
