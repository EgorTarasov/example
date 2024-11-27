-- name: CreatePipeLine :one
INSERT INTO pipelines(user_id, title, pipeline_description)
VALUES ($1, $2, $3)
RETURNING id,
    user_id,
    title,
    created_at,
    updated_at;

-- name: GetDashboardById :many
SELECT * from pipelines
WHERE user_id = $1;

-- name: GetPipelineById :one
SElECT * from pipelines
WHERE user_id = $1
JOIN input_blocks ON pipelines.Id=input_blocks.pipeline_id
JOIN data_blocks ON input_blocks.Id=data_blocks.input_block_id
JOIN llm_blocks ON input_blocks.Id=llm_blocks.input_block_id
	-- CreateInputBlock(ctx context.Context, payload models.CreateInputBlock) (int64, error)
	-- CreateDataBlock(ctx context.Context, payload models.CreateDataBlock) (int64, error)
	-- CreateWidgetBlock(ctx context.Context, payload models.CreateWidgetBlock) (int64, error)
	-- CreateTextSplitter(ctx context.Context, payload models.CreateTextSplitter) (int64, error)
	-- CreateVectorStore(ctx context.Context, payload models.CreateVectorStore) (int64, error)
	-- CreateLLMBlock(ctx context.Context, payload models.CreateLLMBlock) (int64, error)