import * as React from "react"
import { cn } from "@/lib/utils"

export function ClickHint({ className }) {
    return (
        <div className={cn("pointer-events-none", className)}>
            <style>{`
                @keyframes click-motion {
                    0%, 20%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
                    10% { transform: translateY(8px) scale(0.8) rotate(-15deg); }
                }
                @keyframes text-flash {
                    0%, 5%, 25%, 100% { opacity: 0; transform: translateY(10px) scale(0.8) rotate(0deg); }
                    10%, 20% { opacity: 1; transform: translateY(-5px) scale(1.1) rotate(-10deg); }
                }
                .animate-click {
                    animation: click-motion 1.5s ease-in-out infinite;
                }
                .animate-text-flash {
                    animation: text-flash 1.5s ease-in-out infinite;
                }
            `}</style>
            <div className="relative w-15 h-15 animate-click drop-shadow-lg">
                <img src="/y-days/icons/handclick.png" alt="Click icon" className="w-full h-full" />
                <div
                    className="absolute inset-0 bg-[#A076E4] mix-blend-color opacity-80 pointer-events-none"
                    style={{
                        WebkitMaskImage: 'url(/y-days/icons/handclick.png)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center',
                        maskImage: 'url(/y-days/icons/handclick.png)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center'
                    }}
                ></div>
            </div>
            {/* Texte "Clique !" qui apparaît au moment précis du clic */}
            <div
                className="absolute -top-2 -left-6 font-bold text-gray-500 text-xl animate-text-flash pointer-events-none"
            >
                Clique
            </div>
        </div>
    )
}

export default ClickHint;