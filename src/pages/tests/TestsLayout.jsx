import React from 'react';
import Testimony from '@/components/ui/Testimony';

// Remplacez par vos vraies images
const marieImageUrl = 'public/images/prof1.png';
const aurelieImageUrl = 'public/images/prof2.png';

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
        </>

    );
};

export default TestsPage;