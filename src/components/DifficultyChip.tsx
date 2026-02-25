export const DifficultyChip = ({ difficulty }: { difficulty: string }) => {
    const difficultyColors: Record<string, string> = {
        facile: "bg-green-500",
        modérée: "bg-yellow-500",
        difficile: "bg-red-500",
    };

    const colorClass = difficultyColors[difficulty] || "bg-gray-500";

    return (
        <span
            className={`${colorClass} w-fit text-white px-2 py-1 rounded-lg text-sm font-semibold`}
        >
            {difficulty}
        </span>
    );
};
