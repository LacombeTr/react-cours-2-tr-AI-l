import { LuClock, LuRuler, LuFootprints } from "react-icons/lu";
import type { ItinerairePoint } from "../types/PromptReturn";

type StepCardProps = {
    itineraireStep: ItinerairePoint;
    index: number;
    isLast?: boolean;
};

export const StepCard = ({ itineraireStep, index, isLast = false }: StepCardProps) => {
    return (
        <div className='relative flex gap-3'>
            {/* Timeline */}
            <div className='flex flex-col items-center'>
                <div className='w-8 h-8 rounded-full bg-linear-to-br from-alpine-500 to-alpine-700 text-white flex items-center justify-center text-xs font-bold shadow-md shrink-0'>
                    {index + 1}
                </div>
                {!isLast && (
                    <div className='w-0.5 flex-1 bg-linear-to-b from-alpine-300 to-alpine-100 mt-1' />
                )}
            </div>

            {/* Card content */}
            <div className='flex-1 pb-4'>
                <div className='p-3 rounded-xl bg-stone-50/80 border border-stone-200/50 hover:border-alpine-300/50 hover:shadow-md transition-all duration-200'>
                    <div className='flex items-start gap-2 mb-2'>
                        <LuFootprints size={14} className='text-trail mt-0.5 shrink-0' />
                        <h3 className='text-sm font-semibold text-peak leading-snug'>
                            {itineraireStep.point_interet}
                        </h3>
                    </div>
                    <div className='flex gap-4 text-xs text-stone-500'>
                        <span className='flex items-center gap-1'>
                            <LuRuler size={12} className='text-stone-400' />
                            {itineraireStep.distance}
                        </span>
                        <span className='flex items-center gap-1'>
                            <LuClock size={12} className='text-stone-400' />
                            {itineraireStep.temps_estime}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};