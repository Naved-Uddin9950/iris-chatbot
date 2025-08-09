import React from "react";
import { Input, Response } from "../components";
import useChat from "../contexts/ChatContext";

const Screen = () => {
  const bottomRef = React.useRef(null);
  const { chats } = useChat();

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="overflow-y-scroll h-[calc(100vh-2.5rem)] p-4 scrollbar-thin">
      {chats.map((chat) => (
        <div key={chat.id} id={chat.id}>
          <Input userMsg={chat.user} date={chat?.date} />
          <Response BotMsg={chat.bot} />
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default Screen;
