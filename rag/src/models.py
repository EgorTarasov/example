from pydantic import BaseModel
from typing import List, Union, Optional, Any


class Edge(BaseModel):
    id: str
    source: str
    target: str
    animated: bool
    sourceHandle: str
    targetHandle: str


class CreatePipeline(BaseModel):
    user_id: int
    title: str
    description: str


class DataBlockDto(BaseModel):
    id: int
    type: str  # txt, pdf, notion, confluence
    url: str
    text_splitter_id: int
    vector_store_id: int
    block_type: str = "data_block"


class InputBlockDto(BaseModel):
    id: int
    data_block_id: int
    pipeline_id: int
    llm_id: int
    block_type: str = "input_block"


class WidgetBlockDto(BaseModel):
    id: int
    image_url: str
    styles: dict
    block_type: str = "widget_block"


class LLMDto(BaseModel):
    id: int
    type: str
    endpoint: str
    model: str
    prompt: str
    template: str
    widget_block_id: int
    block_type: str = "llm_block"


class VectorStoreDto(BaseModel):
    id: int
    type: str  # clickhouse, pgvector
    collection_name: str
    block_type: str = "vector_store"


class TextSplitterDto(BaseModel):
    id: int
    type: str  # regex, split
    config: dict
    data_block_id: int
    block_type: str = "text_splitter"


class PipelineDto(BaseModel):
    id: int
    title: str
    description: str
    data_blocks: List[DataBlockDto]
    input_blocks: List[InputBlockDto]
    widgets: List[WidgetBlockDto]
    llms: List[LLMDto]
    vector_stores: List[VectorStoreDto]
    text_splitters: List[TextSplitterDto]


class Pipeline(BaseModel):
    id: int
    title: str
    description: str
    nodes: List[Any]
    edges: List[Edge] | None
