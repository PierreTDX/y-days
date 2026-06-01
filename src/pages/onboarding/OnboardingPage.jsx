import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
function playSound(type) {
  try {
    const ctx = getCtx()
    if (type === 'next') {
      playTone(ctx, 440, 0, 0.12)
      playTone(ctx, 523, 0.1, 0.18)
    } else if (type === 'back') {
      playTone(ctx, 523, 0, 0.12)
      playTone(ctx, 440, 0.1, 0.18)
    } else if (type === 'start') {
      playTone(ctx, 440, 0,    0.1)
      playTone(ctx, 523, 0.09, 0.1)
      playTone(ctx, 659, 0.18, 0.22)
    }
  } catch (_) {}
}

function useCountUp(target, duration = 1600, delay = 0) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let raf
    const timeout = setTimeout(() => {
      let start = null
      const tick = (timestamp) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [target, duration, delay])

  return count
}

const LIST_ITEMS = [
  {
    icon: '⚙️',
    text: "L'Introduction aux outils d'IA : outils généraux et outils pour la génération de ressources pédagogiques.",
  },
  {
    icon: '✏️',
    text: "La méthode pour créer une instruction (prompt) efficace et optimisée pour générer un cours pédagogique pertinent avec l'IA.",
  },
  {
    icon: '💡',
    text: "Quelques cas concrets sur divers utilisation des outils d'IA.",
  },
  {
    icon: '✅',
    text: "Comment s'assurer que le contenu généré est qualitatif, et adapté vos usages.",
  },
]

function Step1() {
  return (
    <>
      <h1 className="title" style={{ fontSize: 24, lineHeight: 1.35, marginBottom: 0 }}>
        Enseignants du primaire : Créez vos ressources pédagogiques efficacement et rapidement avec l'IA
      </h1>
      <p style={{ marginTop: 20, lineHeight: 1.75, color: '#d1d5db' }}>
        A cette ère, l'utilisation des Intelligences Artificielles (IA) s'impose de plus en plus dans le monde professionnel.
      </p>
      <p style={{ marginTop: 12, lineHeight: 1.75, color: '#d1d5db' }}>
        L'intégrer dans votre métier d'enseignement est devenu essentiel dans un contexte où il faut produire plus et plus vite.
      </p>
    </>
  )
}

function Step2() {
  const hours = useCountUp(9, 1800, 200)
  const reforms = useCountUp(2, 1400, 700)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="glass" style={{ padding: 24 }}>
        <div style={{ fontSize: 48, fontWeight: 700, color: '#4f46e5', letterSpacing: '-1px', fontVariantNumeric: 'tabular-nums' }}>
          0{hours} h 00
        </div>
        <p style={{ marginTop: 10, color: '#d1d5db', lineHeight: 1.65, marginBottom: 0 }}>
          C'est le temps que vous passez en moyenne par semaine pour la création de vos supports de cours.{' '}
          <span style={{ color: '#9ca3af', fontSize: 13 }}>(Selon étude du gouvernement)</span>
        </p>
      </div>
      <div className="glass" style={{ padding: 24 }}>
        <div style={{ fontSize: 48, fontWeight: 700, color: '#06b6d4', letterSpacing: '-1px', fontVariantNumeric: 'tabular-nums' }}>
          0{reforms}
        </div>
        <p style={{ marginTop: 10, color: '#d1d5db', lineHeight: 1.65, marginBottom: 0 }}>
          C'est le nombre de réformes en 5 ans nécessitant de modifier vos supports de cours.
        </p>
      </div>
    </div>
  )
}

function Step3() {
  return (
    <>
      <p style={{ lineHeight: 1.75, color: '#d1d5db', marginTop: 0 }}>
        C'est pour cette raison que l'IA peut s'avérer être un réel assistant pour la planification et la création de vos ressources pédagogiques.
      </p>
      <p style={{ marginTop: 20, fontWeight: 600, color: '#e5e7eb', marginBottom: 0 }}>
        Dans ce kit de formation, vous trouverez les thématiques suivants :
      </p>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {LIST_ITEMS.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1.65 }}>{item.icon}</span>
            <p style={{ margin: 0, color: '#d1d5db', lineHeight: 1.65 }}>{item.text}</p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 24, fontSize: 12, color: '#6b7280' }}>
        Source :{' '}
        <a
          href="https://www.education.gouv.fr/depp/les-enseignants-du-premier-degre-public-declarent-travailler-44-heures-par-semaine-en-moyenne-6479"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#6b7280', textDecoration: 'underline' }}
        >
          Le temps de travail des enseignants — Ministère de l'Éducation nationale
        </a>
      </p>
    </>
  )
}

const STEPS = [Step1, Step2, Step3]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState('right')
  const [unlockedCta, setUnlockedCta] = useState(false)
  const navigate = useNavigate()

  const isLast = step === STEPS.length - 1
  const StepComponent = STEPS[step]

  const handleNext = () => {
    if (isLast) {
      playSound('start')
      navigate('/quiz')
    } else {
      playSound('next')
      setDirection('right')
      const nextStep = step + 1
      if (nextStep === STEPS.length - 1) setUnlockedCta(true)
      setStep(nextStep)
    }
  }

  const handleBack = () => {
    playSound('back')
    setDirection('left')
    setStep(s => s - 1)
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div className="glass" style={{ padding: 32, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, letterSpacing: '0.05em' }}>
            {step + 1} / {STEPS.length}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {STEPS.map((_, i) => (
              <div
                key={i}
                style={{
                  height: 8,
                  width: i === step ? 24 : 8,
                  borderRadius: 4,
                  background: i === step ? '#4f46e5' : 'rgba(255,255,255,0.2)',
                  transition: 'background 0.3s, width 0.3s',
                }}
              />
            ))}
          </div>
        </div>

        <div key={step} className={direction === 'right' ? 'slide-in-right' : 'slide-in-left'}>
          <StepComponent />
        </div>

        <div style={{ marginTop: 32, display: 'flex', justifyContent: step > 0 ? 'space-between' : 'flex-end' }}>
          {step > 0 && (
            <button className="btn" onClick={handleBack} style={{ background: 'rgba(255,255,255,0.1)' }}>
              ← Retour
            </button>
          )}
          {!isLast && (
            <button className="btn" onClick={handleNext}>
              Suivant →
            </button>
          )}
        </div>
      </div>

      {unlockedCta && (
        <div className="slide-in-right" style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
          <button
            className="btn"
            onClick={() => { playSound('start'); navigate('/quiz') }}
            style={{ padding: '14px 40px', fontSize: 18, borderRadius: 16 }}
          >
            C'est parti !
          </button>
        </div>
      )}
    </div>
  )
}
