import "./App.css";
import { PromptPanel } from "./components/PromptPanel";
import { Background } from "./components/Background";
import { PiMountainsBold } from "react-icons/pi";

function App() {
    return (
        <>
            <Background />
            <div className='relative z-10 flex flex-col h-screen w-screen'>
                {/* Header */}
                <header className='flex items-center gap-3 px-8 py-4 bg-peak/70 backdrop-blur-md border-b border-white/10'>
                    <PiMountainsBold className='text-alpine-300' size={28} />
                    <h1 className='text-xl font-bold text-white tracking-wide' style={{ fontFamily: "'Playfair Display', serif" }}>
                        Tr-AI-l
                    </h1>
                    <span className='text-xs text-alpine-300/70 ml-1 mt-1'>— Votre compagnon IA de randonnée</span>
                </header>

                {/* Main content */}
                <main className='flex-1 overflow-hidden px-6 py-4'>
                    <PromptPanel />
                </main>
            </div>
        </>
    );
}

export default App;
