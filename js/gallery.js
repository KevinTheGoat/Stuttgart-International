/**
 * Stuttgart International - Gallery JavaScript
 * Filtering, lightbox, and before/after slider functionality
 */

(function() {
  'use strict';

  // ============================================
  // Gallery Filtering
  // ============================================

  const filterButtons = document.querySelectorAll('.gallery__filter');
  const galleryItems = document.querySelectorAll('.gallery__item');

  function initFilters() {
    if (!filterButtons.length || !galleryItems.length) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.dataset.filter;

        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('gallery__filter--active'));
        this.classList.add('gallery__filter--active');

        // Filter items with animation
        galleryItems.forEach((item, index) => {
          const category = item.dataset.category;
          const shouldShow = filter === 'all' || category === filter;

          if (shouldShow) {
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            // Stagger the reveal animation
            setTimeout(() => {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, index * 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ============================================
  // Lightbox
  // ============================================

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxMeta = document.getElementById('lightboxMeta');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;
  let visibleItems = [];

  function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => {
      return window.getComputedStyle(item).display !== 'none';
    });
  }

  function openLightbox(index) {
    updateVisibleItems();
    currentIndex = index;

    const item = visibleItems[currentIndex];
    if (!item) return;

    const img = item.querySelector('img');
    const title = item.dataset.title || '';
    const meta = item.dataset.meta || '';

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxMeta.textContent = meta;

    lightbox.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';

    // Focus management
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    updateVisibleItems();
    currentIndex += direction;

    // Wrap around
    if (currentIndex >= visibleItems.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = visibleItems.length - 1;
    }

    const item = visibleItems[currentIndex];
    if (!item) return;

    const img = item.querySelector('img');
    const title = item.dataset.title || '';
    const meta = item.dataset.meta || '';

    // Fade transition
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightboxTitle.textContent = title;
      lightboxMeta.textContent = meta;
      lightboxImage.style.opacity = '1';
    }, 200);
  }

  function initLightbox() {
    if (!lightbox || !galleryItems.length) return;

    // Open lightbox on item click
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        updateVisibleItems();
        const visibleIndex = visibleItems.indexOf(this);
        if (visibleIndex !== -1) {
          openLightbox(visibleIndex);
        }
      });

      // Make items focusable
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');

      // Open on Enter key
      item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          updateVisibleItems();
          const visibleIndex = visibleItems.indexOf(this);
          if (visibleIndex !== -1) {
            openLightbox(visibleIndex);
          }
        }
      });
    });

    // Close button
    lightboxClose?.addEventListener('click', closeLightbox);

    // Navigation buttons
    lightboxPrev?.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext?.addEventListener('click', () => navigateLightbox(1));

    // Close on backdrop click
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('lightbox--open')) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox(-1);
          break;
        case 'ArrowRight':
          navigateLightbox(1);
          break;
      }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          navigateLightbox(1); // Swipe left = next
        } else {
          navigateLightbox(-1); // Swipe right = prev
        }
      }
    }, { passive: true });
  }

  // ============================================
  // Before/After Comparison Slider
  // ============================================

  function initCompareSlider() {
    const slider = document.getElementById('compareSlider');
    const handle = document.getElementById('compareHandle');

    if (!slider || !handle) return;

    const afterImage = slider.querySelector('.compare-slider__image--after');
    let isDragging = false;

    function updateSliderPosition(clientX) {
      const rect = slider.getBoundingClientRect();
      let position = ((clientX - rect.left) / rect.width) * 100;

      // Clamp between 5% and 95%
      position = Math.max(5, Math.min(95, position));

      handle.style.left = `${position}%`;
      afterImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
    }

    // Mouse events
    handle.addEventListener('mousedown', function(e) {
      e.preventDefault();
      isDragging = true;
      slider.style.cursor = 'ew-resize';
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    });

    document.addEventListener('mouseup', function() {
      isDragging = false;
      slider.style.cursor = 'ew-resize';
    });

    // Touch events
    handle.addEventListener('touchstart', function(e) {
      isDragging = true;
    }, { passive: true });

    slider.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    slider.addEventListener('touchend', function() {
      isDragging = false;
    });

    // Click anywhere on slider to move handle
    slider.addEventListener('click', function(e) {
      if (e.target === handle) return;
      updateSliderPosition(e.clientX);
    });

    // Keyboard support
    slider.setAttribute('tabindex', '0');
    slider.setAttribute('role', 'slider');
    slider.setAttribute('aria-label', 'Before and after comparison slider');
    slider.setAttribute('aria-valuemin', '0');
    slider.setAttribute('aria-valuemax', '100');
    slider.setAttribute('aria-valuenow', '50');

    slider.addEventListener('keydown', function(e) {
      const rect = slider.getBoundingClientRect();
      const currentLeft = parseFloat(handle.style.left) || 50;
      let newPosition = currentLeft;

      switch (e.key) {
        case 'ArrowLeft':
          newPosition = Math.max(5, currentLeft - 5);
          break;
        case 'ArrowRight':
          newPosition = Math.min(95, currentLeft + 5);
          break;
        default:
          return;
      }

      e.preventDefault();
      handle.style.left = `${newPosition}%`;
      afterImage.style.clipPath = `inset(0 ${100 - newPosition}% 0 0)`;
      slider.setAttribute('aria-valuenow', Math.round(newPosition));
    });
  }

  // ============================================
  // Initialize
  // ============================================

  function init() {
    initFilters();
    initLightbox();
    initCompareSlider();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
