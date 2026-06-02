import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Memo } from "@/components/ui/Memo"
import { FlipCard } from "@/components/ui/FlipCard"

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
                                <p className="text-muted-foreground leading-relaxed">C’est l'année d'explosion de l'IA générative aux yeux du grand public avec la sortie de l'incontournable ChatGPT (par l'entreprise OpenAI). Un Choc positif.</p>
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
                            <FlipCard
                                key={i}
                                title={ia.title}
                                img={ia.img}
                                desc={ia.desc}
                                isFlipped={flippedCards[i]}
                                onClick={() => toggleCard(i)}
                            />
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground text-center">Cliquez sur une carte pour la retourner</p>
                </div>
            )}
            {/* Step 2: Accordéons */}
            {step === 2 && (
                <div className="space-y-6">
                    <h1 className="text-4xl font-semibold">Introduction et découverte des outils d'IA</h1>
                    <p className="text-muted-foreground leading-relaxed font-bold">Pour aller plus loin :</p>

                    <div className="border rounded-lg divide-y overflow-hidden">
                        {[
                            {
                                icon: "/y-days/icons/accDoc.svg",
                                label: "Génération de texte",
                                tools: [
                                    { logo: "/y-days/logos/Logo1.png", name: "ChatGPT", desc: "Rédaction, résumé, idées, scripts." },
                                    { logo: "/y-days/logos/Logo2.png", name: "Claude", desc: "Très bon pour les longs textes, l'analyse et les supports de cours." },
                                    { logo: "/y-days/logos/Logo3.png", name: "Gemini", desc: "Texte + multimodal, pratique pour travailler avec des fichiers." },
                                    { logo: "/y-days/logos/Logo4.png", name: "Mistral", desc: "Bon pour la rédaction en français et les usages pro." },
                                    { logo: "/y-days/logos/Logo5.png", name: "Copilot", desc: "Résumés de documents." },
                                ]
                            },
                            {
                                icon: "/y-days/icons/accSearch.svg",
                                label: "Recherche d'informations et sources",
                                tools: [
                                    { logo: "/y-days/logos/Logo6.png/y-days/logos/Logo6.png", name: "Perplexity", desc: "Recherche web sourcée, très utile pour vérifier des infos." },
                                    { logo: "/y-days/logos/Logo7.png", name: "NotebookLM", desc: "Analyse de vos propres documents, citations à l'appui." },
                                    { logo: "/y-days/logos/Logo8.png", name: "You.com", desc: "Recherche assistée par IA avec réponses synthétiques." },
                                ]
                            },
                            {
                                icon: "/y-days/icons/accImage.svg",
                                label: "Génération d'images",
                                tools: [
                                    { logo: "/y-days/logos/Logo9.png", name: "Midjourney", desc: "Génération d'images très qualitative et artistique." },
                                    { logo: "/y-days/logos/Logo1.png", name: "DALL·E", desc: "Génération d'images à partir de texte." },
                                    { logo: "/y-days/logos/Logo11.png", name: "Canva Image IA", desc: "Pratique pour créer vite des visuels intégrés à des designs." },
                                    { logo: "/y-days/logos/Logo12.png", name: "Stable Diffusion", desc: "Très flexible, souvent utilisé en local ou via interfaces." },
                                    { logo: "/y-days/logos/Logo13.png", name: "Adobe Firefly", desc: "Orienté création graphique et usage pro." },
                                ]
                            },
                            {
                                icon: "/y-days/icons/accVideo.svg",
                                label: "Génération de vidéos",
                                tools: [
                                    { logo: "/y-days/logos/Logo14.png", name: "Runway", desc: "Génération et montage vidéo assisté." },
                                    { logo: "/y-days/logos/Logo15.png", name: "Pika Labs", desc: "Génération de vidéos courtes et créatives." },
                                    { logo: "/y-days/logos/Logo16.png", name: "InVideo AI", desc: "Vidéos avec script, voix et sous-titres." },
                                    { logo: "/y-days/logos/Logo17.png", name: "Synthesia", desc: "Vidéos avec avatars IA, utile pour formation." },
                                    { logo: "/y-days/logos/Logo11.png", name: "Canva Video IA", desc: "Simple pour faire des vidéos rapides." },
                                ]
                            },
                            {
                                icon: "/y-days/icons/accMusic.svg",
                                label: "Génération de musique",
                                tools: [
                                    { logo: "/logos/suno.png", name: "Suno", desc: "Chansons complètes à partir d'un texte." },
                                    { logo: "/logos/udio.png", name: "Udio", desc: "Morceaux avec paroles et styles variés." },
                                    { logo: "/logos/loudly.png", name: "Loudly", desc: "Bandes-son personnalisées." },
                                    { logo: "/logos/easymusic.png", name: "Easymusic.ai", desc: "Création musicale personnalisée." },
                                    { logo: "/logos/stableaudio.png", name: "Stable Audio", desc: "Audio général et ambiances sonores." },
                                ]
                            },
                            {
                                icon: "/y-days/icons/accAudio.svg",
                                label: "Génération de voix et d'audio",
                                tools: [
                                    { logo: "/logos/elevenlabs.png", name: "ElevenLabs", desc: "Synthèse vocale très réaliste." },
                                    { logo: "/logos/playht.png", name: "Play.ht", desc: "Narration audio de qualité." },
                                    { logo: "/logos/descript.png", name: "Descript", desc: "Montage audio et vidéo assisté par IA." },
                                ]
                            },
                            {
                                icon: "/y-days/icons/accAutomation.svg",
                                label: "Automatisation",
                                tools: [
                                    { logo: "/logos/zapier.png", name: "Zapier AI", desc: "Automatisation IA entre vos apps." },
                                    { logo: "/logos/make.png", name: "Make", desc: "Workflows visuels sans code." },
                                    { logo: "/logos/n8n.png", name: "n8n", desc: "Automatisation technique et open source." },
                                ]
                            },
                        ].map((section, i) => (
                            <details key={i} className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex items-center gap-3 px-4 py-3.5 cursor-pointer text-sm font-medium bg-background">
                                    <span className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                        <img src={section.icon} alt="" className="w-4 h-4 object-contain" />
                                    </span>
                                    <span className="flex-1">{section.label}</span>
                                    <svg className="transition-transform group-open:rotate-180 text-muted-foreground"
                                        fill="none" height="20" viewBox="0 0 24 24" stroke="currentColor"
                                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </summary>

                                <div className="p-4 bg-muted/40 border-t">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                        {section.tools.map((tool, j) => (
                                            <div key={j} className="bg-background border rounded-lg p-3 flex flex-col items-center gap-2 text-center">
                                                <img src={tool.logo} alt={tool.name} className="w-10 h-10 rounded-xl object-contain" />
                                                <span className="text-xs font-medium leading-tight">{tool.name}</span>
                                                <span className="text-xs text-muted-foreground leading-snug">{tool.desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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