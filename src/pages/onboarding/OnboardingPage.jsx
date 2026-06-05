import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Testimony } from '@/components/ui/Testimony'
import ConcentricCircles from '@/components/ui/ConcentricCircles'
import { Button } from '@/components/ui/Button'
import { Memo } from '@/components/ui/Memo'
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
    if (type === "next") { playTone(ctx, 440, 0, 0.12); playTone(ctx, 523, 0.1, 0.18) }
    if (type === "back") { playTone(ctx, 523, 0, 0.12); playTone(ctx, 440, 0.1, 0.18) }
    if (type === "start") { playTone(ctx, 440, 0, 0.1); playTone(ctx, 523, 0.09, 0.1); playTone(ctx, 659, 0.18, 0.22) }
  } catch (_) { }
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
  { cls: "home-testimony--1", avatar: "/y-days/images/prof1.png", quote: "J'ai mon master MEEF en poche, mais face à 26 élèves, je ne sais par où commencer.", name: "Julie", role: "Enseignante CM2" },
  { cls: "home-testimony--2", avatar: "/y-days/images/prof2.png", quote: "Je ne connais pas les programmes et je ne sais pas comment les créer", name: "Marie", role: "Enseignante CE2" },
  { cls: "home-testimony--3", avatar: "/y-days/images/prof3.png", quote: "Je ne me sens pas prêt à gérer une classe sans supports de cours prêts à l'emploi.", name: "Pierre", role: "Enseignant CP" },
  { cls: "home-testimony--4", avatar: "/y-days/images/prof4.png", quote: "Je pars de zéro et je ne sais pas ce que je suis censée produire pour le premier jour.", name: "Maxime", role: "Enseignant CE1" },
]

const STEP3_CARDS = [
  { module: "Module 1", duration: "2 min", text: "L'Introduction aux outils d'IA : outils généraux et spécialisés.", image: "/y-days/images/introduction-au-outil-IA-minia.png" },
  { module: "Module 2", duration: "2 min", text: "La méthode pour créer une instruction (prompt) efficace. ", image: "/y-days/images/methode-pour-cree-inscription-minia.png" },
  { module: "Module 3", duration: "2 min", text: "Démêler le vrai du faux : IA ou pas IA ?", image: "/y-days/images/demeler-vrai-faux-minia.png" },
]

const LIST_ITEMS = [
  { icon: "️", text: "Introduction aux outils d'IA" },
  { icon: "", text: "La méthode pour créer une instruction (prompt) " },
  { icon: "", text: "S’assurer de la qualité du contenu généré" },
]

function Step1Body() {
  return (
    <div className="step-body">
      <p>De nos jours, l'utilisation des Intelligences Artificielles (IA) s'impose de plus en plus dans le monde professionnel.</p>
      <p>Dans un contexte où il faut produire davantage et rapidement, l'intégrer dans votre métier d'enseignant est devenu essentiel.</p>
      <Memo variant="bookmark" className="mt-7 w-full">
        <div>
          <p>C'est pour cette raison que l'IA peut s'avérer être un réel assistant pour la planification et la création de vos ressources pédagogiques.</p>
        </div>
      </Memo>
    </div>
  )
}

