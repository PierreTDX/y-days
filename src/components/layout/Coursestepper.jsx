import { useState } from "react";

const BookIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M3 19a9 9 0 0 1 9 0 9 9 0 0 1 9 0" />
        <path d="M3 6a9 9 0 0 1 9 0 9 9 0 0 1 9 0" />
        <line x1="3" y1="6" x2="3" y2="19" />
        <line x1="12" y1="6" x2="12" y2="19" />
        <line x1="21" y1="6" x2="21" y2="19" />
    </svg>
);

const LockIcon = ({ size = 12 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const CheckIcon = ({ size = 10 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

// status: "active" | "locked" | "completed" | "idle"
function StepRow({ label = "Module 1", title, readTime, status = "idle", progress = 0, isSelected, onClick, icon: Icon = BookIcon }) {
    const isActive = status === "active";
    const isLocked = status === "locked";
    const isCompleted = status === "completed";

    return (
        <div
            onClick={!isLocked ? onClick : undefined}
            className={[
                "flex items-center rounded-xl border overflow-hidden transition-all",
                isSelected ? "border-violet-400 ring-1 ring-violet-400" : "border-zinc-200",
                !isLocked ? "cursor-pointer hover:border-violet-300" : "opacity-70 cursor-not-allowed",
            ].join(" ")}
        >
            {/* Icon block */}
            <div className="relative w-[72px] min-w-[72px] flex flex-col items-center justify-center py-3 gap-1">
                <Icon
                    className={
                        isSelected || isActive ? "text-violet-500" : isCompleted ? "text-zinc-500" : isLocked ? "text-zinc-300" : "text-zinc-400"
                    }
                />
                <span className={`text-[11px] ${isSelected || isActive ? "text-violet-500" : "text-zinc-400"}`}>{label}</span>

                {/* Progress bar (active only) */}
                {isActive && (
                    <div className="w-[80%] h-[3px] bg-zinc-100 rounded-full mt-1">
                        <div
                            className="h-full rounded-full bg-violet-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}

                {/* Badge */}
                {isLocked && (
                    <span className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center rounded-full bg-zinc-100">
                        <LockIcon size={10} />
                    </span>
                )}
                {isCompleted && (
                    <span className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckIcon size={9} />
                    </span>
                )}
            </div>

            {/* Divider */}
            <div className="self-stretch w-px bg-zinc-200" />

            {/* Content */}
            <div className="flex flex-1 items-center px-5">
                <span
                    className={[
                        "text-sm",
                        isLocked ? "text-zinc-300" : "text-zinc-800",
                    ].join(" ")}
                >
                    {title}
                </span>
                <div className="ml-auto flex items-center gap-4">
                    {readTime && (
                        <span className="text-xs text-zinc-400 whitespace-nowrap">
                            Temps de lecture : {readTime}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

function HorizontalStepper({ selectedIdx, steps, onStepClick }) {
    // Si tout est terminé
    const isAllCompleted = steps.every(s => s.status === "completed");

    return (
        <div className="flex items-center rounded-xl border border-zinc-200 overflow-hidden bg-white">
            {/* Logo */}
            <div className="flex items-center justify-center px-5 border-r border-zinc-200 h-[60px] font-medium text-sm text-zinc-800 whitespace-nowrap flex-shrink-0">
                LOGO
            </div>

            {/* Étapes (Steps) */}
            <div className="flex flex-1 items-center min-w-0">
                {steps.map((step, i) => {
                    const isSelected = i === selectedIdx;
                    const Icon = step.icon || BookIcon;

                    return (
                        <div
                            key={i}
                            onClick={step.status !== "locked" ? () => onStepClick(i) : undefined}
                            className={[
                                "relative flex items-center h-[60px] gap-3 px-4",
                                "transition-all duration-500 ease-in-out overflow-hidden",
                                "border-l border-zinc-200",
                                isSelected ? "flex-1 min-w-0" : "w-[72px] min-w-[72px] justify-center",
                                step.status !== "locked" ? "cursor-pointer hover:bg-zinc-50" : "cursor-not-allowed opacity-70",
                            ].join(" ")}
                        >
                            {/* Icon & Label part */}
                            <div
                                className="flex flex-col items-center gap-0.5 min-w-[48px] flex-shrink-0 transition-colors duration-300"
                            >
                                <Icon
                                    className={
                                        isSelected || step.status === "active"
                                            ? "text-violet-500"
                                            : step.status === "completed"
                                                ? "text-zinc-500"
                                                : "text-zinc-300"
                                    }
                                />
                                <span
                                    className={`text-[11px] ${isSelected || step.status === "active" ? "text-violet-500" : "text-zinc-400"
                                        }`}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {/* Active content part (title, progress, etc.) */}
                            <div
                                className={[
                                    "flex-1 flex flex-col gap-1 min-w-0",
                                    "transition-opacity duration-300 delay-200",
                                    isSelected ? "opacity-100" : "opacity-0 w-0",
                                ].join(" ")}
                            >
                                <div className="h-[3px] bg-zinc-100 rounded-full">
                                    <div
                                        className="h-full rounded-full bg-violet-500 transition-all duration-500"
                                        style={{
                                            width: isAllCompleted ? "100%" : `${step.progress || 0}%`,
                                        }}
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-3 overflow-hidden">
                                    <span className="text-[13px] text-zinc-800 truncate">
                                        {step.title}
                                    </span>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        {step.readTime && (
                                            <span className="text-xs text-zinc-400 whitespace-nowrap">
                                                Temps de lecture : {step.readTime}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Inactive Badges */}
                            {!isSelected && (
                                <>
                                    {step.status === "locked" && (
                                        <span className="absolute top-1.5 right-2 w-4 h-4 flex items-center justify-center rounded-full bg-zinc-100">
                                            <LockIcon size={10} />
                                        </span>
                                    )}
                                    {step.status === "completed" && (
                                        <span className="absolute top-1.5 right-2 w-4 h-4 flex items-center justify-center rounded-full bg-green-500 text-white">
                                            <CheckIcon size={9} />
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function CourseStepper({ initialSteps = [] }) {
    const [steps, setSteps] = useState(initialSteps);
    const activeIndex = steps.findIndex((s) => s.status === "active");
    const [selectedIdx, setSelectedIdx] = useState(activeIndex !== -1 ? activeIndex : (steps.length > 0 ? steps.length - 1 : 0));

    const handleCompleteStep = () => {
        setSteps((prev) => {
            const newSteps = [...prev];
            const currentIdx = newSteps.findIndex((s) => s.status === "active");

            if (currentIdx !== -1) {
                // 1. Marquer le module actuel comme terminé avec une progression de 100%
                newSteps[currentIdx] = { ...newSteps[currentIdx], status: "completed", progress: 100 };

                // 2. Débloquer le module suivant s'il y en a un
                if (currentIdx + 1 < newSteps.length) {
                    newSteps[currentIdx + 1] = { ...newSteps[currentIdx + 1], status: "active", progress: 0 };
                    setSelectedIdx(currentIdx + 1);
                } else {
                    setSelectedIdx(currentIdx);
                }
            }
            return newSteps;
        });
    };

    return (
        <div className="p-6 flex flex-col gap-8 max-w-2xl mx-auto">
            {/* Vertical */}
            <div>
                <p className="text-xs uppercase tracking-widest text-zinc-400 mb-3">Vue verticale</p>
                <div className="flex flex-col gap-2">
                    {steps.map((step, i) => (
                        <StepRow
                            key={i}
                            {...step}
                            isSelected={i === selectedIdx}
                            onClick={() => setSelectedIdx(i)}
                        />
                    ))}
                </div>
            </div>

            {/* Horizontal */}
            <div>
                <p className="text-xs uppercase tracking-widest text-zinc-400 mb-3">Vue horizontale</p>
                <HorizontalStepper
                    selectedIdx={selectedIdx}
                    steps={steps}
                    onStepClick={setSelectedIdx}
                />
            </div>

            {/* Contenu du module sélectionné */}
            <div className="mt-4 p-6 bg-white border border-zinc-200 rounded-xl shadow-sm text-left">
                <h3 className="text-lg font-bold mb-4 text-zinc-800">{steps[selectedIdx]?.title}</h3>
                {steps[selectedIdx]?.content}
            </div>

            {/* Boutons d'action */}
            {activeIndex !== -1 && (
                <div className="flex justify-end mt-2 gap-3">
                    {selectedIdx !== activeIndex && (
                        <button onClick={() => setSelectedIdx(activeIndex)} className="px-5 py-2.5 text-sm font-medium border border-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors shadow-sm">
                            Reprendre où j'en étais
                        </button>
                    )}
                    {selectedIdx === activeIndex && (
                        <button onClick={handleCompleteStep} className="px-5 py-2.5 text-sm font-medium bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors shadow-sm">
                            Terminé
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}