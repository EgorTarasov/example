-- name: CreatePipeLine :one
INSERT INTO pipelines(user_id, title, pipeline_description)
VALUES ($1, $2, $3)
RETURNING id,
    user_id,
    title,
    created_at,
    updated_at;

-- name: DeletePipeLine :exec
DELETE FROM pipelines
WHERE id=$1;

-- name: UpdatePipeLine :exec
UPDATE pipelines
SET title=$1, pipeline_description=$2
WHERE id=$3;

-- name: CreateInputBlock :one
INSERT INTO input_blocks(pipeline_id, data_block_id, llm_id)
VALUES ($1, $2, $3)
RETURNING id,
	pipeline_id,
	data_block_id,
    llm_id,
    created_at,
    updated_at;

-- name: DeleteInputBloc :exec
DELETE FROM input_blocks
WHERE id=$1;

-- name: UpdateInputBlock :exec
UPDATE input_blocks
SET data_block_id=$1, llm_id=$2
WHERE id=$3;

-- name: CreateDataBlock :one
INSERT INTO data_blocks(pipeline_id,input_block_id, storage_url, storage_type, text_splitter_id, vector_store_id)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id,
    pipeline_id,
	input_block_id,
	storage_url,
    text_splitter_id,
	vector_store_id,
    created_at,
    updated_at;

-- name: DeleteDataBlock :exec
DELETE FROM data_blocks
WHERE id=$1;

-- name: UpdateDataBlock :exec
UPDATE data_blocks
SET input_block_id=$1, storage_url=$2, text_splitter_id=$3,vector_store_id=$4
WHERE id=$5;

-- name: CreateLlmBlock :one
INSERT INTO llm_blocks(pipeline_id, input_block_id, llm_type, model, prompt, llm_endpoint, template, widget_block_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING id,
    pipeline_id,
    input_block_id,
    llm_type,
    model,
    prompt,
	llm_endpoint,
    template,
    widget_block_id,
    created_at,
    updated_at;

-- name: DeleteLlmBlock :exec
DELETE FROM llm_blocks
WHERE id=$1;

-- name: UpdateLlmBlock :exec
UPDATE llm_blocks
SET input_block_id=$1, llm_type=$2, model=$3,prompt=$4,llm_endpoint=$5,template=$6,widget_block_id=$7
WHERE id=$8;

-- name: CreateWidgetBlock :one
INSERT INTO widget_blocks(pipeline_id, llm_block_id, image_url, styles)
VALUES ($1, $2, $3, $4)
RETURNING id,
    pipeline_id
	llm_block_id,
	image_url,
	styles,
    created_at,
    updated_at;

-- name: DeleteWidgetBlock :exec
DELETE FROM widget_blocks
WHERE id=$1;

-- name: UpdateWidgetBlock :exec
UPDATE widget_blocks
SET llm_block_id=$1, image_url=$2, styles=$3
WHERE id=$4;

-- name: CreateTextSplitter :one
INSERT INTO text_splitters(pipeline_id, data_block_id, splitter_type, config)
VALUES ($1, $2, $3, $4)
RETURNING id,
    pipeline_id,
	data_block_id,
	splitter_type,
	config,
    created_at,
    updated_at;

-- name: DeleteTextSplitter :exec
DELETE FROM text_splitters
WHERE id=$1;

-- name: UpdateTextSplitter :exec
UPDATE text_splitters
SET data_block_id=$1, splitter_type=$2, config=$3
WHERE id=$4;

-- name: CreateVectorStore :one
INSERT INTO vector_stores(pipeline_id, data_block_id, store_type, collection_name, persist_directory)
VALUES ($1, $2, $3, $4, $5)
RETURNING id,
    pipeline_id,
	data_block_id,
	store_type,
	collection_name,
	persist_directory,
    created_at,
    updated_at;

-- name: DeleteVectorStore :exec
DELETE FROM vector_stores
WHERE id=$1;

-- name: UpdateVectorStore :exec
UPDATE vector_stores
SET data_block_id=$1, store_type=$2, collection_name=$3, persist_directory=$4
WHERE id=$5;

-- name: GetDashboardById :many
SELECT * from pipelines
WHERE user_id = $1;

-- name: GetInputBlocksById :many
SELECT * FROM input_blocks
WHERE pipeline_id = $1;

-- name: GetDataBlocksById :many
SELECT * FROM data_blocks
WHERE pipeline_id = $1;

-- name: GetWidgetBlocksById :many
SELECT * FROM widget_blocks
WHERE pipeline_id = $1;

-- name: GetLlmBlocksById :many
SELECT * FROM llm_blocks
WHERE pipeline_id = $1;

-- name: GetTextSplittersById :many
SELECT * FROM text_splitters
WHERE pipeline_id = $1;

-- name: GetVectorStoresById :many
SELECT * FROM vector_stores
WHERE pipeline_id = $1;

-- name: GetPipelineInfoById :one
SELECT * FROM pipelines
WHERE id = $1;

