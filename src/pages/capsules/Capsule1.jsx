import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function Capsule1() {
    const [step, setStep] = useState(0)

    return (
        <div className="w-full mx-auto p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            {/* Step 0: Intro */}
            {step === 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Introduction et découverte des outils d’IA</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Jusqu'à récemment, l'informatique classique servait à analyser des données ou automatiser des tâches répétitives. L'IA générative change totalement la donne, et même pour vous.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        L’IA générative est un type d’intelligence artificielle capable de générer du contenu inédit (texte, images, schémas, musiques, code informatique, et bien plus) à partir d’une simple consigne écrite en langage naturel. Cette consigne donnée à l’IA s’appelle un <strong>prompt</strong>.
                    </p>
                </div>
            )}

            {/* Step 1: Le Choc */}
            {step === 1 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">2022 : L'année d’explosion</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        L'IA générative a explosé aux yeux du grand public avec la sortie de l’incontournable ChatGPT (par l’entreprise OpenAI). Un choc positif !
                    </p>
                    <div className="p-4 bg-muted rounded-lg border">
                        <h3 className="font-semibold mb-2">Pourquoi un tel choc ?</h3>
                        <p className="text-sm text-muted-foreground">
                            Pour la première fois, ChatGPT ne répondait pas avec juste des mots clés, mais conversait comme un être humain. Il s’est révélé capable de vous comprendre implicitement, de traduire votre pensée, et même de s’adapter aux contraintes de niveau : le niveau d’un élève de CP par exemple.
                        </p>
                    </div>
                </div>
            )}

            {/* Step 2: Cartes */}
            {step === 2 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">Nos recommandations d'IA</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Claude", desc: "Excellent en génération de texte et de vos supports de cours pédagogique (pdf, word, powerpoint)" },
                            { title: "NotebookLM", desc: "Idéal pour la génération de ressources interactives à partir de vos sources habituelles (manuels scolaires, pdf, ...)" },
                            { title: "Perplexity", desc: "Considérez-le comme un moteur de recherche sous stéroïdes. Il vous livre systématiquement ses sources." }
                        ].map((ia, i) => (
                            <div key={i} className="group relative h-48 w-full [perspective:1000px]">
                                <div className="absolute duration-500 w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                    {/* Front */}
                                    <div className="absolute w-full h-full bg-secondary text-secondary-foreground rounded-xl border p-6 flex items-center justify-center [backface-visibility:hidden]">
                                        <h3 className="text-xl font-bold">{ia.title}</h3>
                                    </div>
                                    {/* Back */}
                                    <div className="absolute w-full h-full bg-primary text-primary-foreground rounded-xl border p-6 flex items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                        <p className="text-sm">{ia.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Accordéons */}
            {step === 3 && (
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

            <div className="mt-8 flex justify-between">
                <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 0}>
                    Précédent
                </Button>

                <Button
                    onClick={() => step < 3 ? setStep(step + 1) : alert("Fin de la capsule 1 !")}>
                    {step < 3 ? "Suivant ->" : "Terminer"}
                </Button>
            </div>
        </div>
    )
}