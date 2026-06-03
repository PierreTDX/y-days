import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
// import DragDropGame from "@/features/dragdrop/DragDropGame"
import AssignmentGame from '@/features/dragdrop/DragDropGame copy'
import { ArrowLeft, Check } from "lucide-react"
import FillInTheGaps from '@/features/dragdrop/DragDropGame copy 2'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks';
import fileContent from "./prompt-result-exemple.md?raw"
import remarkGfm from 'remark-gfm'

const BUCKETS = ['Rôle', 'Objectif', 'Limites', 'Exemple']

export default function Capsule2({ onComplete, canResume, onResume, onProgress }) {
    const [step, setStep] = useState(0)
    // const enableNext = true

    const finalStep = 3

    useEffect(() => {
        if (onProgress) {
            onProgress(Math.round((step / finalStep) * 100));
        }
    }, [step, finalStep, onProgress]);

    const gameCards = {
        "Game0": [
            { id: 'c1', text: 'Tu es un professeur expérimenté du CE2.', answer: 'Rôle' },
            { id: 'c2', text: 'Crée une séance de 45 minutes pour introduire les fractions.', answer: 'Objectif' },
            { id: 'c3', text: 'Utilise du matériel manipulable, évite les écrans.', answer: 'Limites' },
            { id: 'c4', text: 'Structure la réponse ainsi : 1. Intro... 4 fiches max.', answer: 'Exemple' },
        ],
        "Game1": [
            { id: 'c1', text: 'Tu es une maîtresse de primaire en classe de CI depuis 4 ans.', answer: 'Rôle' },
            { id: 'c2', text: 'Rédige un conte sur les canards.', answer: 'Objectif' },
            { id: 'c3', text: 'Utilise un vocabulaire adapté aux élèves de 5 ans', answer: 'Limites' },
            { id: 'c4', text: 'Le tout doit tenir sur une demi fiche.', answer: 'Exemple' },
        ],
        "Game2": [
            { id: 'c1', text: 'Tu es un enseignant d’hisoire certifié d’école primaire en classe de CM2 depuis 12 années.', answer: 'Rôle' },
            { id: 'c2', text: 'Écris un récit historique sur l’Égypte ancienne.', answer: 'Objectif' },
            { id: 'c3', text: 'Utilise un vocabulaire précis adapté aux élèves de 10 ans.', answer: 'Limites' },
            { id: 'c4', text: 'Le texte doit tenir sur une page et demie.', answer: 'Exemple' },
        ],
        "Game3": [
            { id: 'c1', text: 'Tu es un cuisinier de primaire en classe de CE1 depuis 3 ans.', answer: 'Rôle' },
            { id: 'c2', text: 'Rédige une recette de salade de fruits.', answer: 'Objectif' },
            { id: 'c3', text: 'Utilise un vocabulaire simple adapté aux élèves de 6 ans.', answer: 'Limites' },
            { id: 'c4', text: 'Le texte doit tenir sur une fiche.', answer: 'Exemple' },
        ],
        "Game3FillInTheGaps": {
            promptText: `**Role:**       Tu est un {{ROLE}} de {{LEVEL}} en classe de {{CLASS}} depuis {{DURATION}}.  
                **Objective:**  {{ACTION}} une {{RESOURCE}} de {{OBJECT}}.  
                **Constraint:** Utilise un {{CONSTRAINT}} adapté aux élèves de {{AGE}}.  
                **Example:**    Le texte doit {{EXAMPLE}} sur {{SIZE}}.
            `,
            initialCards: [
                { id: "1", text: "cuisinier", answer: "ROLE" },
                { id: "2", text: "primaire", answer: "LEVEL" },
                { id: "3", text: "CE1", answer: "CLASS" },
                { id: "4", text: "12 années", answer: "DURATION" },
                { id: "5", text: "écris", answer: "ACTION" },
                { id: "6", text: "recette de salade de fruits", answer: "RESOURCE" },
                { id: "7", text: "vocabulaire simple", answer: "OBJECT" },
                { id: "8", text: "vocabulaire précis adapté aux élèves de 10 ans", answer: "CONSTRAINT" },
                { id: "9", text: "6 ans", answer: "AGE" },
                { id: "10", text: "tenir", answer: "EXAMPLE" },
                { id: "11", text: "une fiche", answer: "SIZE" }
            ]
        }
    }


    const [isGragAndDropComplete, setIsGragAndDropComplete] = useState(false)

    const isNextDisabled = (
        false
        || (step >= 1 && step <= 3 && isGragAndDropComplete === false)
        // || (step === 2 && openedAccordions.length < 3)
    );


    return (<>
        <div className="w-full mx-auto p-3 sm:p-6 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-1 flex-col h-full overflow-y-auto">

            {/* ROLE Introduction */}
            {step === 0 && (
                <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
                    {/* LEFT SIDE */}
                    <div className="space-y-6">
                        <h1 className="text-xl sm:text-4xl font-semibold">Rédiger le bon prompt : La Méthode R.O.L.E.</h1>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            Dans ce module, vous apprendrez à  formuler un prompt professionnel pour générer des ressources pédagogiques pour l'enseignement primaire.
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                            <span style={{ fontWeight: 'bold' }}>Contenu théorique (Lecture légère):</span>
                            Pour obtenir une fiche de préparation ou une séquence de qualité, un bon prompt doit contenir nécessairement 4 éléments clés:
                            <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>R.O.L.E</span>
                        </p>

                        <div className="grid gap-4">
                            <div className="p-4 border rounded-lg border-l-4 border-l-primary bg-muted/50">
                                <h3 className="font-bold text-lg mb-1">R - Rôle</h3>
                                <p className="text-sm text-muted-foreground mb-2">Vous devez assigner un rôle à l’IA. Elle doit savoir dans quelle posture elle doit adopter.</p>
                                <p className="text-sm italic">Exemple : « Tu es un professeur expérimenté du CE2. »</p>
                            </div>
                            <div className="p-4 border rounded-lg border-l-4 border-l-primary bg-muted/50">
                                <h3 className="font-bold text-lg mb-1">O - Objectif</h3>
                                <p className="text-sm text-muted-foreground mb-2">Vous devez lui dire ce qu’elle doit faire de façon précise et explicite mais avec simplicité.</p>
                                <p className="text-sm italic">Exemple : « Crée une séance de 45 minutes pour introduire les fractions. »</p>
                            </div>
                            <div className="p-4 border rounded-lg border-l-4 border-l-primary bg-muted/50">
                                <h3 className="font-bold text-lg mb-1">L - Limites</h3>
                                <p className="text-sm text-muted-foreground mb-2">Vous devrez lui donner un cadre précis pour générer une réponse exacte et professionnelle.  </p>
                                <p className="text-sm italic">Exemple : « Utilise du matériel manipulable (jetons, bandes de papier) uniquement, évite les écrans. »</p>
                            </div>
                            <div className="p-4 border rounded-lg border-l-4 border-l-primary bg-muted/50">
                                <h3 className="font-bold text-lg mb-1">E - Exemple</h3>
                                <p className="text-sm text-muted-foreground mb-2">Vous devrez donner un exemple concret à l’IA pour l’aider à se situer et la guider au mieux.  </p>
                                <p className="text-sm italic">Exemple : « Structure la réponse ainsi : 1. Introduction (2 min), 2. Règles de flaction (15 min), 3. Exemples (10 min), 4. Exercices d’application (15 min). L’enssemble doit tenir sur 5 fiches de cours maximum »</p>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT SIDE */}
                    <div>
                        <Dialog>
                            <div className="border rounded-xl p-4 bg-background shadow-sm">
                                <h3 className="font-semibold text-lg">Résultat</h3>

                                <p className="text-sm text-muted-foreground mb-4">
                                    Voici ce que l’IA a généré avec ce prompt :
                                </p>

                                <DialogTrigger asChild>
                                    <button className="w-full text-left">
                                        <div className="overflow-hidden border rounded-lg max-h-[70dvh] bg-white cursor-pointer hover:ring-2 hover:ring-primary transition">
                                            <div
                                                className="origin-top-left pointer-events-none h-full"
                                                style={{
                                                    transform: "scale(0.75)",
                                                    width: `${100 / 0.75}%`,
                                                }}
                                            >
                                                <PromptDemo />
                                            </div>
                                        </div>
                                    </button>
                                </DialogTrigger>
                            </div>

                            <DialogContent className="!max-w-[90vw] w-fit h-[90dvh] overflow-auto">
                                <PromptDemo />
                            </DialogContent>
                        </Dialog>

                    </div>
                </div>
            )}

            {/* Drag n Drop Game */}
            {step === 1 && (
                <div className="space-y-6">
                    {/* <h2 className="text-2xl font-bold tracking-tight">Mini-Jeu : Drag & Drop R.O.L.E</h2> */}
                    {/* <p className="block md:hidden text-sm text-muted-foreground">Tapez sur un élément pour le sélectionner depuis le panneau rétractable, puis tapez sur la bonne catégorie                             .</p>
                    <p className="hidden md:hidden text-sm text-muted-foreground">Glissez les éléments dans la bonne catégorie.</p> */}
                    {/* <AssignmentGame buckets={BUCKETS} initialCards={gameCards["Game0"]} onComplete={() => alert("Good job!")} onProgress={setIsGragAndDropComplete} /> */}
                    <AssignmentGame buckets={BUCKETS} initialCards={gameCards[`Game1`]} onProgress={setIsGragAndDropComplete} />

                </div>
            )}
            {step === 2 && (
                <div className="space-y-6">
                    {/* <h2 className="text-2xl font-bold tracking-tight">Mini-Jeu : Drag & Drop R.O.L.E</h2> */}
                    <p className="block md:hidden text-sm text-muted-foreground">Tapez sur un élément pour le sélectionner depuis le panneau rétractable, puis tapez sur la bonne catégorie                             .</p>
                    <p className="hidden md:hidden text-sm text-muted-foreground">Glissez les éléments dans la bonne catégorie.</p>
                    {/* <AssignmentGame buckets={BUCKETS} initialCards={gameCards["Game0"]} onComplete={() => alert("Good job!")} onProgress={setIsGragAndDropComplete} /> */}
                    <AssignmentGame buckets={BUCKETS} initialCards={gameCards[`Game2`]} onProgress={setIsGragAndDropComplete} />

                </div>
            )}
            {step === 3 && (
                <div className="space-y-6">
                    <p className="block md:hidden text-sm text-muted-foreground">Tapez sur un élément pour le sélectionner depuis le panneau rétractable, puis tapez sur la bonne catégorie                             .</p>
                    <p className="hidden md:hidden text-sm text-muted-foreground">Glissez les éléments dans la bonne catégorie.</p>
                    <AssignmentGame buckets={BUCKETS} initialCards={gameCards[`Game3`]} onProgress={setIsGragAndDropComplete} />

                </div>
            )}
            {/* {step  === 3 && (
                <div className="space-y-6">
                    <p className="block md:hidden text-sm text-muted-foreground">Tapez sur un élément pour le sélectionner depuis le panneau rétractable, puis tapez sur la bonne catégorie                             .</p>
                    <p className="hidden md:hidden text-sm text-muted-foreground">Glissez les éléments dans la bonne catégorie.</p>
                    <FillInTheGaps promptText={gameCards["Game3FillInTheGaps"].promptText} initialCards={gameCards["Game3FillInTheGaps"].initialCards} onProgress={setIsGragAndDropComplete} />
                </div>
            )} */}

            {/* Button bar. */}
            <div className="sticky -bottom-0 mt-auto pt-15 flex justify-end">

                <div className="flex gap-4">
                    {canResume && (
                        <Button variant="outline" onClick={onResume}>
                            Reprendre où j'en étais
                        </Button>
                    )}

                    <span
                        tabIndex={isNextDisabled ? 0 : undefined}
                        className={`group relative ${isNextDisabled ? "cursor-not-allowed inline-block focus:outline-none" : "inline-block"}`}
                    >
                        {isNextDisabled && (
                            <div className="absolute bottom-full left-0 -translate-x-1/2 mb-2 hidden group-hover:flex group-focus:flex group-active:flex flex-row justify-center items-center px-[12px] py-[6px] gap-[8px] isolate w-[201px] max-w-[384px] h-[44px] bg-[#171717] rounded-[8px] text-white text-xs text-center z-50 pointer-events-none shadow-lg">
                                Explorez cette étape pour continuer
                            </div>
                        )}
                        <Button
                            disabled={isNextDisabled}
                            className={isNextDisabled ? "pointer-events-none" : ""}
                            onClick={() => step < finalStep ? setStep(step + 1) : onComplete?.()}>
                            {step < finalStep ? (
                                <>Valider <Check className="w-4 h-4 ml-2" /></>
                            ) : (
                                "Terminer"
                            )}
                        </Button>
                    </span>
                </div>
            </div>
        </div>
    </>)
}

