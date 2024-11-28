import typing as tp

from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_postgres import PGVector
from sqlalchemy.ext.asyncio import create_async_engine

from .record import Record

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

    engine = create_async_engine(connection_dsn)
    vector_store = PGVector(
        embeddings=model,
        collection_name=collection_name,
        use_jsonb=True,
        connection=engine,
    )
    return model, vector_store
