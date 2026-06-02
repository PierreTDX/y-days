import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from "lucide-react"
import { QuizCard } from "@/components/ui/quiz-card"

export default function Capsule3({ onComplete, canResume, onResume, onProgress }) {
    const [step, setStep] = useState(0)
    const [gameResult, setGameResult] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (onProgress) {
            onProgress(Math.round((step / 5) * 100)); // 5 est le max steps
        }
    }, [step, onProgress]);

    const QUIZ_STEPS = [
        {
            question: "D’après toi, cette peinture a-t-elle été générée par IA?",
            mediaClassName: "aspect-video bg-muted max-h-[320px]",
            media: <img src="/y-days/images/Question_1.jpg" alt="Peinture à deviner" className="object-cover w-full" />,
            explication: <><strong>Explication :</strong> Cette peinture XXX.</>,
            correctAnswer: 'PAS_IA'
        },
        {
            question: "D’après toi, cette photo a-t-elle été générée par IA?",
            mediaClassName: "aspect-video bg-muted max-h-[320px]",
            media: <img src="/y-days/images/Question_2.jpg" alt="Photo à deviner" className="object-cover w-full" />,
            explication: <><strong>Explication :</strong> Cette photo XXX.</>,
            correctAnswer: 'PAS_IA'
        },
        {
            question: "D’après toi, cette vidéo a-t-elle été générée par IA ?",
            mediaClassName: "aspect-video bg-muted max-h-[320px]",
            media: (
                <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/o51MgZotYjQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            ),
            explication: <><strong>Explication :</strong> Cette vidéo a été générée par IA ! Impressionnant, non ?</>,
            correctAnswer: 'IA'
        },
        {
            question: "D’après toi, lequel de ces deux textes a été généré par IA ?",
            mediaClassName: "min-h-[300px] bg-gradient-to-br from-purple-200 via-purple-100 to-indigo-100 p-6",
            media: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full z-10">
                    <div className="bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-white/50 flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                            <span className="flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-700 rounded text-xs font-bold shrink-0">A</span>
                            <h3 className="font-medium text-sm text-foreground mt-0.5">Invitation pour la soirée du 18 avril</h3>
                        </div>
                        <p className="text-sm text-muted-foreground ml-9 leading-relaxed">
                            À Houston, jeudi 18 avril, 20 h au Joke joint. Il y aura des questions-réponses, comédie, discussion, rencontre. Répondez en indiquant le nombre de personnes dans votre groupe : j'offre l'entrée à tout le monde et les boissons tant qu'il reste des billets.
                        </p>
                    </div>
                    <div className="bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-white/50 flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                            <span className="flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-700 rounded text-xs font-bold shrink-0">B</span>
                            <h3 className="font-medium text-sm text-foreground mt-0.5">Soirée Spéciale au Joke Joint à Houston !</h3>
                        </div>
                        <p className="text-sm text-muted-foreground ml-9 leading-relaxed">
                            Le jeudi 18 avril à 20 h à Houston, il y aura une séance de questions-réponses, un spectacle de comédie — et l'occasion d'échanger. Merci de répondre en indiquant la taille de votre groupe ; les entrées et boissons seront gratuites sous réserve de places disponibles.
                        </p>
                    </div>
                </div>
            ),
            explication: <><strong>L'option B a été générée par IA !</strong> On peut reconnaitre des signes, comme les tirets cadratins, les superlatifs et les nombreuses majuscules dans le titre.</>,
            correctAnswer: 'B',
            customButtons: (onGuess, correctAnswer) => (
                <div className="flex flex-col sm:flex-row gap-4 p-6 h-21 border-t rounded-b-xl bg-white">
                    <Button
                        onClick={() => onGuess('A', correctAnswer)}
                        size="lg"
                        variant="outline"
                        className="flex-1 hover:bg-muted font-normal"
                    >
                        L'option A a été générée par IA
                    </Button>
                    <Button
                        onClick={() => onGuess('B', correctAnswer)}
                        size="lg"
                        variant="outline"
                        className="flex-1 hover:bg-muted font-normal"
                    >
                        L'option B a été générée par IA
                    </Button>
                </div>
            )
        },
        {
            question: "D’après toi, cette photo a-t-elle été générée par IA?",
            mediaClassName: "aspect-video bg-muted max-h-[320px]",
            media: <img src="/y-days/images/Question_5.jpg" alt="Photo à deviner" className="object-cover h-full" />,
            explication: <><strong>Explication :</strong> Cette photo XXX.</>,
            correctAnswer: 'IA'
        },
        {
            question: "D’après toi, cette photo a-t-elle été générée par IA?",
            mediaClassName: "aspect-video bg-muted max-h-[320px]",
            media: <img src="/y-days/images/Question_6.png" alt="Photo à deviner" className="object-cover w-full" />,
            explication: <><strong>Explication :</strong> Cette photo XXX.</>,
            correctAnswer: 'PAS_IA'
        }
    ];

    const currentStep = QUIZ_STEPS[step];

    const handleGuess = (valeurBoutonClique) => {
        const reponseAttendue = currentStep.correctAnswer

        const estBonneReponse =
            valeurBoutonClique.trim() === reponseAttendue.trim();

        setGameResult(estBonneReponse);
    }

    return (
        <div className="w-full mx-auto p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="space-y-4">
                <h1 className="text-4xl font-semibold">Démêler le vrai du faux contenu à l’ère de l’IA.</h1>
                <p className="text-muted-foreground leading-relaxed">
                    L'intelligence artificielle générative transforme notre manière de créer et d'interagir avec le contenu. Elle peut parfois rendre difficile la distinction entre les œuvres humaines et celles produites par des algorithmes.
                </p>
                <p className="text-muted-foreground leading-relaxed font-bold">
                    {currentStep.question}
                </p>
                <QuizCard
                    media={currentStep.media}
                    mediaClassName={currentStep.mediaClassName}
                    gameResult={gameResult}
                    onGuess={handleGuess}
                    explication={currentStep.explication}
                    customButtons={currentStep.customButtons}
                    correctAnswer={currentStep.correctAnswer}
                />
            </div>

            <div className="mt-8 flex justify-end">
                <div className="flex gap-4">
                    {canResume && (
                        <Button variant="outline" onClick={onResume}>
                            Reprendre où j'en étais
                        </Button>
                    )}

                    {gameResult !== null && (
                        <Button
                            onClick={() => {
                                if (step < 5) {
                                    setStep(step + 1)
                                    setGameResult(null)
                                } else {
                                    onComplete?.()
                                    navigate('/result')
                                }
                            }}>
                            {step < 5 ? (
                                <>Question suivante <ArrowRight className="w-4 h-4 ml-2" /></>
                            ) : (
                                "Terminer"
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}