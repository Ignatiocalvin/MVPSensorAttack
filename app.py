from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
import os
from llm.LLMSetup import interact

app = Flask(__name__, template_folder='frontend/templates', static_folder='frontend/static')

load_dotenv()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    if not os.getenv("GROQ_API_KEY"):
        return jsonify({"error": "Groq API Key not loaded"}), 500

    query = request.json['message']
    try:
        response = interact(query)
        return jsonify({"response": str(response)})
    except Exception as e:
        print(f"Error in chat route: {str(e)}")
        return jsonify({"error": "An error occurred while processing your request"}), 500

@app.route('/analyze', methods=['POST'])
def analyze():
    if not os.getenv("GROQ_API_KEY"):
        return jsonify({"error": "Groq API Key not loaded"}), 500

    first_value = request.json['first_value']
    second_value = request.json['second_value']

    query = f"Analyze these two values: {first_value} and {second_value}. Are they anomalies? Explain why or why not."
    try:
        response = interact(query)
        return jsonify({"response": str(response)})
    except Exception as e:
        print(f"Error in analyze route: {str(e)}")
        return jsonify({"error": "An error occurred while processing your request"}), 500

if __name__ == '__main__':
    app.run(debug=True)