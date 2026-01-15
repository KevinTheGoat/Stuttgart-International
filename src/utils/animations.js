import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Smooth reveal animation
export const revealAnimation = (element, options = {}) => {
  const defaults = {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.15,
  }

  return gsap.from(element, { ...defaults, ...options })
}

// Fade in animation
export const fadeIn = (element, options = {}) => {
  const defaults = {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  }

  return gsap.from(element, { ...defaults, ...options })
}

// Slide from left
export const slideFromLeft = (element, options = {}) => {
  const defaults = {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  }

  return gsap.from(element, { ...defaults, ...options })
}

// Slide from right
export const slideFromRight = (element, options = {}) => {
  const defaults = {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  }

  return gsap.from(element, { ...defaults, ...options })
}

// Scale up animation
export const scaleUp = (element, options = {}) => {
  const defaults = {
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
  }

  return gsap.from(element, { ...defaults, ...options })
}

// Text split and reveal animation
export const textReveal = (element, options = {}) => {
  const defaults = {
    y: '100%',
    duration: 1,
    ease: 'power4.out',
    stagger: 0.05,
  }

  return gsap.from(element, { ...defaults, ...options })
}

// Parallax effect
export const parallax = (element, yPercent = -20) => {
  return gsap.to(element, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

// Stagger children reveal
export const staggerReveal = (parent, children, options = {}) => {
  const defaults = {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.1,
  }

  return gsap.from(children, {
    ...defaults,
    ...options,
    scrollTrigger: {
      trigger: parent,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  })
}

// Image reveal with mask
export const imageReveal = (element, options = {}) => {
  const defaults = {
    clipPath: 'inset(0 100% 0 0)',
    duration: 1.2,
    ease: 'power4.inOut',
  }

  gsap.set(element, { clipPath: 'inset(0 100% 0 0)' })

  return gsap.to(element, {
    clipPath: 'inset(0 0% 0 0)',
    ...defaults,
    ...options,
  })
}

// Line draw animation
export const lineDrawAnimation = (element) => {
  return gsap.from(element, {
    scaleX: 0,
    transformOrigin: 'left center',
    duration: 1,
    ease: 'power3.inOut',
  })
}

// Counter animation
export const counterAnimation = (element, endValue, options = {}) => {
  const defaults = {
    duration: 2,
    ease: 'power2.out',
  }

  const obj = { value: 0 }

  return gsap.to(obj, {
    value: endValue,
    ...defaults,
    ...options,
    onUpdate: () => {
      element.textContent = Math.round(obj.value)
    },
  })
}

// Magnetic effect for buttons
export const magneticEffect = (element, strength = 0.3) => {
  const bound = element.getBoundingClientRect()
  const centerX = bound.left + bound.width / 2
  const centerY = bound.top + bound.height / 2

  element.addEventListener('mousemove', (e) => {
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    })
  })

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  })
}

export { gsap, ScrollTrigger }
