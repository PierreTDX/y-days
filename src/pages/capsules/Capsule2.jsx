import { useState } from 'react'
import { Button } from "@/components/ui/button"
import DragDropGame from "@/features/dragdrop/DragDropGame"

const BUCKETS = ['Rôle', 'Objectif', 'Limites', 'Exemple']

export default function Capsule2({ onComplete }) {
    const [step, setStep] = useState(0)

    const gameCards = [
        { id: 'c1', text: 'Tu es un professeur expérimenté du CE2.', answer: 'Rôle' },
        { id: 'c2', text: 'Crée une séance de 45 minutes pour introduire les fractions.', answer: 'Objectif' },
        { id: 'c3', text: 'Utilise du matériel manipulable, évite les écrans.', answer: 'Limites' },
        { id: 'c4', text: 'Structure la réponse ainsi : 1. Intro... 4 fiches max.', answer: 'Exemple' },
        { id: 'c5', text: 'Pas plus de 100 mots.', answer: 'Limites' }
    ]

    return (<>
        <div className="w-full mx-auto p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
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

            {step === 1 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">Mini-Jeu : Drag & Drop R.O.L.E</h2>
                    <p className="block md:hidden text-sm text-muted-foreground">Tapez sur un élément pour le sélectionner depuis le panneau rétractable, puis tapez sur la bonne catégorie                             .</p>
                    <p className="hidden md:hidden text-sm text-muted-foreground">Glissez les éléments dans la bonne catégorie.</p>
                    <DragDropGame buckets={BUCKETS} initialCards={gameCards} />
                </div>
            )}

            <div className="mt-8 flex justify-between">
                <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 0}>
                    Précédent
                </Button>

                <Button onClick={() => step < 1 ? setStep(step + 1) : onComplete?.()}>
                    {step < 1 ? "Suivant ->" : "Terminer"}
                </Button>
            </div>
        </div>
    </>)
}