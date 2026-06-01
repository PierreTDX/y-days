import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Testimony } from '@/components/ui/Testimony'
import ConcentricCircles from '@/components/ui/ConcentricCircles'
import './OnboardingPage.css'

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
  osc.type = "sine"
  osc.frequency.value = freq
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration)
  osc.start(ctx.currentTime + delay)
  osc.stop(ctx.currentTime + delay + duration + 0.05)
}
function playSound(type) {
  try {
    const ctx = getCtx()
    if (type === "next")  { playTone(ctx,440,0,0.12); playTone(ctx,523,0.1,0.18) }
    if (type === "back")  { playTone(ctx,523,0,0.12); playTone(ctx,440,0.1,0.18) }
    if (type === "start") { playTone(ctx,440,0,0.1); playTone(ctx,523,0.09,0.1); playTone(ctx,659,0.18,0.22) }
  } catch (_) {}
}

function useCountUp(target, duration = 1600, delay = 0) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let raf
    const timeout = setTimeout(() => {
      let start = null
      const tick = (ts) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target))
        if (progress < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf) }
  }, [target, duration, delay])
  return count
}

const TESTIMONIES = [
  { cls: "onb-testimony--1", avatar: "/y-days/images/prof1.png", quote: "Génère une fiche de lecture CE2 sur Le Petit Prince", name: "Marie",  role: "Enseignante CE2" },
  { cls: "onb-testimony--2", avatar: "/y-days/images/prof2.png", quote: "Crée une évaluation sur les fractions pour le CM1",  name: "Sophie", role: "Enseignante CM1" },
  { cls: "onb-testimony--3", avatar: "/y-days/images/prof3.png", quote: "Aide-moi à différencier pour les élèves en difficulté", name: "Claire", role: "Enseignante CE1" },
  { cls: "onb-testimony--4", avatar: "/y-days/images/prof4.png", quote: "Rédige un compte-rendu de réunion parents-profs",     name: "Julie",  role: "Enseignante CP"  },
]

const LIST_ITEMS = [
  { icon: "⚙️", text: "Introduction aux outils d'IA : outils généraux et pédagogiques." },
  { icon: "✏️", text: "Méthode pour créer un prompt efficace pour générer un cours pertinent." },
  { icon: "💡", text: "Cas concrets sur les différents usages des outils d'IA." },
  { icon: "✅", text: "Comment s'assurer que le contenu généré est qualitatif et adapté." },
]

function Step1Body() {
  return (
    <div className="step-body">
      <p>A cette ère, l'utilisation des Intelligences Artificielles (IA) s'impose de plus en plus dans le monde professionnel.</p>
      <p>L'intégrer dans votre métier d'enseignement est devenu essentiel dans un contexte où il faut produire plus et plus vite.</p>
      <div className="step-quote">
        <p>C'est pour cette raison que l'IA peut s'avérer être un réel assistant pour la planification et la création de vos ressources pédagogiques.</p>
      </div>
    </div>
  )
}

function Step2Body() {
  const hours = useCountUp(9, 1800, 200)
  const reforms = useCountUp(2, 1400, 700)
  return (
    <div className="step-body">
      <p>Savez-vous combien de temps vous passez chaque semaine à préparer vos ressources ?</p>
      <div className="step-stats">
        <div className="stat-card stat-card--purple">
          <div className="stat-number stat-number--purple">0{hours} h 00</div>
          <p className="stat-label">
            passées en moyenne par semaine sur la création de supports
            <small>(Selon étude du gouvernement)</small>
          </p>
        </div>
        <div className="stat-card stat-card--pink">
          <div className="stat-number stat-number--pink">0{reforms}</div>
          <p className="stat-label">réformes en 5 ans nécessitant de modifier vos supports de cours</p>
        </div>
      </div>
    </div>
  )
}

function Step3Body() {
  return (
    <div className="step-body">
      <p>Dans ce kit de formation, vous trouverez les thématiques suivantes :</p>
      <ul className="step-list">
        {LIST_ITEMS.map((item, i) => (
          <li key={i} className="step-list-item">
            <span>{item.icon}</span>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
      <p className="step-source">
        Source :{" "}
        <a href="https://www.education.gouv.fr/depp/les-enseignants-du-premier-degre-public-declarent-travailler-44-heures-par-semaine-en-moyenne-6479"
          target="_blank" rel="noopener noreferrer">
          Ministère de l'Éducation nationale
        </a>
      </p>
    </div>
  )
}

const STEPS = [
  { title: "L'IA dans le monde professionnel",       Body: Step1Body },
  { title: "Le temps, votre ressource la plus précieuse", Body: Step2Body },
  { title: "Ce que vous allez découvrir",             Body: Step3Body },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState("right")
  const [unlockedCta, setUnlockedCta] = useState(false)
  const navigate = useNavigate()

  const isLast = step === STEPS.length - 1
  const { title, Body } = STEPS[step]

  const handleNext = () => {
    if (isLast) { playSound("start"); navigate("/quiz") }
    else {
      playSound("next"); setDirection("right")
      const next = step + 1
      if (next === STEPS.length - 1) setUnlockedCta(true)
      setStep(next)
    }
  }
  const handleBack = () => { playSound("back"); setDirection("left"); setStep(s => s - 1) }

  return (
    <div className="onboarding">

      <div className="onboarding-left">
        <p className="onboarding-counter">{step + 1} / {STEPS.length}</p>

        <div key={step} className={`onboarding-content ${direction === "right" ? "slide-in-right" : "slide-in-left"}`}>
          <h1 className="onboarding-title">{title}</h1>
          <Body />
        </div>

        <nav className="onboarding-nav">
          {step > 0
            ? <button className="btn-back" onClick={handleBack}>← Précédent</button>
            : <span />}
          {(!isLast || unlockedCta) && (
            <button className={isLast ? "btn-cta" : "btn-next"} onClick={handleNext}>
              {isLast ? "C'est parti !" : "Suivant →"}
            </button>
          )}
        </nav>
      </div>

      <div className="onboarding-right">
        <div className="onboarding-progress">
          {[0, 1, 2].map(i => (
            <div key={i} className={`progress-segment${i <= step ? " progress-segment--active" : ""}`} />
          ))}
        </div>
        <ConcentricCircles />
        {TESTIMONIES.map((t, i) => (
          <div key={i} className={`onb-testimony ${t.cls}`}>
            <Testimony avatarSrc={t.avatar} quote={t.quote} name={t.name} role={t.role} />
          </div>
        ))}
      </div>

    </div>
  )
}
