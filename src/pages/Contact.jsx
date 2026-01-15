import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactForm from '../components/contact/ContactForm'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.contact-hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      })

      // Content animation
      gsap.from('.contact-info', {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 70%',
        },
      })

      gsap.from('.contact-form-wrapper', {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-24 bg-brand-black overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: 'url(/images/hero/Por carrera GT.jpg)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/90 to-brand-black" />
        </div>

        <div className="container-custom relative z-10">
          <div className="contact-hero-content max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-12 h-px bg-brand-gold" />
              <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-gold">
                Get In Touch
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-brand-white leading-tight mb-6">
              Contact
              <br />
              <span className="text-brand-gold">Us</span>
            </h1>

            <p className="font-body text-lg text-brand-silver/80 leading-relaxed max-w-2xl">
              Ready to schedule a repair or have questions about our services?
              We're here to help. Reach out today for a free estimate.
            </p>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      </section>

      {/* Contact Content */}
      <section ref={contentRef} className="section-padding bg-brand-charcoal">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="contact-info lg:col-span-2">
              <h2 className="font-display text-3xl text-brand-white mb-8">
                Visit Our Facility
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-brand-gold/10 text-brand-gold">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <span className="font-body text-xs text-brand-gold uppercase tracking-wider">
                      Address
                    </span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=1055+NW+51st+Ct+Fort+Lauderdale+FL+33309"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-brand-silver/80 hover:text-brand-gold transition-colors duration-300 leading-relaxed block"
                  >
                    1055 NW 51st Ct<br />
                    Fort Lauderdale, FL 33309
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-brand-gold/10 text-brand-gold">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <span className="font-body text-xs text-brand-gold uppercase tracking-wider">
                      Phone
                    </span>
                  </div>
                  <a
                    href="tel:+19545635011"
                    className="font-display text-2xl text-brand-white hover:text-brand-gold transition-colors duration-300"
                  >
                    (954) 563-5011
                  </a>
                </div>

                {/* Hours */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-brand-gold/10 text-brand-gold">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="font-body text-xs text-brand-gold uppercase tracking-wider">
                      Hours
                    </span>
                  </div>
                  <div className="font-body text-brand-silver/80 space-y-1">
                    <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p>Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-10">
                <div className="aspect-[4/3] bg-brand-black/50 border border-brand-steel/20 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.123456789!2d-80.123456!3d26.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1055+NW+51st+Ct%2C+Fort+Lauderdale%2C+FL+33309!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Stuttgart International Location"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper lg:col-span-3">
              <div className="p-8 lg:p-10 bg-brand-black/50 border border-brand-steel/10">
                <h2 className="font-display text-3xl text-brand-white mb-2">
                  Request an Estimate
                </h2>
                <p className="font-body text-brand-silver/60 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="py-8 bg-brand-gold">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-brand-black">
              <strong className="font-display">Need immediate assistance?</strong>{' '}
              Give us a call during business hours.
            </p>
            <a
              href="tel:+19545635011"
              className="px-8 py-3 bg-brand-black text-brand-white font-body text-sm tracking-wider uppercase hover:bg-brand-charcoal transition-colors duration-300"
            >
              Call (954) 563-5011
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
