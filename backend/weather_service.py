import requests
import os
from dotenv import load_dotenv

load_dotenv()

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

def get_weather(city="Meerut"):
    """Kisi bhi city ka weather fetch karo"""
    try:
        url = f"http://api.openweathermap.org/data/2.5/weather"
        params = {
            "q": city,
            "appid": WEATHER_API_KEY,
            "units": "metric",
            "lang": "en"
        }
        
        response = requests.get(url, params=params)
        data = response.json()
        
        if response.status_code == 200:
            weather_info = {
                "city": city,
                "temperature": data["main"]["temp"],
                "humidity": data["main"]["humidity"],
                "description": data["weather"][0]["description"],
                "wind_speed": data["wind"]["speed"]
            }
            return weather_info
        else:
            return {"error": "Weather data nahi mila"}
            
    except Exception as e:
        return {"error": str(e)}

def get_weather_advice(city="Meerut"):
    """Weather ke hisaab se farming advice do"""
    weather = get_weather(city)
    
    if "error" in weather:
        return "Weather data abhi available nahi hai."
    
    advice = f"Aaj {city} mein mausam: {weather['description']}, "
    advice += f"Temperature: {weather['temperature']}°C, "
    advice += f"Humidity: {weather['humidity']}%"
    
    # Farming tips based on weather
    if weather["temperature"] > 40:
        advice += "\n⚠️ Zyada garmi hai — zyada sinchai karein!"
    elif weather["temperature"] < 10:
        advice += "\n⚠️ Thand zyada hai — paalon se fasal bachayein!"
    
    if weather["humidity"] > 80:
        advice += "\n⚠️ Humidity zyada hai — fungal beemari ka khatra, fungicide spray karein!"
    
    return advice

# Test
if __name__ == "__main__":
    print(get_weather_advice("Meerut"))