import logging
import typing as tp

from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.language_models.base import BaseLanguageModel
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.vectorstores.base import VectorStore
from langchain_text_splitters.base import TextSplitter

from .data_source import DataBlock
from .record import Record, to_documents

logger = logging.getLogger(__name__)


class PipeLine:

    def __init__(
        self,
        _id: int,
        data: DataBlock,
        splitter: TextSplitter,
        store: VectorStore,
        model: BaseLanguageModel,
        system_prompt: str,
    ) -> None:
        self._id = _id
        self.data = data
        self.splitter = splitter
        self.store = store
        self.model = model
        self.system_prompt = system_prompt
        self.retriever = self.store.as_retriever()

        self.prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt),
                ("human", "{input}"),
            ]
        )
        self.question_answer_chain = create_stuff_documents_chain(
            self.model,
            self.prompt,
        )
        self.rag_chain = create_retrieval_chain(
            self.retriever,
            self.question_answer_chain,
        )
        print(type(self.rag_chain))

    async def build(self) -> None:
        logger.info("starting parsing")
        records = self.data.parse()
        logger.info("finished parsing")
        documents = to_documents(records)
        chunks = self.splitter.split_documents(documents)

        batches = [chunks[i : i + 15] for i in range(0, len(chunks), 15)]
        logger.info(f"splitted into {len(batches)} batches")
        for idx, batch in enumerate(batches):
            await self.store.aadd_documents(batch)
            logger.info(f"added {len(batch)} documents to store")
            logger.info(f"processed {idx}/ {len(batches)} batches")

    async def query(self, query: str) -> str:
        return await self.rag_chain.ainvoke({"input": query})

    async def stream(self, query):
        async for chunk in self.rag_chain.astream({"input": query}):
            if "context" in chunk:
                yield {"type": "context", "value": chunk["context"]}
            if "answer" in chunk:
                yield {"type": "answer", "value": chunk["answer"]}

    # async def stream(self, query: str) -> tp.AsyncGenerator[str, None]:
    #     response_stream = await self.rag_chain.ainvoke(
    #         {"input": query}, config={"stream": True}
    #     )
    #     async for chunk in response_stream:
    #         if "answer" in chunk:
    #             yield chunk["answer"]
