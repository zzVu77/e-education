from sentence_transformers import CrossEncoder
from typing import List, Tuple, Dict, Any, Optional

class BGEReRanker:
    def __init__(
        self,
        model_name: str = "BAAI/bge-reranker-v2-m3",
        device: Optional[str] = "cpu",           # e.g., "cuda" or "cpu"; None = auto
    ):
        self.reranker = CrossEncoder(model_name, device=device)

    def rerank_docs(
        self,
        query: str,
        docs: List[str],
        top_k: Optional[int] = None,
    ) -> List[Tuple[str, float]]:
        if not docs:
            return []
        pairs = [(query, d) for d in docs]
        scores = self.reranker.predict(pairs)
        ranked = sorted(zip(docs, scores), key=lambda x: x[1], reverse=True)
        return ranked[:top_k] if top_k else ranked


