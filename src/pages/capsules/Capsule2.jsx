import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
// import DragDropGame from "@/features/dragdrop/DragDropGame"
import AssignmentGame from '@/features/dragdrop/DragDropGame copy'
import { ArrowLeft, Check, MoveDiagonal } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm'

const badgeColors = [
    {
        "title": "Rôle",
        "use": "Assignez un rôle à l'IA, elle doit savoir quelle posture adopter.",
        "example": "Tu es un professeur expérimenté du CE2",
        "css": {
            "background": "bg-[#eae0f9]",
            "border": "border border-[#dbcbf5]",
            "container": "border border-l-[#a076e4]",
            "text": "text-[#a076e4]"
        },
    },
    {
        "title": "Objectif",
        "use": "Dites-lui de façon précise et explicite ce qu'elle doit faire.",
        "example": "Crée une séance de 45 minutes pour introduire les fractions.",
        "css": {
            "background": "bg-[#f7f0d5]",
            "border": "border border-[#f7eab6]",
            "container": "border border-l-[#cdaf37]",
            "text": "text-[#cdaf37]"
        },
    },
    {
        "title": "Limites",
        "use": "Déterminez un cadre précis pour qu'elle génère une réponse exacte et professionnelle.",
        "example": "Utilise du matériel manipulable, évite les écrans.",
        "css": {
            "background": "bg-[#fadad4]",
            "border": "border border-[#f6c0b6]",
            "container": "border border-l-[#e75a3d]",
            "text": "text-[#e75a3d]"
        },
    },
    {
        "title": "Exemple",
        "use": "Donnez-lui un exemple concret pour l'aider à se situer et guidez-là au mieux.",
        "example": "Structure la réponse ainsi : 1. Introduction (2 min), 2. Règles de flaction (15 min), 3. Exemples (10 min), 4. Exercices d'application (15 min). L'enssemble doit tenir sur 5 fiches de cours maximum.",
        "css": {
            "background": "bg-[#f8f7fb]",
            "border": "border border-[#dddceb]",
            "container": "border border-l-[#56549c]",
            "text": "text-[#56549c]"
        },
    },
]



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
            { id: 'c1', text: "Tu es un professeur expérimenté du CE2.", answer: 'Rôle' },
            { id: 'c2', text: "Crée une séance de 45 minutes pour introduire les fractions.", answer: 'Objectif' },
            { id: 'c3', text: "Utilise du matériel manipulable, évite les écrans.", answer: 'Limites' },
            { id: 'c4', text: "Structure la réponse ainsi : 1. Intro... 4 fiches max.", answer: 'Exemple' },
        ],
        "Game1": [
            { id: 'c1', text: "Tu es un enseignant d'école primaire en classe de CM2 depuis 12 ans.", answer: 'Rôle' },
            { id: 'c2', text: "Rédige un conte sur les canards.", answer: 'Objectif' },
            { id: 'c3', text: "Utilise un vocabulaire adapté aux élèves de 5 ans.", answer: 'Limites' },
            { id: 'c4', text: "Le tout doit tenir sur une demi fiche.", answer: 'Exemple' },
        ],
        "Game2": [
            { id: 'c1', text: "Tu es un enseignant de primaire en classe de CE1 depuis 3 ans.", answer: 'Rôle' },
            { id: 'c2', text: "Écris un récit historique sur l'Égypte ancienne.", answer: 'Objectif' },
            { id: 'c3', text: "Utilise un vocabulaire précis adapté aux élèves de 10 ans.", answer: 'Limites' },
            { id: 'c4', text: "Le texte doit tenir sur une page et demie.", answer: 'Exemple' },
        ],
        "Game3": [
            { id: 'c1', text: "Tu es un cuisinier de primaire en classe de CE1 depuis 3 ans.", answer: 'Rôle' },
            { id: 'c2', text: "Rédige une recette de salade de fruits.", answer: 'Objectif' },
            { id: 'c3', text: "Utilise un vocabulaire simple adapté aux élèves de 6 ans.", answer: 'Limites' },
            { id: 'c4', text: "Le texte doit tenir sur une fiche.", answer: 'Exemple' },
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
        <div className="w-full mx-auto rounded-xl border bg-card text-card-foreground shadow-sm flex flex-1 flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-3 sm:p-6">

                {/* ROLE Introduction */}
                {step === 0 && (
                    <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
                        {/* LEFT SIDE */}
                        <div className="space-y-6 order-1 lg:order-2">
                            <h1 className="text-xl sm:text-4xl font-semibold">Rédiger le bon prompt : La Méthode R.O.L.E.</h1>
                            <p className="text-muted-foreground text-sm sm:text-base">
                                Dans ce module, vous apprendrez à  formuler un prompt professionnel pour générer des ressources pédagogiques pour l'enseignement primaire.
                            </p>
                            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                <span style={{ fontWeight: 'bold' }}>Contenu théorique (lecture légère) : </span>
                                Pour obtenir une fiche de préparation ou une séquence de qualité, un bon prompt doit contenir nécessairement 4 éléments clés :
                                <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}> R.O.L.E</span>
                            </p>

                            <div className="grid gap-4">
                                {badgeColors.map((badge) => (
                                    <div className={`p-4 border rounded-lg border-l-4 ${badge.css.container} bg-muted/50`}>
                                        <div className="flex gap-4">
                                            <div className={`shrink-0 w-10 h-10 rounded-md flex items-center justify-center font-semibold ${badge.css.background} ${badge.css.text} ${badge.css.border}`}>
                                                {badge.title.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg mb-1">{badge.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-2">{badge.use}</p>
                                                <p className="text-sm italic">Exemple : « {badge.example} »</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* RIGHT SIDE */}
                        <div className="space-y-6 order-2 lg:order-2">
                            <Dialog>
                                <div className="border rounded-xl p-4 bg-background shadow-sm">
                                    <h3 className="font-semibold text-lg">Résultat</h3>

                                    <p className="text-sm text-muted-foreground mb-4">
                                        Voici ce que l'IA a généré avec ce prompt :
                                    </p>

                                    <DialogTrigger asChild>
                                        <button className="w-full text-left">
                                            <div className="relative overflow-hidden border rounded-lg max-h-[70dvh] bg-white cursor-pointer hover:ring-2 hover:ring-primary transition">
                                                <img src={`/y-days/images/promptDemo.png`} alt="Preview" className="max-w-full h-auto" />
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-md p-1 shadow-sm">
                                                    <MoveDiagonal className="w-4 h-4 text-slate-600" />
                                                </div>
                                            </div>
                                        </button>
                                    </DialogTrigger>
                                </div>

                                <DialogContent className="!max-w-[95vw] max-h-[95vh] overflow-auto">
                                    <img src={`/y-days/images/promptDemo.png`} alt="Preview" className="max-w-full h-auto" />
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
                        <AssignmentGame buckets={badgeColors} initialCards={gameCards[`Game1`]} onProgress={setIsGragAndDropComplete} />

                    </div>
                )}
                {step === 2 && (
                    <div className="space-y-6">
                        {/* <h2 className="text-2xl font-bold tracking-tight">Mini-Jeu : Drag & Drop R.O.L.E</h2> */}
                        {/* <p className="block md:hidden text-sm text-muted-foreground">Tapez sur un élément pour le sélectionner depuis le panneau rétractable, puis tapez sur la bonne catégorie                             .</p>
                    <p className="hidden md:hidden text-sm text-muted-foreground">Glissez les éléments dans la bonne catégorie.</p> */}
                        {/* <AssignmentGame buckets={BUCKETS} initialCards={gameCards["Game0"]} onComplete={() => alert("Good job!")} onProgress={setIsGragAndDropComplete} /> */}
                        <AssignmentGame buckets={badgeColors} initialCards={gameCards[`Game2`]} onProgress={setIsGragAndDropComplete} />

                    </div>
                )}
                {step === 3 && (
                    <div className="space-y-6">
                        {/* <p className="block md:hidden text-sm text-muted-foreground">Tapez sur un élément pour le sélectionner depuis le panneau rétractable, puis tapez sur la bonne catégorie                             .</p>
                    <p className="hidden md:hidden text-sm text-muted-foreground">Glissez les éléments dans la bonne catégorie.</p> */}
                        <AssignmentGame buckets={badgeColors} initialCards={gameCards[`Game3`]} onProgress={setIsGragAndDropComplete} />

                    </div>
                )}
                {/* {step  === 3 && (
                <div className="space-y-6">
                    <p className="block md:hidden text-sm text-muted-foreground">Tapez sur un élément pour le sélectionner depuis le panneau rétractable, puis tapez sur la bonne catégorie                             .</p>
                    <p className="hidden md:hidden text-sm text-muted-foreground">Glissez les éléments dans la bonne catégorie.</p>
                    <FillInTheGaps promptText={gameCards["Game3FillInTheGaps"].promptText} initialCards={gameCards["Game3FillInTheGaps"].initialCards} onProgress={setIsGragAndDropComplete} />
                </div>
            )} */}

            </div>
            {/* Button bar. */}
            <div className="p-3 sm:p-6 border-t sm:border-none bg-card shrink-0 flex gap-3 sm:justify-end">

                <div className="flex gap-3 sm:gap-4 flex-1 sm:flex-none w-full sm:w-auto">
                    {canResume && (
                        <Button className="flex-1 sm:flex-none" variant="outline" onClick={onResume}>
                            Reprendre où j'en étais
                        </Button>
                    )}

                    <span
                        tabIndex={isNextDisabled ? 0 : undefined}
                        className={`group relative flex-1 sm:flex-none flex sm:inline-block ${isNextDisabled ? "cursor-not-allowed focus:outline-none" : ""}`}
                    >
                        {isNextDisabled && (
                            <div className="absolute bottom-full left-0 -translate-x-1/2 mb-2 hidden group-hover:flex group-focus:flex group-active:flex flex-row justify-center items-center px-[12px] py-[6px] gap-[8px] isolate w-[201px] max-w-[384px] h-[44px] bg-[#171717] rounded-[8px] text-white text-xs text-center z-50 pointer-events-none shadow-lg">
                                Explorez cette étape pour continuer
                            </div>
                        )}
                        <Button
                            disabled={isNextDisabled}
                            className={`w-full sm:w-auto ${isNextDisabled ? "pointer-events-none" : ""}`}
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