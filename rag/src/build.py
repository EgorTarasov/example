from nodes import (
    create_pgvector,
    PipeLine,
    PDFParser,
    create_llm,
    create_token_splitter,
)
import logging

from sqlalchemy.ext.asyncio import create_async_engine

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)


def build_pipeline_from_tree(tree: list, url: str) -> PipeLine:
    # Default values from main.py
    default_connection_dsn = (
        "postgresql+psycopg://pg-user:pg-password@10.0.1.70:5432/t1-dev"
    )
    default_embedding_model = "Tochka-AI/ruRoPEBert-e5-base-2k"
    default_collection_name = "cisco_test"
    default_endpoint = "http://10.0.1.70:7869"
    default_model = "gemma:7b-instruct-q3_K_S"
    default_system_prompt = (
        "Ты специалист по сетевому оборудованию и отвечаешь только на вопросы "
        "связанные с этим текстом: {context}"
    )
    default_splitter_chunk_size = 1024

    # Initialize components with defaults
    data_block = PDFParser(url)
    splitter = create_token_splitter(default_splitter_chunk_size)
    

    embedder, store = create_pgvector(
        connection_dsn=default_connection_dsn,
        embedding_model=default_embedding_model,
        collection_name=default_collection_name,
    )
    model = create_llm(endpoint=default_endpoint, model=default_model)
    system_prompt = default_system_prompt

    # Traverse the tree and override defaults if data is provided
    for node in tree:
        if node["type"] == "input_block":
            for child in node.get("children", []):
                if child["type"] == "data_block":
                    data_block_data = child.get("data", {})
                    data_block_url = data_block_data.get("url", url)
                    data_block = PDFParser(data_block_url)

                    for grandchild in child.get("children", []):
                        if grandchild["type"] == "text_splitter":
                            splitter_data = grandchild.get("data", {})
                            chunk_size = splitter_data.get(
                                "chunk_size", default_splitter_chunk_size
                            )
                            splitter = create_token_splitter(chunk_size)
                elif child["type"] == "llm_block":
                    llm_data = child.get("data", {})
                    endpoint = llm_data.get("endpoint", default_endpoint)
                    model_name = llm_data.get("model", default_model)
                    model = create_llm(endpoint=endpoint, model=model_name)

    # Create the pipeline
    pipeline = PipeLine(
        _id=0,
        data=data_block,
        splitter=splitter,
        store=store,
        model=model,
        system_prompt=system_prompt,
    )
    return pipeline


if __name__ == "__main__":
    tree = [
        {
            "type": "input_block",
            "id": "7",
            "data": {},
            "children": [
                {
                    "type": "data_block",
                    "id": "5",
                    "data": {},
                    "children": [
                        {"type": "text_splitter", "id": "2", "data": {}, "children": []}
                    ],
                },
                {
                    "type": "llm_block",
                    "id": "5",
                    "data": {},
                    "children": [
                        {"type": "widget_block", "id": "2", "data": {}, "children": []}
                    ],
                },
            ],
        }
    ]
    url = "http://example.com/document.pdf"  # Use your default URL here
    pipeline = build_pipeline_from_tree(tree, url)
    # pipeline.build()  # Uncomment to build the pipeline
    response = pipeline.query("Выдели основные идеи этого документа")
    print(response["answer"])