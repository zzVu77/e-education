from fastapi import FastAPI
from pydantic import BaseModel
from ragService.retrieval.vector_search import get_docs_for_rerank_unique
from ragService.llm.llms import LLMS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
llm = LLMS(mode="online", model_name="gemini-2.0-flash")

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb+srv://sh1nata_snowzy:PB37Ng6NHdqDIsyt@e-education-test.fehnrqy.mongodb.net/?retryWrites=true&w=majority&appName=e-education-test")
DB_NAME = os.getenv("MONGODB_DB", "e-education-test")
CHUNKS_COLLECTION = os.getenv("COURSE_CHUNKS_COLLECTION", "course_chunks")

mongo_client = MongoClient(MONGODB_URI)
mongo_db = mongo_client[DB_NAME]
chunks_coll = mongo_db[CHUNKS_COLLECTION]

class ChatReq(BaseModel):
    message: str

@app.get("/health")
def health(): return {"ok": True}

@app.post("/chat")
def chat(req: ChatReq):
    docs = get_docs_for_rerank_unique(req.message, chunks_coll=chunks_coll)
    if not docs: return {"message": "No relevant context found."}
    prompt = llm.llm.build_sales_prompt(req.message, docs, language="auto")
    answer = llm.generate_content(prompt)
    answer = llm.llm.normalize_markdown(answer)
    # Return markdown for frontend to render with react-markdown
    return {"message": answer}