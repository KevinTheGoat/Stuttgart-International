import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      tl.from('.cta-bg', {
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
        .from(
          '.cta-content > *',
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.6'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="cta-bg absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/hero/Por carrera GT.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-brand-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/60 to-brand-black" />
      </div>

      {/* Red accent stripe - Porsche inspired */}
      <div className="absolute left-0 top-0 bottom-0 w-1 md:w-2 bg-brand-red z-10" />

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="cta-content max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-6 h-px bg-brand-red" />
            <span className="w-6 h-px bg-brand-gold" />
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-gold">
              Schedule Your Visit
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-brand-white leading-tight mb-6">
            Experience the Stuttgart
            <br />
            <span className="text-brand-gold">Difference</span>
          </h2>

          {/* Description */}
          <p className="font-body text-lg text-brand-silver/80 max-w-xl leading-relaxed mb-10">
            From initial assessment to final delivery, we provide transparent communication
            and uncompromising quality. Let us show you why discerning Porsche owners
            choose Stuttgart International.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link to="/contact" className="btn-primary">
              Request Estimate
              <svg
                className="w-4 h-4 ml-2"
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
            </Link>
            <a
              href="tel:+19545635011"
              className="btn-secondary"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              (954) 563-5011
            </a>
          </div>

          {/* Hours */}
          <div className="mt-12 pt-8 border-t border-brand-steel/20">
            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                <p className="font-body text-xs text-brand-gold uppercase tracking-wider mb-2">
                  Location
                </p>
                <p className="font-body text-brand-silver/80">
                  1055 NW 51st Ct<br />
                  Fort Lauderdale, FL 33309
                </p>
              </div>
              <div>
                <p className="font-body text-xs text-brand-gold uppercase tracking-wider mb-2">
                  Hours
                </p>
                <p className="font-body text-brand-silver/80">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Sat - Sun: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
    </section>
  )
}
