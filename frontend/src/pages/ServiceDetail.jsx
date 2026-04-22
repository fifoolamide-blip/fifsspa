import { useParams, Link } from 'react-router-dom'
import { useService } from '../hooks/useApi'
import { FaClock, FaDollarSign } from 'react-icons/fa'

export default function ServiceDetail() {
  const { id } = useParams()
  const { service, loading } = useService(id)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-600"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-h2 text-primary-800 mb-4">Service Not Found</h1>
          <Link to="/services" className="btn btn-primary">Back to Services</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="container-max section-padding">
        <Link to="/services" className="text-secondary-600 font-semibold mb-6 inline-block hover:text-secondary-700">
          ← Back to Services
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="rounded-card overflow-hidden h-96 md:h-full">
            <img
              src={service.image || 'https://via.placeholder.com/500x400'}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <span className="inline-block bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-xs font-semibold uppercase mb-3">
              {service.category}
            </span>
            <h1 className="text-h1 text-primary-800 mb-4">{service.name}</h1>
            <p className="text-body text-gray-600 mb-6">{service.description}</p>

            {/* Meta Info */}
            <div className="space-y-3 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <FaClock className="text-secondary-600" />
                <span className="text-gray-700"><strong>{service.duration}</strong> minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <FaDollarSign className="text-secondary-600" />
                <span className="text-gray-700"><strong>${service.price}</strong> per session</span>
              </div>
            </div>

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="mb-8">
                <h3 className="text-h4 text-primary-800 mb-4">Benefits</h3>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent text-lg mt-1">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Packages */}
            {service.packages && service.packages.length > 0 && (
              <div className="mb-8">
                <h3 className="text-h4 text-primary-800 mb-4">Available Packages</h3>
                <div className="space-y-2">
                  {service.packages.map((pkg, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-primary-50 rounded">
                      <span className="text-gray-700">{pkg.duration} minutes</span>
                      <span className="font-bold text-secondary-600">${pkg.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <Link to="/booking" className="btn btn-accent btn-primary w-full justify-center">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
