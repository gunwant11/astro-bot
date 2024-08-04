import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import HumanResponse from './HumanResponse';
import AIResponse from './AIResponse';
import { Message } from 'ai'
import UserInput from './UserInput';
import { motion, useAnimate } from 'framer-motion';
import { Spinner } from "@nextui-org/spinner";


export default function ChatInterface() {

    const { messages, input, setInput, append } = useChat();
    const [loading, setLoading] = useState(false);
    const [startChat, setStartChat] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null);

    const [scope, animate] = useAnimate()

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await append({ content: input, role: 'user' });
            setLoading(false);
            setInput('');
            // scroll to the bottom of the chat
        } catch (e: any) {
            setLoading(false);
            console.log(e.message);
        }
    }

    useEffect(() => {
        containerRef.current?.scrollTo({
            top: containerRef.current?.scrollHeight,
            behavior: 'smooth'
        });
    }
        , [messages]);

    const submitUserDetails = async (name: string, age: number, dob: string, starSign: string) => {
        try {
            setLoading(true);
            animate(scope.current, { y: '-50%', opacity: 0, display: 'none' });
            await setTimeout(() => {
            }, 1000);
            await append({ content: `Name: ${name}, Age: ${age}, DOB: ${dob}, Star Sign: ${starSign} , these are my details`, role: 'user' });
            setStartChat(true);
            setLoading(false);
            setInput('');
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    return (
        <div className='flex flex-col gap-4 justify-between h-full ' >

            <div className='flex flex-col gap-4 mt-4 flex-1 scroll-bar-hide overflow-y-scroll pb-4 ' ref={containerRef}>
                {/* startchating si true then remove this div with animation to up */}
                <div className=' gap-4 flex flex-col intro' ref={scope} >
                    <AIResponse message={{ content: "Hey there! 👋 I'm Astro Bot, your friendly guide to the cosmos.  Before we start can you proivde me you details", role: 'assistant' } as Message} />
                    <UserInput setUserDetails={submitUserDetails} startChat={startChat} />
                    <AIResponse message={{ content: "Thanks for providing your details. ", role: 'assistant' } as Message} />
                </div>
                {messages.slice(1).map((message, index) => (
                    message.role === 'user' ? (
                        <HumanResponse key={index} message={message} />
                    ) : (
                        <AIResponse key={index} message={message} />
                    )
                ))}
            </div>

            <div>

            </div>
            <div className='mt-2 flex flex-col bg-zinc-900 p-4 gap-3 rounded-xl overflow-hidden'>
                <div className='flex gap-3 items-center'>
                    <Textarea
                        disabled={loading}
                        value={input}
                        onChange={event => {
                            setInput(event.target.value);
                        }}
                        onKeyDown={async event => {
                            if (event.key === 'Enter') {
                                await handleSubmit();
                            }
                        }}
                    />
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ?
                            <Spinner />
                            : 'Send'}
                    </Button>

                </div>


            </div>
        </div >
    );
}