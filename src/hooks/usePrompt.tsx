import { useState } from "react";
import type {
    ApiResponseOutput,
    OpenApiResponse,
} from "../types/ModelResponse";

export const usePrompt = () => {
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

    const sendPrompt = async (prompt: string) => {
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
                        model: "gpt-5-mini",
                        input: prompt,
                    }),
                },
            );

            const data = await response.json();

            setLoading(false);

            return extractOutputText(data);
        } catch (error) {
            setLoading(false);
            console.error("Error sending prompt:", error);
        }
    };

    return { sendPrompt, loading };
};
