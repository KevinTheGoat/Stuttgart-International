import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function IntroAnimation({ onComplete }) {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false)
          onComplete?.()
        },
      })

      // Initial state
      gsap.set('.intro-line', { scaleX: 0 })
      gsap.set('.intro-stuttgart', { opacity: 0, y: 30 })
      gsap.set('.intro-international', { opacity: 0, y: 20 })
      gsap.set('.intro-tagline', { opacity: 0 })

      // Animation sequence
      tl.to('.intro-line-left', {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.inOut',
      })
        .to(
          '.intro-line-right',
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.inOut',
          },
          '<'
        )
        .to(
          '.intro-stuttgart',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          '.intro-international',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          '.intro-tagline',
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .to({}, { duration: 0.8 }) // Pause to let user see
        .to('.intro-content', {
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          ease: 'power2.in',
        })
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.8,
            ease: 'power3.inOut',
          },
          '-=0.2'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-brand-black flex items-center justify-center"
    >
      <div className="intro-content text-center">
        {/* Decorative Lines */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="intro-line intro-line-left w-16 md:w-24 h-px bg-brand-gold origin-right" />
          <div className="w-2 h-2 bg-brand-red rounded-full" />
          <div className="intro-line intro-line-right w-16 md:w-24 h-px bg-brand-gold origin-left" />
        </div>

        {/* Main Text */}
        <h1 className="intro-stuttgart font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-brand-white tracking-wide mb-2">
          Stuttgart
        </h1>
        <p className="intro-international font-body text-sm sm:text-base md:text-lg tracking-[0.4em] uppercase text-brand-gold mb-8">
          International
        </p>

        {/* Tagline */}
        <p className="intro-tagline font-body text-xs tracking-[0.2em] uppercase text-brand-silver/60">
          Porsche Approved Collision Center
        </p>
      </div>

      {/* Bottom accent stripes - Porsche inspired */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-brand-red" />
        <div className="h-0.5 bg-brand-gold" />
      </div>
    </div>
  )
}
