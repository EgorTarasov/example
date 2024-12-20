// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: dashboard.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createDataBlock = `-- name: CreateDataBlock :one
INSERT INTO data_blocks(pipeline_id,input_block_id, storage_url, storage_type, text_splitter_id, vector_store_id)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id,
    pipeline_id,
	input_block_id,
	storage_url,
    text_splitter_id,
	vector_store_id,
    created_at,
    updated_at
`

type CreateDataBlockParams struct {
	PipelineID     pgtype.Int8
	InputBlockID   pgtype.Int8
	StorageUrl     string
	StorageType    string
	TextSplitterID int64
	VectorStoreID  int64
}

type CreateDataBlockRow struct {
	ID             int32
	PipelineID     pgtype.Int8
	InputBlockID   pgtype.Int8
	StorageUrl     string
	TextSplitterID int64
	VectorStoreID  int64
	CreatedAt      pgtype.Timestamp
	UpdatedAt      pgtype.Timestamp
}

func (q *Queries) CreateDataBlock(ctx context.Context, arg CreateDataBlockParams) (CreateDataBlockRow, error) {
	row := q.db.QueryRow(ctx, createDataBlock,
		arg.PipelineID,
		arg.InputBlockID,
		arg.StorageUrl,
		arg.StorageType,
		arg.TextSplitterID,
		arg.VectorStoreID,
	)
	var i CreateDataBlockRow
	err := row.Scan(
		&i.ID,
		&i.PipelineID,
		&i.InputBlockID,
		&i.StorageUrl,
		&i.TextSplitterID,
		&i.VectorStoreID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const createInputBlock = `-- name: CreateInputBlock :one
INSERT INTO input_blocks(pipeline_id, data_block_id, llm_id)
VALUES ($1, $2, $3)
RETURNING id,
	pipeline_id,
	data_block_id,
    llm_id,
    created_at,
    updated_at
`

type CreateInputBlockParams struct {
	PipelineID  pgtype.Int8
	DataBlockID int64
	LlmID       int64
}

type CreateInputBlockRow struct {
	ID          int32
	PipelineID  pgtype.Int8
	DataBlockID int64
	LlmID       int64
	CreatedAt   pgtype.Timestamp
	UpdatedAt   pgtype.Timestamp
}

func (q *Queries) CreateInputBlock(ctx context.Context, arg CreateInputBlockParams) (CreateInputBlockRow, error) {
	row := q.db.QueryRow(ctx, createInputBlock, arg.PipelineID, arg.DataBlockID, arg.LlmID)
	var i CreateInputBlockRow
	err := row.Scan(
		&i.ID,
		&i.PipelineID,
		&i.DataBlockID,
		&i.LlmID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const createLlmBlock = `-- name: CreateLlmBlock :one
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
    updated_at
`

type CreateLlmBlockParams struct {
	PipelineID    pgtype.Int8
	InputBlockID  pgtype.Int8
	LlmType       string
	Model         string
	Prompt        string
	LlmEndpoint   string
	Template      string
	WidgetBlockID int64
}

type CreateLlmBlockRow struct {
	ID            int32
	PipelineID    pgtype.Int8
	InputBlockID  pgtype.Int8
	LlmType       string
	Model         string
	Prompt        string
	LlmEndpoint   string
	Template      string
	WidgetBlockID int64
	CreatedAt     pgtype.Timestamp
	UpdatedAt     pgtype.Timestamp
}

func (q *Queries) CreateLlmBlock(ctx context.Context, arg CreateLlmBlockParams) (CreateLlmBlockRow, error) {
	row := q.db.QueryRow(ctx, createLlmBlock,
		arg.PipelineID,
		arg.InputBlockID,
		arg.LlmType,
		arg.Model,
		arg.Prompt,
		arg.LlmEndpoint,
		arg.Template,
		arg.WidgetBlockID,
	)
	var i CreateLlmBlockRow
	err := row.Scan(
		&i.ID,
		&i.PipelineID,
		&i.InputBlockID,
		&i.LlmType,
		&i.Model,
		&i.Prompt,
		&i.LlmEndpoint,
		&i.Template,
		&i.WidgetBlockID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const createPipeLine = `-- name: CreatePipeLine :one
