import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import DragDropGame from "@/features/dragdrop/DragDropGame"
import AssignmentGame from '@/features/dragdrop/DragDropGame copy'
import { ArrowLeft, ArrowRight } from "lucide-react"

const BUCKETS = ['Rôle', 'Objectif', 'Limites', 'Exemple']

export default function Capsule2({ onComplete, canResume, onResume, onProgress }) {
    const [step, setStep] = useState(0)
    // const enableNext = true

    const finalStep = 1

    useEffect(() => {
        if (onProgress) {
            onProgress(Math.round((step / 1) * 100)); // 1 est le max steps
        }
    }, [step, onProgress]);

    const gameCards = [
        { id: 'c1', text: 'Tu es un professeur expérimenté du CE2.', answer: 'Rôle' },
        { id: 'c2', text: 'Crée une séance de 45 minutes pour introduire les fractions.', answer: 'Objectif' },
        { id: 'c3', text: 'Utilise du matériel manipulable, évite les écrans.', answer: 'Limites' },
        { id: 'c4', text: 'Structure la réponse ainsi : 1. Intro... 4 fiches max.', answer: 'Exemple' },
        // { id: 'c5', text: 'Pas plus de 100 mots.', answer: 'Limites' }
    ]
    
    const [isGragAndDropComplete, setIsGragAndDropComplete] = useState(false)

    const isNextDisabled = (
        false
        || (step === 1 && isGragAndDropComplete === false)
        // || (step === 2 && openedAccordions.length < 3)
    );


    return (<>
        <div className="w-full mx-auto p-6 rounded-xl border bg-card text-card-foreground shadow-sm">

            {/* ROLE Introduction */}
            {step === 0 && (
                <div className="space-y-6">
                    <h1 className="text-4xl font-semibold">Rédiger le bon prompt : La Méthode R.O.L.E.</h1>
                    <p className="text-muted-foreground">
                        Pour obtenir une fiche de préparation ou une séquence de qualité, un bon prompt doit contenir 4 éléments clés.
                    </p>

                    <div className="grid gap-4">
                        <div className="p-4 border rounded-lg border-l-4 border-l-primary bg-muted/50">
                            <h3 className="font-bold text-lg mb-1">R - Rôle</h3>
                            <p className="text-sm text-muted-foreground mb-2">Assigner une posture à l’IA.</p>
                            <p className="text-sm italic">Exemple : « Tu es un professeur expérimenté du CE2. »</p>
                        </div>
                        <div className="p-4 border rounded-lg border-l-4 border-l-primary bg-muted/50">
                            <h3 className="font-bold text-lg mb-1">O - Objectif</h3>
                            <p className="text-sm text-muted-foreground mb-2">Ce qu’il doit faire de façon précise.</p>
                            <p className="text-sm italic">Exemple : « Crée une séance de 45 minutes pour introduire les fractions. »</p>
                        </div>
                        <div className="p-4 border rounded-lg border-l-4 border-l-primary bg-muted/50">
                            <h3 className="font-bold text-lg mb-1">L - Limites</h3>
                            <p className="text-sm text-muted-foreground mb-2">Donner un cadre précis.</p>
                            <p className="text-sm italic">Exemple : « Utilise du matériel manipulable, évite les écrans. »</p>
                        </div>
                        <div className="p-4 border rounded-lg border-l-4 border-l-primary bg-muted/50">
                            <h3 className="font-bold text-lg mb-1">E - Exemple</h3>
                            <p className="text-sm text-muted-foreground mb-2">Un exemple concret pour guider.</p>
                            <p className="text-sm italic">Exemple : « Structure la réponse ainsi : 1. Intro... 4 fiches max. »</p>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Drag n Drop Game */}
            {step === 1 && (
                <div className="space-y-6">
                    {/* <h2 className="text-2xl font-bold tracking-tight">Mini-Jeu : Drag & Drop R.O.L.E</h2> */}
                    <p className="block md:hidden text-sm text-muted-foreground">Tapez sur un élément pour le sélectionner depuis le panneau rétractable, puis tapez sur la bonne catégorie                             .</p>
                    <p className="hidden md:hidden text-sm text-muted-foreground">Glissez les éléments dans la bonne catégorie.</p>
                    {/* <DragDropGame buckets={BUCKETS} initialCards={gameCards} /> */}
                    {/* <AssignmentGame buckets={BUCKETS} initialCards={gameCards} onComplete={() => alert("Good job!")} /> */}
                    <AssignmentGame buckets={BUCKETS} initialCards={gameCards} onComplete={() => alert("Good job!")} onProgress={setIsGragAndDropComplete} />
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
                                <>Suivant <ArrowRight className="w-4 h-4 ml-2" /></>
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