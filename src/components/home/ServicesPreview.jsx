import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../ui/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'collision',
    title: 'Collision Repair',
    description: 'Factory-certified structural repairs using OEM specifications and genuine parts.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 'paint',
    title: 'Paint Refinishing',
    description: 'Expert color matching with Porsche-approved paint systems and downdraft booth.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: 'aluminum',
    title: 'Aluminum Repair',
    description: 'Dedicated aluminum repair facility for modern Porsche construction.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: 'frame',
    title: 'Frame Straightening',
    description: 'Celette bench systems with computerized 3D measuring for perfect alignment.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    ),
  },
]

export default function ServicesPreview() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 60,
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

  return (
    <section ref={sectionRef} className="section-padding bg-brand-charcoal relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212,175,55,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeader
          label="Our Expertise"
          title="Precision Services"
          description="Comprehensive collision repair services backed by Porsche certification and decades of experience with premium European vehicles."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to="/services"
              className="service-card group relative p-8 lg:p-10 bg-brand-black/50 border border-brand-steel/10 hover:border-brand-gold/30 transition-all duration-500"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-brand-gold/20 group-hover:border-brand-gold/60 transition-colors duration-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-brand-gold/20 group-hover:border-brand-gold/60 transition-colors duration-500" />

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-brand-gold/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500">
                  {service.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="font-display text-2xl text-brand-white mb-3 group-hover:text-brand-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-body text-brand-silver/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg
                  className="w-6 h-6 text-brand-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Services Link */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-body text-sm tracking-wider uppercase text-brand-gold hover:text-brand-white transition-colors duration-300"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
