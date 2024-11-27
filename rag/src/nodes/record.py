from dataclasses import dataclass
from langchain_core.documents import Document


@dataclass
class Record:
    src: str
    content: str
    chunk_id: int
    attachments: list[tuple[str, str]]
    raw_content: str

    def get_metadata(self):
        return {
            "src": self.src,
            "chunk_id": self.chunk_id,
            "attachments": self.attachments,
        }


def to_documents(records: list[Record]) -> list[Document]:
    return [
        Document(
            page_content=record.content,
            metadata=record.get_metadata(),
        )
        for record in records
    ]
