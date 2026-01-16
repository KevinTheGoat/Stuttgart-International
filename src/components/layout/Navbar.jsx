import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.to(mobileMenuRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
        })
        gsap.from(mobileMenuRef.current.querySelectorAll('a'), {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.1,
        })
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power3.in',
        })
      }
    }
  }, [isOpen])

  // Initial animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isOpen
          ? 'bg-brand-black/95 backdrop-blur-md py-4 shadow-lg shadow-black/20 border-b border-brand-red/30'
          : 'bg-transparent py-6'
      }`}
      style={{ paddingTop: `max(env(safe-area-inset-top), ${isScrolled || isOpen ? '1rem' : '1.5rem'})` }}
    >
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link
            to="/"
            className="group relative z-10 flex-shrink-0"
          >
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight sm:tracking-wide text-brand-white group-hover:text-brand-gold transition-colors duration-300">
                Stuttgart
              </span>
              <span className="font-body text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.35em] uppercase text-brand-silver -mt-1">
                International
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2 font-body text-sm tracking-wider uppercase transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-brand-gold'
                    : 'text-brand-silver hover:text-brand-white'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="btn-primary text-xs"
            >
              Get Estimate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-brand-white transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-brand-white transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-brand-white transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={mobileMenuRef}
          className="lg:hidden overflow-hidden h-0 opacity-0"
        >
          <div className="pt-8 pb-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-3 font-body text-lg tracking-wider border-b border-brand-steel/20 transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-brand-gold'
                    : 'text-brand-silver hover:text-brand-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-primary mt-4 text-center"
            >
              Get Estimate
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
