import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { authApi } from '../lib/api'

const input = {
  width: '100%', height: 48, border: '1.5px solid #D1D8E0',
  borderRadius: 10, fontSize: 14, color: '#1C1F26',
  fontFamily: "'DM Sans', sans-serif",
  outline: 'none', background: '#F7F8FA',
  paddingLeft: 44, paddingRight: 14,
  boxSizing: 'border-box',
}

const iconWrap = {
  position: 'absolute', left: 14, top: '50%',
  transform: 'translateY(-50%)', display: 'flex', alignItems: 'center',
}

const lockIcon = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
)

export default function ResetPasswordPage() {
  const navigate       = useNavigate()
  const [searchParams] = useSearchParams()
  const token          = searchParams.get('token') || ''
  const emailFromUrl   = searchParams.get('email') || ''

  const [email, setEmail]               = useState(emailFromUrl)
  const [password, setPassword]         = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [showPwd, setShowPwd]           = useState(false)
  const [loading, setLoading]           = useState(false)
  const [success, setSuccess]           = useState(false)
  const [error, setError]               = useState(null)

  const handleReset = async () => {
    setError(null)
    if (password !== passwordConf) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    setLoading(true)
    try {
      await authApi.resetPassword({ token, email, password, password_confirmation: passwordConf })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(err.errors?.message || 'Token invalide ou expiré.')
    } finally {
      setLoading(false)
    }
  }

  const eyeIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {showPwd ? <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </> : <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>}
    </svg>
  )

  return (
    <div style={{
      minHeight: '100vh', background: '#F0F2F5',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <svg width="56" height="56" viewBox="0 0 120 120" fill="none" style={{ marginBottom: 14, display: 'block', margin: '0 auto 14px' }}>
            <defs>
              <linearGradient id="bg4" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0A1E3D"/>
                <stop offset="100%" stopColor="#132E5B"/>
              </linearGradient>
              <linearGradient id="cross4" x1="40" y1="30" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#5DADE2"/>
                <stop offset="100%" stopColor="#2E86C1"/>
              </linearGradient>
            </defs>
            <rect width="120" height="120" rx="26" fill="url(#bg4)"/>
            <path d="M52 32H68V48H84V64H68V88H52V64H36V48H52Z" fill="url(#cross4)"/>
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
          border: '1px solid #E8ECF0',
        }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 20, color: '#0A1E3D', marginBottom: 6 }}>
            Nouveau mot de passe
          </div>
          <div style={{ fontSize: 13, color: '#8694A7', marginBottom: 24, lineHeight: 1.5 }}>
            Choisissez un nouveau mot de passe sécurisé.
          </div>

          {success ? (
            <div style={{
              background: '#F0FDF4', border: '1px solid #BBF7D0',
              borderRadius: 8, padding: '14px 16px',
              fontSize: 13, color: '#15803D', lineHeight: 1.5,
            }}>
              Mot de passe modifié avec succès. Redirection en cours...
            </div>
          ) : (
            <>
              {error && (
                <div style={{
                  background: '#FDF2F2', border: '1px solid #FACACA',
                  borderRadius: 8, padding: '10px 14px',
                  fontSize: 13, color: '#C0392B', marginBottom: 16,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Adresse email</label>
                <div style={{ position: 'relative' }}>
                  <div style={iconWrap}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={input}/>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Nouveau mot de passe</label>
                <div style={{ position: 'relative' }}>
                  <div style={iconWrap}>{lockIcon}</div>
                  <input
                    type={showPwd ? 'text' : 'password'} placeholder="8 caractères minimum"
                    value={password} onChange={e => setPassword(e.target.value)}
                    style={{ ...input, paddingRight: 44 }}
                  />
                  <div onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex' }}>
                    {eyeIcon}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Confirmer le mot de passe</label>
                <div style={{ position: 'relative' }}>
                  <div style={iconWrap}>{lockIcon}</div>
                  <input
                    type={showPwd ? 'text' : 'password'} placeholder="••••••••"
                    value={passwordConf} onChange={e => setPasswordConf(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleReset()}
                    style={input}
                  />
                </div>
              </div>

              <button
                onClick={handleReset}
                disabled={loading || !password || !passwordConf}
                style={{
                  width: '100%', height: 48, borderRadius: 10, border: 'none',
                  background: loading || !password || !passwordConf ? '#CBD5E0' : '#0A1E3D',
                  color: '#fff', fontFamily: "'Outfit',sans-serif",
                  fontWeight: 700, fontSize: 15, cursor: loading || !password || !passwordConf ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
              </button>
            </>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: '#6B7280' }}>
          <Link to="/login" style={{ color: '#2E86C1', fontWeight: 700, textDecoration: 'none' }}>
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  )
}