function Step2Body({ onNext, onPrev }) {
  const [slide, setSlide] = useState(0)
  const hours = useCountUp(9, 1800, 200)
  const reforms = useCountUp(2, 1400, 700)

  const SLIDES = [
    {
      number: `${hours}h`,
      cardText: "C'est le temps que vous passez en moyenne par semaine à la préparation de vos cours",
    },
    {
      number: `${reforms}`,
      cardText: "D'après cette même étude gouvernementale, c’est le nombre de réformes en 5 ans vous obligeant à modifier vos supports de cours.",
    },
  ]

  const handleLeft = () => slide > 0 ? setSlide(s => s - 1) : onPrev?.()
  const handleRight = () => slide < SLIDES.length - 1 ? setSlide(s => s + 1) : onNext?.()

  const current = SLIDES[slide]

  return (
    <div className="step2-carousel">
      <button className="carousel-arrow" onClick={handleLeft} aria-label="Précédent">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4l-6 6 6 6" stroke="#080614" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="carousel-content">
        <div className="carousel-number" key={`n-${slide}`}>{current.number}</div>
        <div className="carousel-card" key={`c-${slide}`}>
          <p className="carousel-card-text">{current.cardText}</p>
          {current.source && <small className="carousel-card-source">{current.source}</small>}
        </div>
      </div>
      <button className="carousel-arrow" onClick={handleRight} aria-label="Suivant">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4l6 6-6 6" stroke="#080614" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
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
            <span className="step-list-check" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 11.5l5 5 9-9" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

const STEP4_ITEMS = [
  "Pour chaque module, après avoir lu, cliquez sur \"Suivant\".",
  "Les modules incluent des quiz interactifs pour un apprentissage dynamique, avec des consignes claires.",
  "Terminer un exercice avant de passer au suivant",
  "Vous pouvez à tout moment cliquez sur n'importe quel module terminé pour revoir son contenu"
]

function Step4Body() {
  return (
    <div className="step-body">
      <ul className="step-list">
        {STEP4_ITEMS.map((text, i) => (
          <li key={i} className="step-list-item">
            <span className="step-list-check" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 11.5l5 5 9-9" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p>{text}</p>
          </li>
        ))}
      </ul>
      <Memo variant="bulb" className="mt-7 w-full">
        <div>
          <p className="step-quote-label">Remarque</p>
          <p>Pas besoin de prendre de note, vous aurez un pdf récapitulatif téléchargeable une fois tous les modules complétés !</p>
        </div>
      </Memo>
    </div>
  )
}

const STEPS = [
  { title: "L'IA dans le monde professionnel", Body: Step1Body, carousel: false },
  { title: "Le temps, votre ressource la plus précieuse", Body: Step2Body, carousel: true },
  { title: "3 thématiques pour vous accompagner", Body: Step3Body, carousel: false },
  { title: "Comment ça fonctionne ?", Body: Step4Body, carousel: false },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState("right")
  const [unlockedCta, setUnlockedCta] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const navigate = useNavigate()

  const isLast = step === STEPS.length - 1
  const isCarousel = STEPS[step].carousel
  const isStep1 = step === 0
  const isStep3 = step === 2
  const { title, Body } = STEPS[step]

  const progressSteps = STEPS.filter(s => !s.carousel).length
  const progressDone = STEPS.slice(0, step + 1).filter(s => !s.carousel).length
  const progressWidth = `${(progressDone / progressSteps) * 100}%`

  const handleNext = () => {
    if (isLast) { playSound("start"); navigate("/stepper") }
    else {
      setDirection("right")
      const next = step + 1
      if (next === STEPS.length - 1) setUnlockedCta(true)
      setStep(next)
    }
  }
  const handleBack = () => { setDirection("left"); setStep(s => s - 1) }

  return (
    <>
      <div className="onboarding-container">
        <div className={`onboarding${isCarousel ? ' onboarding--carousel' : ''}`}>


          <div className={`onboarding-left${isCarousel ? ' onboarding-left--full' : ''}`}>
            {!isCarousel && (
              <div className="onboarding-progress">
                <div className="progress-fill" style={{ width: progressWidth }} />
              </div>
            )}

            {!isCarousel && (
              <div className="onboarding-step mt-2 mb-15">
                <span className="home-dot" />
                <p className="onboarding-counter">{progressDone} / {progressSteps}</p>
              </div>
            )}

            <div key={step} className={`flex flex-col justify-center align-middle onboarding-content ${direction === "right" ? "slide-in-right" : "slide-in-left"}`}>
              {!isCarousel && <h1 className="onboarding-title">{title}</h1>}
              <Body onNext={handleNext} onPrev={handleBack} />
            </div>

            {!isCarousel && (
              <nav className="onboarding-nav">
                {step > 0
                  ? <Button variant="ghost" style={{ color: '#080614', fontSize: '18px', padding: '10px 28px', height: 'auto' }} onClick={handleBack}>← Précédent</Button>
                  : <span />}
                {(!isLast || unlockedCta) && (
                  <Button
                    style={{
                      background: 'linear-gradient(180deg, #B291E9 0%, #8260BA 100%)',
                      border: 'none',
                      fontSize: '18px',
                      padding: '10px 28px',
                      height: 'auto',
                    }}
                    onClick={handleNext}
                  >
                    {isLast ? "C'est parti !" : "Suivant →"}
                  </Button>
                )}
              </nav>
            )}
          </div>

          {!isCarousel && (
            <div key={isStep3 ? 'right-step3' : 'right-other'} className={`onboarding-right${isStep3 ? ' onboarding-right--step3' : ''}${isStep1 ? ' onboarding-right--step1' : ''}`}>
              {!isStep3 && !isLast && <ConcentricCircles />}
              {isStep3 ? (
                <div className="step3-grid">
                  {STEP3_CARDS.map((card, i) => (
                    <div key={i} className="card-step-3">
                      <img src={card.image} alt="" className="image-theme" />
                      <div className="card-step-3-body">
                        <div className="card-step-3-meta">
                          <span>{card.module}</span>
                          <span>•</span>
                          <span>{card.duration}</span>
                        </div>
                        <p className="card-theme-text">{card.text}</p>
                      </div>
                    </div>
                  ))}
                  <div className="card-step-3-no-theme">
                    <img src="/y-days/svg/Group.svg" alt="" className="image-no-theme" />
                    <div>
                      <p className="text-card-step-no-theme">Pour aller plus loin</p>
                      <p className="text-bold-step-no-theme">Téléchargez votre fiche mémo et votre checklist prêts à l'emploi !</p>
                    </div>
                  </div>
                </div>
              ) : isLast ? (
                <div className="right-illustration">
                  <div className="illustration-wrapper">
                    <img src="/y-days/svg/Illustration.svg" alt="Illustration" className="illustration-img" onClick={() => setLightboxSrc('/y-days/svg/Illustration.svg')} />
                    <button className="image-zoom-btn" onClick={() => setLightboxSrc('/y-days/svg/Illustration.svg')} aria-label="Agrandir l'image">
                      <img src="/y-days/icons/Searchicon.svg" alt="" />
                    </button>
                  </div>
                </div>
              ) : (
                TESTIMONIES.slice(0, 2).map((t, i) => (
                  <div key={i} className={`onb-testimony ${t.cls}`}>
                    <Testimony
                      avatarSrc={t.avatar}
                      quote={t.quote}
                      name={t.name}
                      role={t.role}
                    />
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>

      {lightboxSrc && (
        <div className="lightbox-overlay" onClick={() => setLightboxSrc(null)}>
          <button className="lightbox-close" onClick={() => setLightboxSrc(null)} aria-label="Fermer">✕</button>
          <img src={lightboxSrc} alt="" className="lightbox-img" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}
