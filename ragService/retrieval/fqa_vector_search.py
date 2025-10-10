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


def get_docs_for_fqa(
    query: str,
    chunks_coll=None,                
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

    resolved_mongo = mongo_uri or MONGODB
    resolved_db = db_name or "e-education-test"
    resolved_col = col_name or "FAQs_chunks"

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

    reranker = BGEReRanker()
    ranked = reranker.rerank_docs(query, passages, top_k=int(k_return))
    
    # test to terminal
    # print(f"\n=== FAQ Retrieval Scores ===")
    # print(f"Query: {query}")
    # print(f"Vector search returned {len(hits)} candidates")
    # for i, h in enumerate(hits[:3]):  
    #     print(f"  Vector #{i+1}: score={h.get('score', 0):.4f}")
    
    # print(f"\nReranker scores (top {len(ranked)}):")
    # for i, (doc, score) in enumerate(ranked):
    #     print(f"  Rerank #{i+1}: score={score:.4f}")
    #     print(f"    Preview: {doc[:75]}...")
    # print("=" * 30)
    
    # top_docs = [doc for doc, _ in ranked]
    # return top_docs