function PromptDemo() {
    return (
        <ReactMarkdown
            // className="bg-white p-8"
            components={{
                h1: ({ children }) => (
                    <h1 className="text-xl sm:text-4xl font-bold mb-3">
                        {children}
                    </h1>
                ),

                h2: ({ children }) => (
                    <div className="border-b-4 border-blue-500 mb-3 pb-1 font-semibold text-blue-600 text-xl">
                        {children}
                    </div>
                ),

                h3: ({ children }) => (
                    <h3 className="font-bold text-lg mb-1 mt-3">
                        {children}
                    </h3>
                ),

                p: ({ children }) => (
                    <p className="leading-6 mb-2">
                        {children}
                    </p>
                ),

                ul: ({ children }) => (
                    <ul className="list-disc ml-6 space-y-0.5">
                        {children}
                    </ul>
                ),

                li: ({ children }) => (
                    <li>{children}</li>
                ),

                table: ({ children }) => (
                    <div className="my-6 border">
                        <table className="border-collapse">
                            {children}
                        </table>
                    </div>
                ),

                thead: ({ children }) => (
                    <thead className="bg-muted">
                        {children}
                    </thead>
                ),

                tr: ({ children }) => (
                    <tr>
                        {children}
                    </tr>
                ),

                th: ({ children }) => (
                    <th className="p-4 border-r text-left font-bold last:border-r-0">
                        {children}
                    </th>
                ),

                td: ({ children }) => (
                    <td className="p-2 border-r last:border-r-0 align-top">
                        {children}
                    </td>
                ),
            }}
            remarkPlugins={[remarkGfm, remarkBreaks]}>
            {fileContent}
        </ReactMarkdown>
    )
}