import { CoreMessage, streamText } from 'ai';

import { createVertex } from '@ai-sdk/google-vertex';
if (!process.env.GOOGLE_SERVICE_KEY) {
    throw new Error("GOOGLE_SERVICE_KEY environment variable is not set");
}

const credential = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY, "base64").toString()
);

const vertex = createVertex({
    project: 'pacific-vault-426816-s6',
    location: 'us-central1',
    googleAuthOptions: {
        credentials: credential,
    }
});


export async function POST(req: Request) {
    try {

        const { messages }: { messages: CoreMessage[] } = await req.json();
        const model = vertex("gemini-1.5-pro")

        const result = await streamText({
            model: model,
            system: 'You are astrologer called Astro Bot with predictions and insights based on users personal information. Ask users what do they want to know and provide interesting predictions. Conversational Tone is friendly, knowledgeable, and engaging.',
            messages,
        });

        return result.toDataStreamResponse();
    } catch (e) {
        return new Response((e as Error).message, { status: 500 });
    }
}