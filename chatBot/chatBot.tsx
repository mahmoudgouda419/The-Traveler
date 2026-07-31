import {useEffect, useState, useRef} from "react";
import{useChatBot} from "./useChatBot";

const ChatBot = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ input, setInput] = useState("");
    const {messeges, sendMessages, isLoading, error} = useChatBot();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current?.scrollHeight,
            behavior: "smooth" });
    }, [messeges, isLoading]);

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessages(input);
        setInput("");
    }

}
