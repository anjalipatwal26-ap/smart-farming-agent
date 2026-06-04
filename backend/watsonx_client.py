from ibm_watsonx_ai import APIClient, Credentials
from ibm_watsonx_ai.foundation_models import ModelInference
from rag_pipeline import get_relevant_context
from web_search import search_farming_info
from dotenv import load_dotenv
import os

load_dotenv()

GREETINGS = ['hi', 'hii', 'hello', 'namaste', 'namaskar', 'hey', 'helo', 'hii', 'good morning', 'good evening', 'good afternoon', 'sat sri akal', 'jai hind']

def is_greeting(message):
    msg = message.lower().strip()
    return any(msg == g or msg.startswith(g + ' ') for g in GREETINGS)

def get_granite_response(user_message, lang="Hindi"):
    try:
        # Greeting check
        if is_greeting(user_message):
            if lang == "Hindi":
                return "Namaste! 🙏 Main KisanAI hoon, aapka smart farming assistant. Aap fasal, mausam, khad, keede, ya mandi bhav ke baare mein kuch bhi pooch sakte hain! 🌾"
            else:
                return "Hello! 👋 I'm KisanAI, your smart farming assistant. Ask me anything about crops, weather, fertilizers, pests, or market prices! 🌾"

        credentials = Credentials(
            url=os.getenv("IBM_URL"),
            api_key=os.getenv("IBM_API_KEY")
        )

        client = APIClient(credentials)

        model = ModelInference(
            model_id="meta-llama/llama-3-3-70b-instruct",
            api_client=client,
            project_id=os.getenv("IBM_PROJECT_ID"),
            params={
                "max_new_tokens": 250,
                "temperature": 0.6,
                "top_p": 0.9,
                "stop_sequences": ["Farmer asks:", "Question:", "User:", "Answer:", "Local Farming"]
            }
        )

        # RAG + Web search
        rag_context = get_relevant_context(user_message)
        web_context = search_farming_info(user_message)

        if lang == "Hindi":
            lang_instruction = "Sirf Hindi mein jawab do. Friendly aur simple bhasha use karo."
        else:
            lang_instruction = "Reply in simple friendly English only."

        prompt = f"""You are KisanAI, a friendly farming expert for Indian farmers.
{lang_instruction}
Give a SHORT answer in maximum 3-4 lines.
Use emojis. Be helpful and practical.
Do NOT repeat the question.
Do NOT generate more questions after your answer.
Just answer what is asked.

Knowledge Base:
{rag_context}

Latest Web Data:
{web_context}

Question: {user_message}

Answer (3-4 lines only):"""

        response = model.generate_text(prompt=prompt)
        response = response.strip()

        # Aggressive cleaning
        cut_phrases = [
            "Farmer asks:", "User:", "Question:", "Answer:",
            "Local Farming", "Knowledge Base:", "Web Data:",
            "Note:", "Disclaimer:"
        ]
        for phrase in cut_phrases:
            if phrase in response:
                response = response.split(phrase)[0].strip()

        # Remove last incomplete sentence
        sentences = response.split('.')
        if len(sentences) > 1 and len(sentences[-1].strip()) < 20:
            response = '.'.join(sentences[:-1]).strip() + '.'

        return response

    except Exception as e:
        return "Khed hai, abhi jawab nahi de pa raha. Thodi der baad try karein. 🙏"