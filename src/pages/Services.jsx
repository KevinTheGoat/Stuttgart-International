import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../components/ui/SectionHeader'
import ServiceCard from '../components/services/ServiceCard'
import services from '../data/services.json'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const [expandedId, setExpandedId] = useState(null)
  const heroRef = useRef(null)
  const servicesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.services-hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      })

      // Services cards animation
      gsap.from('.service-item', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-24 bg-brand-black overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: 'url(/images/gallery/facility/bench-01.jpg)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/90 to-brand-black" />
        </div>

        <div className="container-custom relative z-10">
          <div className="services-hero-content max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-12 h-px bg-brand-gold" />
              <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-gold">
                Our Services
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-brand-white leading-tight mb-6">
              Precision
              <br />
              <span className="text-brand-gold">Expertise</span>
            </h1>

            <p className="font-body text-lg text-brand-silver/80 leading-relaxed max-w-2xl">
              From collision repair to complete restorations, our Porsche-certified technicians
              deliver factory-quality results using genuine OEM parts and approved procedures.
            </p>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      </section>

      {/* Services List */}
      <section ref={servicesRef} className="section-padding bg-brand-charcoal">
        <div className="container-custom">
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={service.id} className="service-item">
                <ServiceCard
                  service={service}
                  index={index}
                  isExpanded={expandedId === service.id}
                  onToggle={() => handleToggle(service.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="section-padding bg-brand-black relative overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <SectionHeader
                label="Certification"
                title="Porsche Approved"
                description="As a Porsche Approved Collision Center, we maintain the highest standards of repair quality, technician training, and facility equipment."
                align="left"
              />

              <div className="space-y-6">
                {[
                  {
                    title: 'Factory Training',
                    desc: 'Our technicians complete ongoing Porsche-specific training programs.',
                  },
                  {
                    title: 'OEM Parts',
                    desc: "We use only genuine Porsche parts to maintain your vehicle's integrity.",
                  },
                  {
                    title: 'Specialized Equipment',
                    desc: 'Our facility features Porsche-approved repair and measuring systems.',
                  },
                  {
                    title: 'Quality Assurance',
                    desc: 'Every repair undergoes rigorous inspection before delivery.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-brand-gold/10 text-brand-gold">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-brand-white mb-1">{item.title}</h4>
                      <p className="font-body text-sm text-brand-silver/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/gallery/facility/celette-01.jpg"
                  alt="Porsche Certified Facility"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Corner Accents */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-brand-red/60" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-brand-gold/40" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-gold">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-brand-black mb-2">
                Ready to get started?
              </h2>
              <p className="font-body text-brand-black/70">
                Contact us for a free estimate on your repair.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-brand-black text-brand-white font-body text-sm tracking-wider uppercase hover:bg-brand-charcoal transition-colors duration-300"
              >
                Get Estimate
              </Link>
              <a
                href="tel:+19545635011"
                className="px-8 py-4 border border-brand-black text-brand-black font-body text-sm tracking-wider uppercase hover:bg-brand-black/10 transition-colors duration-300"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
