"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

/* 🎥 MAIN VIDEO */
const videoItem = {
  src: "/house-video-tour.mp4",
  poster: "/video-cover.jpg",
}

const galleryImages = [
  { src: "/modern-country-house-exterior-white-walls-glass-ar.jpg", categoryKey: "exterior", alt: "House exterior" },
  { src: "/luxury-open-concept-living-room-with-fireplace-mod.jpg", categoryKey: "interior", alt: "Living room" },
  { src: "/master-bedroom-suite-minimalist-design-large-windo.jpg", categoryKey: "bedrooms", alt: "Master bedroom" },
  { src: "/infinity-pool-modern-country-house-sunset-view-lan.jpg", categoryKey: "poolOutdoor", alt: "Swimming pool" },
  { src: "/modern-kitchen-white-marble-countertops-island-pro.jpg", categoryKey: "interior", alt: "Kitchen" },
  { src: "/luxury-bathroom-freestanding-tub-floor-to-ceiling-.jpg", categoryKey: "interior", alt: "Bathroom" },
  { src: "/cozy-guest-bedroom-neutral-tones-natural-materials.jpg", categoryKey: "bedrooms", alt: "Guest bedroom" },
  { src: "/outdoor-dining-area-covered-terrace-garden-view-ev.jpg", categoryKey: "poolOutdoor", alt: "Outdoor dining" },
  { src: "/modern-house-driveway-entrance-architectural-lands.jpg", categoryKey: "exterior", alt: "House entrance" },
]

export function GallerySection() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("all")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const galleryCategories = [
    { key: "all", label: t("gallery.all") },
    { key: "exterior", label: t("gallery.exterior") },
    { key: "interior", label: t("gallery.interior") },
    { key: "bedrooms", label: t("gallery.bedrooms") },
    { key: "poolOutdoor", label: t("gallery.poolOutdoor") },
  ]

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.categoryKey === activeCategory)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  return (
    <section id="gallery" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">

        {/* TITLE */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4 font-medium">
            {t("gallery.subtitle")}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light">
            {t("gallery.title1")} <span className="italic">{t("gallery.title2")}</span>
          </h2>
        </motion.div>

        {/* CATEGORY FILTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {galleryCategories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={cn(
                "px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300",
                activeCategory === category.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-primary/10"
              )}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* 🎥 VIDEO + 🖼 IMAGES LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-6">

          {/* BIG VIDEO */}
          <div className="lg:col-span-3 lg:row-span-2 rounded-2xl overflow-hidden bg-black">
            <video
              src={videoItem.src}
              poster={videoItem.poster}
              controls
              className="w-full h-full object-cover"
            />
          </div>

          {/* SIDE IMAGES */}
          {filteredImages.slice(0, 6).map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group cursor-pointer overflow-hidden rounded-xl aspect-[4/3]"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🖼 LIGHTBOX */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 text-white"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-6 text-white"
            onClick={prevImage}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <img
            src={filteredImages[currentImageIndex].src}
            alt={filteredImages[currentImageIndex].alt}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
          />

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-6 text-white"
            onClick={nextImage}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>
      )}
    </section>
  )
}
