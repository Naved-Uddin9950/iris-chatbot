import { createContext, useContext } from "react";

export const ChatContext = createContext({
  chats: [],
  setChats: () => {},
  loading: false,
  setLoading: () => {},
});

export const ChatProvider = ChatContext.Provider;

export default function useChat() {
  return useContext(ChatContext);
}
