import { useNavigate } from 'react-router-dom'

export default function ResultPage() {
  const navigate = useNavigate()

  return (
    <div className="glass" style={{ padding: 40, maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
      <h1 className="title" style={{ fontSize: 28 }}>Merci d'avoir suivi ce kit de formation !</h1>
      <p style={{ marginTop: 16, lineHeight: 1.75, color: '#d1d5db' }}>
        Vous avez maintenant les clés pour intégrer l'IA dans votre pratique pédagogique et créer vos ressources plus rapidement.
      </p>
      <p style={{ marginTop: 12, lineHeight: 1.75, color: '#9ca3af' }}>
        N'hésitez pas à explorer les outils présentés et à les tester dans votre quotidien d'enseignant.
      </p>
      <button
        className="btn"
        onClick={() => navigate('/')}
        style={{ marginTop: 32, padding: '12px 32px', fontSize: 16 }}
      >
        Recommencer
      </button>
    </div>
  )
}
