import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const INDIAN_CITIES = [
  "Meerut", "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore",
  "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Kanpur",
  "Nagpur", "Patna", "Bhopal", "Indore", "Agra", "Varanasi", "Jodhpur"
];

const TEXT = {
  Hindi: {
    appName: "किसानAI",
    appSubtitle: "स्मार्ट खेती सहायक",
    city: "शहर",
    language: "भाषा",
    weather: "आज का मौसम",
    humidity: "नमी",
    wind: "हवा",
    heatAlert: "⚠️ ज्यादा गर्मी! सिंचाई बढ़ाएं",
    fungalAlert: "⚠️ फंगल बीमारी का खतरा!",
    quickAsk: "जल्दी पूछें",
    poweredBy: "द्वारा संचालित",
    tabs: {
      chat: "💬 चैट",
      calendar: "📅 फसल कैलेंडर",
      soil: "🌱 मिट्टी जांच",
      pest: "🐛 कीट गाइड",
      mandi: "💰 मंडी भाव"
    },
    chatPlaceholder: "कुछ भी पूछें... जैसे: गेहूं में कौन सा खाद डालूं?",
    send: "📤 भेजें",
    online: "🟢 ऑनलाइन",
    chatTitle: "💬 खेती सहायक चैट",
    chatSubtitle: "हिंदी या अंग्रेजी में पूछें",
    welcomeMsg: "नमस्ते! 🙏 मैं किसानAI हूं, आपका स्मार्ट खेती सहायक। IBM Watsonx AI और RAG तकनीक से संचालित। फसल, मौसम, खाद, या मंडी भाव — कुछ भी पूछें!",
    quickQuestions: [
      { emoji: "🌱", text: "इस मौसम में कौन सी फसल लगाऊं?" },
      { emoji: "🌾", text: "गेहूं में कौन सा खाद डालूं?" },
      { emoji: "🐛", text: "मेरी फसल में कीड़े लग गए हैं" },
      { emoji: "🌿", text: "जैविक खेती कैसे करें?" },
    ],
    calendarTitle: "📅 फसल कैलेंडर",
    calendarSubtitle: "हर महीने कौन सी फसल लगाएं",
    months: {
      "January": "जनवरी", "February": "फरवरी", "March": "मार्च",
      "April": "अप्रैल", "May": "मई", "June": "जून",
      "July": "जुलाई", "August": "अगस्त", "September": "सितंबर",
      "October": "अक्टूबर", "November": "नवंबर", "December": "दिसंबर"
    },
    soilTitle: "🌱 मिट्टी स्वास्थ्य जांच",
    soilSubtitle: "अपनी मिट्टी का प्रकार चुनें और जानें कौन सी फसल सबसे अच्छी है",
    soilLabels: { crops: "🌾 सबसे अच्छी फसलें", states: "📍 राज्य", tip: "💡 सुझाव" },
    askAI: "🤖 AI से और पूछें",
    pestTitle: "🐛 कीट पहचानकर्ता और गाइड",
    pestSubtitle: "कीड़े का नाम चुनें और समाधान पाएं",
    pestLabels: { crop: "🌾 प्रभावित फसल", solution: "💊 रासायनिक समाधान", organic: "🌿 जैविक समाधान" },
    mandiTitle: "💰 मंडी भाव ट्रैकर",
    mandiSubtitle: "आज के बाजार भाव",
    mandiNote: "⚠️ ये नमूना भाव हैं। असली भाव के लिए अपनी स्थानीय मंडी से पुष्टि करें।",
  },
  English: {
    appName: "KisanAI",
    appSubtitle: "Smart Farming Assistant",
    city: "City",
    language: "Language",
    weather: "Today's Weather",
    humidity: "Humidity",
    wind: "Wind",
    heatAlert: "⚠️ Too hot! Increase irrigation",
    fungalAlert: "⚠️ Fungal disease risk!",
    quickAsk: "Quick Ask",
    poweredBy: "Powered by",
    tabs: {
      chat: "💬 Chat",
      calendar: "📅 Crop Calendar",
      soil: "🌱 Soil Checker",
      pest: "🐛 Pest Guide",
      mandi: "💰 Mandi Prices"
    },
    chatPlaceholder: "Ask anything... e.g. Which fertilizer for wheat?",
    send: "📤 Send",
    online: "🟢 Online",
    chatTitle: "💬 Farming Assistant Chat",
    chatSubtitle: "Ask in Hindi or English",
    welcomeMsg: "Hello! 👋 I'm KisanAI, your smart farming assistant powered by IBM Watsonx AI and RAG technology. Ask me about crops, weather, fertilizers, pests, or market prices!",
    quickQuestions: [
      { emoji: "🌱", text: "Which crop to plant this season?" },
      { emoji: "🌾", text: "Which fertilizer for wheat?" },
      { emoji: "🐛", text: "My crops have pest infestation" },
      { emoji: "🌿", text: "How to do organic farming?" },
    ],
    calendarTitle: "📅 Crop Calendar",
    calendarSubtitle: "Which crops to plant each month",
    months: {
      "January": "January", "February": "February", "March": "March",
      "April": "April", "May": "May", "June": "June",
      "July": "July", "August": "August", "September": "September",
      "October": "October", "November": "November", "December": "December"
    },
    soilTitle: "🌱 Soil Health Checker",
    soilSubtitle: "Select your soil type and find the best crops",
    soilLabels: { crops: "🌾 Best Crops", states: "📍 States", tip: "💡 Tip" },
    askAI: "🤖 Ask AI More",
    pestTitle: "🐛 Pest Identifier & Guide",
    pestSubtitle: "Select pest name and get solution",
    pestLabels: { crop: "🌾 Affected Crop", solution: "💊 Chemical Solution", organic: "🌿 Organic Solution" },
    mandiTitle: "💰 Mandi Price Tracker",
    mandiSubtitle: "Today's market prices",
    mandiNote: "⚠️ These are sample prices. Confirm with your local mandi for real-time rates.",
  }
};

