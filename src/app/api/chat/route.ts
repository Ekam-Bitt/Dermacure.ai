export async function POST(req: Request) {
  const data = await req.json();

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
              'You are a helpful assistant for a platform which treats dermatological diseases.'
          },
          { role: 'user', content: data.message }
        ]
      })
    }
  );

  if (openaiResponse.ok) {
    const responseData = await openaiResponse.json();
    return new Response(responseData.choices[0].message.content);
  } else {
    return new Response('Failed to communicate with OpenAI API', {
      status: 500
    });
  }
}
