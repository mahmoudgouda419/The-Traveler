import {useEffect, useState, useRef} from "react";
import{useChatBot} from "./useChatBot";

const ChatBot = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ input, setInput] = useState("");
    const { messages, sendMessage, isLoading, error } = useChatBot();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, isLoading]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input);
        setInput("");
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
            {isOpen && (
                <div className="mb-4 w-[360px] max-w-[600px] max-h-[360px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-black/5"></div>
            )}
        </div>
    )
}
