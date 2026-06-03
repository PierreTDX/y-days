import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from "lucide-react"
import { QuizCard } from "@/components/ui/quiz-card"

export default function Capsule3({ onComplete, canResume, onResume, onProgress }) {
    const [step, setStep] = useState(0)
    const [gameResult, setGameResult] = useState(null)
    const [active, setActive] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (onProgress) {
            onProgress(Math.round((step / 7) * 100)); // 7 est le max steps
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

    const isQuizStep = step < QUIZ_STEPS.length;
    const currentStep = isQuizStep ? QUIZ_STEPS[step] : null;

    const handleGuess = (valeurBoutonClique) => {
        if (!currentStep) return;
        const reponseAttendue = currentStep.correctAnswer

        const estBonneReponse =
            valeurBoutonClique.trim() === reponseAttendue.trim();

        setGameResult(estBonneReponse);
    }

    const points = [
        { id: 1, x: 41, y: 20, content: "Explication 1" },
        { id: 2, x: 73, y: 7, content: "Explication 2" },
        { id: 3, x: 72.3, y: 63.5, content: "Explication 3" },
    ];

    return (
        <div className="w-full mx-auto p-3 sm:p-6 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-1 flex-col h-full overflow-y-auto">
            <div className="space-y-4">
                <h1 className="text-xl sm:text-4xl font-semibold">Démêler le vrai du faux contenu à l’ère de l’IA.</h1>

                {isQuizStep && (
                    <>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                            L'intelligence artificielle générative transforme notre manière de créer et d'interagir avec le contenu. Elle peut parfois rendre difficile la distinction entre les œuvres humaines et celles produites par des algorithmes.
                        </p>
                        <p className="text-muted-foreground leading-relaxed font-bold text-sm sm:text-base">
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
                    </>
                )}

                {step === 6 && (
                    <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                            Comme on l’a vu dans le jeu précédent, l’IA est en capacité de produire du contenu bluffant et réaliste. Il est donc important de toujours remettre en question le contenu que l’on voit et que l'on produit.
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                            Les détecteurs d’IA sont une solution pour vérifier si un texte est généré par IA, mais il faut garder en tête qu’il ne sont pas précis et qu’ils peuvent avoir une marge d’erreur importante.
                        </p>
                        <Card className="p-0">
                            <div className="flex flex-col md:flex-row gap-4 p-3 md:p-5">
                                <div className="flex-1 flex gap-3 items-start pr-3">
                                    <div className="flex-shrink-0">
                                        <div className="relative w-[60px] h-[60px] rounded overflow-hidden">
                                            <img src="/y-days/icons/icon1.svg" alt="Détecteurs d'IA" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-[#A076E4] mix-blend-color opacity-60 pointer-events-none"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-lg font-semibold">Comment verifier les sources ?</h2>
                                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                            Nous en avons parlé dans le module 1, il est possible d’utiliser Perplexity pour vérifier des sources et comparer entre plusieurs sites internet lorsqu’il s’agit de données chiffrées.
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                            Perplexity appuiera naturellement toujours ses réponses avec le lien vers la source.
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                            Vous trouverez ci-contre une capture d’écran d’une conversation avec Perplexity.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <img src="/y-days/images/illustrationModule3.png" alt="Capture d'écran" className="w-full h-full object-cover object-left rounded" />
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {step === 7 && (
                    <div className="space-y-4">
                        <div className="flex flex-col gap-6">
                            <Card className="p-3 md:p-5">
                                <div className="flex-1 flex gap-3 items-start pr-3">
                                    <div className="flex-shrink-0">
                                        <div className="relative w-[60px] h-[60px] rounded overflow-hidden">
                                            <img src="/y-days/icons/icon2.svg" alt="Détecteurs d'IA" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-[#A076E4] mix-blend-color opacity-60 pointer-events-none"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-lg font-semibold">Comment détecter l’IA via les sons et les voix</h2>
                                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                            Il est possible de détecter l’utilisation d’une IA en écoutant la tonalité de la voix. En efffet, il y a toujours des moments où l’IA aura une tonalité de voix qui ne semble pas naturelle, avec une sonorité métallique ou de l’écho.                                        </p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-3 md:p-5">
                                <div className="flex-1 flex gap-3 items-start pr-3">
                                    <div className="flex-shrink-0">
                                        <div className="relative w-[60px] h-[60px] rounded overflow-hidden">
                                            <img src="/y-days/icons/icon3.svg" alt="Détecteurs d'IA" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-[#A076E4] mix-blend-color opacity-60 pointer-events-none"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-lg font-semibold">Et concernant les contenus mutimédias (images, vidéos, sons)?</h2>
                                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                            il faut regarder les petits détails qui se cachent dans l’image. Reprenons par exemple l’image de notre jeu :                                        </p>
                                    </div>
                                </div>
                                <div className="flex-1 relative">
                                    <img src="/y-days/images/illustrationModule3-2.png" alt="Capture d'écran" className="w-full h-full object-cover object-left rounded" />
                                    {points.map((point) => (
                                        <div
                                            key={point.id}
                                            className="absolute group"
                                            style={{
                                                left: `${point.x}%`,
                                                top: `${point.y}%`,
                                                transform: "translate(-50%, -50%)",
                                            }}
                                        >
                                            {/* bouton + */}
                                            <button
                                                onClick={() =>
                                                    setActive(active === point.id ? null : point.id)
                                                }
                                                className="bg-transparent rounded-full w-14 h-14 flex items-center justify-center cursor-pointer"
                                            >
                                            </button>

                                            {/* tooltip */}
                                            <div className={`absolute mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-sm p-2 rounded shadow-lg whitespace-nowrap pointer-events-none transition-all duration-200 ${active === point.id ? "opacity-100 visible" : "opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible"}`}>
                                                {point.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                    C’est souvent dans le fond de l’image qu’on remarque les éléments générés par IA.                                </p>
                            </Card>

                        </div>
                    </div>
                )}
            </div>

            <div className="sticky -bottom-0 mt-auto pt-2 flex justify-end z-10">
                <div className="flex gap-4">
                    {canResume && (
                        <Button variant="outline" onClick={onResume}>
                            Reprendre où j'en étais
                        </Button>
                    )}

                    {isQuizStep && gameResult !== null && (
                        <Button
                            onClick={() => {
                                setStep(step + 1)
                                setGameResult(null)
                            }}>
                            {step < QUIZ_STEPS.length - 1 ? (
                                <>Question suivante <ArrowRight className="w-4 h-4 ml-2" /></>
                            ) : (
                                <>Suivant <ArrowRight className="w-4 h-4 ml-2" /></>
                            )}
                        </Button>
                    )}

                    {!isQuizStep && (
                        <Button
                            onClick={() => {
                                if (step < 7) {
                                    setStep(step + 1)
                                } else {
                                    onComplete?.()
                                    navigate('/result')
                                }
                            }}>
                            {step < 7 ? (
                                <>Suivant <ArrowRight className="w-4 h-4 ml-2" /></>
                            ) : (
                                "J'ai compris"
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}