from flask import Flask, render_template, request, jsonify
import json
import re

app = Flask(__name__)

# Load Q&A data
with open('pattybot-q&a.json', 'r', encoding='utf-8') as f:
    qa_data = json.load(f)

def process_text(text):
    text = re.sub(r'</?pad>', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def find_response(user_input):
    user_input = process_text(user_input.lower())
    # Simple matching logic - can be enhanced later
    for qa in qa_data:
        if user_input in process_text(qa['question'].lower()):
            return {
                'response': qa['answer'],
                'sources': [
                    {
                        'title': 'PattyBot Knowledge Base',
                        'link': '#'
                    }
                ]
            }
    
    # Default response if no match found
    return {
        'response': "I'm not sure about that. Could you ask something else?",
        'sources': []
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    response = find_response(user_message)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)