# 🌾 KisanAI - Smart Farming Assistant
### किसानAI - स्मार्ट खेती सहायक

> An AI-powered farming assistant for Indian farmers, built with IBM Watsonx Granite AI, Flask, and React. Supports both **Hindi** and **English**.

---

## 🚀 Features

- 💬 **AI Chat** — Ask farming questions in Hindi or English, powered by IBM Watsonx Granite
- 🌦 **Live Weather** — Real-time weather data with farming alerts (heat, fungal risk)
- 📅 **Crop Calendar** — Month-wise crop recommendations for Indian seasons
- 🌱 **Soil Checker** — Identify best crops based on soil type (Alluvial, Black, Red, Sandy, Laterite)
- 🐛 **Pest Guide** — Pest identification with chemical and organic solutions
- 💰 **Mandi Prices** — Current market prices for major crops
- 🇮🇳 **19+ Indian Cities** — Location-aware weather and farming advice

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Python, Flask |
| AI Model | IBM Watsonx Granite (via RAG pipeline) |
| Weather | OpenWeatherMap API (or similar) |
| Styling | Custom CSS |

---

## 📁 Project Structure

```
smart-farming-agent/
├── backend/
│   ├── app.py               # Flask API server
│   ├── watsonx_client.py    # IBM Watsonx Granite integration
│   ├── weather_service.py   # Weather API integration
│   └── .env                 # API keys (not committed)
├── frontend/
│   └── src/
│       ├── App.js           # Main React app
│       └── App.css          # Styles
└── data/                    # RAG knowledge base / farming data
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- IBM Watsonx API key
- OpenWeatherMap API key

### Backend Setup

```bash
cd backend
pip install flask flask-cors python-dotenv
```

Create a `.env` file in the `backend/` folder:

```env
WATSONX_API_KEY=your_watsonx_api_key
WATSONX_PROJECT_ID=your_project_id
WEATHER_API_KEY=your_openweathermap_key
```

Start the backend server:

```bash
python app.py
```

The backend runs at `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend runs at `http://localhost:3000`

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/chat` | Send a farming question to AI |
| GET | `/weather?city=Meerut` | Get weather for a city |

### `/chat` Request Body
```json
{
  "message": "गेहूं में कौन सा खाद डालूं?",
  "city": "Meerut",
  "lang": "Hindi"
}
```

---



## 🙏 Acknowledgements

- [IBM Watsonx AI](https://www.ibm.com/watsonx) — Granite LLM
- [OpenWeatherMap](https://openweathermap.org/) — Weather data
- Inspired by the needs of Indian farmers 🇮🇳

---

## 👩‍💻 Author

**Anjali Patwal**  
GitHub: [@anjalipatwal26-ap](https://github.com/anjalipatwal26-ap)