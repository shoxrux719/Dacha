"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Sparkles, Shield, Users, TreePine, Star, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function WhyChooseUsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const reasons = [
    { icon: Sparkles, titleKey: "whyChooseUs.modern", descKey: "whyChooseUs.modernDesc" },
    { icon: Shield, titleKey: "whyChooseUs.privacy", descKey: "whyChooseUs.privacyDesc" },
    { icon: Users, titleKey: "whyChooseUs.groups", descKey: "whyChooseUs.groupsDesc" },
    { icon: Star, titleKey: "whyChooseUs.clean", descKey: "whyChooseUs.cleanDesc" },
    { icon: TreePine, titleKey: "whyChooseUs.nature", descKey: "whyChooseUs.natureDesc" },
    { icon: MapPin, titleKey: "whyChooseUs.location", descKey: "whyChooseUs.locationDesc" },
  ]

  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary-foreground/70 uppercase tracking-[0.2em] text-sm mb-4 font-medium">
              {t("whyChooseUs.subtitle")}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 leading-tight">
              {t("whyChooseUs.title1")}
              <br />
              <span className="italic">{t("whyChooseUs.title2")}</span>
            </h2>
            <p className="text-primary-foreground/80 leading-relaxed text-lg">{t("whyChooseUs.description")}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.titleKey}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-6 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl"
              >
                <reason.icon className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-medium mb-2">{t(reason.titleKey as any)}</h3>
                <p className="text-sm text-primary-foreground/70">{t(reason.descKey as any)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
