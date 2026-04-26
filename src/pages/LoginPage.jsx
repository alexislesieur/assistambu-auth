import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../lib/api'

const input = {
  width: '100%', height: 48, border: '1.5px solid #D1D8E0',
  borderRadius: 10, fontSize: 14, color: '#1C1F26',
  fontFamily: "'DM Sans', sans-serif",
  outline: 'none', background: '#F7F8FA',
  paddingLeft: 14, paddingRight: 14,
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}

export default function LoginPage() {
  const navigate                = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  const handleLogin = async () => {
    setError(null)
    setLoading(true)
    try {
      const data = await authApi.login({ email, password })
      localStorage.setItem('token', data.token)

      if (data.user?.role === 'admin') {
        navigate('/choose-app')
      } else if (data.user?.role === 'beta') {
        window.location.href = `${import.meta.env.VITE_APP_URL || 'https://beta.assist-ambu.fr'}?token=${data.token}`
      } else {
        // user classique
        navigate('/choose-app')
      }
    } catch (err) {
      if (err.errors?.email_unverified) {
        navigate(`/verify-email?email=${encodeURIComponent(email)}`)
        return
      }
      setError(err.errors?.message || 'Identifiants incorrects.')
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
              <linearGradient id="bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0A1E3D"/><stop offset="100%" stopColor="#132E5B"/>
              </linearGradient>
              <linearGradient id="cross" x1="40" y1="30" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#5DADE2"/><stop offset="100%" stopColor="#2E86C1"/>
              </linearGradient>
            </defs>
            <rect width="120" height="120" rx="26" fill="url(#bg)"/>
            <path d="M52 32H68V48H84V64H68V88H52V64H36V48H52Z" fill="url(#cross)"/>
            <path d="M24 76L40 76L46 66L52 82L58 70L62 76L96 76" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" fill="none"/>
          </svg>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: '-0.03em', marginBottom: 4 }}>
            <span style={{ color: '#0A1E3D' }}>Assist</span>
            <span style={{ color: '#2E86C1' }}>Ambu</span>
          </div>
          <div style={{ fontSize: 13, color: '#8694A7' }}>Connectez-vous à votre compte</div>
        </div>

        {/* Carte */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '28px 24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
          border: '1px solid #E8ECF0',
        }}>
          {error && (
            <div style={{
              background: '#FDF2F2', border: '1px solid #FACACA',
              borderRadius: 8, padding: '10px 14px',
              fontSize: 13, color: '#C0392B', marginBottom: 20,
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block', letterSpacing: '0.02em' }}>Adresse email</label>
            <input type="email" placeholder="alex@email.com" value={email} onChange={e => setEmail(e.target.value)} style={input} />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block', letterSpacing: '0.02em' }}>Mot de passe</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPwd ? 'text' : 'password'} placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{ ...input, paddingRight: 44 }}
              />
              <div onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: 11, color: '#8694A7', fontWeight: 600 }}>
                {showPwd ? 'Cacher' : 'Voir'}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: 24 }}>
            <Link to="/forgot-password" style={{ fontSize: 12, color: '#2E86C1', fontWeight: 600, textDecoration: 'none' }}>
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            style={{
              width: '100%', height: 48, borderRadius: 10, border: 'none',
              background: loading || !email || !password ? '#CBD5E0' : '#0A1E3D',
              color: '#fff', fontFamily: "'Outfit',sans-serif",
              fontWeight: 700, fontSize: 15, cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
              letterSpacing: '0.02em', transition: 'background 0.2s',
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: '#6B7280' }}>
          Pas encore de compte ?{' '}
          <Link to="/register" style={{ color: '#2E86C1', fontWeight: 700, textDecoration: 'none' }}>
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  )
}