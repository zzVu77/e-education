from __future__ import annotations
import os
import textwrap
from typing import Any, Dict, List, Optional, Sequence, Union
import google.generativeai as genai
from IPython.display import Markdown

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
        model = genai.GenerativeModel(self.model_name)

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

    def format_markdown(self, text: str) -> str:
        return textwrap.indent(text.replace("\t", "    "), "> ")

    def build_sales_prompt(
        self,
        query: str,
        source_information: Sequence[str],
        language: str = "auto",
    ) -> str:
        joined = []
        for i, s in enumerate(source_information):
            if not s or not isinstance(s, str):
                continue
            joined.append(f"- Source #{i+1}:\n{textwrap.shorten(s, width=2000, placeholder=' ...')}")
        context = "\n\n".join(joined) if joined else "(no sources provided)"

        # Auto-detect language from query if not specified
        if language == "auto":
            language_instruction = "Reply in the same language as the user's query."
        else:
            language_instruction = f"Reply in {language}."

        prompt = (
            f"Act as an online sales consultant for a course selling website. "
            f"A user's query: {query}\n"
            f"Answer the questions based on the product information below. "
            f"If an answer is not present, say you don't have enough information.\n\n"
            f"Product information:\n{context}\n\n"
            f"Constraints:\n"
            f"- {language_instruction}\n"
            f"- Be concise, clear, and helpful.\n"
            f"- If price or duration is missing, state that it's unavailable.\n"
        )
        return prompt



# from retrieval.vector_search import get_docs_for_rerank_unique
# from llms.online_llms import OnlineLLMs

# # Build context from your ANN -> dedupe step
# query = "I want to buy business improvement skills courses?"
# sources = get_docs_for_rerank_unique(query, course_chunks, k_candidates=50, k_return=2)

# llm = OnlineLLMs(model_name="gemini-2.0-flash")  # uses GOOGLE_API_KEY from Colab Secrets or env
# prompt = llm.build_sales_prompt(query, sources, language="en")
# answer = llm.generate(prompt)

# print(answer)
# In notebooks:
# from IPython.display import Markdown, display
# display(Markdown(llm.format_markdown(answer)))