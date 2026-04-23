import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { authApi } from '../lib/api'

export default function VerifyEmailPage() {
  const [searchParams]    = useSearchParams()
  const email             = searchParams.get('email') || ''
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState(null)

  // On a besoin d'un token pour renvoyer l'email — on demande à l'utilisateur de se reconnecter
  // ou on utilise le token stocké si disponible
  const token = localStorage.getItem('token')

  const handleResend = async () => {
    setError(null)
    setLoading(true)
    try {
      await authApi.sendVerification(token)
      setSuccess(true)
    } catch {
      setError('Impossible de renvoyer l\'email. Reconnectez-vous et réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#F0F2F5',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <svg width="56" height="56" viewBox="0 0 120 120" fill="none" style={{ display: 'block', margin: '0 auto 14px' }}>
            <defs>
              <linearGradient id="bg6" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0A1E3D"/><stop offset="100%" stopColor="#132E5B"/>
              </linearGradient>
              <linearGradient id="cross6" x1="40" y1="30" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#5DADE2"/><stop offset="100%" stopColor="#2E86C1"/>
              </linearGradient>
            </defs>
            <rect width="120" height="120" rx="26" fill="url(#bg6)"/>
            <path d="M52 32H68V48H84V64H68V88H52V64H36V48H52Z" fill="url(#cross6)"/>
            <path d="M24 76L40 76L46 66L52 82L58 70L62 76L96 76" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" fill="none"/>
          </svg>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: '-0.03em', marginBottom: 4 }}>
            <span style={{ color: '#0A1E3D' }}>Assist</span>
            <span style={{ color: '#2E86C1' }}>Ambu</span>
          </div>
        </div>

        <div style={{
          background: '#fff', borderRadius: 16, padding: '28px 24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
          border: '1px solid #E8ECF0', textAlign: 'center',
        }}>

          {/* Icône email */}
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: '#EFF6FF', border: '2px solid #BFDBFE',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E86C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>

          <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 20, color: '#0A1E3D', marginBottom: 8 }}>
            Vérifiez votre email
          </div>

          <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, marginBottom: 8 }}>
            Un lien de vérification a été envoyé à
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0A1E3D', marginBottom: 24 }}>
            {email}
          </div>

          <div style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 24 }}>
            Cliquez sur le lien dans l'email pour activer votre compte. Vérifiez aussi vos spams.
          </div>

          {success && (
            <div style={{
              background: '#F0FDF4', border: '1px solid #BBF7D0',
              borderRadius: 8, padding: '10px 14px',
              fontSize: 13, color: '#15803D', marginBottom: 16,
            }}>
              Email renvoyé avec succès !
            </div>
          )}

          {error && (
            <div style={{
              background: '#FDF2F2', border: '1px solid #FACACA',
              borderRadius: 8, padding: '10px 14px',
              fontSize: 13, color: '#C0392B', marginBottom: 16,
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={loading || success}
            style={{
              width: '100%', height: 48, borderRadius: 10, border: 'none',
              background: loading || success ? '#CBD5E0' : '#0A1E3D',
              color: '#fff', fontFamily: "'Outfit',sans-serif",
              fontWeight: 700, fontSize: 14, cursor: loading || success ? 'not-allowed' : 'pointer',
              letterSpacing: '0.02em', transition: 'background 0.2s',
              marginBottom: 12,
            }}
          >
            {loading ? 'Envoi...' : success ? 'Email envoyé ✓' : 'Renvoyer l\'email'}
          </button>

          <Link to="/login" style={{
            display: 'block', fontSize: 13, color: '#6B7280',
            textDecoration: 'none', marginTop: 4,
          }}>
            ← Se connecter avec un autre compte
          </Link>
        </div>
      </div>
    </div>
  )
}