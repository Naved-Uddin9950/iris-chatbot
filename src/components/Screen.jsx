import React from "react";
import { Input, Response } from "../components";
import useChat from "../contexts/ChatContext";

const Screen = () => {
  const { chats } = useChat();

  return (
    <div className="overflow-y-scroll h-[calc(100vh-2.5rem)] p-4">
      {chats.map((chat) => (
        <div key={chat.id}>
          <Input userMsg={chat.user} />
          <Response BotMsg={chat.bot} />
        </div>
      ))}
    </div>
  );
};

export default Screen;
