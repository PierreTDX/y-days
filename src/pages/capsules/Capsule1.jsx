import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Memo } from "@/components/ui/Memo"

const claude = '/y-days/images/Claude.png';
const notebook = '/y-days/images/NotebookLM.png';
const perplexity = '/y-days/images/Perplexity.png';

export default function Capsule1({ onComplete }) {
    const [step, setStep] = useState(0)
    const [flippedCards, setFlippedCards] = useState({})

    const toggleCard = (index) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <div className="w-full mx-auto p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            {/* Step 0: Intro */}
            {step === 0 && (
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Introduction et découverte des outils d’IA</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        Jusqu'à récemment, l'informatique classique servait à analyser des données ou automatiser des tâches répétitives. L'IA générative change totalement la donne, et même pour vous.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <p className="w-full md:w-3/5 text-muted-foreground leading-relaxed">
                            L’IA générative est un type d’intelligence artificielle capable de générer du contenu inédit (texte, images, schémas, musiques, code informatique, et bien plus) à partir d’une simple consigne écrite en langage naturel. Cette consigne donnée à l’IA s’appelle un prompt.
                        </p>
                        <div className="w-full md:flex-1">
                            <h2
                                className="text-center font-bold text-[48px] leading-[48px] tracking-[-1.2px] bg-clip-text text-transparent"
                                style={{ backgroundImage: 'linear-gradient(1.13deg, #A076E4 27.25%, #05036C 99.44%)' }}
                            >
                                2022
                            </h2>
                            <Card className="p-4">
                                C’est année d’explosion de l’IA générative aux yeux du grand public avec la sortie de l’incontournable ChatGPT (par l’entreprise OpenAI). Un Choc positif.
                            </Card>
                        </div>
                    </div>
                    <Memo variant="search" className="mt-6">
                        <h3 className="font-bold text-lg">Pourquoi un tel choc ?</h3>
                        <p>Pour la première fois, ChatGPT ne répondait pas avec juste des mots clés, mais conversait comme un être humain. Il s’est révélé capable de vous comprendre implicitement, de traduire votre pensée, et même de s’adapter aux contraintes de niveau : le niveau d’un élève de CP par exemple.</p>
                    </Memo>

                </div>
            )}

            {/* Step 1: Cartes */}
            {step === 1 && (
                <div className="space-y-6">
                    <h1 className="text-4xl font-semibold">Introduction et découverte des outils d'IA</h1>
                    <p className="text-muted-foreground leading-relaxed font-bold">
                        Voici nos recommandations d'IA importantes pour la création de vos ressources pédagogiques :
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Claude", img: claude, desc: "Excellent en génération de texte et de vos supports de cours pédagogique (pdf, word, powerpoint)" },
                            { title: "NotebookLM", img: notebook, desc: "Idéal pour la génération de ressources intéractives  vidéo, podcast, présentations, images) à partir de vos sources habituelles (manuels scolaires, page internet, vidéo YouTube, …)" },
                            { title: "Perplexity", img: perplexity, desc: "Considérez-le comme un moteur de recherche sous stéroïdes. Il vous livre systématiquement ses sources de recherches. Utilisez le pour agrémenter vos cours avec des données issues des sources fiables." }
                        ].map((ia, i) => (
                            <div
                                key={i}
                                className="group relative h-64 w-full [perspective:1000px] cursor-pointer"
                                onClick={() => toggleCard(i)}
                            >
                                <div className={`absolute duration-500 w-full h-full [transform-style:preserve-3d] ${flippedCards[i] ? '[transform:rotateY(180deg)]' : ''}`}>
                                    {/* Front — image réelle sur fond dégradé */}
                                    <Card className="absolute w-full h-full rounded-[10px] [backface-visibility:hidden] overflow-hidden p-0">
                                        {/* Fond dégradé identique aux logos officiels */}
                                        <div className="absolute inset-0 rounded-[10px]" style={{ background: 'linear-gradient(135deg, #f0c0f8 0%, #c8aaee 35%, #a8b8f8 70%, #c0b0f0 100%)' }} />
                                        {/* Image centrée */}
                                        <div className="absolute inset-0 flex flex-col">
                                            <div className="flex-1 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={ia.img}
                                                    alt={`Logo ${ia.title}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <p className="flex items-center justify-start p-4 h-[76px] bg-white text-black m-0 text-base">{ia.title}</p>
                                        </div>
                                    </Card>
                                    {/* Back */}
                                    <Card
                                        className="absolute w-full h-full rounded-[10px] p-6 flex flex-col items-center justify-center gap-3 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                                        style={{ background: 'linear-gradient(135deg, #e0a8f4 0%, #b89ce0 40%, #9ab0f0 100%)' }}
                                    >
                                        <p className="text-lg font-bold text-white">{ia.title}</p>
                                        <p className="text-lg text-white/90 leading-tight">{ia.desc}</p>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground text-center">Cliquez sur une carte pour la retourner</p>
                </div>
            )}
            {/* Step 2: Accordéons */}
            {step === 2 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">Liste d'IA pour le quotidien</h2>
                    <div className="border rounded-md divide-y">
                        {[
                            { category: "Texte", items: ["ChatGPT : rédaction, résumé, idées, scripts.", "Claude : très bon pour les longs textes.", "Gemini : texte + multimodal.", "Mistral : rédaction en français.", "Copilot : résumés de documents."] },
                            { category: "Recherche et sources", items: ["Perplexity : recherche web sourcée.", "NotebookLM : analyse de documents.", "You.com : recherche assistée."] },
                            { category: "Images", items: ["Midjourney : génération artistique.", "DALL·E : génération via texte.", "Stable Diffusion : flexible et local.", "Canva Image IA : création rapide.", "Adobe Firefly : usage pro."] },
                            { category: "Vidéo", items: ["Runway : montage assisté.", "Pika : vidéos courtes.", "InVideo AI : vidéo avec script et voix.", "Synthesia : avatars IA.", "Canva Video IA : rapide et simple."] },
                            { category: "Musique", items: ["Suno : chansons complètes.", "Udio : morceaux avec paroles.", "Loudly : bandes-son.", "Easymusic.ai : création personnalisée.", "Stable Audio : audio général."] },
                            { category: "Voix et audio", items: ["ElevenLabs : synthèse réaliste.", "Play.ht : narration.", "Descript : montage audio/vidéo."] },
                            { category: "Automatisation", items: ["Zapier AI : automatisation IA.", "Make : workflows visuels.", "n8n : automatisation technique."] }
                        ].map((section, i) => (
                            <details key={i} className="group p-4 [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between font-medium text-sm">
                                    {section.category}
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <ul className="text-sm text-muted-foreground mt-3 space-y-2 pl-4 list-disc">
                                    {section.items.map((item, j) => <li key={j}>{item}</li>)}
                                </ul>
                            </details>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-15 flex justify-between">
                <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 0}>
                    {"<- Précédent"}
                </Button>

                <Button
                    disabled={step === 1 && Object.keys(flippedCards).length < 3}
                    onClick={() => step < 2 ? setStep(step + 1) : onComplete?.()}>
                    {step < 2 ? "Suivant ->" : "Terminer"}
                </Button>
            </div>
        </div>
    )
}