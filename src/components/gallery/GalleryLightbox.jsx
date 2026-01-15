import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GalleryLightbox({ image, onClose, onPrev, onNext, hasNext, hasPrev }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Animate in
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    gsap.fromTo(
      contentRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)', delay: 0.1 }
    )

    // Handle escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && hasNext) onNext()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, onNext, onPrev, hasNext, hasPrev])

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose,
    })
  }

  if (!image) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brand-black/95 backdrop-blur-sm" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-6xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center text-brand-silver hover:text-brand-white transition-colors duration-300"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Container */}
        <div className="relative bg-brand-charcoal overflow-hidden">
          <img
            src={image.src}
            alt={image.title}
            className="w-full h-auto max-h-[70vh] object-contain"
          />

          {/* Navigation Arrows */}
          {hasPrev && (
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-brand-black/60 text-brand-white hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-brand-black/60 text-brand-white hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Caption */}
        <div className="p-6 bg-brand-charcoal border-t border-brand-steel/20">
          <h3 className="font-display text-xl text-brand-white mb-2">{image.title}</h3>
          <p className="font-body text-brand-silver/70">{image.description}</p>
        </div>
      </div>
    </div>
  )
}
