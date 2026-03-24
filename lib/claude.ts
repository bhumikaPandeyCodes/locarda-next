import Anthropic from "@anthropic-ai/sdk";
import { formatEOIPrompt } from "./prompts";

const apiKey = process.env.ANTHROPIC_API_KEY!;
const anthropic = new Anthropic({ apiKey });

export async function formatReportWithClaude(template: string, transcript: string): Promise<string> {
    const { systemPrompt, userMessage } = formatEOIPrompt(template, transcript);
    // console.log('this is the api key', apiKey)

    const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 4000,
        temperature: 0,
        system: systemPrompt,
        messages: [
            {
                role: "user",
                content: userMessage,
            },
        ],
    });

    return msg.content[0].type === 'text' ? msg.content[0].text : "";
}
