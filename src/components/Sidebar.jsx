import React from "react";
import useChat from "../contexts/ChatContext";

const Sidebar = () => {
  const { chats } = useChat();
  const [filteredChats, setFilteredChats] = React.useState(chats || []);

  const openMessageFromHistory = (e, chatId) => {
    e.preventDefault();
    const chatMessage = document.getElementById(chatId);

    if (!chatMessage) {
      alert("Message history not message");
      return;
    }

    chatMessage.scrollIntoView({ behavior: "smooth" });
  };

  const searchMessage = (e) => {
    const query = e.target.value;
    const results = chats.filter((chat) => {
      const q = query.toLowerCase();
      return (
        chat.user?.toLowerCase().includes(q) ||
        chat.bot?.toLowerCase().includes(q) ||
        chat.date?.toLowerCase().includes(q)
      );
    });

    setFilteredChats(results || chats || []);
  };

  React.useEffect(() => {
    if (document.getElementById("historySearchBar")?.value?.trim() !== "")
      return;

    setFilteredChats(chats);
  }, [chats]);

  return (
    <div className="bg-gray-900 text-white overflow-y-auto overlflow-x-hidden shadow-md w-64 p-4 h-screen relative scrollbar-thin">
      <input
        type="search"
        name="historySearchBar"
        id="historySearchBar"
        placeholder="Search Chat History..."
        className="w-full h-12 mb-4 px-2 py-1 rounded-md bg-gray-600 text-white sticky top-0"
        onChange={searchMessage}
      />

      {filteredChats.map((chat) => (
        <div className="flex justify-end mb-2" key={`${chat.id}-history`}>
          <div
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg py-2 px-4 w-full cursor-pointer"
            onClick={(e) => openMessageFromHistory(e, chat.id)}
          >
            <p className="block truncate">{chat.user}</p>
            <p className="text-gray-500 text-xs italic text-right mt-2">
              {chat.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
