import React from 'react';
import Testimony from '@/components/ui/Testimony';
import CourseStepper from '@/components/layout/Coursestepper';
import Memo from '@/components/ui/Memo';

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
const marieImageUrl = '/y-days/images/prof1.png';
const aurelieImageUrl = '/y-days/images/prof2.png';

const demoSteps = [
    {
        label: "Module 1",
        title: "L'Introduction aux outils d'IA",
        icon: BookIcon,
        readTime: "2min",
        status: "active",
        progress: 0,
        content: (
            <div className="space-y-4 text-zinc-600">
                <p>Découvrez ce qu'est l'IA générative et comment elle transforme notre manière d'apprendre.</p>
                <div className="p-4 bg-violet-50 text-violet-800 rounded-lg border border-violet-100">
                    💡 <strong>Astuce :</strong> Commencez par expérimenter avec des prompts simples pour comprendre la logique de l'IA.
                </div>
            </div>
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
            <div className="space-y-4 text-zinc-600">
                <p>Apprenez à structurer vos requêtes pour obtenir les meilleurs résultats possibles.</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Définir un rôle</li>
                    <li>Donner un contexte précis</li>
                    <li>Spécifier le format attendu</li>
                </ul>
            </div>
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
            <div className="space-y-4 text-zinc-600">
                <p>Mettez en pratique vos connaissances sur des cas d'usage réels : création de séquences, etc.</p>
            </div>
        ),
    },
];

const TestsPage = () => {
    return (
        <>
            <div className="min-h-screen bg-neutral-50 p-12 flex flex-col items-center gap-24">
                <h1 className="text-xl sm:text-4xl font-bold">Testimony</h1>

                {/* Exemple 1 : Marie */}
                <Testimony
                    avatarSrc={marieImageUrl}
                    name="Marie"
                    role="Enseignante CE1"
                    quote="Lorem ipsum delare ipsa delor ipsum delare ipsa delor ipsum delare ipsa delor"
                />

                {/* Exemple 2 : Aurélie (basé sur le contexte d'image_1.png) */}
                <Testimony
                    avatarSrc={aurelieImageUrl}
                    name="Aurélie"
                    role="Enseignante CP"
                    quote="Une ressource incroyable ! Cela m'a fait gagner un temps précieux dans ma préparation de cours."
                />
            </div>
            <div className="min-h-screen bg-neutral-50 p-12 flex flex-col items-center gap-24">
                <h1 className="text-xl sm:text-4xl font-bold">CourseStepper</h1>

                {/* Exemple d'utilisation de CourseStepper - Vue Verticale */}
                {/* <div className="w-full max-w-4xl">
                    <h2 className="text-2xl font-bold mb-2 text-center text-zinc-800">Version Verticale (Row)</h2>
                    <CourseStepper
                        initialSteps={demoSteps}
                        variant="vertical"
                    />
                </div> */}

                {/* Exemple d'utilisation de CourseStepper - Vue Horizontale */}
                <div className="w-full max-w-4xl">
                    <h2 className="text-2xl font-bold mb-2 text-center text-zinc-800">Version Horizontale</h2>
                    <CourseStepper
                        initialSteps={demoSteps}
                        variant="horizontal"
                    />
                </div>
            </div>
            <div className="min-h-screen bg-neutral-50 p-12 flex flex-col items-center gap-24">
                <h1 className="text-xl sm:text-4xl font-bold">Memo</h1>
                <div className=" max-w-sm gap-6 flex flex-col">
                    <Memo variant="bookmark">
                        <p>C’est pour cette raison que l’IA peut s’avérer être un réel assistant pour la planification et la création de vos ressources pédagogiques.</p>
                    </Memo>
                    <Memo variant="bulb">
                        <p>C’est pour cette raison que l’IA peut s’avérer être un réel assistant pour la planification et la création de vos ressources pédagogiques.</p>
                    </Memo>
                    <Memo variant="search" className="mt-6">
                        <h3 className="font-bold text-lg">Pourquoi un tel choc ?</h3>
                        <p>Pour la première fois, ChatGPT ne répondait pas avec juste des mots clés, mais conversait comme un être humain. Il s’est révélé capable de vous comprendre implicitement, de traduire votre pensée, et même de s’adapter aux contraintes de niveau : le niveau d’un élève de CP par exemple.</p>
                    </Memo>
                </div>
            </div>


        </>

    );
};

export default TestsPage;