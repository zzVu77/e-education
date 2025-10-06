from __future__ import annotations
from typing import List, Dict, Any
from ragService.embedding.e5_embedder import get_embedding 

VECTOR_INDEX_NAME = "vector_index"
VECTOR_FIELD_PATH = "embedding"   # course_chunks.embedding
DEFAULT_NUM_CANDIDATES = 200      # bump if corpus is large

def vector_search(
    user_query: str,
    chunks_coll,                      
    limit: int = 4,
    num_candidates: int = DEFAULT_NUM_CANDIDATES,
    index_name: str = VECTOR_INDEX_NAME,
    vector_path: str = VECTOR_FIELD_PATH,
) -> List[Dict[str, Any]]:
    qvec = get_embedding(user_query, kind="query")
    if not qvec:
        return []

    pipeline = [
        {
            "$vectorSearch": {
                "index": index_name,
                "path": vector_path,
                "queryVector": qvec,
                "numCandidates": int(num_candidates),
                "limit": int(limit),
            }
        },
        {
            "$project": {
                "_id": 0,
                "course_id": 1,
                "chunk_index": 1,
                "title": 1,
                "category": 1,
                "level": 1,
                "instructor": 1,
                "price": 1,
                "duration": 1,
                "text": 1,  
                "description": 1,  
                "score": {"$meta": "vectorSearchScore"},
            }
        }
    ]
    return list(chunks_coll.aggregate(pipeline))


def best_chunk_per_course(hits: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    best: Dict[str, Dict[str, Any]] = {}
    for h in hits:
        cid = str(h.get("course_id"))
        if not cid:
            continue
        if cid not in best or h["score"] > best[cid]["score"]:
            best[cid] = h
    return sorted(best.values(), key=lambda x: x["score"], reverse=True)


def get_docs_for_rerank_unique(
    query: str,
    chunks_coll,
    k_candidates: int = 50,
    k_return: int = 6,
    num_candidates: int = DEFAULT_NUM_CANDIDATES,
) -> List[str]:
    """
    1) Fetch many ANN candidates from `chunks_coll`.
    2) Keep the highest-scoring chunk per course_id.
    3) Build compact doc strings (title + text [+ price]) for reranking.
    4) Return top-k docs (pre-trim) to control rerank latency/cost.
    """
    hits = vector_search(
        query,
        chunks_coll,
        limit=int(k_candidates),
        num_candidates=max(4 * int(k_candidates), num_candidates),
    )
    if not hits:
        return []

    top = best_chunk_per_course(hits)[:int(k_return)]

    docs: List[str] = []
    for h in top:
        title = (h.get("title") or "Untitled").strip()
        text  = (h.get("text") or h.get("description") or "").strip()
        price = h.get("price")
        parts = [title]
        if text:
            parts.append(text)
        if price is not None:
            parts.append(f"Price: {price}")
        docs.append("\n".join(parts))
    return docs