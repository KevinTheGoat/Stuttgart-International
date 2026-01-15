import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../ui/SectionHeader'
import reviews from '../../data/reviews.json'

gsap.registerPlugin(ScrollTrigger)

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-brand-gold' : 'text-brand-steel/30'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.review-card', {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToReview = (index) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0]?.offsetWidth || 400
      const gap = 24
      gsap.to(sliderRef.current, {
        scrollLeft: index * (cardWidth + gap),
        duration: 0.6,
        ease: 'power3.out',
      })
      setActiveIndex(index)
    }
  }

  return (
    <section ref={sectionRef} className="section-padding bg-brand-charcoal relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/5 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <SectionHeader
            label="Testimonials"
            title="Client Reviews"
            description="Hear from Porsche owners who trust Stuttgart International with their vehicles."
            align="left"
          />

          {/* Google Reviews Link */}
          <a
            href="https://www.google.com/maps/place/Stuttgart+International"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-3 text-brand-silver hover:text-brand-gold transition-colors duration-300 mb-12"
          >
            <div className="flex items-center gap-1">
              <span className="font-display text-3xl font-semibold text-brand-gold">5.0</span>
              <StarRating rating={5} />
            </div>
            <span className="font-body text-sm">on Google</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Reviews Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="review-card flex-shrink-0 w-[340px] md:w-[400px] snap-start"
            >
              <div className="h-full p-8 bg-brand-black/60 border border-brand-steel/10 hover:border-brand-gold/20 transition-colors duration-500">
                {/* Quote Icon */}
                <svg
                  className="w-10 h-10 text-brand-gold/30 mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Rating */}
                <StarRating rating={review.rating} />

                {/* Review Text */}
                <p className="font-body text-brand-silver/90 leading-relaxed mt-4 mb-6">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="pt-6 border-t border-brand-steel/20">
                  <p className="font-display text-lg text-brand-white">{review.author}</p>
                  <p className="font-body text-sm text-brand-gold">{review.vehicle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToReview(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-brand-gold w-8'
                  : 'bg-brand-steel/40 hover:bg-brand-steel'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Google Reviews Link */}
        <div className="lg:hidden mt-8 text-center">
          <a
            href="https://www.google.com/maps/place/Stuttgart+International"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-brand-silver hover:text-brand-gold transition-colors duration-300"
          >
            <span className="font-display text-2xl font-semibold text-brand-gold">5.0</span>
            <StarRating rating={5} />
            <span className="font-body text-sm">on Google</span>
          </a>
        </div>
      </div>
    </section>
  )
}
