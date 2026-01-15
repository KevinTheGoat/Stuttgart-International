import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Button({
  children,
  variant = 'primary',
  href,
  to,
  onClick,
  className = '',
  icon,
  ...props
}) {
  const buttonRef = useRef(null)

  useEffect(() => {
    const el = buttonRef.current
    if (!el) return

    const handleMouseEnter = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(el, {
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`,
        duration: 0,
      })
    }

    el.addEventListener('mousemove', handleMouseEnter)
    return () => el.removeEventListener('mousemove', handleMouseEnter)
  }, [])

  const baseStyles = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  const combinedStyles = `${baseStyles} ${className} group`

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </>
  )

  if (to) {
    return (
      <Link ref={buttonRef} to={to} className={combinedStyles} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a ref={buttonRef} href={href} className={combinedStyles} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button ref={buttonRef} onClick={onClick} className={combinedStyles} {...props}>
      {content}
    </button>
  )
}
