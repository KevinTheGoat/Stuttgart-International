import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  light = false,
}) {
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      })

      tl.from('.header-label', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
        .from(
          '.header-title',
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .from(
          '.header-line',
          {
            scaleX: 0,
            duration: 0.8,
            ease: 'power3.inOut',
          },
          '-=0.4'
        )
        .from(
          '.header-desc',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )
    }, headerRef)

    return () => ctx.revert()
  }, [])

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  return (
    <div
      ref={headerRef}
      className={`flex flex-col gap-4 mb-12 md:mb-16 ${alignClasses[align]}`}
    >
      {label && (
        <span className="header-label font-body text-xs tracking-[0.3em] uppercase text-brand-gold">
          {label}
        </span>
      )}
      <h2
        className={`header-title font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight ${
          light ? 'text-brand-black' : 'text-brand-white'
        }`}
      >
        {title}
      </h2>
      <div className={`header-line flex gap-1 ${align === 'center' ? 'mx-auto' : ''}`}>
        <div className="w-8 h-0.5 bg-brand-red" />
        <div className="w-12 h-0.5 bg-brand-gold" />
      </div>
      {description && (
        <p
          className={`header-desc font-body text-lg max-w-2xl leading-relaxed ${
            light ? 'text-brand-steel' : 'text-brand-silver/80'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
