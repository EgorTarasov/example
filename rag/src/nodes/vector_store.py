import typing as tp
from .record import Record
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document
from langchain_postgres import PGVector


EMBEDDING_MODELS = ["nomic-ai/nomic-embed-text-v1", "Tochka-AI/ruRoPEBert-e5-base-2k"]


def create_pgvector(
    connection_dsn: str = "postgresql+psycopg://pg-user:pg-password@10.0.1.70:5432/t1-dev",
    embedding_model: str = "Tochka-AI/ruRoPEBert-e5-base-2k",
    collection_name: str = "vector_test",
):
    model = HuggingFaceEmbeddings(
        model_name=embedding_model,
        model_kwargs={"trust_remote_code": True},
    )
    vector_store = PGVector(
        embeddings=model,
        collection_name=collection_name,
        connection=connection_dsn,
        use_jsonb=True,
    )
    return model, vector_store
