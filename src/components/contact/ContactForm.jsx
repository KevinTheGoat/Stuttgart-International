import { useState, useRef } from 'react'
import gsap from 'gsap'

const services = [
  'Collision Repair',
  'Paint Refinishing',
  'Aluminum Body Repair',
  'Frame Straightening',
  'Glass Services',
  'Detailing',
  'Other',
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Animate success
    gsap.fromTo(
      '.success-message',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
  }

  if (isSubmitted) {
    return (
      <div className="success-message text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-brand-gold/10 text-brand-gold rounded-full">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-brand-white mb-4">Thank You!</h3>
        <p className="font-body text-brand-silver/80 max-w-md mx-auto">
          We've received your message and will be in touch within 24 hours.
          For immediate assistance, please call us at{' '}
          <a href="tel:+19545635011" className="text-brand-gold hover:underline">
            (954) 563-5011
          </a>
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block font-body text-xs text-brand-gold uppercase tracking-wider mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-brand-black/50 border border-brand-steel/20 text-brand-white font-body placeholder:text-brand-silver/40 focus:border-brand-gold/60 focus:outline-none transition-colors duration-300"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block font-body text-xs text-brand-gold uppercase tracking-wider mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-brand-black/50 border border-brand-steel/20 text-brand-white font-body placeholder:text-brand-silver/40 focus:border-brand-gold/60 focus:outline-none transition-colors duration-300"
            placeholder="your@email.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block font-body text-xs text-brand-gold uppercase tracking-wider mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-brand-black/50 border border-brand-steel/20 text-brand-white font-body placeholder:text-brand-silver/40 focus:border-brand-gold/60 focus:outline-none transition-colors duration-300"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Vehicle */}
        <div>
          <label
            htmlFor="vehicle"
            className="block font-body text-xs text-brand-gold uppercase tracking-wider mb-2"
          >
            Vehicle (Year, Make, Model)
          </label>
          <input
            type="text"
            id="vehicle"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-brand-black/50 border border-brand-steel/20 text-brand-white font-body placeholder:text-brand-silver/40 focus:border-brand-gold/60 focus:outline-none transition-colors duration-300"
            placeholder="2023 Porsche 911 GT3"
          />
        </div>
      </div>

      {/* Service */}
      <div>
        <label
          htmlFor="service"
          className="block font-body text-xs text-brand-gold uppercase tracking-wider mb-2"
        >
          Service Needed
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-brand-black/50 border border-brand-steel/20 text-brand-white font-body focus:border-brand-gold/60 focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23c0c0c0'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            backgroundSize: '1.5rem',
          }}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block font-body text-xs text-brand-gold uppercase tracking-wider mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-brand-black/50 border border-brand-steel/20 text-brand-white font-body placeholder:text-brand-silver/40 focus:border-brand-gold/60 focus:outline-none transition-colors duration-300 resize-none"
          placeholder="Please describe your repair needs or any questions you have..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
