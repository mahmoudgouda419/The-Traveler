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
                <div className="mb-4 w-[360px] max-w-[600px] max-h-[360px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-black/5">
                    <div className="bg-blue-600 text-white px-5 py-4 flex items-center justify-between">
                        <div>
                            <p className="font-semibold">Travello</p>
                            <p className="text-xs text-white/80">Ask me anything about your trip</p>
                        </div>
                    </div>
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
                        {messages.map((message) => (
                            <div key={message.id}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                                    message.role == "user" ? "bg-blue-600 text-white rounded-br-sm"
                                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                                }`}>
                                    {message.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-500 border border-gray-200 px-4 py-2 rounded-2xl rounded-bl-sm text-sm">
                                    Travello is Typing...
                                </div>
                            </div>
                        )}
                        {error && <p className="text-xs text-red-500 text-center">{error}</p>}
                    </div>

                    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex gap-2 bg-white">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Start chating with Travello :)" className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500"/>
                        <button type="submit" disabled={isLoading || !input.trim()}>Send</button>
                    </form>
                </div>

            )}
            <button onClick={() => setIsOpen((prev) => !prev)} className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl flex items-center justify-center cursor-pointer transition text-2xl" aria-label={isOpen?"Close chat":"open chat"}>
                {isOpen ? <img src="/assets/icons/x.png"/> : <img src="/assets/icons/bot.png"/>}
            </button>
        </div>
    )
}
export default ChatBot;