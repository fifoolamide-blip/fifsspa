import { Link } from 'react-router-dom'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Ola Spa</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium spa services for ultimate relaxation and wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'About', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-accent transition-colors">Massage Therapy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Skincare</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Body Treatments</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Wellness Packages</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <FaPhone className="text-accent" />
                <span>+234 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-accent" />
                <span>hello@olaspa.com</span>
              </div>
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-accent mt-1" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-primary-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2026 Ola Spa. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-accent transition-colors text-xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-300 hover:text-accent transition-colors text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-300 hover:text-accent transition-colors text-xl">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
