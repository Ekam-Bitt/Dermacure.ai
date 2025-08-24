'use client';

import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

interface Message {
  text: string;
  sender: string;
}

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string
        // Add any other options if needed, e.g., encrypted: true
      }
    );

    // Subscribe to the channel
    const channel = pusher.subscribe('chat-channel');

    // Bind to the 'new-message' event
    channel.bind('new-message', function (data: { message: string }) {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: data.message, sender: 'Chatbot' }
      ]);
    });

    // Clean up on unmount
    return () => {
      pusher.unsubscribe('chat-channel');
      pusher.disconnect();
    };
  }, []); // Empty dependency array to run once on mount

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = { text: message, sender: 'You' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      // Send the message to your Vercel serverless function
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // The chatbot response will come via Pusher, so no need to process here
    } catch (error) {
      
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Error sending message.', sender: 'System' }
      ]);
    }

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
      {/* <h1>Commig soon!!</h1> */}
    </div>
  );
}

export default Chat;
