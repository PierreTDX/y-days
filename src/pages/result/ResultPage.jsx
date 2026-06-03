import { useNavigate } from 'react-router-dom'
import ConcentricCircles from '@/components/ui/ConcentricCircles'
import { Button } from '@/components/ui/Button'
import { Memo } from '@/components/ui/Memo'
import '@/styles/pages.css'

export default function ResultPage() {
  const navigate = useNavigate()

  return (
    <div className="result-page page-bg">
      <ConcentricCircles />

      <div className="result-card">
        <img src="/y-days/LOGOAcadem.svg" alt="Logo" className="result-logo" />

        <div className="result-badge">🎉</div>

        <h1 className="result-title">
          Félicitations !
        </h1>

        <p className="result-text">
          Vous avez terminé le kit de formation.<br />
          Vous avez maintenant toutes les clés pour intégrer l'IA dans votre pratique pédagogique et créer vos ressources plus rapidement.
        </p>

        <Memo variant="bulb" className="w-full mt-5">
          <div>
            <p className="step-quote-label">À retenir</p>
            <p>N'hésitez pas à explorer les outils présentés et à les tester dans votre quotidien d'enseignant.</p>
          </div>
        </Memo>

        <div className="result-actions">
          <Button
            style={{
              background: 'linear-gradient(180deg, #B291E9 0%, #8260BA 100%)',
              border: 'none',
              fontSize: '17px',
              padding: '10px 28px',
              height: 'auto',
            }}
            onClick={() => navigate('/')}
          >
            Retour à l'accueil
          </Button>
          <Button
            variant="ghost"
            style={{ color: '#080614', fontSize: '15px' }}
            onClick={() => navigate('/onboarding')}
          >
            Recommencer →
          </Button>
        </div>
      </div>
    </div>
  )
}
