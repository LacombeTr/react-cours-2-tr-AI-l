import { useState, useEffect, useMemo } from "react";
import { LuMountainSnow } from "react-icons/lu";
import "./FunnyLoader.css";

export const Funnyloader = () => {
    const listPhrases = useMemo(() => [
        "Préparons les chaussures de randonnée...",
        "En train de consulter les cartes topographiques...",
        "Calcul des meilleures vues panoramiques...",
        "Vérification de la météo pour votre aventure...",
        "Remplissage des gourdes pour l'expédition...",
        "Vérification des réserves de snacks de rando...",
        "Échauffement des mollets pour la montée...",
        "Appel des montagnards pour renforcer l'équipe...",
        "Ajustement des sacs à dos pour la quête...",
        "Vérification que personne n'a oublié ses chaussettes...",
        "Inspiration des grands aventuriers alpins...",
        "Polissage des bâtons de rando...",
        "Consultations des sentiers secrets de montagne...",
        "Préparation mentale pour vaincre les pentes...",
        "Négociation avec les marmottes du sommet...",
        "Apprivoisement des réticents à la rando...",
        "Vérification que les baskets ne sont pas oubliées...",
        "Coordination de l'équipe de chèvres de montagne...",
        "Mémorisation des selfies à prendre au sommet...",
        "Calcul du nombre de pauses café nécessaires...",
        "Révision des techniques de demi-tour d'urgence...",
        "Bénédiction des genoux pour la descente...",
        "Entraînement mental pour les photos Instagram...",
        "Vérification que le GPS ne s'est pas perdu...",
        "Rechargement des batteries du courage montagnard...",
        "Recherche de l'énergie infinie des alpinistes...",
        "Calibrage des jambes pour les 3000 mètres...",
    ], []);

    const [randomPhrase, setRandomPhrase] = useState(
        () => listPhrases[Math.floor(Math.random() * listPhrases.length)],
    );

    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRandomPhrase(
                listPhrases[Math.floor(Math.random() * listPhrases.length)],
            );
            setAnimationKey(0);
        }, randomPhrase.length * 100);

        return () => clearInterval(interval);
    }, [listPhrases, randomPhrase.length]);

    useEffect(() => {
        const animationDuration = (randomPhrase.length - 1) * 50 + 200;
        const timer = setInterval(() => {
            setAnimationKey(prev => prev + 1);
        }, animationDuration);

        return () => clearInterval(timer);
    }, [randomPhrase]);

    return (
        <div className='flex flex-col justify-center items-center w-full h-full gap-6 p-8'>
            {/* Mountain animation */}
            <div className='relative'>
                <div className='w-16 h-16 rounded-full bg-alpine-100 flex items-center justify-center mountain-pulse'>
                    <LuMountainSnow size={32} className='text-alpine-600' />
                </div>
                {/* Animated trail dots */}
                <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5'>
                    <span className='w-1.5 h-1.5 rounded-full bg-alpine-400 trail-dot' style={{ animationDelay: '0ms' }} />
                    <span className='w-1.5 h-1.5 rounded-full bg-alpine-400 trail-dot' style={{ animationDelay: '200ms' }} />
                    <span className='w-1.5 h-1.5 rounded-full bg-alpine-400 trail-dot' style={{ animationDelay: '400ms' }} />
                </div>
            </div>

            <p className='text-sm text-stone-500 text-center max-w-xs'>
                {randomPhrase.split('').map((char, index) => (
                    <span
                        key={`${animationKey}-${index}`}
                        className="wave-letter"
                        style={{ animationDelay: `${index * 30}ms` }}
                    >
                        {char}
                    </span>
                ))}
            </p>
        </div>
    );
};
