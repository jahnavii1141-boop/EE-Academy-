import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <SEOHead title="Page Not Found" noindex />
      <div className="text-center max-w-md">
        <p className="font-serif text-8xl font-bold text-navy/15 mb-4">404</p>
        <h1 className="font-serif text-2xl font-bold text-navy mb-3">
          Page not found
        </h1>
        <p className="text-navy/60 text-sm leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary text-sm">Back to Home</Link>
          <Link to="/courses" className="btn-outline text-sm">View Resources</Link>
        </div>
      </div>
    </div>
  )
}
