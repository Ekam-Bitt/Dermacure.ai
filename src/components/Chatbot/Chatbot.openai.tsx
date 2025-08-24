'use client';
import React, { useState } from 'react';
import { sendToOpenAI } from '../../utils/sendToOpenAi';
interface IConversation {
  text: string;
  isBotResponse: boolean;
}

export default function BotPage() {
  const [conversation, setConversation] = useState<IConversation[]>([]);
  const [request, setRequest] = useState('');
  const [error, setError] = useState('');

  const addMessage = (text: string, isBotResponse = false) => {
    setConversation(prevConversation => [
      ...prevConversation,
      { text, isBotResponse }
    ]);
  };

  const handleMessage = async () => {
    if (!request) return;

    try {
      // User's message
      addMessage(request);

      // Send the message to OpenAI
      const result = await sendToOpenAI(request as string);

      // Bot's response
      addMessage(result, true);

      setError('');
    } catch (err) {
      setError('Error communicating with OpenAI');
    } finally {
      // Clear the input field
      setRequest('');
    }
  };

  return (
    <div className="flex flex-col ">
      <h1 className="text-2xl font-semibold mb-4">
        Tell Dermacure Ai Bot Your Symptoms
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-lg h-[28rem] overflow-y-auto mb-4">
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.isBotResponse ? 'text-gray-600' : 'text-blue-600'
            }`}
          >
            {message.isBotResponse ? 'Bot: ' : 'You: '}
            {message.text}
          </div>
        ))}
      </div>

      {conversation.length > 4 ? (
        <button
          onClick={() =>
            (window.location.href =
              '/dashboard/patient-dashboard?currentTab=E-Clinic')
          }
          className="px-4 py-2 mt-4 bg-red-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Visit E-Clinic
        </button>
      ) : (
        <>
          <input
            value={request}
            className="input-primary p-2 rounded-md border border-gray-300 focus:outline-none"
            placeholder="Hello, how can I help you today?"
            onChange={e => {
              setRequest(e.target.value);
            }}
          />

          <button
            onClick={handleMessage}
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Send Message
          </button>
        </>
      )}
    </div>
  );
}
