import { LuLoaderCircle, LuCompass } from "react-icons/lu";
import { PiPersonSimpleHikeBold } from "react-icons/pi";
import { usePrompt } from "../hooks/usePrompt";
import { useState } from "react";
import type { PromptReturn } from "../types/PromptReturn";
import { InfoPanel } from "./InfoPanel";
import { Funnyloader } from "./FunnyLoader";
import { Map } from "./Map";

export const PromptPanel = () => {
    const [promptMessage, setPromptMessage] = useState<string>("");
    const [response, setResponse] = useState<PromptReturn | undefined>();

    const { sendPrompt, loading } = usePrompt({
        setPromptMessage,
    });

    return (
        <div className='flex flex-col gap-4 h-full w-full'>
            {/* Search bar */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const prompt = formData.get("prompt") as string;
                    setResponse(undefined);
                    sendPrompt(prompt).then((response) => {
                        if (response) {
                            setResponse(response);
                        }
                    });
                }}
                className='w-full'
            >
                <div className='flex gap-3 w-full'>
                    <div className='relative flex-1'>
                        <LuCompass className='absolute left-4 top-1/2 -translate-y-1/2 text-stone-400' size={20} />
                        <input
                            type='text'
                            name='prompt'
                            value={promptMessage}
                            onInput={(e) => setPromptMessage(e.currentTarget.value)}
                            placeholder='Décrivez votre randonnée idéale... (ex: "Boucle de 3h dans le Vercors")'
                            className='w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/80 text-peak placeholder-stone-400 border border-stone-200/60 focus:outline-none focus:ring-2 focus:ring-alpine-400/50 focus:border-alpine-400/50 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/5 text-sm'
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={loading}
                        className='cursor-pointer group px-6 py-3.5 bg-linear-to-br from-alpine-600 to-alpine-800 text-white rounded-2xl hover:from-alpine-500 hover:to-alpine-700 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-alpine-900/30 hover:shadow-xl hover:shadow-alpine-900/40 disabled:opacity-60 disabled:cursor-not-allowed'
                    >
                        {loading ? (
                            <LuLoaderCircle
                                size={20}
                                className='animate-spin'
                            />
                        ) : (
                            <>
                                <PiPersonSimpleHikeBold size={20} />
                                <span className='text-sm font-semibold hidden sm:inline'>Explorer</span>
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Content area */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0'>
                {/* Info panel */}
                <div className='flex flex-col w-full h-full rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-xl shadow-black/5 overflow-hidden'>
                    {loading ? (
                        <Funnyloader />
                    ) : (
                        <InfoPanel response={response} />
                    )}
                </div>

                {/* Map */}
                <Map itineraireSteps={response?.itineraire || []} />
            </div>
        </div>
    );
};
