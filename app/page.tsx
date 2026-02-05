import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { GallerySection } from "@/components/gallery-section"
import { AmenitiesSection } from "@/components/amenities-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { BookingSection } from "@/components/booking-section"
import { HouseRulesSection } from "@/components/house-rules-section"
import { ReviewsSection } from "@/components/reviews-section"
import { LocationSection } from "@/components/location-section"
import { Footer } from "@/components/footer"
import { EntryScene } from "@/components/entry-scene"
import ScrollToTop from "@/components/ScrollToTop"


export default async function Home() {
 



  return (
      <EntryScene>
    <main className="min-h-screen">
      <Header />

      {/* пример использования данных */}
       <HeroSection  />
    
      <AboutSection />
      <GallerySection />
      <AmenitiesSection />
      <WhyChooseUsSection />
      <HouseRulesSection />
      <ReviewsSection />
      <BookingSection />
      <LocationSection />
       <ScrollToTop />
      <Footer />
      
    </main>
     
 </EntryScene>
  )
}
