from fastapi import FastAPI, Request, WebSocket, APIRouter, WebSocketDisconnect
import json
from pydantic import BaseModel
from contextlib import asynccontextmanager
import nodes
from psycopg_pool import AsyncConnectionPool
import typing as tp
import httpx
import os
from enum import Enum
from dotenv import load_dotenv
import models
from graph import build_tree, map_nodes
from build import build_pipeline_from_tree
from fastapi.responses import HTMLResponse
from chat import CHAT_HTML


load_dotenv(".env")
BACKEND_URL = os.getenv("BACKEND_URL")
POSTGRES_DSN = os.getenv("POSTGRES_DSN")


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
    app.async_pool = AsyncConnectionPool(conninfo=get_conn_str())
    app.state.pipelines = pipelines  # Store the pipelines dictionary in app.state
    yield
    await app.async_pool.close()


app = FastAPI(
    lifespan=lifespan,
)


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


def get_nodes(data: list[dict]) -> dict:
    result = {
        "data_block": {},
        "input_block": {},
        "widget_block": {},
        "llm_block": {},
        "vector_store": {},
        "text_splitter": {},
    }
    for node in data:
        result[node["block_type"]][node["id"]] = node

    return result


@app.post("/pipeline/")
async def create_pipeline(
    request: Request,
    pipeline_id: int,
    source_url: str,
):
    try:
        response = httpx.get(f"{BACKEND_URL}/api/dashboard/pipeline/{pipeline_id}/")
        # print(response.json())

        if response.status_code != 200:
            return {"message": "Pipeline not found"}
        data = response.json()
        models.Pipeline.parse_raw(response.content)

        tree = build_tree(data["edges"])
        nodes = get_nodes(data["nodes"])

        result_pipeline = build_pipeline_from_tree(
            map_nodes(tree, nodes),
            source_url,
        )
        result_pipeline.build()

        request.app.state.pipelines[pipeline_id] = result_pipeline

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
                async for chunk in pipeline.stream(query):
                    await websocket.send_text(
                        json.dumps({"type": "chunk", "content": chunk})
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
