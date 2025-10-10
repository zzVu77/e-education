from __future__ import annotations
from typing import Any, Dict, List, Optional, Union
import os
from ragService.llm.localLLMs import LocalLLMs
from ragService.llm.onlineLLMs import OnlineLLMs

class LLMS: 
    def __init__(
        self,
        mode: str,                       
        model_name: Optional[str] = None,
        api_key: Optional[str] = None,
        base_url: Optional[str] = None,  # LM Studio only
        **kwargs: Any,                   # generation_config/safety_settings/etc.
    ):
        self.mode = mode.lower().strip()
        if self.mode == "offline":
            # LM Studio (OpenAI-compatible server)
            self.llm = LocalLLMs(
                base_url=base_url,
                api_key=api_key,
                model_name=model_name,
                default_temperature=kwargs.pop("temperature", 0.3),
                default_top_p=kwargs.pop("top_p", 0.95),
                default_max_tokens=kwargs.pop("max_tokens", 1024),
            )
        elif self.mode == "online":
            # Google Generative AI (Gemini)
            self.llm = OnlineLLMs(
                api_key=os.getenv("GOOGLE_API_KEY"),
                model_name=model_name or "gemini-2.0-flash",
                generation_config=kwargs.pop("generation_config", None),
                safety_settings=kwargs.pop("safety_settings", None),
            )
        else:
            raise ValueError(f"Unsupported LLM mode: {mode!r}")

    def set_model(self, model_name: str) -> None:
        self.llm.set_model(model_name)

    def list_models(self) -> List[str]:
        # Only LocalLLMs exposes a model list via the local server
        if hasattr(self.llm, "list_models"):
            return self.llm.list_models()  # type: ignore[attr-defined]
        return []

    def generate_content(
        self,
        prompt: Prompt,
        **kwargs: Any,
    ) -> str:
        """
        If `prompt` is a string -> call underlying .generate().
        If `prompt` is a list of chat messages -> call .generate_with_messages().
        Extra kwargs are forwarded (e.g., temperature, top_p, max_tokens, system for Local).
        """
        # Messages path
        if isinstance(prompt, list):
            if hasattr(self.llm, "generate_with_messages"):
                return self.llm.generate_with_messages(prompt, **kwargs)  # LocalLLMs supports this; OnlineLLMs too
            # Fallback: collapse messages to a single string if the backend doesn’t support messages
            collapsed = self._collapse_messages(prompt)
            return self.llm.generate(collapsed, **kwargs)

        # String prompt path
        # LocalLLMs supports an optional `system` and `use_chat` flag; OnlineLLMs ignores unknown kwargs
        return self.llm.generate(prompt, **kwargs)

    @staticmethod
    def _collapse_messages(messages: List[Dict[str, str]]) -> str:
        """Collapse chat messages to a single prompt string (fallback)."""
        lines = []
        for m in messages:
            role = m.get("role", "user").upper()
            content = m.get("content", "")
            lines.append(f"{role}: {content}")
        lines.append("ASSISTANT:")
        return "\n".join(lines)