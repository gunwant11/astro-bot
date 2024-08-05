import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useChat } from "ai/react";
import { useEffect, useRef, useState, useCallback } from "react";
import HumanResponse from "./HumanResponse";
import AIResponse from "./AIResponse";
import { Message } from "ai";
import UserInput from "./UserInput";
import { motion, useAnimate } from "framer-motion";
import { Spinner } from "@nextui-org/spinner";
import { SendHorizontal, Trash2 } from "lucide-react";

const ChatInterface: React.FC = () => {
    const { messages, input, setInput, append } = useChat();
    const [loading, setLoading] = useState(false);
    const [startChat, setStartChat] = useState(false);
    const [submitDetails, setSubmitDetails] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scope, animate] = useAnimate();

    const handleSubmit = useCallback(async () => {
        if (input.trim() === "") return;
        setLoading(true);
        setInput("");
        try {
            await append({ content: input, role: "user" });
        } catch (e: any) {
            console.error(e.message);
        } finally {
            setLoading(false);
        }
    }, [input, append, setInput]);

    useEffect(() => {
        containerRef.current?.scrollTo({
            top: containerRef.current?.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const submitUserDetails = useCallback(
        async (name: string, age: number, dob: string, starSign: string) => {
            setLoading(true);
            setSubmitDetails(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                await animate(scope.current, { y: "-50%", opacity: 0, display: "none" });
                setInput("");
                await append({
                    content: `Name: ${name}, Age: ${age}, DOB: ${dob}, Star Sign: ${starSign} , these are my details`,
                    role: "user",
                });
                setStartChat(true);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        },
        [animate, append, setInput, scope]
    );

    return (
        <div className="flex flex-col px-2 gap-4 justify-between h-full">
            <div className="flex flex-col gap-4 sm:mt-4 flex-1 scroll-bar-hide overflow-y-scroll pb-4" ref={containerRef}>
                <motion.div
                    initial={{ y: "30%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="gap-4 flex flex-col intro"
                    ref={scope}
                >
                    <AIResponse
                        message={{
                            content: "Hey there! 👋 I'm Astro Bot, your friendly guide to the cosmos. Before we start can you provide me your details",
                            role: "assistant",
                        } as Message}
                    />
                    <div className="flex gap-3">
                        <img src="/icons/bot.svg" alt="bot" className="w-10 h-10 p-1.5 bg-blue-900 rounded-full" />
                        <UserInput setUserDetails={submitUserDetails} startChat={startChat} />
                    </div>
                    {submitDetails && (
                        <AIResponse
                            message={{
                                content: "Thanks for providing your details.",
                                role: "assistant",
                            } as Message}
                        />
                    )}
                </motion.div>
                {messages.slice(1).map((message, index) =>
                    message.role === "user" ? (
                        <HumanResponse key={index} message={message} />
                    ) : (
                        <AIResponse key={index} message={message} />
                    )
                )}
            </div>
            <div className="mt-2 flex flex-col bg-zinc-900 p-4 gap-3 mb-2 sm:mb-4 rounded-xl overflow-hidden">
                <div className="flex gap-3">
                    <Textarea
                        disabled={loading || !startChat}
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={async (event) => {
                            if (event.key === "Enter") {
                                await handleSubmit();
                            }
                        }}
                    />
                    <div className="flex flex-col gap-2">
                        <Button onClick={handleSubmit} disabled={loading || input.trim() === "" || !startChat} className="h-9 p-0 min-w-10">
                            {loading ? <Spinner size="sm" color="secondary" /> : <SendHorizontal className="p-1" />}
                        </Button>
                        <Button onClick={() => setInput("")} disabled={loading} className="h-9 p-0 min-w-10">
                            <Trash2 className="p-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChatInterface;
