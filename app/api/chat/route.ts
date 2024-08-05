import { CoreMessage, streamText } from 'ai';
import { createVertex } from '@ai-sdk/google-vertex';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validate environment variables
const envSchema = z.object({
    GOOGLE_SERVICE_KEY: z.string().nonempty(),
});

const env = envSchema.parse(process.env);

const credential = JSON.parse(
    Buffer.from(env.GOOGLE_SERVICE_KEY, "base64").toString()
);

const vertex = createVertex({
    project: 'pacific-vault-426816-s6',
    location: 'us-central1',
    googleAuthOptions: {
        credentials: credential,
    },
});

export async function POST(req: Request) {
    try {
        const { messages }: { messages: CoreMessage[] } = await req.json();

        // Validate the messages array
        if (!Array.isArray(messages) || !messages.every(msg => typeof msg.content === 'string' && typeof msg.role === 'string')) {
            return new NextResponse('Invalid request body', { status: 400 });
        }

        const model = vertex("gemini-1.5-flash");

        const result = await streamText({
            model: model,
            system: 'You are an astrologer called Astro Bot with predictions and insights based on users\' personal information. Ask users what they want to know and provide interesting predictions. The conversational tone is emojify, friendly, knowledgeable, and engaging.',
            messages,
        });

        return result.toDataStreamResponse()
    } catch (e) {
        console.error('Error handling POST request:', e);
        return new NextResponse((e as Error).message, { status: 500 });
    }
}
