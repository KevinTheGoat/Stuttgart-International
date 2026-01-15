import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  stagger = 0,
  className = '',
  once = true,
}) {
  const elementRef = useRef(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const animations = {
      fadeUp: { y: 60, opacity: 0 },
      fadeDown: { y: -60, opacity: 0 },
      fadeLeft: { x: 60, opacity: 0 },
      fadeRight: { x: -60, opacity: 0 },
      fade: { opacity: 0 },
      scale: { scale: 0.9, opacity: 0 },
      scaleUp: { scale: 0.8, opacity: 0, y: 40 },
    }

    const ctx = gsap.context(() => {
      gsap.from(stagger ? el.children : el, {
        ...animations[animation],
        duration,
        delay,
        stagger: stagger || 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      })
    })

    return () => ctx.revert()
  }, [animation, delay, duration, stagger, once])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
