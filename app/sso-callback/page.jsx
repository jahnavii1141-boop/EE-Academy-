'use client'

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

// Handles the return leg of the Google OAuth flow started by the simplified
// homepage variant's "Start learning with Google" button. Completes sign-up OR
// sign-in (Clerk transfers automatically if the account already exists) and
// lands the user on the dashboard.
export default function SSOCallbackPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a1023' }}>
      <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: 'rgba(255,255,255,0.7)', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <AuthenticateWithRedirectCallback
        signUpForceRedirectUrl="/dashboard/home"
        signInForceRedirectUrl="/dashboard/home"
      />
    </div>
  )
}
