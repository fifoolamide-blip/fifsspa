import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store'
import api from '../../services/api'
import { FaSignOutAlt, FaCalendar, FaUsers, FaDollarSign } from 'react-icons/fa'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { isAdmin, logout } = useAuthStore()
  const [stats, setStats] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login')
      return
    }

    fetchDashboardData()
  }, [isAdmin, navigate])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/admin/bookings'),
      ])
      setStats(statsRes.data.data)
      setBookings(bookingsRes.data.data || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <header className="bg-primary-800 text-white">
        <div className="container-max flex justify-between items-center py-4">
          <h1 className="text-h3">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 btn btn-secondary btn-sm"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <div className="container-max section-padding">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-secondary-600 text-white'
                : 'bg-white text-primary-800'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'bookings'
                ? 'bg-secondary-600 text-white'
                : 'bg-white text-primary-800'
            }`}
          >
            Bookings
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Total Bookings</p>
                    <p className="text-h2 text-primary-800">{stats.totalBookings}</p>
                  </div>
                  <FaCalendar className="text-4xl text-accent opacity-20" />
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">This Month</p>
                    <p className="text-h2 text-primary-800">{stats.bookingsThisMonth}</p>
                  </div>
                  <FaUsers className="text-4xl text-accent opacity-20" />
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
                    <p className="text-h2 text-secondary-600">${stats.totalRevenue}</p>
                  </div>
                  <FaDollarSign className="text-4xl text-accent opacity-20" />
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Pending</p>
                    <p className="text-h2 text-error">{stats.pendingBookings}</p>
                  </div>
                  <FaCalendar className="text-4xl text-accent opacity-20" />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6 text-center">
                <p className="text-h3 text-accent mb-2">{stats.bookingsToday}</p>
                <p className="text-body-sm text-gray-600">Appointments Today</p>
              </div>
              <div className="card p-6 text-center">
                <p className="text-h3 text-accent mb-2">${stats.revenueThisMonth}</p>
                <p className="text-body-sm text-gray-600">Revenue This Month</p>
              </div>
              <div className="card p-6 text-center">
                <p className="text-h3 text-accent mb-2">{stats.upcomingBookings}</p>
                <p className="text-body-sm text-gray-600">Upcoming Bookings</p>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="card p-6">
            <h2 className="text-h3 text-primary-800 mb-6">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-bold text-primary-800">Client</th>
                    <th className="text-left py-3 px-4 font-bold text-primary-800">Service</th>
                    <th className="text-left py-3 px-4 font-bold text-primary-800">Date</th>
                    <th className="text-left py-3 px-4 font-bold text-primary-800">Time</th>
                    <th className="text-left py-3 px-4 font-bold text-primary-800">Status</th>
                    <th className="text-left py-3 px-4 font-bold text-primary-800">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-600">
                        No bookings yet
                      </td>
                    </tr>
                  ) : (
                    bookings.slice(0, 10).map((booking) => (
                      <tr key={booking._id} className="border-b border-gray-200 hover:bg-primary-50">
                        <td className="py-3 px-4 text-gray-700">{booking.clientName}</td>
                        <td className="py-3 px-4 text-gray-700">Service</td>
                        <td className="py-3 px-4 text-gray-700">{booking.date}</td>
                        <td className="py-3 px-4 text-gray-700">{booking.timeSlot}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === 'confirmed'
                                ? 'bg-success bg-opacity-10 text-success'
                                : booking.status === 'pending'
                                ? 'bg-warning bg-opacity-10 text-warning'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-secondary-600">${booking.price}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
