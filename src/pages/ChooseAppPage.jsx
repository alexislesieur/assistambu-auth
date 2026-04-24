import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ChooseAppPage() {
  const navigate = useNavigate()
  const token    = localStorage.getItem('token')

  useEffect(() => {
    if (!token) navigate('/login')
  }, [token, navigate])

  const goToApp   = () => { window.location.href = `${import.meta.env.VITE_APP_URL || 'https://app.assist-ambu.fr'}?token=${token}` }
  const goToAdmin = () => { window.location.href = `${import.meta.env.VITE_ADMIN_URL || 'https://admin.assist-ambu.fr'}?token=${token}` }

  return (
    <div style={{
      minHeight: '100vh', background: '#F0F2F5',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

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
          <div style={{ fontSize: 13, color: '#8694A7' }}>Où souhaitez-vous aller ?</div>
        </div>

        {/* Choix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* App Web */}
          <button
            onClick={goToApp}
            style={{
              background: '#fff', border: '1.5px solid #E8ECF0',
              borderRadius: 16, padding: '20px 24px',
              cursor: 'pointer', textAlign: 'left',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              display: 'flex', alignItems: 'center', gap: 16,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#2E86C1'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(46,134,193,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8ECF0'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: '#E3F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E86C1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 15, color: '#0A1E3D', marginBottom: 3 }}>
                Application Web
              </div>
              <div style={{ fontSize: 12, color: '#8694A7', lineHeight: 1.5 }}>
                Accéder à votre espace ambulancier
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0BFCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* Admin */}
          <button
            onClick={goToAdmin}
            style={{
              background: '#0A1E3D', border: '1.5px solid #0A1E3D',
              borderRadius: 16, padding: '20px 24px',
              cursor: 'pointer', textAlign: 'left',
              boxShadow: '0 4px 16px rgba(10,30,61,0.2)',
              transition: 'opacity 0.2s',
              display: 'flex', alignItems: 'center', gap: 16,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(46,134,193,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5DADE2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 3 }}>
                Administration
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                Gestion des utilisateurs et des données
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

        </div>

        {/* Déconnexion */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button
            onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#8694A7', fontFamily: "'DM Sans',sans-serif" }}
          >
            Se déconnecter
          </button>
        </div>

      </div>
    </div>
  )
}