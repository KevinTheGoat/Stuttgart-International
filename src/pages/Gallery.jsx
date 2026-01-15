import { useState, useRef, useEffect, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GalleryLightbox from '../components/gallery/GalleryLightbox'
import galleryData from '../data/gallery.json'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const heroRef = useRef(null)
  const galleryRef = useRef(null)
  const gridRef = useRef(null)

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return galleryData.images
    return galleryData.images.filter((img) => img.category === activeCategory)
  }, [activeCategory])

  const currentIndex = useMemo(() => {
    if (!selectedImage) return -1
    return filteredImages.findIndex((img) => img.id === selectedImage.id)
  }, [selectedImage, filteredImages])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.gallery-hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
        }
      )
    }
  }, [activeCategory])

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
  }

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const handlePrevImage = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1])
    }
  }

  const handleNextImage = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1])
    }
  }

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
              backgroundImage: 'url(/images/gallery/award-winners/930-turbo-01.jpg)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/90 to-brand-black" />
        </div>

        <div className="container-custom relative z-10">
          <div className="gallery-hero-content max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-12 h-px bg-brand-gold" />
              <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-gold">
                Our Portfolio
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-brand-white leading-tight mb-6">
              Gallery of
              <br />
              <span className="text-brand-gold">Excellence</span>
            </h1>

            <p className="font-body text-lg text-brand-silver/80 leading-relaxed max-w-2xl">
              Browse our collection of completed projects, from award-winning restorations
              to precision collision repairs. Every vehicle tells a story of craftsmanship.
            </p>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="section-padding bg-brand-charcoal">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="mb-12 overflow-x-auto">
            <div className="flex gap-2 min-w-max pb-4">
              {galleryData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-3 font-body text-sm tracking-wider uppercase transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-brand-gold text-brand-black'
                      : 'bg-brand-black/50 text-brand-silver hover:text-brand-white hover:bg-brand-black/80 border border-brand-steel/10'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => handleImageClick(image)}
                className={`group relative overflow-hidden aspect-square ${
                  index === 0 && activeCategory === 'all'
                    ? 'md:col-span-2 md:row-span-2'
                    : ''
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="font-display text-lg text-brand-white line-clamp-1">
                    {image.title}
                  </h3>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-brand-red transition-all duration-500 group-hover:w-8 group-hover:h-8" />
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-brand-gold transition-all duration-500 group-hover:w-8 group-hover:h-8" />
              </button>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-brand-silver/60">
                No images found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <GalleryLightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < filteredImages.length - 1}
        />
      )}
    </>
  )
}
