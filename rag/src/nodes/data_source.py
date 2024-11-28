import logging
from abc import ABC, abstractmethod

import fitz  # PyMuPDF
import httpx

from .record import Record

logger = logging.getLogger(__name__)  # Create a logger for this module


class DataBlock(ABC):
    def __init__(self, url: str):
        self.url = url

    @abstractmethod
    def parse(self) -> list[Record]:
        pass


class PDFParser(DataBlock):
    def __init__(self, url: str):
        super().__init__(url)
        self.client = httpx.Client(
            follow_redirects=True,
        )
        self.url = url

    def parse(self) -> list[Record]:

        logger.info(f"Fetching PDF from URL: {self.url}")
        try:
            response = self.client.get(self.url)
            response.raise_for_status()
        except httpx.HTTPError as e:
            logger.error(f"HTTP error occurred while fetching PDF: {e}")
            return []
        except Exception as e:
            return []

        logger.info("Opening PDF file")
        pdf_file = fitz.open(stream=response.content, filetype="pdf")
        records = []

        logger.info(f"Processing {len(pdf_file)} pages in the PDF")
        for page_index in range(len(pdf_file)):
            page = pdf_file.load_page(page_index)
            text = page.get_text().replace("\n", "")
            records.append(
                Record(
                    src=self.url,
                    content=text,
                    chunk_id=page_index + 1,
                    attachments=[],
                    raw_content=text,
                )
            )
            logger.debug(f"Processed page {page_index + 1}")

        logger.info(f"Parsed {len(records)} records from PDF")
        return records
