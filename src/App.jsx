// App.js
import './App.css';
import { Screen, MessageBox } from './components';
import { ChatProvider } from './contexts/ChatContext';
import { useState } from 'react';

function App() {
  const oldChats = JSON.parse(localStorage.getItem('chats')) || [{ id: 0, user: 'hi', bot: 'Hello, how can I help you sir ?' }];
  const [chats, setChats] = useState(oldChats);

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-gray-100' id='screen'>
      <div className='border rounded shadow-md w-full h-full sm:max-w-5xl'>
        <ChatProvider value={{ chats, setChats }}>
          <Screen />
          <MessageBox />
        </ChatProvider>
      </div>
    </div>
  );
}

export default App;
