import {type ActionFunctionArgs, data} from "react-router";
import Groq from "groq-sdk";

const SYSTEM_PROMPT = `You are the Traveller Assistant and your name is travello. You are a friendly and knowledgeable travel guide chatbot embedded in "The Traveller" website.
You help visitors with - Destination advice, itinerary ideas, best time to visit, budgeting tips, packing suggestions, and general travel questions.
- Explaining how to use the site: browsing trips on the home page, generating a personalized AI itinerary via "Create Trip", signing in to save trips, and viewing trip details.
- Answer All of Their qustions

Guidelines:
- Keep answers concise, friendly, and focused on travel or the site itself.
- If asked something unrelated to travel or the site, politely redirct the conversation back to travel planning.
- Never invent prices, bookings, or guarantee availability, but make sure from everything you say and provide specific information.
`;

const maxHistory = 20;
const maxMessageLength = 4000;

interface IncomingMessage {
    role: "user" | "assistant";
    content: string;
}
export const action = async ({request}: ActionFunctionArgs) => {
    if (request.method !== "POST") {
        return data({
            success: false, message: "not allowed"
        }, {status: 405})
    }
    try {
        const  body = await request.json();
        const messages = body?.messages;

        if (!Array.isArray(messages) || messages.length === 0) {
            return data({success: false, messages: "Empty message"}, {status: 400});
        }

        const history = messages
            .slice(-maxHistory)
            .filter(
                (message: any): message is IncomingMessage =>
                    (message?.role === "user" || message?.role === "assistant") &&
                    typeof message?.content === "string" &&
                    message.content.trim().length > 0
            )
            .map((message: IncomingMessage) => ({
                role: message.role,
                content: message.content.slice(0, maxMessageLength),
            }));
        if (history.length === 0) {
            return data({success: false, messages: "No Valid Messages"}, {status: 400});
        }
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY!,
        });
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{role: "system", content: SYSTEM_PROMPT}, ...history],
            temperature: 0.6,
            max_tokens: 600,
        });
        const  reply = completion.choices[0]?.message?.content?.trim();

        if (!reply) {
            return data({success: false, messages: "No Response :("}, {status: 502});
        }
        return data({ success: true, reply });
    } catch (e) {
        console.error(e);
        return data({success: false, messages: "technical error"}, {status: 500});
    }
}