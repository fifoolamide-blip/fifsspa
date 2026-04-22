import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would send the form data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white section-padding">
        <div className="container-max">
          <h1 className="text-h1 mb-4">Contact Us</h1>
          <p className="text-xl opacity-90">
            We'd love to hear from you. Get in touch with us today!
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-h2 text-primary-800 mb-8">Get in Touch</h2>

              <div className="space-y-8 mb-12">
                <div className="flex gap-4">
                  <FaPhone className="text-accent text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-primary-800 mb-1">Phone</h3>
                    <a href="tel:+2348001234567" className="text-gray-600 hover:text-secondary-600">
                      +234 (800) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaEnvelope className="text-accent text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-primary-800 mb-1">Email</h3>
                    <a href="mailto:hello@olaspa.com" className="text-gray-600 hover:text-secondary-600">
                      hello@olaspa.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaMapMarkerAlt className="text-accent text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-primary-800 mb-1">Location</h3>
                    <p className="text-gray-600">
                      123 Wellness Street<br />
                      Lagos, Nigeria 100001
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaClock className="text-accent text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-primary-800 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 7:00 PM<br />
                      Saturday: 10:00 AM - 6:00 PM<br />
                      Sunday: 11:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-card overflow-hidden h-64 bg-gray-200">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7461181028347!2d3.3716385!3d6.5270925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b84c1b5b5b5b5%3A0x123456789!2sLagos%2C+Nigeria!5e0!3m2!1sen!2sng!4v1234567890"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-h2 text-primary-800 mb-6">Send us a Message</h2>

              {submitted && (
                <div className="bg-success bg-opacity-10 border border-success text-success p-4 rounded-lg mb-6">
                  Thank you! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-primary-800 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="input-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-800 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="input-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-800 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 800 123 4567"
                    className="input-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-800 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows="5"
                    className="input-base resize-none"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
