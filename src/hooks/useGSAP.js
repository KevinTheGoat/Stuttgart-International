import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../utils/animations'

export const useGSAP = (callback, dependencies = []) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      callback(ref.current)
    }, ref)

    return () => ctx.revert()
  }, dependencies)

  return ref
}

export const useScrollTrigger = (callback, options = {}) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const defaults = {
      trigger: ref.current,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    }

    const ctx = gsap.context(() => {
      callback(ref.current, { ...defaults, ...options })
    }, ref)

    return () => ctx.revert()
  }, [])

  return ref
}

export const useParallax = (yPercent = -20) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [yPercent])

  return ref
}

export const useReveal = (options = {}) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const defaults = {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    }

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        ...defaults,
        ...options,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return ref
}

export default useGSAP
