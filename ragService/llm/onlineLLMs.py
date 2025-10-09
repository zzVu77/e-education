from __future__ import annotations
import os
import textwrap
from typing import Any, Dict, List, Optional, Sequence, Union
import google.generativeai as genai
import re
import markdown
from markdown.extensions import codehilite, fenced_code, tables, toc 
from ragService.retrieval.fqa_vector_search import get_docs_for_fqa

class OnlineLLMs:
    def __init__(
        self,
        api_key: Optional[str] = None,
        model_name: str = "gemini-2.0-flash",
        generation_config: Optional[Dict[str, Any]] = None,
        safety_settings: Optional[Dict[str, Any]] = None,
    ):
        self.api_key = api_key
        self.model_name = model_name
        self.generation_config = generation_config or {
            "top_k": 40,
            "temperature": 0.7,
            "top_p": 0.95,
            "max_output_tokens": 1024,
        }
        self.safety_settings = safety_settings

    def _resolve_api_key(self) -> str:
        if self.api_key:
            return self.api_key

        key = os.getenv("GOOGLE_API_KEY")
        if key:
            return key

        raise RuntimeError(
            "No GOOGLE_API_KEY found. Set it via Colab Secrets or environment variable."
        )

    def _client(self):
        genai.configure(api_key=self._resolve_api_key())
        return genai

    def set_model(self, model_name: str) -> None:
        self.model_name = model_name

    def generate(
        self,
        prompt: Union[str, List[Union[str, Dict[str, Any]]]],
        generation_config: Optional[Dict[str, Any]] = None,
        safety_settings: Optional[Dict[str, Any]] = None,
    ) -> str:

        genai = self._client()
        model = genai.GenerativeModel(
            self.model_name,
            # system_instruction=(
            #     "You are a helpful support assistant for an e-learning platform. "
            #     "Answer strictly based on the provided FAQ sources. "
            #     "If missing, say you don't have enough information."
            # ),    
        )

        cfg = dict(self.generation_config)
        if generation_config:
            cfg.update(generation_config)

        resp = model.generate_content(
            prompt,
            generation_config=cfg,
            safety_settings=safety_settings or self.safety_settings,
        )

        text = getattr(resp, "text", None)
        if text is None and hasattr(resp, "candidates") and resp.candidates:
            cand = resp.candidates[0]
            try:
                text = cand.content.parts[0].text  # SDK variant
            except Exception:
                text = ""
        return text or ""

    def normalize_markdown(self, s: str) -> str:
        if not s:
            return s
        out = s.strip()
        out = re.sub(r'\s\*\s', '\n- ', out)
        out = re.sub(r':\s*-\s', ':\n- ', out)
        out = re.sub(r'\n{3,}', '\n\n', out)
        return out

    def build_faq_prompt(
        self,
        query: str,
        source_information: Sequence[str],
        language: str = "auto",
    ) -> str:
        joined: List[str] = []
        for i, s in enumerate(source_information):
            if not s or not isinstance(s, str):
                continue
            joined.append(f"- FAQ Source #{i+1}:\n{textwrap.shorten(s, width=2000, placeholder=' ...')}")
        context = "\n\n".join(joined) if joined else "(no FAQ sources provided)"

        if language == "auto":
            language_instruction = "Reply in the same language as the user's query."
        else:
            language_instruction = f"Reply in {language}."

        prompt = (
            f"You are a helpful support assistant for an e-learning platform.\n"
            f"User's question: {query}\n\n"
            f"Answer strictly based on the FAQ information below.\n"
            f"If the answer is not present, say you don't have enough information.\n\n"
            f"FAQ information:\n{context}\n\n"
            f"Constraints:\n"
            f"- {language_instruction}\n"
            f"- Be concise and clear.\n"
            f"- Use markdown for formatting.\n"
            f"- Use **bold** for important policy names, deadlines, or steps.\n"
            f"- Use bullet points for lists.\n"
        )
        return prompt


    def classify_query_mode(self, query: str) -> str:
        return "faq"


    def answer_query(
        self,
        query: str,
        *,
        faq_chunks_coll,
        language: str = "auto",
        mode: Optional[str] = None,  # "faq" | "course" | None (auto)
        k_candidates: int = 50,
        k_return: int = 2,
    ) -> str:
        resolved_mode = (mode or self.classify_query_mode(query)).lower()

        sources = get_docs_for_fqa(
            query=query,
            chunks_coll=faq_chunks_coll,
            k_candidates=k_candidates,
            k_return=1,
        )
        prompt = self.build_faq_prompt(query, sources, language=language)

        raw = self.generate(prompt)
        return self.normalize_markdown(raw)
