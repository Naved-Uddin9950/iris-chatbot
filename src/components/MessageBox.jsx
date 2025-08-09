// MessageBox.jsx
import React, { useEffect, useRef } from "react";
import useChat from "../contexts/ChatContext";
import data from "../data/dataset.json";
import axios from "axios";

function MessageBox() {
  const { chats, setChats } = useChat();
  const msgRef = useRef();

  const sendMsg = async () => {
    const message = msgRef.current.value;

    if (message?.trim() === "") return;

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

    if (data[message] === undefined) {
      response =
        "I'm sorry, I'm not equipped to answer that question right now. Is there anything else I can help you with?";
    }

    setChats((prev) => [
      ...prev,
      { id: chats.length, user: temp, bot: response },
    ]);
    msgRef.current.value = "";
    msgRef.current.focus();
  };

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  return (
    <div className="w-full h-10 absolute bottom-0 sm:static flex flex-row">
      <input
        type="text"
        ref={msgRef}
        placeholder="Type something here...."
        className="bg-gray-900 shadow-md w-full h-full px-2"
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
