from langchain_ollama import OllamaLLM


def create_llm(endpoint: str, model: str) -> OllamaLLM:
    return OllamaLLM(
        base_url=endpoint,
        model=model,
    )