INSERT INTO pipelines(user_id, title, pipeline_description)
VALUES ($1, $2, $3)
RETURNING id,
    user_id,
    title,
    created_at,
    updated_at
`

type CreatePipeLineParams struct {
	UserID              pgtype.Int8
	Title               string
	PipelineDescription string
}

type CreatePipeLineRow struct {
	ID        int32
	UserID    pgtype.Int8
	Title     string
	CreatedAt pgtype.Timestamp
	UpdatedAt pgtype.Timestamp
}

func (q *Queries) CreatePipeLine(ctx context.Context, arg CreatePipeLineParams) (CreatePipeLineRow, error) {
	row := q.db.QueryRow(ctx, createPipeLine, arg.UserID, arg.Title, arg.PipelineDescription)
	var i CreatePipeLineRow
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Title,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const createTextSplitter = `-- name: CreateTextSplitter :one
INSERT INTO text_splitters(pipeline_id, data_block_id, splitter_type, config)
VALUES ($1, $2, $3, $4)
RETURNING id,
    pipeline_id,
	data_block_id,
	splitter_type,
	config,
    created_at,
    updated_at
`

type CreateTextSplitterParams struct {
	PipelineID   pgtype.Int8
	DataBlockID  pgtype.Int8
	SplitterType string
	Config       string
}

type CreateTextSplitterRow struct {
	ID           int32
	PipelineID   pgtype.Int8
	DataBlockID  pgtype.Int8
	SplitterType string
	Config       string
	CreatedAt    pgtype.Timestamp
	UpdatedAt    pgtype.Timestamp
}

func (q *Queries) CreateTextSplitter(ctx context.Context, arg CreateTextSplitterParams) (CreateTextSplitterRow, error) {
	row := q.db.QueryRow(ctx, createTextSplitter,
		arg.PipelineID,
		arg.DataBlockID,
		arg.SplitterType,
		arg.Config,
	)
	var i CreateTextSplitterRow
	err := row.Scan(
		&i.ID,
		&i.PipelineID,
		&i.DataBlockID,
		&i.SplitterType,
		&i.Config,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const createVectorStore = `-- name: CreateVectorStore :one
INSERT INTO vector_stores(pipeline_id, data_block_id, store_type, collection_name, persist_directory)
VALUES ($1, $2, $3, $4, $5)
RETURNING id,
    pipeline_id,
	data_block_id,
	store_type,
	collection_name,
	persist_directory,
    created_at,
    updated_at
`

type CreateVectorStoreParams struct {
	PipelineID       pgtype.Int8
	DataBlockID      pgtype.Int8
	StoreType        string
	CollectionName   string
	PersistDirectory string
}

type CreateVectorStoreRow struct {
	ID               int32
	PipelineID       pgtype.Int8
	DataBlockID      pgtype.Int8
	StoreType        string
	CollectionName   string
	PersistDirectory string
	CreatedAt        pgtype.Timestamp
	UpdatedAt        pgtype.Timestamp
}

func (q *Queries) CreateVectorStore(ctx context.Context, arg CreateVectorStoreParams) (CreateVectorStoreRow, error) {
	row := q.db.QueryRow(ctx, createVectorStore,
		arg.PipelineID,
		arg.DataBlockID,
		arg.StoreType,
		arg.CollectionName,
		arg.PersistDirectory,
	)
	var i CreateVectorStoreRow
	err := row.Scan(
		&i.ID,
		&i.PipelineID,
		&i.DataBlockID,
		&i.StoreType,
		&i.CollectionName,
		&i.PersistDirectory,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const createWidgetBlock = `-- name: CreateWidgetBlock :one
INSERT INTO widget_blocks(pipeline_id, llm_block_id, image_url, styles)
VALUES ($1, $2, $3, $4)
RETURNING id,
    pipeline_id
	llm_block_id,
	image_url,
	styles,
    created_at,
    updated_at
