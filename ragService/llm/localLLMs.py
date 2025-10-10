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
