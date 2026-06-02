import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

export default function Capsule3({ onComplete, canResume, onResume }) {
    const [step, setStep] = useState(0)
    const [gameResult, setGameResult] = useState(null)
    const navigate = useNavigate()

    const handleGuess = (isCorrect) => {
        setGameResult(isCorrect)
        // Ici vous pourrez jouer un son d'échec ou de succès
    }

    return (
        <div className="w-full mx-auto p-6 rounded-xl border bg-card text-card-foreground shadow-sm">

            {step === 0 && (
                <div className="space-y-6 text-center">
                    <h1 className="text-4xl font-semibold">IA ou Humain ?</h1>
                    <p className="text-muted-foreground">Saurez-vous démêler le vrai du faux à l'ère de l'IA ?</p>

                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground mb-6 overflow-hidden relative">
                        {/* Placeholder pour une image ou texte */}
                        <p className="p-8 italic">"À Houston, jeudi 18 avril. 20 h. Questions-réponses, comédie, discussion..."</p>

                        {gameResult !== null && (
                            <div className={`absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm ${gameResult ? 'text-green-500' : 'text-red-500'}`}>
                                <span className="text-4xl font-bold">{gameResult ? '✅ Bonne réponse !' : '❌ Mauvaise réponse...'}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Button onClick={() => handleGuess(true)} size="lg" className="w-32">Humain</Button>
                        <Button onClick={() => handleGuess(false)} size="lg" variant="secondary" className="w-32">IA</Button>
                    </div>
                </div>
            )}

            {step === 1 && (
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Remise en question</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        Comme on l’a vu dans le jeu précédent, l’IA est en capacité de produire du contenu bluffant et réaliste. Il est donc important de toujours remettre en question le contenu que l’on voit et que l'on produit.
                    </p>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Vérifier ses sources avec Perplexity</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        Il est possible d’utiliser Perplexity pour vérifier des sources et comparer entre plusieurs sites internet lorsqu’il s’agit de données chiffrées.
                    </p>
                    <div className="p-4 bg-muted/50 rounded-lg border text-sm">
                        💡 <strong>Note :</strong> Les détecteurs d’IA sont une solution, mais gardez en tête qu’ils ne sont pas précis et qu’ils ont une marge d’erreur importante.
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Repérer les détails générés par l'IA</h1>
                    <p className="text-muted-foreground leading-relaxed">Concernant les contenus multimédias, il faut regarder les petits détails souvent situés en arrière-plan :</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                        <li>Le bras d'un personnage semble "fondu" dans un objet.</li>
                        <li>Des formes irrégulières dans des géométries simples (clôtures, fenêtres).</li>
                        <li>Des asymétries illogiques ou des textes flous/incompréhensibles en fond.</li>
                    </ul>
                </div>
            )}

            {step === 4 && (
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Et pour le son ?</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        Pour les sons et les voix, écoutez attentivement la tonalité. Il y a presque toujours des moments où l’IA aura une inflexion ou un rythme de voix qui ne semble pas naturel (respirations absentes ou étranges).
                    </p>
                </div>
            )}

            <div className="mt-8 flex justify-between">
                {step > 0 ? (
                    <Button variant="outline" onClick={() => setStep(step - 1)}>
                        {"<- Précédent"}
                    </Button>
                ) : (
                    <div />
                )}

                {canResume && (
                    <Button variant="outline" onClick={onResume}>
                        Reprendre où j'en étais
                    </Button>
                )}

                <Button onClick={() => {
                    if (step < 4) {
                        setStep(step + 1)
                    } else {
                        onComplete?.()
                        navigate('/result')
                    }
                }}>
                    {step < 4 ? "Suivant ->" : "Terminer"}
                </Button>
            </div>
        </div>
    )
}