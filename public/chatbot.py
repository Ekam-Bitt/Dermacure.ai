from flask import Flask, render_template, request
import openai
from flask_socketio import SocketIO, emit


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Set up OpenAI API credentials
openai.api_key = "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"


# Define the default route to return the index.html file
@app.route("/")
def index():
    return render_template("index.html")


# Define the /api route to handle POST requests
@app.route("/api", methods=["POST"])
def api():
    # Get the message from the POST request
    message = request.json.get("message")
    # Send the message to OpenAI's API and receive the response

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=[{"role": "user", "content": message}]
    )
    if completion.choices[0].message != None:
        return completion.choices[0].message
    else:
        return "Failed to Generate response!"

@socketio.on('connect')
def test_connect():
    print('Client connected')
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

@socketio.on('chatMessage')
def handle_chat_message(data):
    print('received message: ' + str(data))
    emit('chatMessage', data, broadcast=True) # Echo back to all clients


if __name__ == "__main__":
    socketio.run(app, debug=True)