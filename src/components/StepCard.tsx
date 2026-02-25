import type { ItinerairePoint } from "../types/PromptReturn";

type StepCardProps = {
    itineraireStep: ItinerairePoint;
    index: number;
};

export const StepCard = ({ itineraireStep, index }: StepCardProps) => {
    return (
        <div className='w-full p-4 rounded-xl bg-white/20 text-white border-t-[0.5px] border-b border-t-white/40 border-b-white/40 backdrop-blur-sm'>
            <h3 className='text-xl font-bold mb-2'>
                Étape {index + 1}: {itineraireStep.point_interet}
            </h3>
            <p className='text-sm mb-1'>{itineraireStep.description}</p>
            <p className='text-sm mb-1'>Distance: {itineraireStep.distance}</p>
            <p className='text-sm mb-1'>
                Temps estimé: {itineraireStep.temps_estime}
            </p>
            <p className='text-sm'>Conseils: {itineraireStep.conseils}</p>
        </div>
    );
};
