'use client';

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

interface Message {
  text: string;
  sender: string;
}

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chatMessage', (message: Message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Send the message to the server
    socket.emit('chatMessage', { text: message });

    // Clear the input field
    setMessage('');
  };

  return (
    <div className="flex justify-center items-center w-full h-full text-3xl">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg.sender}: {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <h1>Commig soon!!</h1>
    </div>
  );
}

export default Chat;
