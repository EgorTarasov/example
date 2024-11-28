import logging

from nodes import (PDFParser, PipeLine, create_llm, create_pgvector,
                   create_token_splitter)

# Configure logging
logging.basicConfig(
    level=logging.INFO,  # Set the logging level to INFO
    format="%(asctime)s - %(levelname)s - %(message)s",  # Define the log message format
    datefmt="%Y-%m-%d %H:%M:%S",  # Define the date format
)


def buildPipeline(url: str) -> None:
    embedder, store = create_pgvector(
        connection_dsn="postgresql+psycopg://pg-user:pg-password@10.0.1.70:5432/t1-dev",
        embedding_model="Tochka-AI/ruRoPEBert-e5-base-2k",
        collection_name="cisco_test",
    )

    datablock = PDFParser(url)
    ollama = create_llm(
        endpoint="http://10.0.1.70:7869",
        model="gemma:7b-instruct-q3_K_S",
    )
    splitter = create_token_splitter(1024)

    pipeline = PipeLine(
        _id=0,
        data=datablock,
        splitter=splitter,
        store=store,
        model=ollama,
        system_prompt="Ты специалист по сетевому оборудованию и отвечаешь только на вопросы саязанные с этим текстом: {context}",
    )

    # pipeline.build()

    response = pipeline.query("Выдели основные идеи этого документа")
    print(response["answer"])


if __name__ == "__main__":
    arxiv_url = "http://10.0.1.70:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3QxLWRldi9DSVNDTyUyME5ldHdvcmslMjBUZWNobm9sb2dpZXMlMjBMZWN0dXJlJTIwTm90ZXMucGRmP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9TU9FNTlBUFJRUlY3NlNDUlJVODclMkYyMDI0MTEyNyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDExMjdUMTQzMDA2WiZYLUFtei1FeHBpcmVzPTQzMjAwJlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lKTlQwVTFPVUZRVWxGU1ZqYzJVME5TVWxVNE55SXNJbVY0Y0NJNk1UY3pNamMxTWpjek5pd2ljR0Z5Wlc1MElqb2lZMmx6WTI4aWZRLjNWTk5sc3pVWVN5dTVuQlpncXE5cjJhN3hPdkRKWE1fSHlzZFlWWGM0eGVtVURqUEpGbkNVZEdzNXZaVU1GVGNHOXZkbW1fZi1RVjJFVHRqZFRULWRBJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9ZDQ1OWY3ZGY5MzdmNWQ4YjQ1MGY1YzJmMmUzMTc5NjNlNGI2MzY4ZjZiM2NmYTliMDBjZjZkZTQ5MjUwMzI1OQ"
    main(arxiv_url)
