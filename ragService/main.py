from fastapi import FastAPI
from pydantic import BaseModel
from ragService.llm.llms import LLMS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

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

mongo_client = MongoClient(MONGODB_URI)
mongo_db = mongo_client[DB_NAME]

CHUNKS_COLLECTION_FAQ = "FAQs_chunks"
chunks_coll_faq = mongo_db[CHUNKS_COLLECTION_FAQ]


class ChatReq(BaseModel):
    message: str
    language: str | None = None 


LANG_MODEL_ID = os.getenv(
    "LANG_MODEL_ID", "papluca/xlm-roberta-base-language-detection"
)
# Allow forcing CPU-only via env when CUDA driver/toolkit isn't set up
# Set USE_CUDA=1 to enable GPU if available
_use_cuda_env = os.getenv("USE_CUDA", "").lower() in ("1", "true", "yes")
_device = torch.device("cuda" if (_use_cuda_env and torch.cuda.is_available()) else "cpu")
_tokenizer = AutoTokenizer.from_pretrained(LANG_MODEL_ID)
_model = AutoModelForSequenceClassification.from_pretrained(LANG_MODEL_ID)
_model.to(_device).eval()

# Only opt-in to torch.compile if explicitly enabled via env
# Set TORCH_COMPILE=1 to attempt compilation (requires proper CUDA/Triton setup)
if os.getenv("TORCH_COMPILE", "").lower() in ("1", "true", "yes"):
    try:
        _model = torch.compile(_model)
    except Exception:
        # Fallback gracefully without JIT compile 
        pass

# warm up once to avoid first-request latency spike
with torch.inference_mode():
    _ = _model(**_tokenizer("warmup", truncation=True, max_length=32, return_tensors="pt").to(_device))

def detect_language(text: str) -> tuple[str, float]:
    """Return (lang_code, confidence)."""
    if not text or not text.strip():
        return "auto", 0.0
    with torch.inference_mode():
        inputs = _tokenizer(text, truncation=True, max_length=128, return_tensors="pt").to(_device)
        logits = _model(**inputs).logits
        pred_id = int(logits.argmax(dim=-1).item())
        lang = _model.config.id2label[pred_id]  # e.g., 'en', 'vi', 'fr', ...
        conf = float(logits.softmax(-1).max().item())
        return lang, conf


@app.get("/health")
def health(): return {"ok": True}

@app.post("/chat")
def chat(req: ChatReq):
    lang = req.language
    conf = None
    if not lang or lang == "auto":
        lang, conf = detect_language(req.message)
    answer = llm.llm.answer_query(
        query=req.message,
        faq_chunks_coll=chunks_coll_faq,
        language=lang,
        mode=None,
    )
    return {"message": answer}