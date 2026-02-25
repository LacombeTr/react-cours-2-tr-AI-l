import type { ItinerairePoint } from "../types/PromptReturn";

type StepCardProps = {
    itineraireStep: ItinerairePoint;
    index: number;
};

export const StepCard = ({ itineraireStep, index }: StepCardProps) => {
    return (
        <div className='grid grid-cols-[auto_1fr_1fr] gap-x-3 w-full p-2 rounded-xl bg-white/20 text-white border-t-[0.5px] border-b border-t-white/40 border-b-white/40 backdrop-blur-sm'>
            <p className='text-3xl font-bold row-span-2 col-span-1 self-center'>{index + 1}</p>
            <h3 className='text-l font-bold col-span-2'>
                {itineraireStep.point_interet}
            </h3>
            <p className='text-sm'>Distance: {itineraireStep.distance}</p>
            <p className='text-sm'>
                Temps estimé: {itineraireStep.temps_estime}
            </p>
        </div>
    );
};