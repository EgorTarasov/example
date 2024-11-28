import json
import os
import typing as tp
from contextlib import asynccontextmanager
from enum import Enum

import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from psycopg_pool import AsyncConnectionPool
from pydantic import BaseModel

import models
import nodes
from build import build_pipeline_from_tree
from chat import CHAT_HTML
from graph import build_tree, get_nodes, map_nodes

load_dotenv(".env")
# BACKEND_URL = os.getenv("BACKEND_URL")
# POSTGRES_DSN = os.getenv("POSTGRES_DSN")
BACKEND_URL = "https://larek.tech"

templates = Jinja2Templates(directory="./templates")


class PipelineState:
    state: tp.Literal["preparing", "parsing", "error", "done"] = "preparing"
    pipeline: nodes.PipeLine


# pipeline id and pipeline state
pipelines: dict[int, PipelineState] = {}


def get_conn_str():
    return f"""
    dbname={os.getenv('POSTGRES_DB')}
    user={os.getenv('POSTGRES_USER')}
    password={os.getenv('POSTGRES_PASSWORD')}
    host={os.getenv('POSTGRES_HOST')}
    port={os.getenv('POSTGRES_PORT')}
    """


@asynccontextmanager
async def lifespan(app: FastAPI):
    # app.async_pool = AsyncConnectionPool(conninfo=get_conn_str())
    app.state.pipelines = pipelines  # Store the pipelines dictionary in app.state
    yield
    # await app.async_pool.close()


app = FastAPI(
    lifespan=lifespan,
)
app.mount("/static", StaticFiles(directory="static"), name="static")


def assemble_pipeline(payload: models.Pipeline) -> nodes.PipeLine | None:
    # using dfs to assemble the pipeline
    # 1. find input_block in nodes and use that as root
    # 2. go over edges with source as id of "input_block" and find edges such as "llm_block" and "data_block"
    # 3. go over edges to find "text_splitter" and "vector_store" connected to "data_block"
    # 4. go over edges to find "widget_block" connected to "llm_block" use that as the last node

    roots: tp.List[models.InputBlockDto] = []
    for node in payload.nodes:
        if node["block_type"] == "input_block":
            roots.append(models.InputBlockDto.parse_obj(node))

    print(roots)

    return None


@app.post("/pipeline/")
async def create_pipeline(
    request: Request,
    pipeline_id: int,
    source_url: str,
    build: bool = False,
):
    try:
        response = httpx.get(f"{BACKEND_URL}/api/dashboard/pipeline/{pipeline_id}/")
        # print(response.json())

        if response.status_code != 200:
            return {"message": "Pipeline not found"}
        data = response.json()

        json_pipeline = models.Pipeline.parse_raw(response.content)
        print(json_pipeline)
        print(data["nodes"])
        # result_pipeline = build_pipeline_from_tree(
        result = map_nodes(
            build_tree(data["edges"]),
            get_nodes(data["nodes"]),
        )

        #
        print(result)
        # )

        result_pipeline = build_pipeline_from_tree(result, source_url)
        request.app.state.pipelines[pipeline_id] = result_pipeline

        if build:
            await result_pipeline.build()
        return
    except Exception as e:
        print(e)
        return {"err": e}


@app.post("/pipeline/{pipeline_id}/query/")
async def query_pipeline(
    request: Request,
    pipeline_id: int,
    query: str,
):
    try:
        pipeline = request.app.state.pipelines[pipeline_id]
        response = pipeline.query(query)
        return response
    except Exception as e:
        print(e)
        return {"err": e}


@app.websocket("/pipeline/{pipeline_id}/ws")
async def stream_pipeline(
    websocket: WebSocket,
    pipeline_id: int,
):
    await websocket.accept()

    try:
        pipeline = websocket.app.state.pipelines[pipeline_id]

        while True:
            try:
                # Receive query from client
                query_data = await websocket.receive_text()
                query = json.loads(query_data)["query"]

                # Stream response chunks
                await websocket.send_text(
                    json.dumps(
                        {
                            "type": "context",
                            "content": {
                                "url": "https://s3.larek.tech/t1-dev/test_referat.pdf",
                                "size": "11",
                            },
                        }
                    )
                )
                async for chunk in pipeline.stream(query):

                    if chunk["type"] == "answer":
                        await websocket.send_text(
                            json.dumps({"type": "chunk", "content": chunk["value"]})
                        )
                    if chunk["type"] == "context":
                        print("context", chunk)
                        response_metadata = []
                        for doc in chunk["value"]:
                            response_metadata.append(doc.metadata)
                        await websocket.send_text(
                            json.dumps(
                                {
                                    "type": "context",
                                    "content": response_metadata[0],
                                }
                            )
                        )

                # Send completion message
                await websocket.send_text(json.dumps({"type": "done"}))

            except WebSocketDisconnect:
                print("Client disconnected")
                break

            except Exception as e:
                await websocket.send_text(
                    json.dumps({"type": "error", "content": str(e)})
                )
                break

    except KeyError:
        await websocket.send_text(
            json.dumps({"type": "error", "content": "Pipeline not found"})
        )
    except Exception as e:
        await websocket.send_text(json.dumps({"type": "error", "content": str(e)}))
        print(e)
    finally:
        await websocket.close()


@app.get("/pipeline/{pipeline_id}/chat", response_class=HTMLResponse)
async def get_chat_page(
    pipeline_id: int,
):
    response = httpx.get(f"{BACKEND_URL}/api/dashboard/pipeline/{pipeline_id}/")
    data = response.json()

    return HTMLResponse(
        CHAT_HTML.format(
            pipeline_id=pipeline_id,
            title=data["title"],
            description=data["description"],
        )
    )


@app.get("/chat/{pipeline_id}", response_class=HTMLResponse)
async def chat_item(request: Request, pipeline_id: int):
    response = httpx.get(f"{BACKEND_URL}/api/dashboard/pipeline/{pipeline_id}/")
    data = response.json()

    return templates.TemplateResponse(
        "chat.html",
        {
            "request": request,
            "title": data["title"],
            "description": data["description"],
            "pipeline_id": pipeline_id,
        },
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
