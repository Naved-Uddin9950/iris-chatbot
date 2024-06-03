import { createContext, useContext } from "react";

export const ChatContext = createContext({
    chats: [],
    setChats: () => {}
});

export const ChatProvider = ChatContext.Provider;

export default function useChat () {
    return useContext(ChatContext);
}