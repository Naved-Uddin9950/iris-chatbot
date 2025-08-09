import React from "react";
import { Input, Response } from "../components";
import useChat from "../contexts/ChatContext";

const Screen = () => {
  const bottomRef = React.useRef(null);
  const { chats, loading } = useChat();

  React.useEffect(() => {
    if (loading) {
      document
        .getElementById("thinking")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats, loading]);

  return (
    <div className="overflow-y-scroll h-[calc(100vh-2.5rem)] p-4 scrollbar-thin">
      {chats.map((chat) => (
        <div key={chat.id} id={chat.id}>
          <Input userMsg={chat.user} date={chat?.date} />
          <Response BotMsg={chat.bot} />
        </div>
      ))}
      {loading ? (
        <div id="thinking">
          <Response
            BotMsg="I am Thinking...."
            styles={{ message: "italic font-semibold" }}
          />
        </div>
      ) : null}
      <div ref={bottomRef} />
    </div>
  );
};

export default Screen;
