import React from 'react';
import CourseStepper from './Coursestepper';
import Capsule1 from '../../pages/capsules/Capsule1.jsx'
import Capsule2 from '../../pages/capsules/Capsule2.jsx'
import Capsule3 from '../../pages/capsules/Capsule3.jsx'

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

// Remplacez par vos vraies images
const marieImageUrl = 'public/images/prof1.png';
const aurelieImageUrl = 'public/images/prof2.png';

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
    return (
        <>
            {/* Conteneur principal du Stepper */}
            <CourseStepper
                initialSteps={demoSteps}
                variant="horizontal"
                finalContent={
                    <div className="flex flex-col items-center justify-center h-full w-full space-y-6 text-center animate-in fade-in zoom-in duration-500">
                        <h1 className="text-3xl font-bold">Félicitations ! 🎉</h1>
                        <p className="text-muted-foreground text-lg">Vous avez complété l'ensemble de la formation avec succès.</p>
                        {/* Vous pouvez aussi y importer un composant <ResultPage /> directement ici ! */}
                    </div>
                }
            />
        </>
    );
}