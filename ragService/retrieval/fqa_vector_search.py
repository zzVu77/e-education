from typing import Any, Dict, List, Optional, Tuple

VECTOR_INDEX_NAME = "faq_chunks_vec_idx"
VECTOR_FIELD_PATH = "embedding"

def fqa_vector_search(
    user_query: str,
    chunks_coll,
    *,
    limit: int = 4,
    num_candidates: int = 40,
    index_name: str = VECTOR_INDEX_NAME,
    vector_path: str = VECTOR_FIELD_PATH,
    doc_id: Optional[str] = None,       # e.g. "faq_sample_v1"
    language: Optional[str] = None      # e.g. "en" or "vi"
) -> List[Dict[str, Any]]:

    qvec = get_embedding(user_query, kind="query")
    if not qvec:
        return []

    # Build optional pre-filter to reduce candidate pool (faster + more accurate)
    vfilter = {}
    if doc_id:
        vfilter["doc_id"] = doc_id
    if language:
        vfilter["language"] = language

    vector_stage: Dict[str, Any] = {
        "$vectorSearch": {
            "index": index_name,
            "path": vector_path,
            "queryVector": qvec,
            "numCandidates": int(num_candidates),
            "limit": int(limit),
        }
    }
    if vfilter:
        vector_stage["$vectorSearch"]["filter"] = vfilter

    pipeline = [
        vector_stage,
        {
            "$project": {
                "_id": 0,                 # hide _id in the result
                "doc_id": 1,
                "faq_number": 1,
                "language": 1,
                "question_text": 1,
                "answer_text": 1,
                "text": 1,
                "score": {"$meta": "vectorSearchScore"}
            }
        }
    ]
    return list(chunks_coll.aggregate(pipeline))

def best_chunk_per_fqa(hits: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Keep only the highest-scoring chunk per (doc_id, faq_number).
    Falls back gracefully if fields are missing.
    """
    best: Dict[Tuple[str, int], Dict[str, Any]] = {}
    for h in hits:
        doc = (h.get("doc_id") or "").strip()
        num = h.get("faq_number")
        if not doc or not isinstance(num, int):
            # Fallback: try to dedupe by question_text if faq_number missing
            q = (h.get("question_text") or "").strip()
            if not q:
                # last resort: skip items without identifiers
                continue
            key = (doc or "_", hash(q))
        else:
            key = (doc, num)

        if key not in best or h.get("score", -1) > best[key].get("score", -1):
            best[key] = h

    return sorted(best.values(), key=lambda x: x.get("score", 0), reverse=True)

def get_docs_for_fqa(
    query: str,
    chunks_coll,
    *,
    k_candidates: int = 50,
    k_return: int = 1,
    num_candidates: int = 200,             
    index_name: str = "faq_chunks_vec_idx",
    vector_path: str = "embedding",
    doc_id: Optional[str] = None,             
    language: Optional[str] = None,            
    use_search_filter: bool = False            
) -> List[str]:
    # Retrieve candidates via your FAQ vector search
    hits = fqa_vector_search(
        user_query=query,
        chunks_coll=chunks_coll,
        limit=int(k_candidates),
        num_candidates=max(4 * int(k_candidates), int(num_candidates)),
        index_name=index_name,
        vector_path=vector_path,
        doc_id=doc_id,
        language=language,
        # This arg is only effective if your fqa_vector_search implements it; safe to ignore otherwise.
        use_search_filter=use_search_filter
    )

    if not hits:
        return []

    # Deduplicate and keep top scoring per (doc_id, faq_number)
    top = best_chunk_per_fqa(hits)[:int(k_return)]

    docs: List[str] = []
    for h in top:
        q = (h.get("question_text") or "").strip()
        a = (h.get("answer_text") or "").strip()
        txt = (h.get("text") or "").strip()

        # Prefer stored concatenation if present; otherwise reconstruct Q+A
        body = txt if txt else (("Q: " + q + "\nA: " + a).strip() if (q or a) else "")

        # Friendly header (helps the reranker and logging)
        num = h.get("faq_number")
        header_parts = []
        if isinstance(num, int):
            header_parts.append(f"FAQ #{num}")
        if q:
            header_parts.append(q)

        header = ": ".join(header_parts) if header_parts else (q if q else "FAQ Item")

        docs.append(f"{header}\n{body}".strip())

    return docs



