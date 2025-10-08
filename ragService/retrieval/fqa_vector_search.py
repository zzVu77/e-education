from typing import Any, Dict, List, Optional, Tuple
from ragService.embedding.e5_embedder import get_embedding
import pymongo
from ragService.reranking.rerank import BGEReRanker


VECTOR_INDEX_NAME = "vector_index"
VECTOR_FIELD_PATH = "embedding"
MONGODB = "mongodb+srv://sh1nata_snowzy:PB37Ng6NHdqDIsyt@e-education-test.fehnrqy.mongodb.net/?retryWrites=true&w=majority&appName=e-education-test"

def fqa_vector_search(
    user_query: str,
    top_k: int = 3,
    *,
    mongo_uri: str = MONGODB,
    db_name: str = "e-education-test",
    col_name: str = "FAQs_chunks",
    index_name: str = VECTOR_INDEX_NAME,
    num_candidates: int = 200,
) -> List[Dict[str, Any]]:

    if not user_query or not user_query.strip():
        return []

    if mongo_uri is None:
        try:
            mongo_uri = mongoDB 
        except NameError as e:
            raise ValueError("mongo_uri not provided and global `mongoDB` is not defined.") from e

    query_embedding = get_embedding(user_query, kind="query")

    client = pymongo.MongoClient(mongo_uri)
    collection = client[db_name][col_name]

    pipeline = [
        {
            "$vectorSearch": {
                "index": index_name,         
                "path": "embedding",         
                "queryVector": query_embedding,
                "numCandidates": int(num_candidates),
                "limit": int(top_k),
            }
        },
        {
            "$project": {
                "_id": 0,
                "id": 1,
                "question": 1,
                "answer": 1,
                "combined_text": 1,
                "score": {"$meta": "vectorSearchScore"},
            }
        },
    ]

    results = list(collection.aggregate(pipeline))
    return results





# High-level helper: retrieve FAQ candidates via vector search, then rerank
def get_docs_for_fqa(
    query: str,
    chunks_coll=None,                # kept for compatibility; not used
    *,
    k_candidates: int = 50,
    k_return: int = 1,
    mongo_uri: Optional[str] = None,
    db_name: Optional[str] = None,
    col_name: Optional[str] = None,
    index_name: str = VECTOR_INDEX_NAME,
    num_candidates: int = 200,
) -> List[str]:
    if not query or not query.strip():
        return []

    # Use provided overrides or sensible defaults
    resolved_mongo = mongo_uri or MONGODB
    resolved_db = db_name or "e-education-test"
    resolved_col = col_name or "FAQs_chunks"

    # Vector search to get initial candidates
    hits = fqa_vector_search(
        user_query=query,
        top_k=int(k_candidates),
        mongo_uri=resolved_mongo,
        db_name=resolved_db,
        col_name=resolved_col,
        index_name=index_name,
        num_candidates=max(4 * int(k_candidates), int(num_candidates)),
    )
    if not hits:
        return []

    # Build passages for reranker
    passages: List[str] = []
    for h in hits:
        q = (h.get("question") or "").strip()
        a = (h.get("answer") or "").strip()
        combined = (h.get("combined_text") or "").strip()

        if combined:
            passages.append(combined)
        else:
            body = []
            if q:
                body.append(f"Q: {q}")
            if a:
                body.append(f"A: {a}")
            passages.append("\n".join(body) if body else "")

    passages = [p for p in passages if p]
    if not passages:
        return []

    # Rerank and keep top k_return
    reranker = BGEReRanker()
    ranked = reranker.rerank_docs(query, passages, top_k=int(k_return))
    top_docs = [doc for doc, _ in ranked]
    return top_docs

# def best_chunk_per_fqa(hits: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
#     """
#     Keep only the highest-scoring chunk per (doc_id, faq_number).
#     Falls back gracefully if fields are missing.
#     """
#     best: Dict[Tuple[str, int], Dict[str, Any]] = {}
#     for h in hits:
#         doc = (h.get("doc_id") or "").strip()
#         num = h.get("faq_number")
#         if not doc or not isinstance(num, int):
#             # Fallback: try to dedupe by question_text if faq_number missing
#             q = (h.get("question_text") or "").strip()
#             if not q:
#                 # last resort: skip items without identifiers
#                 continue
#             key = (doc or "_", hash(q))
#         else:
#             key = (doc, num)

#         if key not in best or h.get("score", -1) > best[key].get("score", -1):
#             best[key] = h

#     return sorted(best.values(), key=lambda x: x.get("score", 0), reverse=True)

# def get_docs_for_fqa(
#     query: str,
#     chunks_coll,
#     *,
#     k_candidates: int = 50,
#     k_return: int = 1,
#     num_candidates: int = 200,             
#     index_name: str = "vector_index",
#     vector_path: str = "embedding",
#     doc_id: Optional[str] = None,             
#     language: Optional[str] = None,            
#     use_search_filter: bool = False            
# ) -> List[str]:
#     # Retrieve candidates via your FAQ vector search
#     hits = fqa_vector_search(
#         user_query=query,
#         chunks_coll=chunks_coll,
#         limit=int(k_candidates),
#         num_candidates=max(4 * int(k_candidates), int(num_candidates)),
#         index_name=index_name,
#         vector_path=vector_path,
#         doc_id=doc_id,
#         language=language,
#         # This arg is only effective if your fqa_vector_search implements it; safe to ignore otherwise.
#         use_search_filter=use_search_filter
#     )

#     if not hits:
#         return []

#     # Deduplicate and keep top scoring per (doc_id, faq_number)
#     top = best_chunk_per_fqa(hits)[:int(k_return)]

#     docs: List[str] = []
#     for h in top:
#         q = (h.get("question_text") or "").strip()
#         a = (h.get("answer_text") or "").strip()
#         txt = (h.get("text") or "").strip()

#         # Prefer stored concatenation if present; otherwise reconstruct Q+A
#         body = txt if txt else (("Q: " + q + "\nA: " + a).strip() if (q or a) else "")

#         # Friendly header (helps the reranker and logging)
#         num = h.get("faq_number")
#         header_parts = []
#         if isinstance(num, int):
#             header_parts.append(f"FAQ #{num}")
#         if q:
#             header_parts.append(q)

#         header = ": ".join(header_parts) if header_parts else (q if q else "FAQ Item")

#         docs.append(f"{header}\n{body}".strip())

#     return docs