`

type CreateWidgetBlockParams struct {
	PipelineID pgtype.Int8
	LlmBlockID pgtype.Int8
	ImageUrl   string
	Styles     []byte
}

type CreateWidgetBlockRow struct {
	ID         int32
	LlmBlockID pgtype.Int8
	ImageUrl   string
	Styles     []byte
	CreatedAt  pgtype.Timestamp
	UpdatedAt  pgtype.Timestamp
}

func (q *Queries) CreateWidgetBlock(ctx context.Context, arg CreateWidgetBlockParams) (CreateWidgetBlockRow, error) {
	row := q.db.QueryRow(ctx, createWidgetBlock,
		arg.PipelineID,
		arg.LlmBlockID,
		arg.ImageUrl,
		arg.Styles,
	)
	var i CreateWidgetBlockRow
	err := row.Scan(
		&i.ID,
		&i.LlmBlockID,
		&i.ImageUrl,
		&i.Styles,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteDataBlock = `-- name: DeleteDataBlock :exec
DELETE FROM data_blocks
WHERE id=$1
`

func (q *Queries) DeleteDataBlock(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteDataBlock, id)
	return err
}

const deleteInputBloc = `-- name: DeleteInputBloc :exec
DELETE FROM input_blocks
WHERE id=$1
`

func (q *Queries) DeleteInputBloc(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteInputBloc, id)
	return err
}

const deleteLlmBlock = `-- name: DeleteLlmBlock :exec
DELETE FROM llm_blocks
WHERE id=$1
`

func (q *Queries) DeleteLlmBlock(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteLlmBlock, id)
	return err
}

const deletePipeLine = `-- name: DeletePipeLine :exec
DELETE FROM pipelines
WHERE id=$1
`

func (q *Queries) DeletePipeLine(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deletePipeLine, id)
	return err
}

const deleteTextSplitter = `-- name: DeleteTextSplitter :exec
DELETE FROM text_splitters
WHERE id=$1
`

func (q *Queries) DeleteTextSplitter(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteTextSplitter, id)
	return err
}

const deleteVectorStore = `-- name: DeleteVectorStore :exec
DELETE FROM vector_stores
WHERE id=$1
`

func (q *Queries) DeleteVectorStore(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteVectorStore, id)
	return err
}

const deleteWidgetBlock = `-- name: DeleteWidgetBlock :exec
DELETE FROM widget_blocks
WHERE id=$1
`

func (q *Queries) DeleteWidgetBlock(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteWidgetBlock, id)
	return err
}

const getDashboardById = `-- name: GetDashboardById :many
SELECT id, user_id, title, pipeline_description, created_at, updated_at, deleted_at from pipelines
WHERE user_id = $1
`

func (q *Queries) GetDashboardById(ctx context.Context, userID pgtype.Int8) ([]Pipeline, error) {
	rows, err := q.db.Query(ctx, getDashboardById, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Pipeline
	for rows.Next() {
		var i Pipeline
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.Title,
			&i.PipelineDescription,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.DeletedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getDataBlocksById = `-- name: GetDataBlocksById :many
SELECT id, input_block_id, storage_url, storage_type, text_splitter_id, vector_store_id, created_at, updated_at, pipeline_id FROM data_blocks
WHERE pipeline_id = $1
`

func (q *Queries) GetDataBlocksById(ctx context.Context, pipelineID pgtype.Int8) ([]DataBlock, error) {
	rows, err := q.db.Query(ctx, getDataBlocksById, pipelineID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []DataBlock
	for rows.Next() {
		var i DataBlock
		if err := rows.Scan(
			&i.ID,
			&i.InputBlockID,
			&i.StorageUrl,
			&i.StorageType,
			&i.TextSplitterID,
			&i.VectorStoreID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.PipelineID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getInputBlocksById = `-- name: GetInputBlocksById :many
SELECT id, pipeline_id, data_block_id, llm_id, created_at, updated_at, deleted_at FROM input_blocks
WHERE pipeline_id = $1
`

func (q *Queries) GetInputBlocksById(ctx context.Context, pipelineID pgtype.Int8) ([]InputBlock, error) {
	rows, err := q.db.Query(ctx, getInputBlocksById, pipelineID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []InputBlock
	for rows.Next() {
		var i InputBlock
		if err := rows.Scan(
			&i.ID,
			&i.PipelineID,
			&i.DataBlockID,
			&i.LlmID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.DeletedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getLlmBlocksById = `-- name: GetLlmBlocksById :many
