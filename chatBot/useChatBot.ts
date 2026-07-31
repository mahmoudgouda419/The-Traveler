import {useCallback, useState} from "react";
import type {ChatMessage} from "./types";

const welcomeMassege: ChatMessage = {
    id: "welcome",
    role: "assistant",
    content: "Hi, I'm Travello, The Traveller AI Assistant, You can ask me about your next advanture!",
};
const maxHistory = 20;

const createId = () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const useChatBot = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([welcomeMassege]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = useCallback(
        async (content: string) => {
            const trimmed = content.trim();
            if (!trimmed || isLoading) return;

            const userMessage: ChatMessage = {
                id: createId(),
                role: "user",
                content: trimmed,
            };

            const nextMessages = [...messages, userMessage];
            setMessages(nextMessages);
            setError(null);
            setIsLoading(true);

            try {
                const history = nextMessages.slice(-maxHistory).map(({ role, content }) => ({
                    role,
                    content,
                }));

                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ messages: history }),
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result?.message ?? "The assistant is unavailable now :(");
                }

                const botMessage: ChatMessage = {
                    id: createId(),
                    role: "assistant",
                    content: result.reply,
                };

                setMessages((prev) => [...prev, botMessage]);
            } catch (err) {
                console.error(err);
                setError("Something went wrong. Please try again.");
            } finally {
                setIsLoading(false);
            }
        },
        [messages, isLoading]
    );

    return { messages, sendMessage, isLoading, error };
};
