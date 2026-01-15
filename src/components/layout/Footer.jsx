import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-brand-black border-t border-brand-steel/20">
      {/* Main Footer Content */}
      <div className="container-custom py-16 md:py-20">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <div className="flex flex-col">
                <span className="font-display text-3xl font-semibold tracking-wide text-brand-white">
                  Stuttgart
                </span>
                <span className="font-body text-xs tracking-[0.35em] uppercase text-brand-silver -mt-1">
                  International
                </span>
              </div>
            </Link>
            <p className="font-body text-brand-silver/80 text-sm leading-relaxed mb-6">
              Porsche Approved Collision Center. Fort Lauderdale's premier destination for
              precision European auto body repair.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
              <span className="font-body text-xs text-brand-gold tracking-wider uppercase">
                Porsche Certified
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-brand-white mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-body text-sm text-brand-silver/80 hover:text-brand-gold transition-colors duration-300 accent-line"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg text-brand-white mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                'Collision Repair',
                'Paint Refinishing',
                'Aluminum Body Repair',
                'Frame Straightening',
                'Glass Services',
                'Detailing',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="font-body text-sm text-brand-silver/80 hover:text-brand-gold transition-colors duration-300 accent-line"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg text-brand-white mb-6">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="font-body text-xs text-brand-gold uppercase tracking-wider mb-1">
                  Address
                </p>
                <p className="font-body text-sm text-brand-silver/80 leading-relaxed">
                  1055 NW 51st Ct<br />
                  Fort Lauderdale, FL 33309
                </p>
              </div>
              <div>
                <p className="font-body text-xs text-brand-gold uppercase tracking-wider mb-1">
                  Phone
                </p>
                <a
                  href="tel:+19545635011"
                  className="font-body text-sm text-brand-silver/80 hover:text-brand-gold transition-colors duration-300"
                >
                  (954) 563-5011
                </a>
              </div>
              <div>
                <p className="font-body text-xs text-brand-gold uppercase tracking-wider mb-1">
                  Hours
                </p>
                <p className="font-body text-sm text-brand-silver/80">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Sat - Sun: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-steel/20">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-brand-silver/60">
              &copy; {new Date().getFullYear()} Stuttgart International. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.google.com/maps/place/Stuttgart+International"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-brand-silver/60 hover:text-brand-gold transition-colors duration-300"
              >
                Google Reviews
              </a>
              <span className="text-brand-steel/40">|</span>
              <Link
                to="/contact"
                className="font-body text-xs text-brand-silver/60 hover:text-brand-gold transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
