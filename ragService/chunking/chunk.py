#DONT NEED TO IMPLEMENT THIS BC ALREADY DONE IT ON GOOGLE COLAB 
#colab link: https://colab.research.google.com/drive/1UdD7Zdt-5QNzx_6QOiscrLfFRfxVUhCH#scrollTo=KY6CwhKiZ3xW

# build a text from selected cols
def build_passage(doc: dict) -> str:
    parts = []
    def add(label, key):
        v = doc.get(key)
        if v is not None and str(v).strip():
            parts.append(f"{label}: {str(v).strip()}")
    add("Title", "title")
    add("Description", "description")
    add("Price", "price")
    add("Category", "category")
    add("Level", "level")
    add("Instructor", "instructor")
    add("Duration", "duration")
    return "\n".join(parts)

# token-aware chunking (tiktoken if available), w/ a char-based fallback
# bc my strategy is to connect all cols -> chunk them -> embedding the chunks -> so this can be called fixed-size & overlap chunking
# can try more chunking strategies in the future =))))
def _try_tiktoken_encode(text: str, model_name: str = "gpt-3.5-turbo"):
    try:
        import tiktoken
        enc = tiktoken.encoding_for_model(model_name)
        return enc.encode(text), enc
    except Exception:
        return None, None

def chunk_text(text: str, chunk_tokens: int = 256, overlap_tokens: int = 32) -> list[str]:
    tokens, enc = _try_tiktoken_encode(text)
    if tokens is None:
        chunk_chars = chunk_tokens * 4
        overlap_chars = overlap_tokens * 4
        chunks, start, n = [], 0, len(text)
        while start < n:
            end = min(n, start + chunk_chars)
            chunk = text[start:end].strip()
            if chunk:
                chunks.append(chunk)
            start = max(end - overlap_chars, start + 1)
        return chunks
    else:
        chunks, start, n = [], 0, len(tokens)
        while start < n:
            end = min(n, start + chunk_tokens)
            chunk = enc.decode(tokens[start:end]).strip()
            if chunk:
                chunks.append(chunk)
            start = max(end - overlap_tokens, start + 1)
        return chunks
