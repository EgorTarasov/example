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
INSERT INTO data_blocks(input_block_id, storage_url, storage_type, text_splitter_id, vector_store_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING id,
	input_block_id,
	storage_url,
    text_splitter_id,
	vector_store_id,
    created_at,
    updated_at;

-- name: CreateLlmBlock :one
INSERT INTO llm_blocks(input_block_id, llm_type, model, prompt, llm_endpoint, template, widget_block_id)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING id,
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
INSERT INTO widget_blocks(llm_block_id, image_url, styles)
VALUES ($1, $2, $3)
RETURNING id,
	llm_block_id,
	image_url,
	styles,
    created_at,
    updated_at;

-- name: CreateTextSplitter :one
INSERT INTO text_splitters(data_block_id, splitter_type, config)
VALUES ($1, $2, $3)
RETURNING id,
	data_block_id,
	splitter_type,
	config,
    created_at,
    updated_at;

-- name: CreateVectorStore :one
INSERT INTO vector_stores(data_block_id, store_type, collection_name, persist_directory)
VALUES ($1, $2, $3, $4)
RETURNING id,
	data_block_id,
	store_type,
	collection_name,
	persist_directory,
    created_at,
    updated_at;

-- name: GetDashboardById :many
SELECT * from pipelines
WHERE user_id = $1;

-- name: GetPipelineById :one
SElECT * from pipelines
FULL JOIN input_blocks ON pipelines.id=input_blocks.pipeline_id
FULL JOIN data_blocks ON input_blocks.id=data_blocks.input_block_id
FULL JOIN llm_blocks ON input_blocks.id=llm_blocks.input_block_id
FULL JOIN widget_blocks ON llm_blocks.id=widget_blocks.llm_block_id
FULL JOIN text_splitters ON data_blocks.id=text_splitters.data_block_id
FULL JOIN vector_stores ON data_blocks.id=vector_stores.data_block_id
WHERE user_id = $1;