from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os


def interact(query):
    load_dotenv()

    if os.getenv("GROQ_API_KEY"):
        print('Groq API Key loaded successfully')
    else:
        print('Groq API Key loading failed, please make sure the .env file exists and the spelling is correct')

    chat_model = ChatGroq(
        model="llama-3.1-70b-versatile",
        temperature=0,
        max_tokens=None,
        timeout=None,
        max_retries=2,
    )

    resp = chat_model.invoke(query)
    return resp.content

