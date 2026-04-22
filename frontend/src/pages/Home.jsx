import { Link } from 'react-router-dom'
import { useServices } from '../hooks/useApi'
import ServiceCard from '../components/ServiceCard'
import { FaCheckCircle, FaStar, FaArrowDown } from 'react-icons/fa'

export default function Home() {
  const { services } = useServices()
  const featuredServices = services.slice(0, 4)

  const benefits = [
    {
      title: 'Professional Therapists',
      description: 'Certified and experienced wellness experts'
    },
    {
      title: 'Premium Products',
      description: 'Luxury brands for the best results'
    },
    {
      title: '100% Satisfaction',
      description: 'We guarantee your complete satisfaction'
    },
    {
      title: 'Serene Environment',
      description: 'Peaceful, calming ambiance for relaxation'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'Absolutely amazing experience! The therapists are so professional and the entire atmosphere is so calming.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      text: 'Best massage I\'ve ever had. Highly recommend to anyone looking for true relaxation.',
      rating: 5
    },
    {
      name: 'Amara Williams',
      text: 'The attention to detail and care shown here is exceptional. Will definitely be back!',
      rating: 5
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-secondary-600 via-secondary-500 to-secondary-700 flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="container-max relative z-10 text-center text-white">
          <h1 className="text-h1 mb-6 slide-up">
            Relax. Refresh. Renew.
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto slide-up" style={{ animationDelay: '0.2s' }}>
            Experience ultimate wellness with our premium spa and wellness services
          </p>
          <Link
            to="/booking"
            className="btn btn-accent btn-primary inline-block slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            Book Your Appointment
          </Link>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <FaArrowDown className="text-white text-2xl" />
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary-800 mb-4">Our Services</h2>
            <p className="text-body text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated selection of wellness and relaxation services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredServices.map((service, index) => (
              <div key={service._id} className="slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard service={service} featured={true} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services" className="btn btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-primary-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary-800 mb-4">Why Choose Ola Spa?</h2>
            <p className="text-body text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands for exceptional wellness experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="card p-8 text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FaCheckCircle className="text-3xl text-accent mx-auto mb-4" />
                <h3 className="text-h4 text-primary-800 mb-3">{benefit.title}</h3>
                <p className="text-body-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary-800 mb-4">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card p-8"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-accent" />
                  ))}
                </div>
                <p className="text-body text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-bold text-primary-800">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-secondary-600 to-secondary-700 text-white">
        <div className="container-max text-center">
          <h2 className="text-h2 mb-6">Ready for Your Transformation?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book your first appointment today and experience the difference
          </p>
          <Link to="/booking" className="btn btn-accent inline-block">
            Schedule Now
          </Link>
        </div>
      </section>
    </div>
  )
}
