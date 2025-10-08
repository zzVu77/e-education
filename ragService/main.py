from fastapi import FastAPI
from pydantic import BaseModel
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
#CHUNKS_COLLECTION = os.getenv("COURSE_CHUNKS_COLLECTION", "course_chunks")

mongo_client = MongoClient(MONGODB_URI)
mongo_db = mongo_client[DB_NAME]
#chunks_coll = mongo_db[CHUNKS_COLLECTION]

CHUNKS_COLLECTION_FAQ = "FAQs_chunks"
chunks_coll_faq = mongo_db[CHUNKS_COLLECTION_FAQ]


class ChatReq(BaseModel):
    message: str
    language: str | None = None 

@app.get("/health")
def health(): return {"ok": True}

@app.post("/chat")
def chat(req: ChatReq):
    answer = llm.llm.answer_query(
        query=req.message,
        #course_chunks_coll=chunks_coll,
        faq_chunks_coll=chunks_coll_faq,
        language=req.language or "auto",
        mode=None,
    )
    # answer = llm.llm.normalize_markdown(answer)
    return {"message": answer}