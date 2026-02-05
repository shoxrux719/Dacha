"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Car, TreePine, Store, Utensils } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LocationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const nearbyPlaces = [
    { icon: TreePine, nameKey: "location.natureReserve", distance: `5 ${t("location.minDrive")}` },
    { icon: Store, nameKey: "location.localVillage", distance: `10 ${t("location.minDrive")}` },
    { icon: Utensils, nameKey: "location.restaurants", distance: `15 ${t("location.minDrive")}` },
    { icon: Car, nameKey: "location.cityCenter", distance: `35 ${t("location.minDrive")}` },
  ]

  return (
    <section id="location" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4 font-medium">{t("location.subtitle")}</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light">
            {t("location.title1")} <span className="italic">{t("location.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-[4/3] bg-muted relative overflow-hidden rounded-2xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d331.12140967005075!2d69.36208677351776!3d41.354181977612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef40c50bf5755%3A0x4a0ad21f21b60e76!2sFeruza%20Street%209%2C%20Tashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1768120480228!5m2!1sen!2s"
              width="715"
              height="535"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
        
          </motion.div>

          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-serif font-light mb-4">{t("location.perfectRetreat")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("location.perfectRetreatDesc")}</p>
            </div>

            <div>
              <h4 className="font-medium mb-6 uppercase tracking-wide text-sm">{t("location.nearby")}</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {nearbyPlaces.map((place) => (
                  <div key={place.nameKey} className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                    <place.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">{t(place.nameKey as any)}</p>
                      <p className="text-sm text-muted-foreground">{place.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{t("location.gettingHere")}:</strong>{" "}
                {t("location.gettingHereDesc")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
