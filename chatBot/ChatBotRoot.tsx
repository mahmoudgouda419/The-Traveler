import ChatBot from "./chatBot";
import {useLocation} from "react-router";

export default function ChatBotRoot() {
    const location = useLocation();

    if (location.pathname === "/sign-in") {
        return null;
    }
    return <ChatBot />;
};