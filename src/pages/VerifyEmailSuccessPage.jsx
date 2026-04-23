import { useSearchParams, Link } from 'react-router-dom'

export default function VerifyEmailSuccessPage() {
  const [searchParams] = useSearchParams()
  const already        = searchParams.get('already')

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
              <linearGradient id="bg7" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0A1E3D"/><stop offset="100%" stopColor="#132E5B"/>
              </linearGradient>
              <linearGradient id="cross7" x1="40" y1="30" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#5DADE2"/><stop offset="100%" stopColor="#2E86C1"/>
              </linearGradient>
            </defs>
            <rect width="120" height="120" rx="26" fill="url(#bg7)"/>
            <path d="M52 32H68V48H84V64H68V88H52V64H36V48H52Z" fill="url(#cross7)"/>
            <path d="M24 76L40 76L46 66L52 82L58 70L62 76L96 76" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" fill="none"/>
          </svg>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: '-0.03em', marginBottom: 4 }}>
            <span style={{ color: '#0A1E3D' }}>Assist</span>
            <span style={{ color: '#2E86C1' }}>Ambu</span>
          </div>
        </div>

        <div style={{
          background: '#fff', borderRadius: 16, padding: '32px 24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
          border: '1px solid #E8ECF0', textAlign: 'center',
        }}>

          {/* Badge succès */}
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: '#F0FDF4', border: '2px solid #BBF7D0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 22, color: '#0A1E3D', marginBottom: 10 }}>
            {already ? 'Email déjà vérifié' : 'Email vérifié !'}
          </div>

          <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7, marginBottom: 28 }}>
            {already
              ? 'Votre adresse email était déjà vérifiée. Vous pouvez vous connecter.'
              : 'Votre adresse email a bien été vérifiée. Vous pouvez maintenant vous connecter à AssistAmbu.'
            }
          </div>

          <Link to="/login" style={{
            display: 'block', width: '100%', height: 48, borderRadius: 10,
            background: '#0A1E3D', color: '#fff',
            fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 15,
            textDecoration: 'none', letterSpacing: '0.02em',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  )
}