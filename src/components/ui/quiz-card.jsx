import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, X, Lightbulb } from "lucide-react"

export function QuizCard({
    media,
    mediaClassName,
    gameResult,
    onGuess,
    explication,
    customButtons,
    correctAnswer
}) {
    return (
        <Card className={`p-0 gap-0 border-1 ${gameResult !== null ? (gameResult ? 'border-green-500' : 'border-red-500') : 'border-border'}`}>
            <div className={`relative flex items-center justify-center text-muted-foreground overflow-hidden  ${mediaClassName || 'aspect-video bg-muted max-h-[320px]'}`}>
                {media}

                {gameResult !== null && (
                    <>
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                            <span className={`text-sm drop-shadow-sm ${gameResult ? 'text-green-500' : 'text-red-500'}`}>
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
                    </>
                )}
            </div>

            {gameResult === null ? (
                customButtons ? customButtons(onGuess, correctAnswer) : (
                    <div className="flex flex-col sm:flex-row gap-4 p-3 sm:p-6 h-auto border-t rounded-b-xl bg-card">
                        <Button
                            onClick={() => onGuess('IA', correctAnswer)}
                            size="lg"
                            variant="outline"
                            className="flex-1 hover:bg-violet-100/50 transition-colors cursor-pointer min-h-[44px] h-auto py-2 whitespace-normal text-violet-700 hover:text-violet-700"
                            style={{ background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(167, 139, 250, 0.4)', borderRadius: '8px' }}
                        >
                            <Check className="w-4 h-4 mr-2" /> IA
                        </Button>
                        <Button
                            onClick={() => onGuess('PAS_IA', correctAnswer)}
                            size="lg"
                            variant="outline"
                            className="flex-1 hover:bg-violet-100/50 transition-colors cursor-pointer min-h-[44px] h-auto py-2 whitespace-normal text-violet-700 hover:text-violet-700"
                            style={{ background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(167, 139, 250, 0.4)', borderRadius: '8px' }}
                        >
                            <X className="w-4 h-4 mr-2" /> Pas IA
                        </Button>
                    </div>
                )
            ) : (
                <div className="flex flex-col gap-4 p-6 border-t rounded-b-xl bg-white">
                    <div className="flex gap-3 items-start text-sm">
                        <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-muted-foreground leading-relaxed">
                            {explication}
                        </div>
                    </div>
                </div>
            )}
        </Card>
    )
}