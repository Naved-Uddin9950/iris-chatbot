// MessageBox.jsx
import React, { useEffect, useRef } from 'react';
import useChat from '../contexts/ChatContext';
import data from '../data/dataset.json';

function MessageBox() {
  const { chats, setChats } = useChat();
  const msgRef = useRef();

  const sendMsg = () => {
    const temp = msgRef.current.value;
    const message = temp.split(" ").join("_").split("'").join("").split("?").join("").toLowerCase();
    let response = data[message];

    if(message === '') return;

    if (data[message] === undefined) {
      response = "I'm sorry, I'm not equipped to answer that question right now. Is there anything else I can help you with?";
    }

    setChats((prev) => [...prev, { id: chats.length, user: temp, bot: response }]);
    msgRef.current.value = '';
    msgRef.current.focus();
  };

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  return (
    <div className='w-full h-10 border rounded absolute bottom-0 sm:static flex flex-row'>
      <input
        type="text"
        ref={msgRef}
        placeholder='Type something here....'
        className='border rounded shadow-md w-full h-full px-2'
      />
      <button className='border rounded h-full w-10 flex items-center justify-center bg-white shadow-md hover:bg-slate-100 active:bg-slate-200' onClick={sendMsg}>
        <img
          src="https://img.icons8.com/?size=100&id=42485&format=png&color=000000"
          alt="Send"
          className='h-6'
        />
      </button>
    </div>
  );
}

export default MessageBox;
