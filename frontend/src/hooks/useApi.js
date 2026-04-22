import { useState, useEffect } from 'react'
import api from '../services/api'

export const useServices = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services')
        setServices(response.data.data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return { services, loading, error }
}

export const useService = (id) => {
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchService = async () => {
      try {
        const response = await api.get(`/services/${id}`)
        setService(response.data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [id])

  return { service, loading, error }
}

export const useAvailability = (serviceId, date) => {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!serviceId || !date) return

    const fetchAvailability = async () => {
      setLoading(true)
      try {
        const response = await api.get('/bookings/availability', {
          params: { serviceId, date },
        })
        setSlots(response.data.data?.availableSlots || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAvailability()
  }, [serviceId, date])

  return { slots, loading, error }
}
