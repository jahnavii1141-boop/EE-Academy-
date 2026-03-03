import { useAuth, RedirectToSignIn } from '@clerk/clerk-react'

export default function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-deep">
        <div
          className="w-8 h-8 rounded-full border-[3px] border-cream/15 border-t-cream"
          style={{ animation: 'spin 0.8s linear infinite' }}
        />
      </div>
    )
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />
  }

  return children
}
