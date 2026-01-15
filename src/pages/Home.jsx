import Hero from '../components/home/Hero'
import ServicesPreview from '../components/home/ServicesPreview'
import GalleryPreview from '../components/home/GalleryPreview'
import ReviewsSection from '../components/home/ReviewsSection'
import CTASection from '../components/home/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <GalleryPreview />
      <ReviewsSection />
      <CTASection />
    </>
  )
}
