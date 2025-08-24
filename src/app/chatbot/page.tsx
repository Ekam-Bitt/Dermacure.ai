// pages/somepage.js
'use client';

import React from 'react';
import { sendToOpenAI } from '../../utils/sendToOpenAi';

export default function SomePage() {
  const [response, setResponse] = React.useState('');
  const [request, setRequest] = React.useState('');
  const [error, setError] = React.useState('');

  const handleMessage = async () => {
    try {
      const result = await sendToOpenAI(request as string);
      setResponse(result);
      setError('');
    } catch (err) {
      setError('Error communicating with OpenAI');
      setResponse('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">OpenAI Response:</h1>

      {response && (
        <div className="bg-green-200 p-4 rounded-lg text-green-800 mb-4">
          {response}
        </div>
      )}

      {error && (
        <div className="bg-red-200 p-4 rounded-lg text-red-800 mb-4">
          {error}
        </div>
      )}
      <input
        value={request}
        className="input-primary"
        placeholder="Hello How can I help You today ?"
        onChange={e => {
          setRequest(e.target.value);
        }}
      />

      <button
        onClick={handleMessage}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Send Message to OpenAI
      </button>
    </div>
  );
}
