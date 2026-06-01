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
    if (type === "next") { playTone(ctx,440,0,0.12); playTone(ctx,523,0.1,0.18) }
    else if (type === "back") { playTone(ctx,523,0,0.12); playTone(ctx,440,0.1,0.18) }
    else if (type === "start") { playTone(ctx,440,0,0.1); playTone(ctx,523,0.09,0.1); playTone(ctx,659,0.18,0.22) }
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

const FLOAT_CARDS = [
  { style: { top: "14%", left: "8%", transform: "rotate(-4deg)" }, text: "Génère une fiche de lecture CE2 sur Le Petit Prince", reply: "Voici une fiche structurée avec compréhension et vocabulaire..." },
  { style: { bottom: "22%", left: "6%", transform: "rotate(3deg)" }, text: "Crée une évaluation sur les fractions pour le CM1", reply: "Évaluation : Les fractions — 10 exercices progressifs..." },
  { style: { top: "10%", right: "7%", transform: "rotate(4deg)" }, text: "Aide-moi à différencier pour les élèves en difficulté", reply: "Version adaptée avec étayage visuel et consignes simplifiées..." },
  { style: { bottom: "18%", right: "6%", transform: "rotate(-3deg)" }, text: "Rédige un compte-rendu de réunion parents-profs", reply: "Compte-rendu — Réunion du 14 novembre : points abordés..." },
]

function FloatingCard({ card }) {
  return (
    <div style={{ position: "absolute", ...card.style, background: "rgba(255,255,255,0.93)", backdropFilter: "blur(10px)", borderRadius: 16, padding: "12px 14px", width: 195, boxShadow: "0 8px 32px rgba(80,0,140,0.15)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg,#e879f9,#818cf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "white", fontWeight: 700 }}>M</div>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>Marie</span>
      </div>
      <div style={{ background: "#f3f4f6", borderRadius: 8, padding: "7px", fontSize: 10, color: "#6b7280", lineHeight: 1.45, marginBottom: 6 }}>{card.text}</div>
      <div style={{ background: "linear-gradient(135deg,#a78bfa,#818cf8)", borderRadius: 8, padding: "7px", fontSize: 10, color: "white", lineHeight: 1.45 }}>{card.reply}</div>
    </div>
  )
}

const LIST_ITEMS = [
  { icon: "⚙️", text: "Introduction aux outils d'IA : outils généraux et pédagogiques." },
  { icon: "✏️", text: "Méthode pour créer un prompt efficace pour générer un cours pertinent." },
  { icon: "💡", text: "Cas concrets sur les différents usages des outils d'IA." },
  { icon: "✅", text: "Comment s'assurer que le contenu généré est qualitatif et adapté." },
]

function Step2Body() {
  const hours = useCountUp(9, 1800, 200)
  const reforms = useCountUp(2, 1400, 700)
  return (
    <>
      <p style={{ marginTop: 0, lineHeight: 1.75, color: "#374151" }}>
        Savez-vous combien de temps vous passez chaque semaine à préparer vos ressources ?
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
        <div style={{ background: "#f5f3ff", borderRadius: 14, padding: "20px" }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: "#7c3aed", lineHeight: 1 }}>0{hours} h 00</div>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>
            passées en moyenne par semaine sur la création de supports
            <span style={{ fontSize: 11, color: "#9ca3af", display: "block", marginTop: 2 }}>(Selon étude du gouvernement)</span>
          </p>
        </div>
        <div style={{ background: "#fff0f6", borderRadius: 14, padding: "20px" }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: "#db2777", lineHeight: 1 }}>0{reforms}</div>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>
            réformes en 5 ans nécessitant de modifier vos supports de cours
          </p>
        </div>
      </div>
    </>
  )
}

function Step1Body() {
  return (
    <>
      <p style={{ marginTop: 0, lineHeight: 1.75, color: "#374151" }}>
        A cette ère, l'utilisation des Intelligences Artificielles (IA) s'impose de plus en plus dans le monde professionnel.
      </p>
      <p style={{ lineHeight: 1.75, color: "#374151" }}>
        L'intégrer dans votre métier d'enseignement est devenu essentiel dans un contexte où il faut produire plus et plus vite.
      </p>
      <div style={{ marginTop: 24, borderLeft: "4px solid #7c3aed", background: "#f5f3ff", borderRadius: "0 12px 12px 0", padding: "16px 16px 16px 20px" }}>
        <p style={{ margin: 0, color: "#5b21b6", fontStyle: "italic", lineHeight: 1.7, fontSize: 14 }}>
          C'est pour cette raison que l'IA peut s'avérer être un réel assistant pour la planification et la création de vos ressources pédagogiques.
        </p>
      </div>
    </>
  )
}

function Step3Body() {
  return (
    <>
      <p style={{ marginTop: 0, lineHeight: 1.75, color: "#374151" }}>
        Dans ce kit de formation, vous trouverez les thématiques suivantes :
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        {LIST_ITEMS.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#f5f3ff", borderRadius: 10, padding: "10px 14px" }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
            <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{item.text}</p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 20, fontSize: 11, color: "#9ca3af" }}>
        Source :{" "}
        <a href="https://www.education.gouv.fr/depp/les-enseignants-du-premier-degre-public-declarent-travailler-44-heures-par-semaine-en-moyenne-6479"
          target="_blank" rel="noopener noreferrer" style={{ color: "#7c3aed", textDecoration: "underline" }}>
          Ministère de l'Éducation nationale
        </a>
      </p>
    </>
  )
}

const STEPS = [
  { title: "L'IA dans le monde professionnel", Body: Step1Body },
  { title: "Le temps, votre ressource la plus précieuse", Body: Step2Body },
  { title: "Ce que vous allez découvrir", Body: Step3Body },
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
    <div style={{ position: "fixed", inset: 0, zIndex: 10, display: "flex", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* Left panel */}
      <div style={{ width: "48%", background: "linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('/y-days/efa249ca0a78f70482e9cb7dae14bc8d38859bc8.png') center/cover", display: "flex", flexDirection: "column", padding: "48px 56px", overflowY: "auto" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em", marginBottom: 40 }}>
          {step + 1} / {STEPS.length}
        </div>
        <div key={step} className={direction === "right" ? "slide-in-right" : "slide-in-left"} style={{ flex: 1 }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: "#111827", lineHeight: 1.25, marginTop: 0, marginBottom: 24 }}>
            {title}
          </h1>
          <Body />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 40 }}>
          {step > 0 ? (
            <button onClick={handleBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontWeight: 600, fontSize: 14, padding: 0 }}>
              ← Précédent
            </button>
          ) : <div />}
          {(!isLast || unlockedCta) && (
            <button onClick={handleNext} style={{ background: "#7c3aed", border: "none", borderRadius: 12, padding: isLast ? "12px 32px" : "10px 24px", color: "white", fontWeight: 700, cursor: "pointer", fontSize: isLast ? 16 : 14 }}>
              {isLast ? "C'est parti !" : "Suivant →"}
            </button>
          )}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, background: "linear-gradient(135deg, rgba(253,164,175,0.8) 0%, rgba(232,121,249,0.8) 40%, rgba(167,139,250,0.8) 70%, rgba(147,197,253,0.8) 100%), url('/y-days/efa249ca0a78f70482e9cb7dae14bc8d38859bc8.png') center/cover", position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 6, padding: "20px 24px" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? "white" : "rgba(255,255,255,0.3)", transition: "background 0.3s" }} />
          ))}
        </div>
        {FLOAT_CARDS.map((card, i) => <FloatingCard key={i} card={card} />)}
      </div>
    </div>
  )
}