const CROP_CALENDAR = {
  "January": ["Wheat", "Mustard", "Gram", "Peas"],
  "February": ["Wheat", "Mustard", "Sunflower"],
  "March": ["Sugarcane", "Watermelon", "Cucumber"],
  "April": ["Watermelon", "Muskmelon", "Bitter Gourd"],
  "May": ["Moong", "Urad", "Pumpkin"],
  "June": ["Rice", "Maize", "Cotton", "Soybean"],
  "July": ["Rice", "Maize", "Groundnut", "Bajra"],
  "August": ["Rice", "Jowar", "Arhar"],
  "September": ["Rice", "Arhar", "Moong"],
  "October": ["Wheat", "Mustard", "Gram"],
  "November": ["Wheat", "Potato", "Onion"],
  "December": ["Wheat", "Gram", "Peas", "Carrot"]
};

const CROP_CALENDAR_HINDI = {
  "January": ["गेहूं", "सरसों", "चना", "मटर"],
  "February": ["गेहूं", "सरसों", "सूरजमुखी"],
  "March": ["गन्ना", "तरबूज", "खीरा"],
  "April": ["तरबूज", "खरबूजा", "करेला"],
  "May": ["मूंग", "उड़द", "कद्दू"],
  "June": ["धान", "मक्का", "कपास", "सोयाबीन"],
  "July": ["धान", "मक्का", "मूंगफली", "बाजरा"],
  "August": ["धान", "ज्वार", "अरहर"],
  "September": ["धान", "अरहर", "मूंग"],
  "October": ["गेहूं", "सरसों", "चना"],
  "November": ["गेहूं", "आलू", "प्याज"],
  "December": ["गेहूं", "चना", "मटर", "गाजर"]
};

const SOIL_DATA = {
  Hindi: {
    "जलोढ़": { crops: "गेहूं, धान, गन्ना, कपास", states: "UP, पंजाब, हरियाणा", tip: "खेती के लिए सबसे अच्छी मिट्टी!" },
    "काली": { crops: "कपास, सोयाबीन, ज्वार, गेहूं", states: "महाराष्ट्र, MP, गुजरात", tip: "ज्यादा पानी न दें" },
    "लाल": { crops: "मूंगफली, बाजरा, तंबाकू", states: "AP, तमिलनाडु, ओडिशा", tip: "जैविक खाद डालें" },
    "बलुई": { crops: "बाजरा, मोठ, ग्वार", states: "राजस्थान", tip: "ड्रिप सिंचाई जरूरी" },
    "लैटेराइट": { crops: "चाय, कॉफी, काजू", states: "केरल, कर्नाटक", tip: "चूना डालें" }
  },
  English: {
    "Alluvial": { crops: "Wheat, Rice, Sugarcane, Cotton", states: "UP, Punjab, Haryana", tip: "Best soil for farming!" },
    "Black": { crops: "Cotton, Soybean, Jowar, Wheat", states: "Maharashtra, MP, Gujarat", tip: "Avoid over-irrigation" },
    "Red": { crops: "Groundnut, Millets, Tobacco", states: "AP, Tamil Nadu, Odisha", tip: "Add organic manure" },
    "Sandy": { crops: "Bajra, Moth bean, Cluster bean", states: "Rajasthan", tip: "Drip irrigation essential" },
    "Laterite": { crops: "Tea, Coffee, Cashew", states: "Kerala, Karnataka", tip: "Add lime to reduce acidity" }
  }
};

