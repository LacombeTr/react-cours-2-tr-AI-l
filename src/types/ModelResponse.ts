export type ApiResponseOutput = {
    id: string;
    type: "reasoning" | "message";
    summary?: string[];
    content?: Array<{
        annotations: unknown[];
        logprobs: unknown[];
        text: string;
        type: "output_text";
    }>;
};

export type OpenApiResponse = {
    background: boolean;
    billing: {
        payer: "developer";
    };
    completed_at: number;
    created_at: number;
    error: null | string;
    frequency_penalty: number;
    id: string;
    incomplete_details: null | unknown;
    instructions: null | string;
    max_output_tokens: null | number;
    max_tool_calls: null | number;
    metadata: Record<string, unknown>;
    model: string;
    object: "response";
    output: ApiResponseOutput[];
    parallel_tool_calls: boolean;
    presence_penalty: number;
    previous_response_id: null | string;
    prompt_cache_key: null | string;
    prompt_cache_retention: null | string;
    reasoning: {
        effort: "low" | "medium" | "high";
        summary: null | string;
    };
    safety_identifier: null | string;
    service_tier: string;
    status: "completed" | string;
    store: boolean;
    temperature: number;
    text: {
        format: { type: string };
        verbosity: string;
    };
    tool_choice: string;
    tools: unknown[];
    top_logprobs: number;
    top_p: number;
    truncation: string;
    usage: {
        input_tokens: number;
        input_tokens_details: { cached_tokens: number };
        output_tokens: number;
        output_tokens_details: { reasoning_tokens: number };
        total_tokens: number;
    };
    user: null | string;
};
