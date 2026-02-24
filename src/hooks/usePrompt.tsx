import { useState } from "react";
import type {
    ApiResponseOutput,
    OpenApiResponse,
} from "../types/ModelResponse";
import type { PromptReturn } from "../types/PromptReturn";

type UsePromptParam = {
    model?: string;
    setPromptMessage: (message: string) => void;
};

type UsePromptReturn = {
    sendPrompt: (prompt: string) => Promise<PromptReturn | undefined>;
    promptFormating: (promptMessage: string) => string;
    loading: boolean;
};

export const usePrompt = ({
    model = "gpt-5-mini",
    setPromptMessage,
}: UsePromptParam): UsePromptReturn => {
    const [loading, setLoading] = useState(false);

    const extractOutputText = (response: OpenApiResponse): string => {
        const outputs = response.output.filter(
            (item: ApiResponseOutput) => item.type === "message",
        )[0];

        if (!outputs || !outputs.content || outputs.content.length === 0) {
            return "Aucun message trouvé dans la réponse.";
        }

        const message = outputs.content[0].text;

        return message;
    };

    const promptFormating = (promptMessage: string) => {
        const formattedPromt = `
            Tu es un guide de voyage pour randonneurs. Mon utilisateur souhaite un itinéraire de randonnée suivant cette description:
            "${promptMessage}", et tu dois lui répondre avec un itinéraire de randonnée détaillé, incluant les points d'intérêt, les distances, les temps de marche estimés, et les conseils pour la randonnée.
            
            Renvoie moi cet itinéraire sous la forme d'un JSON avec les champs suivants:
            {
                "destination": "Nom de la destination de la randonnée",
                "depart": "Point de départ de la randonnée",
                "arrivée": "Point d'arrivée de la randonnée, si c'est un boucle indique le même point que le départ",
                "distance_totale": "Distance totale de la randonnée",
                "temps_total_estime": "Temps total de marche estimé pour la randonnée",
                "difficulté": "Niveau de difficulté de la randonnée (facile, modérée, difficile)",
                "itineraire": [
                    {
                        "point_interet": "Nom du point d'intérêt",
                        "coordonnees": "Coordonnées GPS du point d'intérêt",
                        "description": "Description du point d'intérêt",
                        "distance": "Distance depuis le point de départ ou le point précédent",
                        "temps_estime": "Temps de marche estimé pour atteindre ce point depuis le point de départ ou le point précédent",
                        "conseils": "Conseils spécifiques pour ce point d'intérêt, comme les meilleures périodes pour visiter, les équipements recommandés, etc."
                    },
                ],
                "conseils_generaux": "Conseils généraux pour la randonnée, comme les précautions à prendre, les équipements à emporter",
            }
            `;

        return formattedPromt;
    };

    const sendPrompt = async (
        prompt: string,
    ): Promise<PromptReturn | undefined> => {
        setLoading(true);

        try {
            const response = await fetch(
                "https://api.openai.com/v1/responses",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: model,
                        input: promptFormating(prompt),
                    }),
                },
            );

            const data = await response.json();

            setPromptMessage("");
            setLoading(false);

            console.log("API Response:", JSON.parse(extractOutputText(data)));

            return JSON.parse(extractOutputText(data));
        } catch (error) {
            setLoading(false);
            console.error("Error sending prompt:", error);
        }
    };

    return { sendPrompt, promptFormating, loading };
};
