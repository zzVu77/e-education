from __future__ import annotations
import os
import textwrap
from typing import Any, Dict, List, Optional, Sequence, Union
import google.generativeai as genai
import re
import markdown
from markdown.extensions import codehilite, fenced_code, tables, toc 

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

    def normalize_markdown(self, s: str) -> str:
        if not s:
            return s
        out = s.strip()
        out = re.sub(r'\s\*\s', '\n- ', out)
        out = re.sub(r':\s*-\s', ':\n- ', out)
        out = re.sub(r'\n{3,}', '\n\n', out)
        return out
    
    def format_markdown(self, text: str) -> str:
        """
        Convert markdown text to HTML using Python markdown library.
        Similar to what react-markdown would do in a frontend.
        """
        if not text:
            return text
            
        # Configure markdown with extensions
        md = markdown.Markdown(
            extensions=[
                'codehilite',
                'fenced_code', 
                'tables',
                'toc',
                'nl2br',
                'attr_list'
            ],
            extension_configs={
                'codehilite': {
                    'css_class': 'highlight',
                    'use_pygments': True
                },
                'toc': {
                    'permalink': True
                }
            }
        )
        
        # Convert markdown to HTML
        html = md.convert(text)
        
        # Add some basic styling classes for better presentation
        html = html.replace('<h1>', '<h1 class="text-2xl font-bold mb-4">')
        html = html.replace('<h2>', '<h2 class="text-xl font-semibold mb-3">')
        html = html.replace('<h3>', '<h3 class="text-lg font-medium mb-2">')
        html = html.replace('<p>', '<p class="mb-3">')
        html = html.replace('<ul>', '<ul class="list-disc list-inside mb-3">')
        html = html.replace('<ol>', '<ol class="list-decimal list-inside mb-3">')
        html = html.replace('<li>', '<li class="mb-1">')
        html = html.replace('<code>', '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">')
        html = html.replace('<pre>', '<pre class="bg-gray-100 p-3 rounded overflow-x-auto mb-3">')
        html = html.replace('<blockquote>', '<blockquote class="border-l-4 border-gray-300 pl-4 italic mb-3">')
        
        return html
    
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
            f"- Format your response using markdown for better readability.\n"
            f"- Use **bold** for important information like course names, prices, and key details.\n"
            f"- Use bullet points (-) for lists of features or benefits.\n"
            f"- Use numbered lists (1., 2., 3.) for step-by-step information.\n"
            f"- Use > for important notes or highlights.\n"
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