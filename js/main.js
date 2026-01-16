/**
 * Stuttgart International - Main JavaScript
 * Navigation, animations, and common functionality
 */

(function() {
  'use strict';

  // DOM Elements
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // ============================================
  // Navigation
  // ============================================

  // Scroll handler for nav background
  function handleScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  // Mobile menu toggle
  function toggleMobileMenu() {
    navToggle.classList.toggle('nav__toggle--active');
    navLinks.classList.toggle('nav__links--open');
    document.body.style.overflow = navLinks.classList.contains('nav__links--open') ? 'hidden' : '';
  }

  // Close mobile menu when clicking a link
  function handleNavLinkClick() {
    if (navLinks.classList.contains('nav__links--open')) {
      toggleMobileMenu();
    }
  }

  // Initialize navigation
  function initNav() {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    if (navToggle) {
      navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close menu on link click
    const links = navLinks?.querySelectorAll('.nav__link');
    links?.forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks?.classList.contains('nav__links--open')) {
        toggleMobileMenu();
      }
    });
  }

  // ============================================
  // Scroll Reveal Animations
  // ============================================

  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    if (!revealElements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => {
      observer.observe(el);
    });
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = nav?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ============================================
  // Form Enhancements
  // ============================================

  function initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      // Add loading state on submit
      form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="iconify" data-icon="mdi:loading" style="animation: spin 1s linear infinite;"></span> Sending...';
        }
      });

      // Add focus styles to inputs
      const inputs = form.querySelectorAll('.form__input, .form__textarea');
      inputs.forEach(input => {
        input.addEventListener('focus', function() {
          this.parentElement?.classList.add('form__group--focused');
        });
        input.addEventListener('blur', function() {
          this.parentElement?.classList.remove('form__group--focused');
        });
      });
    });
  }

  // ============================================
  // Click-to-call Tracking (placeholder)
  // ============================================

  function initPhoneTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Analytics tracking can be added here
        console.log('Phone call initiated:', this.href);
      });
    });
  }

  // ============================================
  // Lazy Loading Images Enhancement
  // ============================================

  function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      images.forEach(img => {
        img.addEventListener('load', function() {
          this.classList.add('loaded');
        });
      });
    } else {
      // Fallback for older browsers
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  // ============================================
  // Page Load Animation
  // ============================================

  function initPageLoad() {
    document.body.classList.add('loaded');

    // Trigger hero animations after a short delay
    setTimeout(() => {
      const heroElements = document.querySelectorAll('.hero__title, .hero__subtitle, .hero__cta');
      heroElements.forEach((el, index) => {
        el.style.animationDelay = `${0.3 + (index * 0.2)}s`;
      });
    }, 100);
  }

  // ============================================
  // Initialize Everything
  // ============================================

  function init() {
    initNav();
    initRevealAnimations();
    initSmoothScroll();
    initForms();
    initPhoneTracking();
    initLazyLoading();
    initPageLoad();
  }


  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
