import * as React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function FlipCard({
    title,
    img,
    desc,
    isFlipped,
    onClick,
    className,
    frontGradient = 'linear-gradient(135deg, #f0c0f8 0%, #c8aaee 35%, #a8b8f8 70%, #c0b0f0 100%)',
    backGradient = 'linear-gradient(135deg, #e0a8f4 0%, #b89ce0 40%, #9ab0f0 100%)'
}) {
    return (
        <div
            className={cn("group relative h-64 w-full [perspective:1000px] cursor-pointer transition-transform duration-300 hover:scale-105", className)}
            onClick={onClick}
        >
            <div className={cn("absolute duration-500 w-full h-full [transform-style:preserve-3d]", isFlipped ? "[transform:rotateY(180deg)]" : "")}>
                {/* Front */}
                <Card className="absolute w-full h-full rounded-[10px] [backface-visibility:hidden] overflow-hidden p-0">
                    <div className="absolute inset-0 rounded-[10px]" style={{ background: frontGradient }} />
                    <div className="absolute inset-0 flex flex-col">
                        <div className="flex-1 flex items-center justify-center overflow-hidden">
                            {img && <img src={img} alt={`Logo ${title}`} className="w-full h-full object-cover" />}
                        </div>
                        <p className="flex items-center justify-start p-4 h-[76px] bg-white text-black m-0 text-base">{title}</p>
                    </div>
                </Card>
                {/* Back */}
                <Card
                    className="absolute w-full h-full rounded-[10px] p-6 flex flex-col items-center justify-center gap-3 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                    style={{ background: backGradient }}
                >
                    <p className="text-lg font-bold text-white">{title}</p>
                    <p className="text-lg text-white/90 leading-tight">{desc}</p>
                </Card>
            </div>
        </div>
    )
}

export default FlipCard;