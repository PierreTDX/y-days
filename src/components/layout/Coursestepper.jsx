import React, { useState, useCallback, useEffect } from "react";

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
                    <div className="w-[80%] h-[3px] bg-[#E5E7EB] rounded-full mt-1">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(270.05deg, #EAE0F9 0.04%, #A076E4 51.16%, #05036C 102.27%)'
                            }}
                        />
                    </div>
                )}

                {/* Badge */}
                {isLocked && (
                    <span className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center rounded-full bg-[#E5E7EB] text-muted-foreground">
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

export function HorizontalStepper({ selectedIdx, steps, onStepClick, showLogo = true }) {
    // Si tout est terminé
    const isAllCompleted = steps.every(s => s.status === "completed");

    return (
        <div className="flex items-center gap-2 w-full p-3">
            {/* Logo en dehors du stepper */}
            {showLogo && (
                <div className="w-[230px] max-[600px]:w-[80px] h-[60px] bg-[url('/y-days/LOGOAcadem.svg')] max-[600px]:bg-[url('/y-days/LOGOAcademcarre.svg')] bg-no-repeat bg-center bg-contain flex-shrink-0 scale-330 max-[600px]:scale-230 origin-center max-[600px]:-translate-x-3"
                    role="img"
                    aria-label="Logo AcademIA">
                </div>
            )}

            {/* Conteneur des étapes */}
            <div className="flex flex-1 items-center">
                {/* Étapes (Steps) */}
                <div className="flex flex-1 items-center min-w-0 gap-2 justify-end">
                    {steps.map((step, i) => {
                        const isSelected = i === selectedIdx;
                        const Icon = step.icon || BookIcon;

                        return (
                            <div
                                key={i}
                                onClick={step.status !== "locked" ? () => onStepClick?.(i) : undefined}
                                tabIndex={step.status === "locked" ? 0 : undefined}
                                className={[
                                    "relative flex justify-center items-center h-[60px] px-1 min-w-0 border border-zinc-200 bg-white shadow-sm rounded-xl",
                                    "transition-all duration-500 ease-in-out group",

                                    isSelected
                                        ? "flex-1 max-[425px]:flex-none max-[425px]:w-[72px] min-w-[72px] min-[425px]:pr-3 min-[425px]:gap-2"
                                        : "w-[72px] min-w-0",

                                    step.status !== "locked"
                                        ? "cursor-pointer hover:bg-zinc-50"
                                        : "cursor-not-allowed focus:outline-none",
                                ].join(" ")}
                            >
                                {/* Icon & Label part */}
                                <div
                                    className={[
                                        "flex flex-col items-center gap-0.5 min-w-[62px] flex-shrink-0 transition-colors duration-300",
                                        step.status === "locked" ? "opacity-70" : ""
                                    ].join(" ")}
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
                                        "flex-1 flex flex-col gap-2 max-[425px]:flex-none max-[425px]:w-0 w-full overflow-hidden [container-type:inline-size]",
                                        "transition-all duration-300 ease-in-out pt-3",
                                        isSelected ? "flex opacity-100" : "hidden",
                                    ].join(" ")}
                                >
                                    <div className="h-[4px] bg-[#E5E7EB] rounded-full w-full overflow-hidden transition-all duration-300">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: isAllCompleted ? "100%" : `${step.progress || 0}%`,
                                                background: 'linear-gradient(270.05deg, #EAE0F9 0.04%, #A076E4 51.16%, #05036C 102.27%)'
                                            }}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 overflow-hidden w-full transition-all duration-300 [@container_(max-width:150px)]:w-0 [@container_(max-width:150px)]:opacity-0">
                                        <span className="text-[13px] truncate text-muted-foreground min-w-0 flex-1">
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
                                            <span className="absolute -top-1.5 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-[#E5E7EB] text-muted-foreground opacity-70">
                                                <LockIcon size={10} />
                                            </span>
                                        )}
                                        {step.status === "completed" && (
                                            <span className="absolute -top-1.5 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-green-500 text-white">
                                                <CheckIcon size={9} />
                                            </span>
                                        )}
                                    </>
                                )}
                                {step.status === "locked" && (
                                    <div className="absolute top-[110%] right-0 mb-2 hidden group-hover:flex group-focus:flex group-active:flex flex-row justify-center items-center px-3 py-1.5 gap-2 isolate w-max max-w-[250px] bg-[#171717] rounded-lg text-white text-xs text-center z-50 pointer-events-none shadow-lg">
                                        Ce module sera accessible une fois précédent terminé
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

export default function CourseStepper({ initialSteps = [], variant = "both", finalContent }) {
    // On initialise le state avec le localStorage si disponible
    const [steps, setSteps] = useState(() => {
        const saved = localStorage.getItem('y-days-stepper-progress');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // On fusionne les données sauvées (status, progress) avec les composants React d'origine
                return initialSteps.map((step, index) => ({
                    ...step,
                    status: parsed[index]?.status || step.status,
                    progress: parsed[index]?.progress || step.progress
                }));
            } catch (e) {
                console.error("Erreur de lecture du localStorage", e);
            }
        }
        return initialSteps;
    });

    const isAllCompleted = steps.length > 0 && steps.every(s => s.status === "completed");
    const activeIndex = steps.findIndex((s) => s.status === "active");
    const [selectedIdx, setSelectedIdx] = useState(activeIndex !== -1 ? activeIndex : (isAllCompleted ? -1 : (steps.length > 0 ? steps.length - 1 : 0)));
    // const [selectedIdx, setSelectedIdx] = useState(-1); // TEMPORAIRE POUR LE DEV

    // À chaque modification de steps, on sauvegarde (uniquement ce qui est serializable)
    useEffect(() => {
        const stateToSave = steps.map(s => ({ status: s.status, progress: s.progress }));
        localStorage.setItem('y-days-stepper-progress', JSON.stringify(stateToSave));
    }, [steps]);

    const handleProgress = useCallback((progress) => {
        setSteps((prev) => {
            if (!prev[selectedIdx]) return prev;
            const newSteps = [...prev];
            // Ne pas réduire la progression si le module est déjà terminé
            if (newSteps[selectedIdx].status === "completed") {
                return prev;
            }
            if (newSteps[selectedIdx].progress !== progress) {
                newSteps[selectedIdx] = { ...newSteps[selectedIdx], progress };
                return newSteps;
            }
            return prev;
        });
    }, [selectedIdx]);

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
                    setSelectedIdx(-1); // Tous les modules sont terminés
                }
            } else {
                // Si l'utilisateur re-valide un module déjà fini, on le renvoie vers la vue finale
                setSelectedIdx(-1);
            }
            return newSteps;
        });
    };

    return (
        <div className="flex flex-col mx-auto w-full">
            {/* Vertical */}
            {(variant === "vertical" || variant === "both") && (
                <div className="sticky top-0 z-50 bg-white p-3 rounded-xl border border-zinc-200 shadow-sm">
                    {variant === "both" && <p className="text-xs uppercase tracking-widest text-zinc-400 mb-3">Vue verticale</p>}
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
            )}

            {/* Horizontal */}
            {(variant === "horizontal" || variant === "both") && (
                <div className="sticky top-0 z-50">
                    {variant === "both" && <p className="text-xs uppercase tracking-widest text-zinc-400 mb-3">Vue horizontale</p>}
                    <HorizontalStepper
                        selectedIdx={selectedIdx}
                        steps={steps}
                        onStepClick={setSelectedIdx}
                    />
                </div>
            )}

            {/* Contenu du module sélectionné */}
            <div className=" border p-3 md:p-11 border-zinc-200 rounded-t-3xl md:rounded-3xl shadow-sm text-left stepper-container flex flex-col h-[calc(100dvh-84px)]">
                {/* <h3 className="text-lg font-bold mb-4 text-zinc-800">{steps[selectedIdx]?.title}</h3> */}
                {selectedIdx === -1 && finalContent
                    ? (typeof finalContent === 'function' ? finalContent(steps, setSelectedIdx) : finalContent)
                    : steps[selectedIdx]?.content && React.isValidElement(steps[selectedIdx].content)
                        ? React.cloneElement(steps[selectedIdx].content, {
                            onComplete: handleCompleteStep,
                            canResume: activeIndex !== -1 && selectedIdx !== activeIndex,
                            onResume: () => setSelectedIdx(activeIndex),
                            onProgress: handleProgress
                        })
                        : steps[selectedIdx]?.content}
            </div>
        </div>
    );
}