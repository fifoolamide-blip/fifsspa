import { useState } from 'react'
import { useServices } from '../hooks/useApi'
import { useAvailability } from '../hooks/useApi'
import { useBookingStore } from '../store'
import api from '../services/api'
import { format, addDays } from 'date-fns'
import { FaCheckCircle, FaCalendar, FaClock, FaUser } from 'react-icons/fa'

export default function Booking() {
  const { services, loading: servicesLoading } = useServices()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState('')

  const store = useBookingStore()
  const { slots, loading: slotsLoading } = useAvailability(
    store.selectedService?._id,
    store.selectedDate
  )

  const handleSelectService = (service) => {
    store.setSelectedService(service)
    store.setSelectedDate(null)
    store.setSelectedTime(null)
    setCurrentStep(2)
  }

  const handleSelectDate = (date) => {
    store.setSelectedDate(date)
    setCurrentStep(3)
  }

  const handleSelectTime = (time) => {
    store.setSelectedTime(time)
    setCurrentStep(4)
  }

  const handleClientInfoChange = (e) => {
    const { name, value } = e.target
    store.setClientInfo({ [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await api.post('/bookings', {
        serviceId: store.selectedService._id,
        clientName: store.clientInfo.name,
        clientEmail: store.clientInfo.email,
        clientPhone: store.clientInfo.phone,
        date: format(new Date(store.selectedDate), 'yyyy-MM-dd'),
        timeSlot: store.selectedTime,
        notes: store.clientInfo.notes,
      })

      setConfirmationCode(response.data.data.confirmationCode)
      setSuccess(true)
    } catch (error) {
      console.error('Booking error:', error)
      alert('Error booking appointment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-600 to-secondary-700">
        <div className="container-max">
          <div className="card p-12 text-center max-w-2xl mx-auto">
            <FaCheckCircle className="text-6xl text-success mx-auto mb-6" />
            <h1 className="text-h1 text-primary-800 mb-4">Booking Confirmed!</h1>
            <p className="text-body text-gray-600 mb-6">
              Thank you for booking with Ola Spa. Your appointment has been confirmed.
            </p>
            <div className="bg-primary-50 p-6 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">Confirmation Code:</p>
              <p className="text-2xl font-bold text-secondary-600 font-mono">{confirmationCode}</p>
              <p className="text-xs text-gray-500 mt-2">Please save this code for your records</p>
            </div>
            <p className="text-body text-gray-600 mb-6">
              A confirmation email has been sent to <strong>{store.clientInfo.email}</strong>
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="btn btn-primary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white section-padding">
        <div className="container-max">
          <h1 className="text-h1 mb-4">Book Your Appointment</h1>
          <p className="text-xl opacity-90">
            Schedule your perfect wellness experience in just a few steps
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding">
        <div className="container-max max-w-3xl mx-auto">
          {/* Step Indicator */}
          <div className="flex justify-between mb-12">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step === currentStep
                      ? 'bg-secondary-600 text-white scale-110'
                      : step < currentStep
                      ? 'bg-success text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  {step === 1 && 'Service'}
                  {step === 2 && 'Date'}
                  {step === 3 && 'Time'}
                  {step === 4 && 'Details'}
                  {step === 5 && 'Confirm'}
                </p>
                {step < 5 && (
                  <div
                    className={`hidden md:block absolute w-12 h-1 -right-1/2 top-5 ${
                      step < currentStep ? 'bg-success' : 'bg-gray-300'
                    }`}
                    style={{ width: '4rem' }}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Select Service */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-h2 text-primary-800 mb-6">Select a Service</h2>
              {servicesLoading ? (
                <div className="text-center py-8">Loading services...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service._id}
                      onClick={() => handleSelectService(service)}
                      className={`card p-6 text-left transition-all ${
                        store.selectedService?._id === service._id
                          ? 'ring-2 ring-secondary-600 shadow-strong'
                          : 'hover:shadow-medium'
                      }`}
                    >
                      <h3 className="font-bold text-primary-800 mb-2">{service.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                      <div className="flex justify-between text-sm font-semibold text-secondary-600">
                        <span>{service.duration} min</span>
                        <span>${service.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {store.selectedService && (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-primary w-full mt-6"
                >
                  Continue
                </button>
              )}
            </div>
          )}

          {/* Step 2: Select Date */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-h2 text-primary-800 mb-6">Choose Date</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[...Array(14)].map((_, i) => {
                  const date = addDays(new Date(), i)
                  const dateStr = format(date, 'yyyy-MM-dd')
                  const isSelected = store.selectedDate === dateStr
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectDate(dateStr)}
                      className={`card p-4 text-center transition-all ${
                        isSelected
                          ? 'ring-2 ring-secondary-600 shadow-strong'
                          : 'hover:shadow-medium'
                      }`}
                    >
                      <div className="text-sm font-semibold text-secondary-600">
                        {format(date, 'EEE')}
                      </div>
                      <div className="text-lg font-bold text-primary-800">
                        {format(date, 'dd')}
                      </div>
                      <div className="text-xs text-gray-600">
                        {format(date, 'MMM')}
                      </div>
                    </button>
                  )
                })}
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="btn btn-secondary flex-1"
                >
                  Back
                </button>
                {store.selectedDate && (
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="btn btn-primary flex-1"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Select Time */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-h2 text-primary-800 mb-6">Choose Time</h2>
              {slotsLoading ? (
                <div className="text-center py-8">Loading available times...</div>
              ) : slots.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                  No available time slots for this date. Please choose another date.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleSelectTime(slot)}
                      className={`card p-4 text-center transition-all ${
                        store.selectedTime === slot
                          ? 'ring-2 ring-secondary-600 shadow-strong'
                          : 'hover:shadow-medium'
                      }`}
                    >
                      <FaClock className="text-secondary-600 mx-auto mb-2" />
                      <div className="font-semibold text-primary-800">{slot}</div>
                    </button>
                  ))}
                </div>
              )}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-secondary flex-1"
                >
                  Back
                </button>
                {store.selectedTime && (
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="btn btn-primary flex-1"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Client Details */}
          {currentStep === 4 && (
            <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(5) }} className="space-y-4">
              <h2 className="text-h2 text-primary-800 mb-6">Your Details</h2>
              
              <div>
                <label className="block text-sm font-semibold text-primary-800 mb-2">
                  <FaUser className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={store.clientInfo.name}
                  onChange={handleClientInfoChange}
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
                  value={store.clientInfo.email}
                  onChange={handleClientInfoChange}
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
                  value={store.clientInfo.phone}
                  onChange={handleClientInfoChange}
                  placeholder="+234 800 123 4567"
                  className="input-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-800 mb-2">
                  Special Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={store.clientInfo.notes}
                  onChange={handleClientInfoChange}
                  placeholder="Any special requests or preferences..."
                  rows="4"
                  className="input-base resize-none"
                ></textarea>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="btn btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="btn btn-primary flex-1"
                >
                  Review Booking
                </button>
              </div>
            </form>
          )}

          {/* Step 5: Confirm */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-h2 text-primary-800 mb-6">Confirm Your Booking</h2>
              
              <div className="card p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Service</p>
                    <p className="font-bold text-primary-800">{store.selectedService?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-bold text-secondary-600 text-lg">${store.selectedService?.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-bold text-primary-800">
                      {store.selectedDate && format(new Date(store.selectedDate), 'EEE, MMM dd, yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-bold text-primary-800">{store.selectedTime}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Client Name</p>
                    <p className="font-bold text-primary-800">{store.clientInfo.name}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-bold text-primary-800">{store.clientInfo.email}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="btn btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
