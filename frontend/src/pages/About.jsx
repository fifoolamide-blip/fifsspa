import { FaAward, FaUsers, FaHeart } from 'react-icons/fa'

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white section-padding">
        <div className="container-max">
          <h1 className="text-h1 mb-4">About Ola Spa</h1>
          <p className="text-xl opacity-90">
            Your sanctuary for wellness and rejuvenation
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-h2 text-primary-800 mb-6">Our Story</h2>
              <p className="text-body text-gray-600 mb-4">
                Founded in 2018, Ola Spa was born from a simple vision: to create a sanctuary where wellness and luxury converge. Our founders believed that everyone deserves access to premium spa experiences without compromise.
              </p>
              <p className="text-body text-gray-600 mb-4">
                Today, we've served thousands of clients and remain committed to delivering exceptional spa and wellness services through professionally trained therapists, premium products, and a serene environment designed for complete relaxation.
              </p>
              <p className="text-body text-gray-600">
                Every treatment is a journey toward renewed energy, mental clarity, and physical wellness. We take pride in being your trusted wellness partner.
              </p>
            </div>
            <div className="rounded-card overflow-hidden h-96 bg-secondary-100">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=600&fit=crop"
                alt="Spa ambiance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-primary-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-primary-800 mb-4">Our Mission</h2>
            <p className="text-body text-gray-600 max-w-2xl mx-auto">
              To provide transformative wellness experiences that nurture the body, calm the mind, and rejuvenate the spirit. We believe in the power of therapeutic touch and natural wellness to create lasting positive change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <FaAward className="text-4xl text-accent mx-auto mb-4" />
              <h3 className="text-h4 text-primary-800 mb-3">Excellence</h3>
              <p className="text-body-sm text-gray-600">
                We maintain the highest standards in every aspect of our service
              </p>
            </div>
            <div className="card p-8 text-center">
              <FaUsers className="text-4xl text-accent mx-auto mb-4" />
              <h3 className="text-h4 text-primary-800 mb-3">Community</h3>
              <p className="text-body-sm text-gray-600">
                We build lasting relationships with our clients and staff
              </p>
            </div>
            <div className="card p-8 text-center">
              <FaHeart className="text-4xl text-accent mx-auto mb-4" />
              <h3 className="text-h4 text-primary-800 mb-3">Wellness</h3>
              <p className="text-body-sm text-gray-600">
                We prioritize holistic health and personal wellbeing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="text-h2 text-primary-800 mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Amara Johnson', 'Chioma Williams', 'Zainab Hassan'].map((name, index) => (
              <div key={index} className="card overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-secondary-400 to-secondary-600"></div>
                <div className="p-6 text-center">
                  <h3 className="text-h4 text-primary-800 mb-2">{name}</h3>
                  <p className="text-secondary-600 font-semibold mb-3">Certified Therapist</p>
                  <p className="text-body-sm text-gray-600">
                    Dedicated to providing the best spa experiences with professionalism and care
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-primary-50">
        <div className="container-max">
          <h2 className="text-h2 text-primary-800 mb-12 text-center">Certifications & Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              'Licensed Therapists',
              'International Standards',
              'Premium Products',
              '100% Satisfaction Guarantee'
            ].map((cert, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-accent mb-3">✓</div>
                <p className="font-semibold text-primary-800">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
