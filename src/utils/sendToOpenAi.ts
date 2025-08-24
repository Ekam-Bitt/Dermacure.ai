import { Response } from 'node-fetch';

interface OpenAIResponse {
  choices: [{ message: { content: string } }];
}

export async function sendToOpenAI(message: string): Promise<string> {
  // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
  const apiKey = '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';

  const openaiResponse = await fetch(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant for a platform which treats dermatological diseases.After knowing 4 symptoms, you have to suggest the patient to visit E-Clinic and Upload the image of their skin where the issue is present '
          },
          { role: 'user', content: message }
        ]
      })
    }
  );

  if (openaiResponse.ok) {
    const responseData: OpenAIResponse = await openaiResponse.json();
    return responseData.choices[0].message.content;
  } else {
    throw new Error('Failed to communicate with OpenAI API');
  }
}
