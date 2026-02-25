import { LuMapPin, LuClock, LuRuler, LuMountain } from "react-icons/lu";
import type { PromptReturn } from "../types/PromptReturn";
import { DifficultyChip } from "./DifficultyChip";
import { StepCard } from "./StepCard";

type InfoPanelProps = {
    response: PromptReturn | undefined;
};

export const InfoPanel = ({ response }: InfoPanelProps) => {
    return (
        <>
            {response && response.itineraire.length > 0 ? (
                <div className='flex flex-col w-full h-full overflow-hidden'>
                    {/* Header section */}
                    <div className='p-5 pb-4 border-b border-stone-200/60'>
                        <div className='flex items-start justify-between gap-3 mb-3'>
                            <h1 className='text-xl font-bold text-peak leading-tight' style={{ fontFamily: "'Playfair Display', serif" }}>
                                <LuMountain className='inline mr-2 text-alpine-600' size={22} />
                                {response.destination}
                            </h1>
                            <DifficultyChip difficulty={response.difficulté} />
                        </div>

                        {/* Stats row */}
                        <div className='flex flex-wrap gap-4 text-sm text-stone-600'>
                            <div className='flex items-center gap-1.5'>
                                <LuRuler size={14} className='text-alpine-600' />
                                <span className='font-medium'>{response.distance_totale}</span>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <LuClock size={14} className='text-alpine-600' />
                                <span className='font-medium'>{response.temps_total_estime}</span>
                            </div>
                        </div>

                        {/* Departure & arrival */}
                        <div className='mt-3 flex flex-col gap-1 text-sm'>
                            {response.depart === response.arrivée ? (
                                <div className='flex items-center gap-2 text-stone-600'>
                                    <LuMapPin size={14} className='text-trail shrink-0' />
                                    <span>Boucle depuis <span className='font-semibold text-peak'>{response.depart}</span></span>
                                </div>
                            ) : (
                                <>
                                    <div className='flex items-center gap-2 text-stone-600'>
                                        <LuMapPin size={14} className='text-alpine-600 shrink-0' />
                                        <span>Départ : <span className='font-semibold text-peak'>{response.depart}</span></span>
                                    </div>
                                    <div className='flex items-center gap-2 text-stone-600'>
                                        <LuMapPin size={14} className='text-red-500 shrink-0' />
                                        <span>Arrivée : <span className='font-semibold text-peak'>{response.arrivée}</span></span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Steps list */}
                    <div className='flex-1 overflow-y-auto p-4 space-y-3'>
                        {response.itineraire.map((step, index) => (
                            <StepCard
                                key={index}
                                itineraireStep={step}
                                index={index}
                                isLast={index === response.itineraire.length - 1}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center w-full h-full gap-4 p-8'>
                    <div className='w-20 h-20 rounded-full bg-alpine-100 flex items-center justify-center'>
                        <LuMountain size={36} className='text-alpine-500' />
                    </div>
                    <div className='text-center'>
                        <p className='text-lg font-semibold text-peak mb-1'>Prêt pour l'aventure ?</p>
                        <p className='text-sm text-stone-400'>
                            Décrivez votre randonnée idéale et laissez-nous tracer votre itinéraire.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};
