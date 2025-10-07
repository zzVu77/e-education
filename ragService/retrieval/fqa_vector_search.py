from typing import Any, Dict, List, Optional

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
