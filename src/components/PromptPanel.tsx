import { PiPersonSimpleHikeBold } from "react-icons/pi";

export const PromptPanel = () => {
    return (
        <form onSubmit={() => {}}>
            <div className='grid grid-cols-[auto_5vw] gap-4 fixed bottom-0 left-0 w-full p-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-t-lg shadow-lg'>
                <input
                    type='text'
                    placeholder='Où allons-nous ?'
                    className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-700'
                />
                <button
                    type='submit'
                    className='cursor-pointer group h-full bg-lime-900 text-white py-3 rounded-lg hover:bg-lime-700 transition-colors duration-300 flex items-center justify-center gap-2'
                >
                    <PiPersonSimpleHikeBold size={24} />
                </button>
            </div>
        </form>
    );
};
