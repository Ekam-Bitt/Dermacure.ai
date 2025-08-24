from flask import Flask, request, jsonify
import openai
import os
import pusher

app = Flask(__name__)

# Initialize Pusher
pusher_client = pusher.Pusher(
    app_id=os.environ.get('PUSHER_APP_ID'),
    key=os.environ.get('PUSHER_APP_KEY'),
    secret=os.environ.get('PUSHER_APP_SECRET'),
    cluster=os.environ.get('PUSHER_APP_CLUSTER'),
    ssl=True
)

# Set up OpenAI API credentials from environment variable
openai.api_key = os.environ.get("OPENAI_API_KEY")

# Define the /api route to handle POST requests
@app.route("/api", methods=["POST"])
def api():
    # Get the message from the POST request
    message = request.json.get("message")

    if not openai.api_key:
        return jsonify({"error": "OpenAI API key not configured."}), 500

    try:
        # Send the message to OpenAI's API and receive the response
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=[{"role": "user", "content": message}]
        )
        
        chatbot_response = "Failed to Generate response!"
        if completion.choices[0].message is not None:
            chatbot_response = completion.choices[0].message.content

        # Trigger a Pusher event with the chatbot's response
        pusher_client.trigger(
            'chat-channel', # Channel name
            'new-message',  # Event name
            {'message': chatbot_response}
        )

        return jsonify({"response": chatbot_response})

    except Exception as e:
        print(f"Error processing OpenAI request: {e}")
        return jsonify({"error": str(e)}), 500


# This part is for Vercel deployment, it will run the app as a serverless function
# Vercel will automatically handle running the Flask app via WSGI (e.g., Gunicorn)
# No need for if __name__ == "__main__": app.run() or socketio.run()
