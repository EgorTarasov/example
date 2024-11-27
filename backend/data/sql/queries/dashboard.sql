-- name: CreatePipeLine :one
INSERT INTO pipelines(user_id, title, pipeline_description)
VALUES ($1, $2, $3)
RETURNING id,
    user_id,
    title,
    created_at,
    updated_at;

-- name: CreateInputBlock :one
INSERT INTO input_blocks(pipeline_id, data_block_id, llm_id)
VALUES ($1, $2, $3)
RETURNING id,
	pipeline_id,
	data_block_id,
    llm_id,
    created_at,
    updated_at;

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