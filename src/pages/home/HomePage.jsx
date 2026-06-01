import { useNavigate } from 'react-router-dom'

const FLOAT_CARDS = [
  {
    style: { top: "12%", left: "5%", transform: "rotate(-5deg)" },
    text: "Génère une fiche de lecture CE2 sur Le Petit Prince",
    reply: "Voici une fiche structurée avec compréhension et vocabulaire...",
  },
  {
    style: { bottom: "16%", left: "4%", transform: "rotate(4deg)" },
    text: "Crée une évaluation sur les fractions pour le CM1",
    reply: "Évaluation : Les fractions — 10 exercices progressifs...",
  },
  {
    style: { top: "8%", right: "5%", transform: "rotate(5deg)" },
    text: "Aide-moi à différencier pour les élèves en difficulté",
    reply: "Version adaptée avec étayage visuel et consignes simplifiées...",
  },
  {
    style: { bottom: "14%", right: "4%", transform: "rotate(-4deg)" },
    text: "Rédige un compte-rendu de réunion parents-profs",
    reply: "Compte-rendu — Réunion du 14 novembre : points abordés...",
  },
]

function FloatingCard({ card }) {
  return (
    <div style={{
      position: "absolute", ...card.style,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(12px)",
      borderRadius: 18, padding: "14px 16px", width: 210,
      boxShadow: "0 8px 40px rgba(100,0,180,0.18)",
      zIndex: 2,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg,#e879f9,#818cf8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, color: "white", fontWeight: 700,
          boxShadow: "0 2px 8px rgba(168,139,250,0.4)",
        }}>M</div>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>Marie</span>
      </div>
      <div style={{ background: "#f3f4f6", borderRadius: 10, padding: "8px 10px", fontSize: 11, color: "#6b7280", lineHeight: 1.5, marginBottom: 8 }}>
        {card.text}
      </div>
      <div style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)", borderRadius: 10, padding: "8px 10px", fontSize: 11, color: "white", lineHeight: 1.5 }}>
        {card.reply}
      </div>
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10,
      background: "linear-gradient(120deg, rgba(253,164,175,0.75) 0%, rgba(232,121,249,0.75) 30%, rgba(167,139,250,0.75) 60%, rgba(147,197,253,0.75) 100%), url('/y-days/efa249ca0a78f70482e9cb7dae14bc8d38859bc8.png') center/cover",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "Inter, system-ui, sans-serif",
      overflow: "hidden",
    }}>

      {/* Background blobs */}
      <div style={{ position: "absolute", top: "10%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.12)", filter: "blur(40px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "5%", right: "15%", width: 350, height: 350, borderRadius: "50%", background: "rgba(255,255,255,0.1)", filter: "blur(40px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "40%", left: "40%", width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.08)", filter: "blur(30px)", zIndex: 0 }} />

      {/* Floating cards */}
      {FLOAT_CARDS.map((card, i) => <FloatingCard key={i} card={card} />)}

      {/* Center content */}
      <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 24px" }}>
        <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-1px", marginBottom: 24, lineHeight: 1 }}>
          <span style={{ color: "#1e1b4b" }}>LOG</span>
          <span style={{ color: "#7c3aed" }}>O</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1e1b4b", lineHeight: 1.3, maxWidth: 520, margin: "0 auto 12px" }}>
          Créez vos ressources pédagogiques<br />efficacement et rapidement avec l'IA
        </h1>
        <p style={{ fontSize: 14, color: "#4c1d95", fontWeight: 600, margin: "0 auto 40px" }}>
          + Un kit dédié aux enseignants de primaire
        </p>
        <button
          onClick={() => navigate("/onboarding")}
          style={{
            background: "white",
            border: "none",
            borderRadius: 14,
            padding: "14px 40px",
            fontSize: 16,
            fontWeight: 700,
            color: "#7c3aed",
            cursor: "pointer",
            boxShadow: "0 4px 24px rgba(124,58,237,0.25)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(124,58,237,0.35)" }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 24px rgba(124,58,237,0.25)" }}
        >
          Découvrir le kit →
        </button>
      </div>
    </div>
  )
}
