# 🌾 KisanAI - Smart Farming Assistant

### किसानAI - स्मार्ट खेती सहायक

> An AI-powered farming assistant for Indian farmers, built with IBM Watsonx Granite, a RAG pipeline, Flask, and React. Supports both **Hindi** and **English**.

Built for the IBM University Engagement Program.

---

## 📸 Demo

<!-- Add a screenshot or GIF here. Example: ![KisanAI demo](docs/demo.gif) -->

_Screenshots coming soon._

---

## 🚀 Features

- 💬 **AI Chat** — Ask farming questions in Hindi or English, answered by IBM Watsonx Granite using context retrieved from a farming knowledge base (requires a valid IBM Watsonx API key)
- 🔎 **Web Search Support** — Supplements the knowledge base with DuckDuckGo search results
- 🌦 **Live Weather** — Real-time weather from OpenWeatherMap with farming alerts (heat, fungal risk)
- 📅 **Crop Calendar** — Month-wise crop recommendations for Indian seasons
- 🌱 **Soil Checker** — Best crops for your soil type (Alluvial, Black, Red, Sandy, Laterite)
- 🐛 **Pest Guide** — Pest identification with chemical and organic solutions
- 💰 **Mandi Prices** — Market prices for major crops
- 🇮🇳 **19+ Indian Cities** — Location-aware weather and farming advice

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Custom CSS |
| Backend | Python, Flask, Flask-CORS |
| LLM | IBM Watsonx Granite |
| RAG | LangChain, ChromaDB, HuggingFace embeddings (sentence-transformers) |
| Web search | DuckDuckGo (`ddgs`) |
| Weather | OpenWeatherMap API |

---

## 🧠 How It Works

KisanAI uses **Retrieval-Augmented Generation (RAG)**, so answers are grounded in farming data instead of relying only on what the LLM already knows.

1. **Ingest** — Farming documents are split into small chunks with LangChain's `RecursiveCharacterTextSplitter`.
2. **Embed and store** — Each chunk is converted into a vector by a HuggingFace embedding model and stored in a ChromaDB vector database.
3. **Retrieve** — When a farmer asks a question, the most relevant chunks are found by vector similarity search.
4. **Generate** — The question and the retrieved context go to IBM Watsonx Granite, which writes the answer in the farmer's chosen language (Hindi or English).

```
Farmer question ──► Flask /chat ──► RAG retrieval (ChromaDB) ─┐
                                                              ├──► Watsonx Granite ──► Answer (Hindi / English)
                    Web search context ───────────────────────┘
```

---

## 📁 Project Structure

```
smart-farming-agent/
├── backend/
│   ├── app.py               # Flask API server
│   ├── watsonx_client.py    # IBM Watsonx Granite integration
│   ├── rag_pipeline.py      # Chunking, embeddings, ChromaDB retrieval
│   ├── weather_service.py   # OpenWeatherMap integration
│   ├── web_search.py        # DuckDuckGo search helper
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Template for environment variables
│   └── .env                 # Your API keys (not committed)
├── frontend/
│   └── src/
│       ├── App.js           # Main React app
│       └── App.css          # Styles
├── data/                    # RAG knowledge base / farming data
└── .gitignore
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Python 3.10+ (developed on 3.11)
- Node.js 16+
- OpenWeatherMap API key (free tier works)
- IBM Watsonx API key, project ID and service URL (needed for AI chat only)

### 1. Clone the repository

```bash
git clone https://github.com/anjalipatwal26-ap/smart-farming-agent.git
cd smart-farming-agent
```

### 2. Backend setup

```bash
cd backend
pip install -r requirements.txt
```

> **Note:** `sentence-transformers` installs PyTorch, so the first install can take several minutes and a few GB of disk space.

Copy `.env.example` to `.env` and fill in your own keys.

**Windows:**
```bash
copy .env.example .env
```

**macOS / Linux:**
```bash
cp .env.example .env
```

Then edit `backend/.env`:

```env
IBM_API_KEY=your_ibm_api_key
IBM_PROJECT_ID=your_project_id
IBM_URL=https://us-south.ml.cloud.ibm.com
WEATHER_API_KEY=your_openweathermap_key
```

`IBM_URL` depends on the region of your watsonx project (for example `us-south`, `eu-de` or `jp-tok`).

> **Note:** AI chat needs a valid IBM Watsonx API key. Without one, the other features (weather, crop calendar, soil checker, pest guide, mandi prices) still work.

Start the backend server:

```bash
python app.py
```

The backend runs at `http://localhost:5000`.

> The first start downloads the embedding model, so it can take a few minutes. Later starts are much faster.

### 3. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

The frontend runs at `http://localhost:3000`.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/chat` | Send a farming question to the AI |
| GET | `/weather?city=Meerut` | Get weather for a city |

### `/chat` Request Body

```json
{
  "message": "गेहूं में कौन सा खाद डालूं?",
  "city": "Meerut",
  "lang": "Hindi"
}
```

### `/weather` Example Response

```json
{
  "city": "Meerut",
  "description": "light rain",
  "humidity": 72,
  "temperature": 27.2,
  "wind_speed": 1.8
}
```

---

## 🔐 Security

- Never commit your `.env` file. It is listed in `.gitignore`.
- Use `.env.example` as the template and keep real keys only on your machine.
- If a key is ever exposed, rotate it immediately in the provider's dashboard.

---

## 🩺 Troubleshooting

| Problem | Fix |
|---------|-----|
| `ModuleNotFoundError` when starting the backend | Run `pip install -r requirements.txt` inside `backend/` |
| `/weather` returns a 401 error | A new OpenWeatherMap key can take up to a couple of hours to activate |
| `/chat` shows "Khed hai, abhi jawab nahi de pa raha" | Check the backend terminal for the real error |
| Backend prints `url is not provided` | Set `IBM_URL` in `backend/.env` and restart the backend |
| Backend prints `Provided API key is disabled` | The IBM API key is invalid. Create a new key and update `IBM_API_KEY` |
| First start is slow | The embedding model is downloading. This only happens once |
| HuggingFace "unauthenticated requests" warning | Harmless. Set `HF_TOKEN` only if you want faster downloads |
| Changes to `.env` have no effect | Stop the backend with `Ctrl + C` and start it again |

---

## 🔮 Future Improvements

- Voice input and output for farmers who prefer speaking
- More regional languages (Punjabi, Marathi, Tamil, and others)
- Crop disease detection from leaf photos
- Live mandi price integration
- Docker setup for one-command deployment
- Automated tests for the API endpoints

---

## 🙏 Acknowledgements

- [IBM Watsonx AI](https://www.ibm.com/watsonx) — Granite LLM
- [OpenWeatherMap](https://openweathermap.org/) — Weather data
- [LangChain](https://www.langchain.com/) and [ChromaDB](https://www.trychroma.com/) — RAG pipeline
- Inspired by the needs of Indian farmers 🇮🇳

---

## 👩‍💻 Author

**Anjali Patwal**
GitHub: [@anjalipatwal26-ap](https://github.com/anjalipatwal26-ap)
