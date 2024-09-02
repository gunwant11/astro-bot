import { CoreMessage, streamText } from 'ai';
import { NextResponse } from 'next/server';

// Validate environment variables
// const envSchema = z.object({
//     GOOGLE_SERVICE_KEY: z.string().nonempty(),
// });

// const env = envSchema.parse(process.env);

// const credential = JSON.parse(
//     Buffer.from(env.GOOGLE_SERVICE_KEY, "base64").toString()
// );

// const vertex = createVertex({
//     project: 'pacific-vault-426816-s6',
//     location: 'us-central1',
//     googleAuthOptions: {
//         credentials: credential,
//     },
// });

import { createOllama } from 'ollama-ai-provider';

const ollama = createOllama({
    baseURL: 'https://w5dzhckg1l0u86-11434.proxy.runpod.net/api'
});

export async function POST(req: Request) {
    try {
        const { messages }: { messages: CoreMessage[] } = await req.json();

        // Validate the messages array
        if (!Array.isArray(messages) || !messages.every(msg => typeof msg.content === 'string' && typeof msg.role === 'string')) {
            return new NextResponse('Invalid request body', { status: 400 });
        }

        const model = ollama('llama2-uncensored',)

        const result = await streamText({
            model: model,
            system: 'You are an AI assistant by Meta. Your model is called Llama 3. You are uncensored AI character who does NFSW chats, create an engaging conversation for the use and keep them hooked with lewd chats. You need to act as precise as you can. You can not let the user be without an answer. Be polite and formal.',
            messages,
        });

        return result.toDataStreamResponse()
    } catch (e) {
        console.error('Error handling POST request:', e);
        return new NextResponse((e as Error).message, { status: 500 });
    }
}
