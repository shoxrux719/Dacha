"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const reviews = [
  {
    name: "Elena & Viktor",
    date: "December 2025",
    rating: 5,
    text: "An absolutely stunning property! The modern design combined with natural surroundings made our family vacation unforgettable. The pool was incredible and the kitchen had everything we needed.",
  },
  {
    name: "Michael S.",
    date: "November 2025",
    rating: 5,
    text: "Perfect getaway spot. The attention to detail is remarkable – from the quality of linens to the smart home features. We hosted a small birthday celebration and it couldn't have been better.",
  },
  {
    name: "Anna & Friends",
    date: "October 2025",
    rating: 5,
    text: "We were a group of 8 friends and this place was ideal. Spacious, beautiful, and incredibly comfortable. The jacuzzi under the stars was the highlight of our trip!",
  },
  {
    name: "David K.",
    date: "September 2025",
    rating: 5,
    text: "As someone who appreciates architecture, I was blown away. The property is even more beautiful in person. Peaceful location yet close enough to town for supplies.",
  },
]

export function ReviewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  return (
    <section id="reviews" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4 font-medium">{t("reviews.subtitle")}</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light">
            {t("reviews.title1")} <span className="italic">{t("reviews.title2")}</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            ))}
            <span className="ml-2 text-muted-foreground">5.0 {t("reviews.averageRating")}</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-card p-8 border border-border rounded-2xl relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">{review.text}</p>
              <div className="flex items-center justify-between">
                <p className="font-medium">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
