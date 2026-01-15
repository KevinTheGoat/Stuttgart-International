import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const icons = {
  collision: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  paint: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  aluminum: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  frame: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  ),
  glass: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  detail: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
}

export default function ServiceCard({ service, index, isExpanded, onToggle }) {
  const cardRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        gsap.to(contentRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        })
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in',
        })
      }
    }
  }, [isExpanded])

  return (
    <div
      ref={cardRef}
      className={`group bg-brand-charcoal/50 border transition-all duration-500 ${
        isExpanded ? 'border-brand-gold/40' : 'border-brand-steel/10 hover:border-brand-gold/20'
      }`}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-8 lg:p-10 flex items-start gap-6 text-left"
      >
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-16 h-16 flex items-center justify-center transition-all duration-500 ${
            isExpanded
              ? 'bg-brand-gold text-brand-black'
              : 'bg-brand-gold/10 text-brand-gold group-hover:bg-brand-gold/20'
          }`}
        >
          {icons[service.icon]}
        </div>

        {/* Title & Short Description */}
        <div className="flex-grow">
          <div className="flex items-center justify-between gap-4">
            <h3
              className={`font-display text-2xl lg:text-3xl transition-colors duration-300 ${
                isExpanded ? 'text-brand-gold' : 'text-brand-white'
              }`}
            >
              {service.title}
            </h3>
            <div
              className={`flex-shrink-0 w-10 h-10 flex items-center justify-center border transition-all duration-300 ${
                isExpanded
                  ? 'border-brand-gold bg-brand-gold/10 rotate-45'
                  : 'border-brand-steel/30 group-hover:border-brand-gold/50'
              }`}
            >
              <svg
                className={`w-5 h-5 transition-colors duration-300 ${
                  isExpanded ? 'text-brand-gold' : 'text-brand-silver'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          </div>
          <p className="font-body text-brand-silver/70 mt-2 leading-relaxed">
            {service.shortDesc}
          </p>
        </div>
      </button>

      {/* Expanded Content */}
      <div ref={contentRef} className="h-0 opacity-0 overflow-hidden">
        <div className="px-8 lg:px-10 pb-8 lg:pb-10">
          <div className="pt-6 border-t border-brand-steel/20">
            <p className="font-body text-brand-silver/80 leading-relaxed mb-6">
              {service.description}
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5"
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
                  <span className="font-body text-sm text-brand-silver/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
