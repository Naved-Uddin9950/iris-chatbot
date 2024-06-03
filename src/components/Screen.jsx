// Screen.jsx
import React from 'react';
import { Input, Response } from '../components';
import useChat from '../contexts/ChatContext';

function Screen() {
  const { chats } = useChat();

  return (
    <div className='overflow-y-scroll h-96'>
      {chats.map((chat) => (
        <div key={chat.id}>
          <Input userMsg={chat.user} />
          <Response BotMsg={chat.bot} />
        </div>
      ))}
    </div>
  );
}

export default Screen;
