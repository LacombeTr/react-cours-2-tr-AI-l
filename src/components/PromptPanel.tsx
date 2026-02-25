import { LuLoaderCircle } from "react-icons/lu";
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
        <div className='grid grid-rows-[1fr_auto] gap-3 h-[calc(100vh-4rem)] w-full'>
            <div className='grid grid-cols-2 gap-3 w-full h-full'>
                <div className='flex flex-col w-full h-full p-4 rounded-xl bg-white/20 text-white border-t-[0.5px] border-b border-t-white/40 border-b-white/40 backdrop-blur-sm'>
                    {loading ? (
                        <Funnyloader />
                    ) : (
                        <InfoPanel response={response} />
                    )}
                </div>
                <Map itineraireSteps={response?.itineraire || []} />
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const prompt = formData.get("prompt") as string;
                    sendPrompt(prompt).then((response) => {
                        if (response) {
                            setResponse(response);
                        }
                    });
                }}
                className='w-full'
            >
                <div className='grid grid-cols-[auto_5vw] gap-3 w-full'>
                    <input
                        type='text'
                        name='prompt'
                        value={promptMessage}
                        onInput={(e) => setPromptMessage(e.currentTarget.value)}
                        placeholder='Où allons-nous ?'
                        className='w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/80 border-t-[0.5px] border-b  border-t-white/40 border-b-white/40 focus:outline-none focus:ring-[0.5px] focus:ring-white/60 focus:border-white/60 transition-all duration-300 backdrop-blur-sm'
                    />
                    <button
                        type='submit'
                        className='cursor-pointer group h-full bg-linear-to-br from-lime-400/20 to-lime-600/20 text-white py-4 rounded-xl hover:from-lime-400/40 hover:to-lime-600/40 transition-all duration-300 flex items-center justify-center gap-2 border-t-[0.5px] border-b border-t-lime-400/20 border-b-lime-400/20 backdrop-blur-sm shadow-lg hover:shadow-xl'
                    >
                        {loading ? (
                            <LuLoaderCircle
                                size={24}
                                className='animate-spin'
                            />
                        ) : (
                            <PiPersonSimpleHikeBold size={24} />
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