const PEST_DATA = {
  Hindi: {
    "तना छेदक": { crop: "धान/गेहूं", solution: "क्लोरपाइरीफॉस स्प्रे करें", organic: "नीम तेल स्प्रे" },
    "माहू": { crop: "गेहूं/सरसों", solution: "डाइमेथोएट 1ml/L पानी", organic: "नीम तेल + साबुन" },
    "बॉलवर्म": { crop: "कपास", solution: "Bt स्प्रे या स्पिनोसेड", organic: "फेरोमोन ट्रैप" },
    "सफेद मक्खी": { crop: "कपास/टमाटर", solution: "इमिडाक्लोप्रिड स्प्रे", organic: "पीले चिपचिपे ट्रैप" },
    "भूरा फुदका": { crop: "धान", solution: "इमिडाक्लोप्रिड या थायमेथोक्सम", organic: "2 दिन सिंचाई करें" }
  },
  English: {
    "Stem Borer": { crop: "Rice/Wheat", solution: "Chlorpyrifos spray", organic: "Neem oil spray" },
    "Aphids": { crop: "Wheat/Mustard", solution: "Dimethoate 1ml/L water", organic: "Neem oil + soap" },
    "Bollworm": { crop: "Cotton", solution: "Bt spray or Spinosad", organic: "Pheromone traps" },
    "Whitefly": { crop: "Cotton/Tomato", solution: "Imidacloprid spray", organic: "Yellow sticky traps" },
    "Brown Planthopper": { crop: "Rice", solution: "Imidacloprid or Thiamethoxam", organic: "Flood for 2 days" }
  }
};

