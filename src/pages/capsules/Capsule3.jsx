import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, X, Lightbulb } from "lucide-react"

export default function Capsule3({ onComplete, canResume, onResume, onProgress }) {
    const [step, setStep] = useState(0)
    const [gameResult, setGameResult] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (onProgress) {
            onProgress(Math.round((step / 4) * 100)); // 4 est le max steps
        }
    }, [step, onProgress]);

    const handleGuess = (isCorrect) => {
        setGameResult(isCorrect)
        // Ici vous pourrez jouer un son d'échec ou de succès
    }

    const isNextDisabled = (step === 0 || step === 1 || step === 2) && gameResult === null;

    return (
        <div className="w-full mx-auto p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            {/* Step 0: Intro */}
            {step === 0 && (
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Démêler le vrai du faux contenu à l’ère de l’IA.</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        L'intelligence artificielle générative transforme notre manière de créer et d'interagir avec le contenu. Elle peut parfois rendre difficile la distinction entre les œuvres humaines et celles produites par des algorithmes.
                    </p>
                    <p className="text-muted-foreground leading-relaxed font-bold">
                        D’après toi, cette peinture  a-t-elle été générée par IA?
                    </p>
                    <Card className={`p-0 gap-0 border-2 ${gameResult !== null ? (gameResult ? 'border-green-500' : 'border-red-500') : 'border-border'}`}>
                        <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground overflow-hidden relative max-h-[320px]">
                            {/* Placeholder pour une image ou texte */}
                            <img src="/y-days/images/Question_1.jpg" alt="Peinture à deviner" className="object-cover w-full" />

                            {gameResult !== null && (
                                <div className="absolute top-3 right-3 flex items-center gap-2">
                                    <span className={`text-sm font-medium ${gameResult ? 'text-green-500' : 'text-red-500'}`}>
                                        {gameResult ? 'Bonne réponse !' : 'Mauvaise réponse !'}
                                    </span>
                                    <div className={`flex items-center justify-center w-5 h-5 rounded-full text-white ${gameResult ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {gameResult ? (
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        ) : (
                                            <X className="w-3.5 h-3.5 stroke-[3]" />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Remplacement conditionnel des boutons par l'explication */}
                        {gameResult === null ? (
                            <div className="flex gap-4 p-6 h-21 border-t rounded-b-xl bg-card">
                                <Button
                                    onClick={() => handleGuess(false)}
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 text-green-900 hover:text-green-950 hover:bg-green-200 border-none"
                                    style={{ background: '#DCFCE7', border: '1px solid rgba(34, 197, 94, 0.4)', borderRadius: '8px' }}
                                >
                                    <Check className="w-4 h-4 mr-2" /> IA
                                </Button>
                                <Button
                                    onClick={() => handleGuess(true)}
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 border-none"
                                    style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.4)', borderRadius: '8px' }}
                                >
                                    <X className="w-4 h-4 mr-2" /> Pas IA
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 p-6 border-t rounded-b-xl bg-white">
                                <div className="flex gap-3 items-center text-sm">
                                    <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
                                    <p className="text-muted-foreground leading-relaxed">
                                        <strong>Explication :</strong> En effet, cette peinture XXX.
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            )}

            {step === 1 && (
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Démêler le vrai du faux contenu à l’ère de l’IA.</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        L'intelligence artificielle générative transforme notre manière de créer et d'interagir avec le contenu. Elle peut parfois rendre difficile la distinction entre les œuvres humaines et celles produites par des algorithmes.
                    </p>
                    <p className="text-muted-foreground leading-relaxed font-bold">
                        D’après toi, cette peinture  a-t-elle été générée par IA?
                    </p>
                    <Card className={`p-0 gap-0 border-2 ${gameResult !== null ? (gameResult ? 'border-green-500' : 'border-red-500') : 'border-border'}`}>
                        <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground overflow-hidden relative max-h-[320px]">
                            {/* Placeholder pour une image ou texte */}
                            <img src="/y-days/images/Question_2.jpg" alt="Peinture à deviner" className="object-cover w-full" />

                            {gameResult !== null && (
                                <div className="absolute top-3 right-3 flex items-center gap-2">
                                    <span className={`text-sm font-medium ${gameResult ? 'text-green-500' : 'text-red-500'}`}>
                                        {gameResult ? 'Bonne réponse !' : 'Mauvaise réponse !'}
                                    </span>
                                    <div className={`flex items-center justify-center w-5 h-5 rounded-full text-white ${gameResult ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {gameResult ? (
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        ) : (
                                            <X className="w-3.5 h-3.5 stroke-[3]" />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Remplacement conditionnel des boutons par l'explication */}
                        {gameResult === null ? (
                            <div className="flex gap-4 p-6 h-21 border-t rounded-b-xl bg-card">
                                <Button
                                    onClick={() => handleGuess(false)}
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 text-green-900 hover:text-green-950 hover:bg-green-200 border-none"
                                    style={{ background: '#DCFCE7', border: '1px solid rgba(34, 197, 94, 0.4)', borderRadius: '8px' }}
                                >
                                    <Check className="w-4 h-4 mr-2" /> IA
                                </Button>
                                <Button
                                    onClick={() => handleGuess(true)}
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 border-none"
                                    style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.4)', borderRadius: '8px' }}
                                >
                                    <X className="w-4 h-4 mr-2" /> Pas IA
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 p-6 border-t rounded-b-xl bg-white">
                                <div className="flex gap-3 items-center text-sm">
                                    <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
                                    <p className="text-muted-foreground leading-relaxed">
                                        <strong>Explication :</strong> En effet, XXX...
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            )}


            {step === 2 && (
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Démêler le vrai du faux contenu à l’ère de l’IA.</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        L'intelligence artificielle générative transforme notre manière de créer et d'interagir avec le contenu. Elle peut parfois rendre difficile la distinction entre les œuvres humaines et celles produites par des algorithmes.
                    </p>
                    <p className="text-muted-foreground leading-relaxed font-bold">
                        D’après toi, cette vidéo a-t-elle été générée par IA ?
                    </p>
                    <Card className={`p-0 gap-0 border-2 ${gameResult !== null ? (gameResult ? 'border-green-500' : 'border-red-500') : 'border-border'}`}>
                        <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground overflow-hidden relative max-h-[320px]">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/o51MgZotYjQ"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>

                            {gameResult !== null && (
                                <div className="absolute top-3 right-3 flex items-center gap-2">
                                    <span className={`text-sm font-medium ${gameResult ? 'text-green-500' : 'text-red-500'}`}>
                                        {gameResult ? 'Bonne réponse !' : 'Mauvaise réponse !'}
                                    </span>
                                    <div className={`flex items-center justify-center w-5 h-5 rounded-full text-white ${gameResult ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {gameResult ? (
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        ) : (
                                            <X className="w-3.5 h-3.5 stroke-[3]" />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Remplacement conditionnel des boutons par l'explication */}
                        {gameResult === null ? (
                            <div className="flex gap-4 p-6 h-21 border-t rounded-b-xl bg-card">
                                <Button
                                    onClick={() => handleGuess(false)}
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 text-green-900 hover:text-green-950 hover:bg-green-200 border-none"
                                    style={{ background: '#DCFCE7', border: '1px solid rgba(34, 197, 94, 0.4)', borderRadius: '8px' }}
                                >
                                    <Check className="w-4 h-4 mr-2" /> IA
                                </Button>
                                <Button
                                    onClick={() => handleGuess(true)}
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 border-none"
                                    style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.4)', borderRadius: '8px' }}
                                >
                                    <X className="w-4 h-4 mr-2" /> Pas IA
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 p-6 border-t rounded-b-xl bg-white">
                                <div className="flex gap-3 items-center text-sm">
                                    <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
                                    <p className="text-muted-foreground leading-relaxed">
                                        <strong>Explication :</strong> Cette vidéo a été générée par IA ! Impressionnant, non ?
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            )}
            {/* Step 3: Textes */}
            {step === 3 && (
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Démêler le vrai du faux contenu à l’ère de l’IA.</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        L'intelligence artificielle générative transforme notre manière de créer et d'interagir avec le contenu. Elle peut parfois rendre difficile la distinction entre les œuvres humaines et celles produites par des algorithmes.
                    </p>
                    <p className="text-muted-foreground leading-relaxed font-bold">
                        D’après toi, lequel de ces deux textes a été généré par IA ?
                    </p>
                    <Card className={`p-0 gap-0 border-2 ${gameResult !== null ? (gameResult ? 'border-green-500' : 'border-red-500') : 'border-border'}`}>
                        {/* Zone dégradée avec les textes */}
                        <div className="relative bg-gradient-to-br from-purple-200 via-purple-100 to-indigo-100 p-6 flex items-center justify-center min-h-[300px] overflow-hidden rounded-t-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full z-10">
                                {/* Option A */}
                                <div className="bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-white/50 flex flex-col gap-3">
                                    <div className="flex items-start gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-700 rounded text-xs font-bold shrink-0">A</span>
                                        <h3 className="font-medium text-sm text-foreground mt-0.5">Invitation pour la soirée du 18 avril</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground ml-9 leading-relaxed">
                                        À Houston, jeudi 18 avril, 20 h au Joke joint. Il y aura des questions-réponses, comédie, discussion, rencontre. Répondez en indiquant le nombre de personnes dans votre groupe : j'offre l'entrée à tout le monde et les boissons tant qu'il reste des billets.
                                    </p>
                                </div>

                                {/* Option B */}
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

                            {/* Badge Résultat */}
                            {gameResult !== null && (
                                <div className="absolute top-3 right-3 flex items-center gap-2">
                                    <span className={`text-sm font-medium ${gameResult ? 'text-green-500' : 'text-red-500'}`}>
                                        {gameResult ? 'Bonne réponse !' : 'Mauvaise réponse !'}
                                    </span>
                                    <div className={`flex items-center justify-center w-5 h-5 rounded-full text-white ${gameResult ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {gameResult ? (
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        ) : (
                                            <X className="w-3.5 h-3.5 stroke-[3]" />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Boutons ou Explication */}
                        {gameResult === null ? (
                            <div className="flex flex-col sm:flex-row gap-4 p-6 h-21 border-t rounded-b-xl bg-white">
                                <Button
                                    onClick={() => handleGuess(false)} // Mauvaise réponse
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 hover:bg-muted font-normal"
                                >
                                    L'option A a été générée par IA
                                </Button>
                                <Button
                                    onClick={() => handleGuess(true)} // Bonne réponse
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 hover:bg-muted font-normal"
                                >
                                    L'option B a été générée par IA
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 p-6 border-t rounded-b-xl bg-white">
                                <div className="flex gap-3 items-start text-sm">
                                    <Lightbulb className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                                    <p className="text-foreground leading-relaxed">
                                        <strong>Effectivement, l'option B a été générée par IA !</strong> On peut reconnaitre des signes, comme les tirets cadratins, les superlatifs et les nombreuses majuscules dans le titre.
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            )}

            {step === 4 && (
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Démêler le vrai du faux contenu à l’ère de l’IA.</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        L'intelligence artificielle générative transforme notre manière de créer et d'interagir avec le contenu. Elle peut parfois rendre difficile la distinction entre les œuvres humaines et celles produites par des algorithmes.
                    </p>
                    <p className="text-muted-foreground leading-relaxed font-bold">
                        D’après toi, cette peinture  a-t-elle été générée par IA?
                    </p>
                    <Card className={`p-0 gap-0 border-2 ${gameResult !== null ? (gameResult ? 'border-green-500' : 'border-red-500') : 'border-border'}`}>
                        <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground overflow-hidden relative max-h-[320px]">
                            {/* Placeholder pour une image ou texte */}
                            <img src="/y-days/images/Question_5.jpg" alt="Peinture à deviner" className="object-cover w-full" />

                            {gameResult !== null && (
                                <div className="absolute top-3 right-3 flex items-center gap-2">
                                    <span className={`text-sm font-medium ${gameResult ? 'text-green-500' : 'text-red-500'}`}>
                                        {gameResult ? 'Bonne réponse !' : 'Mauvaise réponse !'}
                                    </span>
                                    <div className={`flex items-center justify-center w-5 h-5 rounded-full text-white ${gameResult ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {gameResult ? (
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        ) : (
                                            <X className="w-3.5 h-3.5 stroke-[3]" />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Remplacement conditionnel des boutons par l'explication */}
                        {gameResult === null ? (
                            <div className="flex gap-4 p-6 h-21 border-t rounded-b-xl bg-card">
                                <Button
                                    onClick={() => handleGuess(false)}
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 text-green-900 hover:text-green-950 hover:bg-green-200 border-none"
                                    style={{ background: '#DCFCE7', border: '1px solid rgba(34, 197, 94, 0.4)', borderRadius: '8px' }}
                                >
                                    <Check className="w-4 h-4 mr-2" /> IA
                                </Button>
                                <Button
                                    onClick={() => handleGuess(true)}
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 border-none"
                                    style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.4)', borderRadius: '8px' }}
                                >
                                    <X className="w-4 h-4 mr-2" /> Pas IA
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 p-6 border-t rounded-b-xl bg-white">
                                <div className="flex gap-3 items-center text-sm">
                                    <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
                                    <p className="text-muted-foreground leading-relaxed">
                                        <strong>Explication :</strong> En effet, XXX...
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            )}

            {step === 5 && (
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Démêler le vrai du faux contenu à l’ère de l’IA.</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        L'intelligence artificielle générative transforme notre manière de créer et d'interagir avec le contenu. Elle peut parfois rendre difficile la distinction entre les œuvres humaines et celles produites par des algorithmes.
                    </p>
                    <p className="text-muted-foreground leading-relaxed font-bold">
                        D’après toi, cette peinture  a-t-elle été générée par IA?
                    </p>
                    <Card className={`p-0 gap-0 border-2 ${gameResult !== null ? (gameResult ? 'border-green-500' : 'border-red-500') : 'border-border'}`}>
                        <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground overflow-hidden relative max-h-[320px]">
                            {/* Placeholder pour une image ou texte */}
                            <img src="/y-days/images/Question_6.png" alt="Peinture à deviner" className="object-cover w-full" />

                            {gameResult !== null && (
                                <div className="absolute top-3 right-3 flex items-center gap-2">
                                    <span className={`text-sm font-medium ${gameResult ? 'text-green-500' : 'text-red-500'}`}>
                                        {gameResult ? 'Bonne réponse !' : 'Mauvaise réponse !'}
                                    </span>
                                    <div className={`flex items-center justify-center w-5 h-5 rounded-full text-white ${gameResult ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {gameResult ? (
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        ) : (
                                            <X className="w-3.5 h-3.5 stroke-[3]" />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Remplacement conditionnel des boutons par l'explication */}
                        {gameResult === null ? (
                            <div className="flex gap-4 p-6 h-21 border-t rounded-b-xl bg-card">
                                <Button
                                    onClick={() => handleGuess(false)}
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 text-green-900 hover:text-green-950 hover:bg-green-200 border-none"
                                    style={{ background: '#DCFCE7', border: '1px solid rgba(34, 197, 94, 0.4)', borderRadius: '8px' }}
                                >
                                    <Check className="w-4 h-4 mr-2" /> IA
                                </Button>
                                <Button
                                    onClick={() => handleGuess(true)}
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 border-none"
                                    style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.4)', borderRadius: '8px' }}
                                >
                                    <X className="w-4 h-4 mr-2" /> Pas IA
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 p-6 border-t rounded-b-xl bg-white">
                                <div className="flex gap-3 items-center text-sm">
                                    <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
                                    <p className="text-muted-foreground leading-relaxed">
                                        <strong>Explication :</strong> En effet, XXX...
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            )}



            {/* {step === 1 && (
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Remise en question</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        Comme on l’a vu dans le jeu précédent, l’IA est en capacité de produire du contenu bluffant et réaliste. Il est donc important de toujours remettre en question le contenu que l’on voit et que l'on produit.
                    </p>
                </div>
            )} */}

            {/* {step === 2 && (
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold">Vérifier ses sources avec Perplexity</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        Il est possible d’utiliser Perplexity pour vérifier des sources et comparer entre plusieurs sites internet lorsqu’il s’agit de données chiffrées.
                    </p>
                    <div className="p-4 bg-muted/50 rounded-lg border text-sm">
                        💡 <strong>Note :</strong> Les détecteurs d’IA sont une solution, mais gardez en tête qu’ils ne sont pas précis et qu’ils ont une marge d’erreur importante.
                    </div>
                </div>
            )} */}

            {/* {step === 3 && (
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
            )} */}

            <div className="mt-8 flex justify-between">
                {step > 0 ? (
                    <Button variant="outline" onClick={() => {
                        setStep(step - 1)
                        setGameResult(null)
                    }}>
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
                                <>Suivant <ArrowRight className="w-4 h-4 ml-2" /></>
                            ) : (
                                "Terminer"
                            )}
                        </Button>
                    </span>
                </div>
            </div>
        </div>
    )
}