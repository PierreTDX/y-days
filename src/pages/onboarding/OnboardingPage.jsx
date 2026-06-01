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

export default function OnboardingPage() {
  return (
    <div className="glass" style={{ padding: 24 }}>
      <h1 className="title">Bienvenue dans votre kit IA pédagogique</h1>
      <p className="subtitle">
        Apprenez à créer des cours rapidement grâce à l’IA.
      </p>

      <div style={{ marginTop: 20 }}>
        <button className="btn">Commencer</button>
      </div>
    </div>
  )
}
