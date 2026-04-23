import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../lib/api'

export default function DashboardPage() {
  const navigate        = useNavigate()
  const [user, setUser] = useState(null)
  const token           = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    authApi.me(token)
      .then(data => {
        if (!data.email_verified_at) {
          navigate(`/verify-email?email=${encodeURIComponent(data.email)}`)
          return
        }
        setUser(data)
      })
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/login')
      })
  }, [token, navigate])

  const handleLogout = async () => {
    try {
      await authApi.logout(token)
    } finally {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }

  if (!user) return null

  return (
    <div style={{
      minHeight: '100vh', background: '#F0F2F5',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <svg width="56" height="56" viewBox="0 0 120 120" fill="none" style={{ display: 'block', margin: '0 auto 14px' }}>
            <defs>
              <linearGradient id="bg5" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0A1E3D"/>
                <stop offset="100%" stopColor="#132E5B"/>
              </linearGradient>
              <linearGradient id="cross5" x1="40" y1="30" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#5DADE2"/>
                <stop offset="100%" stopColor="#2E86C1"/>
              </linearGradient>
            </defs>
            <rect width="120" height="120" rx="26" fill="url(#bg5)"/>
            <path d="M52 32H68V48H84V64H68V88H52V64H36V48H52Z" fill="url(#cross5)"/>
            <path d="M24 76L40 76L46 66L52 82L58 70L62 76L96 76" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" fill="none"/>
          </svg>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: '-0.03em', marginBottom: 4 }}>
            <span style={{ color: '#0A1E3D' }}>Assist</span>
            <span style={{ color: '#2E86C1' }}>Ambu</span>
          </div>
        </div>

        {/* Carte */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '28px 24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
          border: '1px solid #E8ECF0', textAlign: 'center',
        }}>
          {/* Badge succès */}
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: '#F0FDF4', border: '2px solid #BBF7D0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 20, color: '#0A1E3D', marginBottom: 8 }}>
            Bonjour, {user.name} 👋
          </div>
          <div style={{ fontSize: 13, color: '#8694A7', marginBottom: 24, lineHeight: 1.5 }}>
            Vous êtes connecté à AssistAmbu.<br/>
            L'application mobile arrive bientôt.
          </div>

          {/* Infos utilisateur */}
          <div style={{
            background: '#F7F8FA', borderRadius: 10, padding: '14px 16px',
            textAlign: 'left', marginBottom: 24,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Mon compte
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: '#6B7280' }}>Prénom</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1F26' }}>{user.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: '#6B7280' }}>Email</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1F26' }}>{user.email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#6B7280' }}>Rôle</span>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: user.role === 'admin' ? '#2E86C1' : '#15803D',
                background: user.role === 'admin' ? '#EFF6FF' : '#F0FDF4',
                padding: '2px 8px', borderRadius: 4,
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>{user.role}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%', height: 46, borderRadius: 10,
              border: '1.5px solid #FCA5A5', background: '#FFF5F5',
              color: '#C0392B', fontFamily: "'Outfit',sans-serif",
              fontWeight: 700, fontSize: 14, cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  )
}