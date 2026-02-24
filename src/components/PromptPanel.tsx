import { PiPersonSimpleHikeBold } from "react-icons/pi";

export const PromptPanel = () => {
    return (
        <form onSubmit={() => {}}>
            <div className='grid grid-cols-[auto_5vw] gap-3 fixed bottom-0 left-0 w-full p-6 '>
                <input
                    type='text'
                    placeholder='Où allons-nous ?'
                    className='w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/80 border-t-[0.5px] border-b  border-t-white/40 border-b-white/40 focus:outline-none focus:ring-[0.5px] focus:ring-white/60 focus:border-white/60 transition-all duration-300 backdrop-blur-sm'
                />
                <button
                    type='submit'
                    className='cursor-pointer group h-full bg-linear-to-br from-lime-400/20 to-lime-600/20 text-white py-4 rounded-xl hover:from-lime-400/40 hover:to-lime-600/40 transition-all duration-300 flex items-center justify-center gap-2 border-t-[0.5px] border-b border-t-lime-400/20 border-b-lime-400/20 backdrop-blur-sm shadow-lg hover:shadow-xl'
                >
                    <PiPersonSimpleHikeBold size={24} />
                </button>
            </div>
        </form>
    );
};
