import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../ui/SectionHeader'
import galleryData from '../../data/gallery.json'

gsap.registerPlugin(ScrollTrigger)

export default function GalleryPreview() {
  const sectionRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // Get featured images (first 6)
  const featuredImages = galleryData.images.slice(0, 6)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-brand-black relative overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          label="Our Work"
          title="Craftsmanship Gallery"
          description="Explore our portfolio of precision repairs, restorations, and award-winning projects."
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {featuredImages.map((image, index) => (
            <Link
              key={image.id}
              to="/gallery"
              className={`gallery-item relative overflow-hidden group ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`relative ${
                  index === 0 ? 'aspect-square md:aspect-[4/3]' : 'aspect-square'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-4 lg:p-6 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="font-body text-xs tracking-wider uppercase text-brand-gold mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {galleryData.categories.find(c => c.id === image.category)?.name}
                    </span>
                    <h3 className="font-display text-lg lg:text-xl text-brand-white">
                      {image.title}
                    </h3>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-brand-gold/0 group-hover:border-brand-gold/60 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* View Gallery Link */}
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="btn-secondary"
          >
            View Full Gallery
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
