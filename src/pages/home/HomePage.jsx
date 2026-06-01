import { useNavigate } from 'react-router-dom'
import { Testimony } from '@/components/ui/Testimony'
import ConcentricCircles from '@/components/ui/ConcentricCircles'
import './HomePage.css'

const TESTIMONIES = [
  { cls: "home-testimony--1", avatar: "/y-days/images/prof1.png", quote: "Génère une fiche de lecture CE2 sur Le Petit Prince", name: "Marie",  role: "Enseignante CE2" },
  { cls: "home-testimony--2", avatar: "/y-days/images/prof2.png", quote: "Crée une évaluation sur les fractions pour le CM1",  name: "Sophie", role: "Enseignante CM1" },
  { cls: "home-testimony--3", avatar: "/y-days/images/prof3.png", quote: "Aide-moi à différencier pour les élèves en difficulté", name: "Claire", role: "Enseignante CE1" },
  { cls: "home-testimony--4", avatar: "/y-days/images/prof4.png", quote: "Rédige un compte-rendu de réunion parents-profs",     name: "Julie",  role: "Enseignante CP"  },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page" onClick={() => navigate('/onboarding')}>
      <div className="home-blob home-blob--1" />
      <div className="home-blob home-blob--2" />

      <ConcentricCircles />

      {TESTIMONIES.map((t, i) => (
        <div key={i} className={`home-testimony ${t.cls}`}>
          <Testimony avatarSrc={t.avatar} quote={t.quote} name={t.name} role={t.role} />
        </div>
      ))}

      <div className="home-content">
        <div className="home-logo">LOGO</div>
        <p className="home-label pt-15">Enseignants du primaire</p>
        <h1 className="home-title pb-15">
          Créez vos ressources pédagogiques<br />de qualité avec l'IA
        </h1>
        <div className="home-subtitle">
          <span className="home-dot" />
          Un kit d'apprentissage en 15 min
        </div>
      </div>
    </div>
  )
}
