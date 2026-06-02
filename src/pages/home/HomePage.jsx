import { useNavigate } from 'react-router-dom'
import { Testimony } from '@/components/ui/Testimony'
import ConcentricCircles from '@/components/ui/ConcentricCircles'
import { Button } from '@/components/ui/Button'
import '@/styles/pages.css'

let audioCtx = null
function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  return audioCtx
}
function playTone(ctx, freq, delay, duration, volume = 0.12) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration)
  osc.start(ctx.currentTime + delay)
  osc.stop(ctx.currentTime + delay + duration + 0.05)
}
function playStart() {
  try {
    const ctx = getCtx()
    playTone(ctx, 440, 0,    0.10)
    playTone(ctx, 523, 0.09, 0.10)
    playTone(ctx, 659, 0.18, 0.22)
  } catch (_) {}
}

const TESTIMONIES = [
  { cls: "home-testimony--1", avatar: "/y-days/images/prof1.png", quote: "Génère une fiche de lecture CE2 sur Le Petit Prince", name: "Marie",  role: "Enseignante CE2" },
  { cls: "home-testimony--2", avatar: "/y-days/images/prof2.png", quote: "Crée une évaluation sur les fractions pour le CM1",  name: "Sophie", role: "Enseignante CM1" },
  { cls: "home-testimony--3", avatar: "/y-days/images/prof3.png", quote: "Aide-moi à différencier pour les élèves en difficulté", name: "Claire", role: "Enseignante CE1" },
  { cls: "home-testimony--4", avatar: "/y-days/images/prof4.png", quote: "Rédige un compte-rendu de réunion parents-profs",     name: "Julie",  role: "Enseignante CP"  },
]

export default function HomePage() {
  const navigate = useNavigate()

  function handleStart() {
    playStart()
    navigate('/onboarding')
  }

  return (
    <div className="home-page page-bg">
      <div className="home-blob home-blob--1" />
      <div className="home-blob home-blob--2" />

      <ConcentricCircles />

      <div className="home-avatar home-avatar--1" />
      <div className="home-avatar home-avatar--2" />
      <div className="home-avatar home-avatar--3" />

      {TESTIMONIES.map((t, i) => (
        <div key={i} className={`home-testimony ${t.cls}`}>
          <Testimony avatarSrc={t.avatar} quote={t.quote} name={t.name} role={t.role} />
        </div>
      ))}

      <div className="home-content">
        <img src="/y-days/LOGOAcadem.svg" alt="Logo" className="home-logo" />
        <p className="home-label">Enseignants du primaire</p>
        <h1 className="home-title pb-5">
          Créez vos ressources pédagogiques<br />de qualité avec l'IA
        </h1>
        <div className="home-subtitle">
          <span className="home-dot" />
          Un kit d'apprentissage en 10 min
        </div>
      </div>
        <Button
          size="lg"
          style={{ background: 'linear-gradient(180deg, #B291E9 0%, #8260BA 100%)', border: 'none', marginTop: '32px', fontSize: '17px', padding: '10px 28px', height: 'auto' }}
          onClick={handleStart}
        >
          Démarrer l'apprentissage →
        </Button>
    </div>
  )
}
