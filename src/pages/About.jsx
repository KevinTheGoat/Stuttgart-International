import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../components/ui/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '35+', label: 'Years Experience' },
  { value: '10K+', label: 'Vehicles Repaired' },
  { value: '100%', label: 'Customer Satisfaction' },
  { value: '5.0', label: 'Google Rating' },
]

const values = [
  {
    title: 'Precision',
    description:
      'Every repair is executed with factory-level precision using Porsche-approved methods and equipment.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: 'Integrity',
    description:
      'Transparent communication and honest assessments. We treat every vehicle as if it were our own.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    description:
      'We never compromise on quality. Our work reflects the standards that Porsche owners expect.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
]

export default function About() {
  const heroRef = useRef(null)
  const storyRef = useRef(null)
  const statsRef = useRef(null)
  const valuesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.about-hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      })

      // Story section
      gsap.from('.story-content', {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 70%',
        },
      })

      gsap.from('.story-image', {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 70%',
        },
      })

      // Stats animation
      gsap.from('.stat-item', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
      })

      // Values animation
      gsap.from('.value-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

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
              backgroundImage: 'url(/images/gallery/facility/aluminum-room-01.jpg)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/90 to-brand-black" />
        </div>

        <div className="container-custom relative z-10">
          <div className="about-hero-content max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-12 h-px bg-brand-gold" />
              <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-gold">
                Our Story
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-brand-white leading-tight mb-6">
              Craftsmanship
              <br />
              <span className="text-brand-gold">Since 1989</span>
            </h1>

            <p className="font-body text-lg text-brand-silver/80 leading-relaxed max-w-2xl">
              For over three decades, Stuttgart International has been Fort Lauderdale's
              trusted destination for premium European auto body repair.
            </p>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="section-padding bg-brand-charcoal">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="story-content">
              <SectionHeader
                label="Heritage"
                title="A Legacy of Excellence"
                align="left"
              />

              <div className="space-y-6 font-body text-brand-silver/80 leading-relaxed">
                <p>
                  Founded in 1989, Stuttgart International was born from a passion for
                  German automotive engineering and a commitment to excellence. What began
                  as a small shop dedicated to Porsche repair has grown into South Florida's
                  premier Porsche Approved Collision Center.
                </p>
                <p>
                  Our name pays homage to the birthplace of Porsche - Stuttgart, Germany -
                  and reflects our dedication to maintaining the standards of German precision
                  in every repair we undertake.
                </p>
                <p>
                  Over the years, we've invested heavily in state-of-the-art equipment,
                  ongoing technician training, and facility upgrades to ensure we can handle
                  even the most complex repairs on the latest Porsche models while maintaining
                  expertise in classic air-cooled vehicles.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-brand-steel/20">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-brand-gold rounded-full" />
                  <span className="font-body text-sm text-brand-gold tracking-wider uppercase">
                    Porsche Approved Collision Center
                  </span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="story-image relative">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/gallery/facility/bench-02.jpg"
                  alt="Stuttgart International Facility"
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

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-brand-gold">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="font-display text-5xl md:text-6xl font-bold text-brand-black mb-2">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-brand-black/70 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="section-padding bg-brand-black">
        <div className="container-custom">
          <SectionHeader
            label="Our Philosophy"
            title="What Drives Us"
            description="These core values guide every repair, every interaction, and every decision we make."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card p-8 lg:p-10 bg-brand-charcoal/50 border border-brand-steel/10 hover:border-brand-gold/30 transition-colors duration-500"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-brand-gold/10 text-brand-gold mb-6">
                  {value.icon}
                </div>
                <h3 className="font-display text-2xl text-brand-white mb-4">{value.title}</h3>
                <p className="font-body text-brand-silver/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="section-padding bg-brand-charcoal">
        <div className="container-custom">
          <SectionHeader
            label="Our Facility"
            title="State-of-the-Art Equipment"
            description="Equipped with the latest Porsche-approved repair systems and technology."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '/images/gallery/facility/celette-01.jpg',
              '/images/gallery/facility/aluminum-room-01.jpg',
              '/images/gallery/paint-work/paint-booth.jpg',
              '/images/gallery/paint-work/mixing-room-01.jpg',
            ].map((src, index) => (
              <div key={index} className="aspect-square overflow-hidden">
                <img
                  src={src}
                  alt={`Facility ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-black border-t border-brand-steel/20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-brand-white mb-6">
              Experience the Stuttgart <span className="text-brand-gold">Difference</span>
            </h2>
            <p className="font-body text-brand-silver/80 mb-8">
              Visit our facility and see firsthand why discerning Porsche owners trust us
              with their vehicles.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Schedule a Visit
              </Link>
              <Link to="/gallery" className="btn-secondary">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
