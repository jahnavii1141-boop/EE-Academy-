'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'

export default function AdminPage() {
  const { isSignedIn } = useAuth()
  const [info, setInfo] = useState(null)
  const [grantStatus, setGrantStatus] = useState('idle')

  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/admin/whoami')
      .then(r => r.json())
      .then(setInfo)
      .catch(() => setInfo({ error: 'Could not load' }))
  }, [isSignedIn])

  const grantSelf = async () => {
    setGrantStatus('loading')
    try {
      const res = await fetch('/api/admin/grant-self', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        setGrantStatus('done')
      } else {
        console.error('Grant error:', data)
        setGrantStatus('error')
      }
    } catch (e) {
      console.error(e)
      setGrantStatus('error')
    }
  }

  if (!isSignedIn) return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <p>You need to be signed in.</p>
    </div>
  )

  return (
    <div style={{ padding: 40, fontFamily: 'monospace', maxWidth: 520 }}>
      <h1 style={{ fontSize: 18, marginBottom: 24 }}>Admin panel</h1>

      {!info ? (
        <p style={{ color: '#888' }}>Loading…</p>
      ) : info.error ? (
        <p style={{ color: 'red' }}>{info.error}</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: 28, fontSize: 13 }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px 12px', background: '#f5f5f5', fontWeight: 600, width: 140 }}>Your user ID</td>
              <td style={{ padding: '8px 12px', wordBreak: 'break-all' }}>{info.your_user_id}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 12px', background: '#f5f5f5', fontWeight: 600 }}>Admin IDs set</td>
              <td style={{ padding: '8px 12px', wordBreak: 'break-all' }}>
                {info.admin_ids_configured?.length
                  ? info.admin_ids_configured.join(', ')
                  : <span style={{ color: '#aaa' }}>none</span>}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 12px', background: '#f5f5f5', fontWeight: 600 }}>Is admin?</td>
              <td style={{ padding: '8px 12px', color: info.is_admin ? 'green' : 'red', fontWeight: 700 }}>
                {info.is_admin ? '✓ YES' : '✗ NO — copy your user ID above into ADMIN_CLERK_USER_IDS in Vercel'}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {info && (
        <button
          onClick={grantSelf}
          disabled={grantStatus === 'loading' || grantStatus === 'done'}
          style={{
            background: grantStatus === 'done' ? '#16a34a' : '#0a0a0a',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 600,
            cursor: grantStatus === 'loading' ? 'wait' : 'pointer',
            opacity: grantStatus === 'loading' ? 0.6 : 1,
          }}>
          {grantStatus === 'done' ? '✓ Premium granted — go to /dashboard' :
           grantStatus === 'loading' ? 'Granting…' :
           'Grant myself premium'}
        </button>
      )}

      {grantStatus === 'error' && (
        <p style={{ color: 'red', marginTop: 12 }}>Failed — check Vercel logs.</p>
      )}
    </div>
  )
}