const MANDI_PRICES = [
  { crop: { Hindi: "गेहूं", English: "Wheat" }, price: "₹2,200/क्विंटल", change: "+2.3%", trend: "↑" },
  { crop: { Hindi: "धान", English: "Rice" }, price: "₹2,800/क्विंटल", change: "+1.1%", trend: "↑" },
  { crop: { Hindi: "टमाटर", English: "Tomato" }, price: "₹18/kg", change: "-5.2%", trend: "↓" },
  { crop: { Hindi: "आलू", English: "Potato" }, price: "₹12/kg", change: "+0.8%", trend: "↑" },
  { crop: { Hindi: "प्याज", English: "Onion" }, price: "₹22/kg", change: "-2.1%", trend: "↓" },
  { crop: { Hindi: "कपास", English: "Cotton" }, price: "₹6,500/क्विंटल", change: "+3.4%", trend: "↑" },
  { crop: { Hindi: "सोयाबीन", English: "Soybean" }, price: "₹4,200/क्विंटल", change: "+1.2%", trend: "↑" },
  { crop: { Hindi: "सरसों", English: "Mustard" }, price: "₹5,100/क्विंटल", change: "-0.9%", trend: "↓" },
];

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [lang, setLang] = useState('Hindi');
  const T = TEXT[lang];
  const [messages, setMessages] = useState([
    { type: 'bot', text: TEXT.Hindi.welcomeMsg }
  ]);
  const [input, setInput] = useState('');
  const [city, setCity] = useState('Meerut');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [selectedSoil, setSelectedSoil] = useState(Object.keys(SOIL_DATA.Hindi)[0]);
  const [selectedPest, setSelectedPest] = useState(Object.keys(PEST_DATA.Hindi)[0]);
  const chatEndRef = useRef(null);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => { fetchWeather(); }, [city]);

  // Reset selected soil/pest when language changes
  useEffect(() => {
    setSelectedSoil(Object.keys(SOIL_DATA[lang])[0]);
    setSelectedPest(Object.keys(PEST_DATA[lang])[0]);
    setMessages([{ type: 'bot', text: TEXT[lang].welcomeMsg }]);
  }, [lang]);

  const fetchWeather = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/weather?city=${city}`);
      const data = await res.json();
      setWeather(data);
    } catch (e) { setWeather(null); }
  };

  const sendMessage = async (msg) => {
    const userText = msg || input;
    if (!userText.trim()) return;
    setMessages(prev => [...prev, { type: 'user', text: userText }]);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, city, lang })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { type: 'bot', text: data.response }]);
    } catch {
      setMessages(prev => [...prev, { type: 'bot', text: lang === 'Hindi' ? '❌ सर्वर से कनेक्शन नहीं हो पाया।' : '❌ Could not connect to server.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="logo">
          <span className="logo-icon">🌾</span>
          <div>
            <h2>{T.appName}</h2>
            <p>{T.appSubtitle}</p>
          </div>
        </div>

        <div className="sidebar-section">
          <label>📍 {T.city}</label>
          <select value={city} onChange={e => setCity(e.target.value)}>
            {INDIAN_CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="sidebar-section">
          <label>🌐 {T.language}</label>
          <div className="lang-toggle">
            <button className={lang === 'Hindi' ? 'active' : ''} onClick={() => setLang('Hindi')}>हिंदी</button>
            <button className={lang === 'English' ? 'active' : ''} onClick={() => setLang('English')}>English</button>
          </div>
        </div>

        {weather && !weather.error && (
          <div className="weather-card">
            <h4>🌤 {T.weather}</h4>
            <div className="weather-temp">{Math.round(weather.temperature)}°C</div>
            <div className="weather-city">{weather.city}</div>
            <div className="weather-desc">{weather.description}</div>
            <div className="weather-stats">
              <div>💧 {T.humidity}: {weather.humidity}%</div>
              <div>💨 {T.wind}: {weather.wind_speed} m/s</div>
            </div>
            {weather.temperature > 40 && <div className="weather-alert">{T.heatAlert}</div>}
            {weather.humidity > 80 && <div className="weather-alert">{T.fungalAlert}</div>}
          </div>
        )}

        <div className="sidebar-section">
          <label>⚡ {T.quickAsk}</label>
          <div className="quick-btns">
            {T.quickQuestions.map((q, i) => (
              <button key={i} onClick={() => { setActiveTab('chat'); sendMessage(q.text); }}>
                {q.emoji} {q.text}
              </button>
            ))}
          </div>
        </div>

        <div className="powered-by">
          <div className="badge">🤖 IBM Watsonx AI</div>
          <div className="badge">📚 RAG Pipeline</div>
          <div className="badge">🌦 {lang === 'Hindi' ? 'लाइव मौसम' : 'Live Weather'}</div>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">
        <div className="tabs">
          {Object.entries(T.tabs).map(([id, label]) => (
            <button key={id} className={`tab ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}>{label}</button>
          ))}
        </div>

        {/* CHAT */}
        {activeTab === 'chat' && (
          <>
            <div className="chat-header">
              <div>
                <h3>{T.chatTitle}</h3>
                <p>{T.chatSubtitle}</p>
              </div>
              <div className="online-badge">{T.online}</div>
            </div>
            <div className="chat-box">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.type}`}>
                  <div className="avatar">{msg.type === 'bot' ? '🤖' : '🧑‍🌾'}</div>
                  <div className="bubble">{msg.text}</div>
                </div>
              ))}
              {loading && (
                <div className="message bot">
                  <div className="avatar">🤖</div>
                  <div className="bubble typing"><span/><span/><span/></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="input-row">
              <input type="text" placeholder={T.chatPlaceholder}
                value={input} onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()} />
              <button onClick={() => sendMessage()} disabled={loading}>
                {loading ? '⏳' : T.send}
              </button>
            </div>
          </>
        )}

        {/* CROP CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="tab-content">
            <h2>{T.calendarTitle}</h2>
            <p className="tab-subtitle">{T.calendarSubtitle}</p>
            <div className="calendar-grid">
              {Object.entries(lang === 'Hindi' ? CROP_CALENDAR_HINDI : CROP_CALENDAR).map(([month, crops]) => (
                <div key={month} className={`calendar-card ${month === currentMonth ? 'current-month' : ''}`}>
                  <div className="month-name">
                    {month === currentMonth ? `🌟 ${T.months[month]}` : T.months[month]}
                  </div>
                  <div className="crop-tags">
                    {crops.map(crop => <span key={crop} className="crop-tag">{crop}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SOIL CHECKER */}
        {activeTab === 'soil' && (
          <div className="tab-content">
            <h2>{T.soilTitle}</h2>
            <p className="tab-subtitle">{T.soilSubtitle}</p>
            <div className="soil-buttons">
              {Object.keys(SOIL_DATA[lang]).map(soil => (
                <button key={soil} className={`soil-btn ${selectedSoil === soil ? 'active' : ''}`}
                  onClick={() => setSelectedSoil(soil)}>
                  {soil} {lang === 'Hindi' ? 'मिट्टी' : 'Soil'}
                </button>
              ))}
            </div>
            {selectedSoil && SOIL_DATA[lang][selectedSoil] && (
              <div className="soil-result">
                <div className="soil-item">
                  <span className="soil-label">{T.soilLabels.crops}</span>
                  <span className="soil-value">{SOIL_DATA[lang][selectedSoil].crops}</span>
                </div>
                <div className="soil-item">
                  <span className="soil-label">{T.soilLabels.states}</span>
                  <span className="soil-value">{SOIL_DATA[lang][selectedSoil].states}</span>
                </div>
                <div className="soil-item">
                  <span className="soil-label">{T.soilLabels.tip}</span>
                  <span className="soil-value">{SOIL_DATA[lang][selectedSoil].tip}</span>
                </div>
                <button className="ask-ai-btn"
                  onClick={() => {
                    setActiveTab('chat');
                    sendMessage(lang === 'Hindi'
                      ? `मेरी मिट्टी ${selectedSoil} मिट्टी है। कौन सी फसल लगाऊं?`
                      : `My soil is ${selectedSoil} soil. Which crop should I plant?`);
                  }}>
                  {T.askAI}
                </button>
              </div>
            )}
          </div>
        )}

        {/* PEST GUIDE */}
        {activeTab === 'pest' && (
          <div className="tab-content">
            <h2>{T.pestTitle}</h2>
            <p className="tab-subtitle">{T.pestSubtitle}</p>
            <div className="soil-buttons">
              {Object.keys(PEST_DATA[lang]).map(pest => (
                <button key={pest} className={`soil-btn ${selectedPest === pest ? 'active' : ''}`}
                  onClick={() => setSelectedPest(pest)}>{pest}</button>
              ))}
            </div>
            {selectedPest && PEST_DATA[lang][selectedPest] && (
              <div className="soil-result">
                <div className="soil-item">
                  <span className="soil-label">{T.pestLabels.crop}</span>
                  <span className="soil-value">{PEST_DATA[lang][selectedPest].crop}</span>
                </div>
                <div className="soil-item">
                  <span className="soil-label">{T.pestLabels.solution}</span>
                  <span className="soil-value">{PEST_DATA[lang][selectedPest].solution}</span>
                </div>
                <div className="soil-item">
                  <span className="soil-label">{T.pestLabels.organic}</span>
                  <span className="soil-value">{PEST_DATA[lang][selectedPest].organic}</span>
                </div>
                <button className="ask-ai-btn"
                  onClick={() => {
                    setActiveTab('chat');
                    sendMessage(lang === 'Hindi'
                      ? `मेरी ${PEST_DATA[lang][selectedPest].crop} में ${selectedPest} लग गए हैं। क्या करूं?`
                      : `My ${PEST_DATA[lang][selectedPest].crop} has ${selectedPest}. What should I do?`);
                  }}>
                  {T.askAI}
                </button>
              </div>
            )}
          </div>
        )}

        {/* MANDI PRICES */}
        {activeTab === 'mandi' && (
          <div className="tab-content">
            <h2>{T.mandiTitle}</h2>
            <p className="tab-subtitle">{T.mandiSubtitle} — {city}</p>
            <div className="mandi-grid">
              {MANDI_PRICES.map((item, i) => (
                <div key={i} className="mandi-card">
                  <div className="mandi-crop">{item.crop[lang]}</div>
                  <div className="mandi-price">{item.price}</div>
                  <div className={`mandi-change ${item.trend === '↑' ? 'up' : 'down'}`}>
                    {item.trend} {item.change}
                  </div>
                </div>
              ))}
            </div>
            <div className="mandi-note">{T.mandiNote}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;