import { create } from 'zustand'

export const useBookingStore = create((set) => ({
  selectedService: null,
  selectedDate: null,
  selectedTime: null,
  clientInfo: {
    name: '',
    email: '',
    phone: '',
    notes: '',
  },
  availableSlots: [],
  isLoading: false,
  error: null,

  setSelectedService: (service) => set({ selectedService: service }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setClientInfo: (info) => set((state) => ({
    clientInfo: { ...state.clientInfo, ...info },
  })),
  setAvailableSlots: (slots) => set({ availableSlots: slots }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  resetBooking: () => set({
    selectedService: null,
    selectedDate: null,
    selectedTime: null,
    clientInfo: {
      name: '',
      email: '',
      phone: '',
      notes: '',
    },
    availableSlots: [],
    error: null,
  }),
}))

export const useAuthStore = create((set) => ({
  isAdmin: !!localStorage.getItem('adminToken'),
  adminEmail: localStorage.getItem('adminEmail') || null,

  setAdmin: (email, token) => {
    localStorage.setItem('adminToken', token)
    localStorage.setItem('adminEmail', email)
    set({ isAdmin: true, adminEmail: email })
  },

  logout: () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminEmail')
    set({ isAdmin: false, adminEmail: null })
  },
}))
