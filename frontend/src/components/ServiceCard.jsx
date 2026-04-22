import { Link } from 'react-router-dom'
import { FaClock, FaDollarSign } from 'react-icons/fa'

export default function ServiceCard({ service, featured = false }) {
  return (
    <Link
      to={`/services/${service._id}`}
      className="card-elevated group overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-primary-100">
        <img
          src={service.image || 'https://via.placeholder.com/400x300?text=Service+Image'}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {featured && (
          <div className="absolute top-3 right-3 bg-accent text-primary-800 px-3 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-xs font-semibold uppercase">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-h4 text-primary-800 mb-2 line-clamp-2">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-body-sm text-gray-600 mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-1">
            <FaClock className="text-secondary-600" />
            <span>{service.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <FaDollarSign className="text-secondary-600" />
            <span>${service.price}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="btn btn-secondary btn-sm w-full">
          View Details
        </button>
      </div>
    </Link>
  )
}
