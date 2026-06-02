import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
// import DragDropGame from "@/features/dragdrop/DragDropGame"
import AssignmentGame from '@/features/dragdrop/DragDropGame copy'
import { ArrowLeft, Check } from "lucide-react"
import FillInTheGaps from '@/features/dragdrop/DragDropGame copy 2'

const BUCKETS = ['Rôle', 'Objectif', 'Limites', 'Exemple']

export default function Capsule2({ onComplete, canResume, onResume, onProgress }) {
    const [step, setStep] = useState(0)
    // const enableNext = true

    const finalStep = 3

    useEffect(() => {
        if (onProgress) {
            onProgress(Math.round((step / 1) * 100)); // 1 est le max steps
        }
    }, [step, onProgress]);

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
        <div className="w-full mx-auto p-6 rounded-xl border bg-card text-card-foreground shadow-sm">

            {/* ROLE Introduction */}
            {step === 0 && (
                <div className="space-y-6">
                    <h1 className="text-4xl font-semibold">Rédiger le bon prompt : La Méthode R.O.L.E.</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        Dans ce module, vous apprendrez à  formuler un prompt professionnel pour générer des ressources pédagogiques pour l'enseignement primaire.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
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
            {/* {step  === 3 && (
                <div className="space-y-6">
                    <p className="block md:hidden text-sm text-muted-foreground">Tapez sur un élément pour le sélectionner depuis le panneau rétractable, puis tapez sur la bonne catégorie                             .</p>
                    <p className="hidden md:hidden text-sm text-muted-foreground">Glissez les éléments dans la bonne catégorie.</p>
                    <AssignmentGame buckets={BUCKETS} initialCards={gameCards[`Game3`]} onProgress={setIsGragAndDropComplete} />
                    
                </div>
            )} */}
            {step === 3 && (
                <div className="space-y-6">
                    {/* <h2 className="text-2xl font-bold tracking-tight">Mini-Jeu : Drag & Drop R.O.L.E</h2> */}
                    <p className="block md:hidden text-sm text-muted-foreground">Tapez sur un élément pour le sélectionner depuis le panneau rétractable, puis tapez sur la bonne catégorie                             .</p>
                    <p className="hidden md:hidden text-sm text-muted-foreground">Glissez les éléments dans la bonne catégorie.</p>
                    {/* <AssignmentGame buckets={BUCKETS} initialCards={gameCards["Game0"]} onComplete={() => alert("Good job!")} onProgress={setIsGragAndDropComplete} /> */}
                    <FillInTheGaps promptText={gameCards["Game3FillInTheGaps"].promptText} initialCards={gameCards["Game3FillInTheGaps"].initialCards} onProgress={setIsGragAndDropComplete} />

                </div>
            )}

            {/* Button bar. */}
            <div className="mt-15 flex justify-between">
                {step > 0 ? (
                    <Button variant="outline" onClick={() => setStep(step - 1)}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Précédent
                    </Button>
                ) : (
                    <div />
                )}

                <div className="flex gap-4">
                    {canResume && (
                        <Button variant="outline" onClick={onResume}>
                            Reprendre où j'en étais
                        </Button>
                    )}

                    <span
                        className={`group relative ${isNextDisabled ? "cursor-not-allowed inline-block" : "inline-block"}`}
                    >
                        {isNextDisabled && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-row justify-center items-center px-[12px] py-[6px] gap-[8px] isolate w-[201px] max-w-[384px] h-[44px] bg-[#171717] rounded-[8px] text-white text-xs text-center z-50 pointer-events-none shadow-lg">
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