import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../lib/api'

const btnBase = {
  appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
  display: 'flex', alignItems: 'center', gap: 14,
  borderRadius: 16, padding: '18px 20px',
  cursor: 'pointer', boxSizing: 'border-box', width: '100%',
  outline: 'none', WebkitTapHighlightColor: 'transparent',
}

export default function ChooseAppPage() {
  const navigate        = useNavigate()
  const token           = localStorage.getItem('token')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    authApi.me(token).then(setUser).catch(() => {
      localStorage.removeItem('token')
      navigate('/login')
    })
  }, [token, navigate])

  const goToApp   = () => { window.location.href = `${import.meta.env.VITE_APP_URL || 'https://beta.assist-ambu.fr'}?token=${token}` }
  const goToAdmin = () => { window.location.href = `${import.meta.env.VITE_ADMIN_URL || 'https://admin.assist-ambu.fr'}?token=${token}` }
  const handleLogout = () => { localStorage.removeItem('token'); navigate('/login') }

  if (!user) return null

  const isAdmin = user.role === 'admin'

  return (
    <div style={{
      minHeight: '100vh', background: '#F0F2F5',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      fontFamily: "'DM Sans', sans-serif",
      boxSizing: 'border-box',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <svg width="52" height="52" viewBox="0 0 120 120" fill="none" style={{ display: 'block', margin: '0 auto 12px' }}>
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
          <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 26, letterSpacing: '-0.03em', marginBottom: 4 }}>
            <span style={{ color: '#0A1E3D' }}>Assist</span>
            <span style={{ color: '#2E86C1' }}>Ambu</span>
          </div>
          <div style={{ fontSize: 13, color: '#8694A7' }}>
            Bonjour, <strong style={{ color: '#0A1E3D' }}>{user.name}</strong> 👋
          </div>
        </div>

        {/* Admin — deux choix */}
        {isAdmin && (
          <>
            <p style={{ textAlign: 'center', fontSize: 14, color: '#4A5568', marginBottom: 20, lineHeight: 1.5 }}>
              Où souhaitez-vous aller ?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button onClick={goToApp} style={{ ...btnBase, background: '#fff', border: '1.5px solid #E8ECF0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: '#E3F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E86C1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 15, color: '#0A1E3D', marginBottom: 2 }}>Application Web</div>
                  <div style={{ fontSize: 12, color: '#8694A7' }}>Accéder à l'espace bêta</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B0BFCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>

              <button onClick={goToAdmin} style={{ ...btnBase, background: '#0A1E3D', border: '1.5px solid #0A1E3D', boxShadow: '0 4px 16px rgba(10,30,61,0.2)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: 'rgba(46,134,193,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5DADE2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 2 }}>Administration</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Gestion des utilisateurs et des données</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </>
        )}

        {/* User classique — message app mobile */}
        {!isAdmin && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Carte app mobile — bientôt dispo */}
            <div style={{
              background: '#fff', borderRadius: 16, padding: '20px',
              border: '1.5px solid #E8ECF0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: '#F0F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B0BFCC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 15, color: '#B0BFCC', marginBottom: 2 }}>Application mobile</div>
                  <div style={{ fontSize: 12, color: '#B0BFCC' }}>Bientôt disponible sur iOS et Android</div>
                </div>
                <div style={{ background: '#F0F2F5', borderRadius: 20, padding: '3px 10px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#8694A7' }}>Bientôt</span>
                </div>
              </div>
              <div style={{ background: '#F7F8FA', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: '#4A5568', lineHeight: 1.6 }}>
                🚑 L'application AssistAmbu pour iPhone et Android est en cours de développement. Vous serez notifié par email dès son lancement.
              </div>
            </div>

            {/* Lien waitlist */}
            <div style={{ textAlign: 'center', fontSize: 13, color: '#8694A7', marginTop: 4 }}>
              En attendant, parlez-en à vos collègues !{' '}
              <a href="https://assist-ambu.fr" style={{ color: '#2E86C1', fontWeight: 700, textDecoration: 'none' }}>
                assist-ambu.fr
              </a>
            </div>
          </div>
        )}

        {/* Déconnexion */}
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <button
            onClick={handleLogout}
            style={{
              ...btnBase, width: 'auto', background: 'none', border: 'none',
              boxShadow: 'none', padding: '8px', fontSize: 13, color: '#8694A7',
              gap: 6, display: 'inline-flex',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8694A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Se déconnecter
          </button>
        </div>

      </div>
    </div>
  )
}