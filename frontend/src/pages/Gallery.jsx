import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=400&fit=crop', alt: 'Spa Interior' },
    { id: 2, src: 'https://images.unsplash.com/photo-1544161515-81205f8abbe8?w=500&h=400&fit=crop', alt: 'Massage Therapy' },
    { id: 3, src: 'https://images.unsplash.com/photo-1599499810694-b5ac4dd47952?w=500&h=400&fit=crop', alt: 'Relaxation Area' },
    { id: 4, src: 'https://images.unsplash.com/photo-1549887534-7ef2d1eeb33f?w=500&h=400&fit=crop', alt: 'Facial Treatment' },
    { id: 5, src: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=400&fit=crop', alt: 'Wellness' },
    { id: 6, src: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=500&h=400&fit=crop', alt: 'Ambiance' },
    { id: 7, src: 'https://images.unsplash.com/photo-1578926078328-123456789012?w=500&h=400&fit=crop', alt: 'Treatment' },
    { id: 8, src: 'https://images.unsplash.com/photo-1510808159055-8ffee1b3b209?w=500&h=400&fit=crop', alt: 'Candles' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white section-padding">
        <div className="container-max">
          <h1 className="text-h1 mb-4">Gallery</h1>
          <p className="text-xl opacity-90">
            Experience the serene ambiance of Ola Spa
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="relative h-64 rounded-card overflow-hidden cursor-pointer group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            >
              <FaTimes />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-white text-center mt-4">{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  )
}
