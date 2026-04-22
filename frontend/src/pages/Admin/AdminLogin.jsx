import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store'
import api from '../../services/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { setAdmin } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/admin/login', { email, password })
      const { token } = response.data.data
      setAdmin(email, token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-600 to-secondary-700">
      <div className="card p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-h2 text-primary-800 mb-2">Admin Panel</h1>
          <p className="text-body-sm text-gray-600">Sign in to manage your spa</p>
        </div>

        {error && (
          <div className="bg-error bg-opacity-10 border border-error text-error p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-primary-800 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@olaspa.com"
              className="input-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-800 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-base"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Demo credentials: admin@olaspa.com / password123
        </p>
      </div>
    </div>
  )
}
