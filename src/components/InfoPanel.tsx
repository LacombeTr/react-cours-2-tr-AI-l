import type { PromptReturn } from "../types/PromptReturn";
import { StepCard } from "./StepCard";

type InfoPanelProps = {
    response: PromptReturn | undefined;
};

export const InfoPanel = ({ response }: InfoPanelProps) => {
    return (
        <>
            {response && response.itineraire.length > 0 ? (
                <>
                    <h1 className='text-3xl font-bold mb-4'>
                        Itinéraire de randonnée pour {response.destination}
                    </h1>
                    <p className='mb-4'>{response.difficulté}</p>
                    <p>{response.depart}</p>
                    <p>{response.arrivée}</p>
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
                </>
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
