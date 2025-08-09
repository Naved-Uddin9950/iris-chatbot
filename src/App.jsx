// App.js
import "./App.css";
import { Screen, MessageBox } from "./components";
import Sidebar from "./components/Sidebar";
import { ChatProvider } from "./contexts/ChatContext";
import { useState } from "react";
import { storage } from "./utils/storage";

function App() {
  const oldChats = storage.get("chats") || [
    { id: 0, user: "hi", bot: "Hello, how can I help you sir ?" },
  ];

  const [chats, setChats] = useState(oldChats);

  return (
    <div className="w-full min-h-screen flex" id="screen">
      <ChatProvider value={{ chats, setChats }}>
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