SELECT id, input_block_id, llm_endpoint, llm_type, model, prompt, template, widget_block_id, created_at, updated_at, pipeline_id FROM llm_blocks
WHERE pipeline_id = $1
`

func (q *Queries) GetLlmBlocksById(ctx context.Context, pipelineID pgtype.Int8) ([]LlmBlock, error) {
	rows, err := q.db.Query(ctx, getLlmBlocksById, pipelineID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []LlmBlock
	for rows.Next() {
		var i LlmBlock
		if err := rows.Scan(
			&i.ID,
			&i.InputBlockID,
			&i.LlmEndpoint,
			&i.LlmType,
			&i.Model,
			&i.Prompt,
			&i.Template,
			&i.WidgetBlockID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.PipelineID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getPipelineInfoById = `-- name: GetPipelineInfoById :one
SELECT id, user_id, title, pipeline_description, created_at, updated_at, deleted_at FROM pipelines
WHERE id = $1
`

func (q *Queries) GetPipelineInfoById(ctx context.Context, id int32) (Pipeline, error) {
	row := q.db.QueryRow(ctx, getPipelineInfoById, id)
	var i Pipeline
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Title,
		&i.PipelineDescription,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
	)
	return i, err
}

const getTextSplittersById = `-- name: GetTextSplittersById :many
SELECT id, data_block_id, splitter_type, config, created_at, updated_at, pipeline_id FROM text_splitters
WHERE pipeline_id = $1
`

func (q *Queries) GetTextSplittersById(ctx context.Context, pipelineID pgtype.Int8) ([]TextSplitter, error) {
	rows, err := q.db.Query(ctx, getTextSplittersById, pipelineID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []TextSplitter
	for rows.Next() {
		var i TextSplitter
		if err := rows.Scan(
			&i.ID,
			&i.DataBlockID,
			&i.SplitterType,
			&i.Config,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.PipelineID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getVectorStoresById = `-- name: GetVectorStoresById :many
SELECT id, data_block_id, store_type, collection_name, persist_directory, created_at, updated_at, pipeline_id FROM vector_stores
WHERE pipeline_id = $1
`

func (q *Queries) GetVectorStoresById(ctx context.Context, pipelineID pgtype.Int8) ([]VectorStore, error) {
	rows, err := q.db.Query(ctx, getVectorStoresById, pipelineID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []VectorStore
	for rows.Next() {
		var i VectorStore
		if err := rows.Scan(
			&i.ID,
			&i.DataBlockID,
			&i.StoreType,
			&i.CollectionName,
			&i.PersistDirectory,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.PipelineID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getWidgetBlocksById = `-- name: GetWidgetBlocksById :many
SELECT id, llm_block_id, image_url, styles, created_at, updated_at, pipeline_id FROM widget_blocks
WHERE pipeline_id = $1
`

func (q *Queries) GetWidgetBlocksById(ctx context.Context, pipelineID pgtype.Int8) ([]WidgetBlock, error) {
	rows, err := q.db.Query(ctx, getWidgetBlocksById, pipelineID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []WidgetBlock
	for rows.Next() {
		var i WidgetBlock
		if err := rows.Scan(
			&i.ID,
			&i.LlmBlockID,
			&i.ImageUrl,
			&i.Styles,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.PipelineID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateDataBlock = `-- name: UpdateDataBlock :exec
