import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function Capsule2() {
    const [step, setStep] = useState(0)

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            {step === 0 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">Rédiger le bon prompt : La Méthode R.O.L.E.</h2>
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
                    <p className="text-sm text-muted-foreground">Glissez les éléments dans la bonne catégorie (Squelette à implémenter avec une librairie DnD).</p>

                    <div className="flex gap-4 mb-8 p-4 bg-muted rounded-lg justify-center">
                        {/* Mots à glisser (Mocks) */}
                        <div className="px-4 py-2 bg-background border shadow-sm rounded cursor-move">"Tu es un expert..."</div>
                        <div className="px-4 py-2 bg-background border shadow-sm rounded cursor-move">"Fais un résumé..."</div>
                        <div className="px-4 py-2 bg-background border shadow-sm rounded cursor-move">"Pas plus de 100 mots"</div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Rôle', 'Objectif', 'Limites', 'Exemple'].map(letter => (
                            <div key={letter} className="h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-muted/20">
                                <span className="font-bold text-lg">{letter}</span>
                                <span className="text-xs">Déposer ici</span>
                            </div>
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

                <Button onClick={() => step < 1 ? setStep(step + 1) : alert("Fin de la capsule 2 !")}>
                    {step < 1 ? "Suivant ->" : "Terminer"}
                </Button>
            </div>
        </div>
    )
}