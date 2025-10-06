from typing import List, Literal, Optional
import os
import torch
from sentence_transformers import SentenceTransformer

_DEFAULT_DEVICE = os.getenv("E5_DEVICE") or ("cuda" if torch.cuda.is_available() else "cpu")
_MODEL_NAME = os.getenv("E5_MODEL_NAME", "intfloat/multilingual-e5-large-instruct")

_E5_INSTRUCT = (
    "Instruct: Given a web search query, retrieve relevant passages that answer the query\n"
    "Query: "
)

_embedding_model: Optional[SentenceTransformer] = None

def load_model(device: Optional[str] = None) -> SentenceTransformer:
    global _embedding_model
    if _embedding_model is not None:
        return _embedding_model
    dev = device or _DEFAULT_DEVICE
    _embedding_model = SentenceTransformer(_MODEL_NAME, device=dev)
    return _embedding_model


def get_embedding(text: str, kind: Literal["query", "passage"] = "passage") -> List[float]:
    model = load_model()
    txt = (text or "").strip()
    if not txt:
        print("Attempted to get embedding for empty text.")
        return []
    formatted = (_E5_INSTRUCT + txt) if kind == "query" else txt
    vec = model.encode(
        formatted,
        convert_to_numpy=True,
        normalize_embeddings=True,
        batch_size=8,           # lower this if you see GPU OOM
        show_progress_bar=False,
    )
    return vec.astype(float).tolist()


__all__ = ["get_embedding", "load_model"]
