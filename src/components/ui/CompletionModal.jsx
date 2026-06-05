import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CompletionModal({ title, content, buttonText = "Module suivant", onNext }) {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 rounded-xl">
            <Card className="bg-card shadow-2xl p-4 pt-12 mx-4 max-w-xs w-full flex flex-col items-center gap-4 text-center animate-in fade-in zoom-in-95 duration-200 relative overflow-visible">
                <div className="absolute -top-6">
                    <img src="/y-days/icons/checkokbull.svg" alt="Bravo" className="w-[60px] h-[60px] object-cover" />
                </div>
                <div className="space-y-2 w-[90%]">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {content}
                    </p>
                </div>

                <Button className="w-full mt-2" onClick={onNext}>
                    {buttonText}
                </Button>
            </Card>
        </div>
    )
}