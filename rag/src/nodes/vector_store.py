import typing as tp
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document
from langchain_postgres import PGVector
from langchain_postgres.vectorstores import PGVector


EMBEDDING_MODELS = ["nomic-ai/nomic-embed-text-v1", "Tochka-AI/ruRoPEBert-e5-base-2k"]


class VectorStore:
    """Описание блока vector store для создание rag pipelines"""

    def __init__(
        self,
        connection_dsn: str = "postgresql+psycopg://pg-user:pg-password@10.0.1.70:5432/t1-dev",
        embedding_model: str = "Tochka-AI/ruRoPEBert-e5-base-2k",
        collection_name: str = "vector_test",
    ):
        self.embedding_model = HuggingFaceEmbeddings(
            model_name=embedding_model,
            model_kwargs={"trust_remote_code": True},
        )
        self.vector_store = PGVector(
            embeddings=self.embedding_model,
            collection_name=collection_name,
            connection=connection_dsn,
            use_jsonb=True,
        )
