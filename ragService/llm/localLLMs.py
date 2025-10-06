from __future__ import annotations
import os
import time
import json
from typing import Any, Dict, List, Optional, Sequence, Union

# This module talks to LM Studio's OpenAI-compatible HTTP server.
# In LM Studio: "Server" tab -> start server (default: http://localhost:1234/v1).
# No API key is required by default, but we support it if you set one.

try:
    import requests
except Exception as e:
    raise RuntimeError("Please 'pip install requests' to use LocalLLMs.") from e


class LocalLLMs:
    """
    Minimal client for an LM Studio local server (OpenAI-compatible).
    - Default base_url: http://localhost:1234/v1
    - Works with /chat/completions (messages) or /completions (prompt)
    """

    def __init__(
        self,
        base_url: str = None,
        api_key: Optional[str] = None,     # LM Studio usually doesn't require one
        model_name: Optional[str] = None,  # e.g. "qwen2.5:7b-instruct" or the name shown in LM Studio
        timeout: float = 60.0,
        default_temperature: float = 0.3,
        default_top_p: float = 0.95,
        default_max_tokens: int = 1024,
    ):
        self.base_url = base_url or os.getenv("LMSTUDIO_BASE_URL", "http://localhost:1234/v1")
        self.api_key = api_key or os.getenv("LMSTUDIO_API_KEY")  # optional
        self.model_name = model_name or os.getenv("LMSTUDIO_MODEL")  # can be None; you can pass per-call
        self.timeout = timeout

        self.default_temperature = default_temperature
        self.default_top_p = default_top_p
        self.default_max_tokens = default_max_tokens

    # ----------------- convenience -----------------
    def set_model(self, model_name: str) -> None:
        self.model_name = model_name

    def list_models(self) -> List[str]:
        """
        GET /models to see what's available on the LM Studio server.
        """
        url = f"{self.base_url.rstrip('/')}/models"
        resp = requests.get(url, headers=self._headers(), timeout=self.timeout)
        resp.raise_for_status()
        data = resp.json()
        # OpenAI-compatible: data = {"data": [{"id": "...", ...}, ...]}
        out = []
        for item in data.get("data", []):
            mid = item.get("id")
            if mid:
                out.append(mid)
        return out

    # ----------------- core APIs -----------------
    def generate(
        self,
        prompt: str,
        *,
        system: Optional[str] = None,
        model_name: Optional[str] = None,
        temperature: Optional[float] = None,
        top_p: Optional[float] = None,
        max_tokens: Optional[int] = None,
        use_chat: bool = True,
        extra: Optional[Dict[str, Any]] = None,
    ) -> str:
        """
        High-level text generation.
        - If use_chat=True (default), sends /chat/completions with messages = [system?, user].
        - If use_chat=False, sends /completions with a single prompt string.
        Returns the response text ('' if empty).
        """
        model = model_name or self.model_name
        if not model:
            raise ValueError("No model_name set. Pass model_name=... or call set_model(...).")

        temperature = self._pick(temperature, self.default_temperature)
        top_p = self._pick(top_p, self.default_top_p)
        max_tokens = int(self._pick(max_tokens, self.default_max_tokens))

        if use_chat:
            messages: List[Dict[str, str]] = []
            if system:
                messages.append({"role": "system", "content": system})
            messages.append({"role": "user", "content": prompt})

            payload: Dict[str, Any] = {
                "model": model,
                "messages": messages,
                "temperature": temperature,
                "top_p": top_p,
                "max_tokens": max_tokens,
                "stream": False,
            }
            if extra:
                payload.update(extra)

            data = self._post("/chat/completions", payload)
            # OpenAI-style extraction:
            try:
                return data["choices"][0]["message"]["content"]
            except Exception:
                return ""
        else:
            payload = {
                "model": model,
                "prompt": prompt,
                "temperature": temperature,
                "top_p": top_p,
                "max_tokens": max_tokens,
                "stream": False,
            }
            if extra:
                payload.update(extra)

            data = self._post("/completions", payload)
            try:
                return data["choices"][0]["text"]
            except Exception:
                return ""

    def generate_with_messages(
        self,
        messages: List[Dict[str, str]],
        *,
        model_name: Optional[str] = None,
        temperature: Optional[float] = None,
        top_p: Optional[float] = None,
        max_tokens: Optional[int] = None,
        extra: Optional[Dict[str, Any]] = None,
    ) -> str:
        """
        Lower-level call when you already have a messages list.
        messages example: [{"role":"system","content":"..."},
                           {"role":"user","content":"..."}]
        """
        model = model_name or self.model_name
        if not model:
            raise ValueError("No model_name set. Pass model_name=... or call set_model(...).")

        temperature = self._pick(temperature, self.default_temperature)
        top_p = self._pick(top_p, self.default_top_p)
        max_tokens = int(self._pick(max_tokens, self.default_max_tokens))

        payload: Dict[str, Any] = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "top_p": top_p,
            "max_tokens": max_tokens,
            "stream": False,
        }
        if extra:
            payload.update(extra)

        data = self._post("/chat/completions", payload)
        try:
            return data["choices"][0]["message"]["content"]
        except Exception:
            return ""

    # ----------------- HTTP helpers -----------------
    def _headers(self) -> Dict[str, str]:
        h = {"Content-Type": "application/json"}
        if self.api_key:
            h["Authorization"] = f"Bearer {self.api_key}"
        return h

    def _post(self, endpoint: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        url = f"{self.base_url.rstrip('/')}{endpoint}"
        # basic retry on connection reset/refused (when server spins up)
        for attempt in range(3):
            try:
                resp = requests.post(url, headers=self._headers(), json=payload, timeout=self.timeout)
                resp.raise_for_status()
                return resp.json()
            except requests.exceptions.RequestException as e:
                if attempt == 2:
                    raise
                time.sleep(0.5 * (attempt + 1))
        # unreachable
        return {}

    @staticmethod
    def _pick(val: Any, default: Any) -> Any:
        return default if val is None else val

    # ----------------- tiny prompt helper (optional) -----------------
    def build_sales_prompt(self, query: str, source_information: Sequence[str], language: str = "en") -> str:
        """
        Mirrors your online_llms helper: composes a simple grounded prompt.
        """
        from textwrap import shorten
        bullets = []
        for i, s in enumerate(source_information):
            if not s:
                continue
            bullets.append(f"- Source #{i+1}:\n{shorten(str(s), width=2000, placeholder=' ...')}")
        context = "\n\n".join(bullets) if bullets else "(no sources provided)"

        return (
            f"Act as an online sales consultant for a course selling website.\n"
            f"User query: {query}\n"
            f"Answer only using the product information below. If an answer is not present, say you don't have enough information.\n\n"
            f"Product information:\n{context}\n\n"
            f"Constraints:\n"
            f"- Reply in {language}.\n"
            f"- Be concise, clear, and helpful.\n"
            f"- If price or duration is missing, say it's unavailable.\n"
        )
