// MessageBox.jsx
import React, { useEffect, useRef } from "react";
import useChat from "../contexts/ChatContext";
import data from "../data/dataset.json";
import axios from "axios";
import { storage } from "../utils/storage";

function MessageBox() {
  const { chats, setChats } = useChat();
  const msgRef = useRef();

  const sendMsg = async () => {
    const message = msgRef.current.value;

    if (message?.trim() === "") return;

    msgRef.current.value = "";

    try {
      const payload = {
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: message,
              },
            ],
          },
        ],
      };

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        payload,
        {
          headers: {
            Authorization:
              "Bearer " + import.meta.env.VITE_APP_OPENROUTER_API_KEY,
            "HTTP-Referer": import.meta.env.VITE_APP_SITE_URL,
            "X-Title": import.meta.env.VITE_APP_SITE_NAME,
            "Content-Type": "application/json",
          },
        }
      );

      let reply = response.data?.choices[0]?.message?.content || null;

      if (!reply === undefined) {
        reply =
          "I'm sorry, I'm not equipped to answer that question right now. Is there anything else I can help you with?";
      }

      setChats((prev) => [
        ...prev,
        {
          id: chats.length,
          user: message,
          bot: reply,
          date: new Date().toLocaleString(),
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChats((prev) => [
        ...prev,
        {
          id: chats.length,
          user: message,
          bot:
            error?.response?.data?.error?.metadata?.raw ||
            error?.response?.data?.error?.message ||
            "An error occurred",
          date: new Date().toLocaleString(),
        },
      ]);
    }
  };

  useEffect(() => {
    storage.store("chats", chats);
  }, [chats]);

  return (
    <div className="w-full h-10 absolute bottom-0 sm:static flex flex-row">
      <input
        type="text"
        ref={msgRef}
        placeholder="Type something here...."
        className="bg-gray-900 text-gray-300 shadow-md w-full h-full px-2"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMsg();
          }
        }}
      />
      <button
        className="h-full w-10 flex items-center justify-center bg-gray-900 shadow-md hover:bg-slate-800 active:bg-slate-700"
        onClick={sendMsg}
      >
        <img
          src="https://img.icons8.com/?size=100&id=42485&format=png&color=000000"
          alt="Send"
          className="h-6"
          style={{ filter: "invert(100%)" }}
        />
      </button>
    </div>
  );
}

export default MessageBox;
