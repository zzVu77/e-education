# OpenAI Integration for RAG Service

## Changes Made

The RAG service has been updated to support OpenAI in addition to Google's Gemini API.

### Key Changes:

1. **Added OpenAI dependency** to `requirements.txt`
2. **Updated OnlineLLMs class** to support both OpenAI and Gemini providers
3. **Modified LLMS class** to handle provider selection
4. **Updated main.py** to use OpenAI by default

### Environment Variables

Set the following environment variable to use OpenAI:

```bash
export OPENAI_API_KEY="your_openai_api_key_here"
```

Or create a `.env` file:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### Usage Examples

#### Using OpenAI (default):
```python
from ragService.llm.llms import LLMS

# Uses OpenAI GPT-3.5-turbo by default
llm = LLMS(mode="online", model_name="gpt-3.5-turbo", provider="openai")

# Or use GPT-4
llm = LLMS(mode="online", model_name="gpt-4", provider="openai")
```

#### Using Gemini (if you prefer):
```python
from ragService.llm.llms import LLMS

# Uses Gemini
llm = LLMS(mode="online", model_name="gemini-2.0-flash", provider="gemini")
```

### Installation

Install the updated dependencies:

```bash
pip install -r requirements.txt
```

### Running the Service

The service will now use OpenAI by default. Make sure to set your `OPENAI_API_KEY` environment variable before running:

```bash
export OPENAI_API_KEY="your_api_key_here"
python main.py
```
