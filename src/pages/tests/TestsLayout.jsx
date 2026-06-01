import React from 'react';
import Testimony from '@/components/ui/Testimony';
import CourseStepper from '@/components/layout/Coursestepper';

// Remplacez par vos vraies images
const marieImageUrl = 'public/images/prof1.png';
const aurelieImageUrl = 'public/images/prof2.png';

const demoSteps = [
    {
        label: "Module 1",
        title: "L'Introduction aux outils d'IA",
        readTime: "2min",
        status: "active",
        progress: 55,
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
                <h1 className="text-4xl font-bold">Testimony</h1>

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
                <h1 className="text-4xl font-bold">CourseStepper</h1>

                {/* Exemple d'utilisation de CourseStepper */}
                <CourseStepper
                    initialSteps={demoSteps}
                />
            </div>

        </>

    );
};

export default TestsPage;