UPDATE data_blocks
SET input_block_id=$1, storage_url=$2, text_splitter_id=$3,vector_store_id=$4
WHERE id=$5
`

type UpdateDataBlockParams struct {
	InputBlockID   pgtype.Int8
	StorageUrl     string
	TextSplitterID int64
	VectorStoreID  int64
	ID             int32
}

func (q *Queries) UpdateDataBlock(ctx context.Context, arg UpdateDataBlockParams) error {
	_, err := q.db.Exec(ctx, updateDataBlock,
		arg.InputBlockID,
		arg.StorageUrl,
		arg.TextSplitterID,
		arg.VectorStoreID,
		arg.ID,
	)
	return err
}

const updateInputBlock = `-- name: UpdateInputBlock :exec
UPDATE input_blocks
SET data_block_id=$1, llm_id=$2
WHERE id=$3
`

type UpdateInputBlockParams struct {
	DataBlockID int64
	LlmID       int64
	ID          int32
}

func (q *Queries) UpdateInputBlock(ctx context.Context, arg UpdateInputBlockParams) error {
	_, err := q.db.Exec(ctx, updateInputBlock, arg.DataBlockID, arg.LlmID, arg.ID)
	return err
}

const updateLlmBlock = `-- name: UpdateLlmBlock :exec
UPDATE llm_blocks
SET input_block_id=$1, llm_type=$2, model=$3,prompt=$4,llm_endpoint=$5,template=$6,widget_block_id=$7
WHERE id=$8
`

type UpdateLlmBlockParams struct {
	InputBlockID  pgtype.Int8
	LlmType       string
	Model         string
	Prompt        string
	LlmEndpoint   string
	Template      string
	WidgetBlockID int64
	ID            int32
}

func (q *Queries) UpdateLlmBlock(ctx context.Context, arg UpdateLlmBlockParams) error {
	_, err := q.db.Exec(ctx, updateLlmBlock,
		arg.InputBlockID,
		arg.LlmType,
		arg.Model,
		arg.Prompt,
		arg.LlmEndpoint,
		arg.Template,
		arg.WidgetBlockID,
		arg.ID,
	)
	return err
}

const updatePipeLine = `-- name: UpdatePipeLine :exec
UPDATE pipelines
SET title=$1, pipeline_description=$2
WHERE id=$3
`

type UpdatePipeLineParams struct {
	Title               string
	PipelineDescription string
	ID                  int32
}

func (q *Queries) UpdatePipeLine(ctx context.Context, arg UpdatePipeLineParams) error {
	_, err := q.db.Exec(ctx, updatePipeLine, arg.Title, arg.PipelineDescription, arg.ID)
	return err
}

const updateTextSplitter = `-- name: UpdateTextSplitter :exec
UPDATE text_splitters
SET data_block_id=$1, splitter_type=$2, config=$3
WHERE id=$4
`

type UpdateTextSplitterParams struct {
	DataBlockID  pgtype.Int8
	SplitterType string
	Config       string
	ID           int32
}

func (q *Queries) UpdateTextSplitter(ctx context.Context, arg UpdateTextSplitterParams) error {
	_, err := q.db.Exec(ctx, updateTextSplitter,
		arg.DataBlockID,
		arg.SplitterType,
		arg.Config,
		arg.ID,
	)
	return err
}

const updateVectorStore = `-- name: UpdateVectorStore :exec
UPDATE vector_stores
SET data_block_id=$1, store_type=$2, collection_name=$3, persist_directory=$4
WHERE id=$5
`

type UpdateVectorStoreParams struct {
	DataBlockID      pgtype.Int8
	StoreType        string
	CollectionName   string
	PersistDirectory string
	ID               int32
}

func (q *Queries) UpdateVectorStore(ctx context.Context, arg UpdateVectorStoreParams) error {
	_, err := q.db.Exec(ctx, updateVectorStore,
		arg.DataBlockID,
		arg.StoreType,
		arg.CollectionName,
		arg.PersistDirectory,
		arg.ID,
	)
	return err
}

const updateWidgetBlock = `-- name: UpdateWidgetBlock :exec
UPDATE widget_blocks
SET llm_block_id=$1, image_url=$2, styles=$3
WHERE id=$4
`

type UpdateWidgetBlockParams struct {
	LlmBlockID pgtype.Int8
	ImageUrl   string
	Styles     []byte
	ID         int32
}

func (q *Queries) UpdateWidgetBlock(ctx context.Context, arg UpdateWidgetBlockParams) error {
	_, err := q.db.Exec(ctx, updateWidgetBlock,
		arg.LlmBlockID,
		arg.ImageUrl,
		arg.Styles,
		arg.ID,
	)
	return err
}
