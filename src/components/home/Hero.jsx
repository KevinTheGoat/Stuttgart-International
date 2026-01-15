import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

export default function Hero() {
  const heroRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Initial setup
      gsap.set('.hero-content > *', { opacity: 0, y: 40 })
      gsap.set(imageRef.current, { scale: 1.2, opacity: 0 })

      // Animation sequence
      tl.to(imageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
      })
        .to(
          '.hero-badge',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.8'
        )
        .to(
          '.hero-title',
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          '-=0.6'
        )
        .to(
          '.hero-subtitle',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .to(
          '.hero-cta',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.4'
        )
        .to(
          '.hero-scroll',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          '-=0.2'
        )

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/hero/hero-porsche.jpg)',
          }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 via-brand-black/50 to-brand-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/60 via-transparent to-brand-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center pt-24 pb-32">
        <div className="hero-content max-w-4xl mx-auto">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-3 mb-8 px-6 py-2 border border-brand-gold/40 bg-brand-black/40 backdrop-blur-sm">
            <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-gold">
              Porsche Approved Collision Center
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6">
            <span className="text-brand-white">Where </span>
            <span className="text-brand-gold">Perfection</span>
            <br />
            <span className="text-brand-white">is the standard</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle font-body text-lg md:text-xl text-brand-silver/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Fort Lauderdale's premier destination for factory-certified Porsche collision repair.
            Where German engineering meets meticulous craftsmanship.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Request Estimate
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
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
            <Link to="/gallery" className="btn-secondary">
              View Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - positioned relative to section */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0">
        <span className="font-body text-xs tracking-widest uppercase text-brand-silver/60">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-gold to-transparent" />
      </div>

      {/* Decorative Elements - Porsche-inspired stripe */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-brand-red" />
        <div className="h-px bg-brand-gold/50" />
      </div>
    </section>
  )
}
