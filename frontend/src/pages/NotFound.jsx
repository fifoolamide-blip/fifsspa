import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-600 to-secondary-700">
      <div className="container-max text-center text-white">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-h2 mb-4">Page Not Found</h2>
        <p className="text-xl mb-8 opacity-90">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-accent">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
