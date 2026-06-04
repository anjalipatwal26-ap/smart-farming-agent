from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from watsonx_client import get_granite_response, is_greeting
from weather_service import get_weather_advice, get_weather
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "KisanAI Backend Running!"})

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    city = data.get('city', 'Meerut')
    lang = data.get('lang', 'Hindi')

    if not user_message:
        return jsonify({"error": "Message nahi mila!"}), 400

    # Greeting ke liye weather inject mat karo
    if is_greeting(user_message):
        ai_response = get_granite_response(user_message, lang)
        return jsonify({
            "question": user_message,
            "response": ai_response
        })

    # Normal farming question ke liye weather add karo
    weather_info = get_weather_advice(city)
    full_message = f"{user_message}\nLocation: {city}\nWeather: {weather_info}"
    ai_response = get_granite_response(full_message, lang)

    return jsonify({
        "question": user_message,
        "weather": weather_info,
        "response": ai_response
    })

@app.route('/weather', methods=['GET'])
def weather():
    city = request.args.get('city', 'Meerut')
    weather_data = get_weather(city)
    return jsonify(weather_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)