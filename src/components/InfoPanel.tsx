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
                <div className='flex flex-col gap-4 w-full pr-2 overflow-y-scroll items-center'>
                    <h1 className='text-2xl font-bold mb-4 text-green-900'>
                        Itinéraire de randonnée pour {response.destination}
                    </h1>
                    <DifficultyChip difficulty={response.difficulté} />
                    {response.depart === response.arrivée ? (
                        <p>
                            <span className='font-bold'>
                                Point de départ et d'arrivée :{" "}
                            </span>
                            {response.depart}
                        </p>
                    ) : (
                        <>
                            <p>
                                <span className='font-bold'>Départ : </span>
                                {response.depart}
                            </p>
                            <p>
                                <span className='font-bold'>
                                    Point d'arrivée :{" "}
                                </span>
                                {response.arrivée}
                            </p>
                        </>
                    )}
                    <p>
                        {response.distance_totale} -{" "}
                        {response.temps_total_estime}
                    </p>
                    <div className='flex flex-col gap-4 w-full pr-2 overflow-y-scroll'>
                        {response.itineraire.map((step, index) => (
                            <StepCard
                                key={index}
                                itineraireStep={step}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className='flex justify-center items-center w-full h-full rounded-xl '>
                    <p className='text-2xl text-white/80'>
                        Votre itinéraire de randonnée apparaîtra ici.
                    </p>
                </div>
            )}
        </>
    );
};
