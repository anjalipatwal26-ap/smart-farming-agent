from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
import os

# Embedding model
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

VECTOR_DB_PATH = "./vector_db"

def create_vector_database():
    """Farming knowledge ko vector database mein store karo"""
    
    # Knowledge file padho
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'farming_knowledge.txt')
    
    with open(data_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Text ko chhote pieces mein todo
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    chunks = splitter.create_documents([text])
    
    print(f"Total chunks created: {len(chunks)}")
    
    # Vector database banao
    vectordb = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=VECTOR_DB_PATH
    )
    
    print("Vector database ready!")
    return vectordb

def get_relevant_context(query):
    """User ke sawaal se related farming info dhundo"""
    
    vectordb = Chroma(
        persist_directory=VECTOR_DB_PATH,
        embedding_function=embeddings
    )
    
    results = vectordb.similarity_search(query, k=3)
    context = "\n".join([doc.page_content for doc in results])
    return context

# Test
if __name__ == "__main__":
    print("Creating vector database...")
    create_vector_database()
    
    print("\nTesting search...")
    context = get_relevant_context("wheat fertilizer")
    print("Found context:")
    print(context)