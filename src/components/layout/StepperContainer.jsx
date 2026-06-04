import React from 'react';
import CourseStepper, { HorizontalStepper } from './Coursestepper';
import Capsule1 from '../../pages/capsules/Capsule1.jsx'
import Capsule2 from '../../pages/capsules/Capsule2.jsx'
import Capsule3 from '../../pages/capsules/Capsule3.jsx'
import { Card } from "@/components/ui/card"
import { Memo } from "@/components/ui/Memo"
import { Download, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

// Icônes SVG
const BookIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M3 19a9 9 0 0 1 9 0 9 9 0 0 1 9 0" />
        <path d="M3 6a9 9 0 0 1 9 0 9 9 0 0 1 9 0" />
        <line x1="3" y1="6" x2="3" y2="19" />
        <line x1="12" y1="6" x2="12" y2="19" />
        <line x1="21" y1="6" x2="21" y2="19" />
    </svg>
);

const PencilIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
    </svg>
);

const SearchIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);

const demoSteps = [
    {
        label: "Module 1",
        title: "L'Introduction aux outils d'IA",
        icon: BookIcon,
        readTime: "2min",
        status: "active",
        progress: 0,
        content: (
            <Capsule1 />
        ),
    },
    {
        label: "Module 2",
        title: "Les fondamentaux du prompt",
        icon: PencilIcon,
        readTime: "4min",
        status: "locked",
        progress: 0,
        content: (
            <Capsule2 />
        ),
    },
    {
        label: "Module 3",
        title: "Cas pratiques avancés",
        icon: SearchIcon,
        readTime: "6min",
        status: "locked",
        progress: 0,
        content: (
            <Capsule3 />
        ),
    }
];


export default function StepperContainer({

}) {
    const navigate = useNavigate();

    return (
        <>
            {/* Conteneur principal du Stepper */}
            <CourseStepper
                initialSteps={demoSteps}
                variant="horizontal"
                finalContent={(currentSteps) => (
                    <div className="w-full p-3 sm:p-6 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-1 flex-col gap-6 h-full overflow-y-auto items-center">
                        <img src="/y-days/icons/checkok.svg" alt="Bravo" className="w-24 h-24 rounded-full object-cover mt-8" />

                        <div className="space-y-2 text-center flex flex-col items-center">
                            <h1 className="text-xl sm:text-4xl font-semibold">Merci d'avoir suivi ce kit de formation !</h1>
                            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                Vous avez maintenant les clés pour intégrer l'IA dans votre pratique pédagogique et créer vos ressources plus rapidement :
                            </p>
                        </div>
                        <div>
                            <HorizontalStepper
                                steps={currentSteps}
                                selectedIdx={-1}
                                showLogo={false}
                            />
                        </div>
                        <Memo variant="rocket" className="mt-6">
                            <h3 className="font-bold text-lg">Pour aller plus loin</h3>
                            <Card className="p-4">
                                <div className="flex gap-4 items-center">
                                    <span className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                        <img src="/y-days/icons/accDoc.svg" alt="" className="w-4 h-4 object-contain" />
                                    </span>
                                    <div>
                                        <h4 className="font-semibold">L'IA générative en 5 points clés</h4>
                                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                            Un article de synthèse pour comprendre les bases de l'IA générative et son impact.
                                        </p>
                                    </div>
                                    <div className="ml-auto flex items-center justify-center pl-2">
                                        <Download className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                                    </div>

                                </div>
                            </Card>
                        </Memo>
                        <div className="space-y-4 text-center flex flex-col items-center">
                            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                Pour revoir un module cliquez directement dessus en haut de l'écran.{" "}
                                <span tabIndex={0} className="group relative inline-block cursor-pointer focus:outline-none">
                                    <span className='underline hover:text-primary transition-colors'>en savoir plus</span>
                                    <Info className="w-4 h-4 inline-block ml-1 -mt-0.5" />
                                    <div className="absolute bottom-full left-0 -translate-x-1/2 mb-2 hidden group-hover:flex group-focus:flex group-active:flex flex-col justify-center items-center px-3 py-1.5 gap-2 isolate w-max max-w-[250px] bg-[#171717] rounded-lg text-white text-xs text-center z-50 pointer-events-none shadow-lg">
                                        Pour revoir un module spécifique, cliquez simplement sur son icône dans la barre de navigation.
                                        <img src="/y-days/images/boutonsNav.png" alt="navigation" className="object-contain" />

                                    </div>
                                </span>
                            </p>

                            <Button variant="outline" className="mt-4" onClick={() => {
                                // On vide le localStorage pour permettre un vrai recommencement
                                localStorage.removeItem('y-days-stepper-progress');
                                navigate('/');
                            }}>Recommencer le parcours</Button>
                        </div>
                    </div>
                )}
            />
        </>
    );
}