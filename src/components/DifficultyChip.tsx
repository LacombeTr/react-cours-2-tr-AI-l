import { LuTriangleAlert, LuCircleCheck, LuShield } from "react-icons/lu";

export const DifficultyChip = ({ difficulty }: { difficulty: string }) => {
    const config: Record<string, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
        facile: {
            bg: "bg-alpine-50",
            text: "text-alpine-700",
            border: "border-alpine-200",
            icon: <LuCircleCheck size={13} />,
        },
        modérée: {
            bg: "bg-amber-50",
            text: "text-amber-700",
            border: "border-amber-200",
            icon: <LuShield size={13} />,
        },
        difficile: {
            bg: "bg-red-50",
            text: "text-red-700",
            border: "border-red-200",
            icon: <LuTriangleAlert size={13} />,
        },
    };

    const c = config[difficulty] || { bg: "bg-stone-100", text: "text-stone-600", border: "border-stone-200", icon: null };

    return (
        <span
            className={`${c.bg} ${c.text} ${c.border} border inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0`}
        >
            {c.icon}
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
    );
};
