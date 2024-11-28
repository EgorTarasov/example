from langchain_text_splitters import TokenTextSplitter


def create_token_splitter(chunk_size: int = 2048):
    return TokenTextSplitter(chunk_size=chunk_size)
