import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function OpenAppPage() {
  const [searchParams] = useSearchParams()
  const status         = searchParams.get('status') // verified | error
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    if (status !== 'verified') {
      window.location.href = '/verify-email?error=invalid'
      return
    }

    // Tentative deep link
    window.location.href = 'assistambu://verify-success'

    // Fallback web après 1.5s si l'app n'est pas installée
    const timer = setTimeout(() => {
      setShowFallback(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [status])

  if (!showFallback) {
    return (
      <div style={{
        minHeight: '100vh', background: '#F0F2F5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 16,
      }}>
        <div style={{
          width: 40, height: 40,
          border: '3px solid #E8ECF0',
          borderTopColor: '#2E86C1',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}/>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: 13, color: '#6B7280' }}>Ouverture de l'application...</p>
      </div>
    )
  }

  // Fallback — redirige vers la page succès web
  window.location.href = '/verify-email/success'
  return null
}