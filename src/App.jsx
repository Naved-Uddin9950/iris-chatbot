// App.js
import "./App.css";
import { Screen, MessageBox } from "./components";
import Sidebar from "./components/Sidebar";
import { ChatProvider } from "./contexts/ChatContext";
import React from "react";
import { storage } from "./utils/storage";

function App() {
  const oldChats = storage.get("chats") || [];

  const [chats, setChats] = React.useState(oldChats);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const uniqueChats = chats.filter(
      (chat, index, self) => index === self.findIndex((c) => c.id === chat.id)
    );

    if (uniqueChats.length !== chats.length) {
      setChats(uniqueChats);
    }
  }, [chats]);

  return (
    <div className="w-full min-h-screen flex" id="screen">
      <ChatProvider value={{ chats, setChats, loading, setLoading }}>
        <Sidebar />
        <div className="flex-1 h-screen">
          <Screen />
          <MessageBox />
        </div>
      </ChatProvider>
    </div>
  );
}

export default App;
