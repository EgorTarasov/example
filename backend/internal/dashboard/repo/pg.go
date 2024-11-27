package repo

import (
	"context"

	"github.com/EgorTarasov/example/internal/dashboard/models"
	"github.com/EgorTarasov/example/pkg/db"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type pg struct {
	*db.Queries
	pool *pgxpool.Pool
}

func NewPgRepo(pool *pgxpool.Pool) GraphRepo {
	return &pg{
		Queries: db.New(pool),
		pool:    pool,
	}
}

func IntToPgType(value int64) pgtype.Int8 {
	return pgtype.Int8{
		Int64: value,
		Valid: true,
	}
}

func (pg *pg) CreatePipeline(ctx context.Context, payload models.CreatePipeLine) (int64, error) {
	newPipeline, err := pg.Queries.CreatePipeLine(ctx, db.CreatePipeLineParams{
		UserID:              payload.UserID,
		Title:               payload.Title,
		PipelineDescription: payload.Description,
	})
	if err != nil {
		return 0, err
	}
	return int64(newPipeline.ID), nil
}

func (pg *pg) GetDashboardById(ctx context.Context, id int64) ([]models.PipeLineDashboardDto, error) {
	dashboard, err := pg.Queries.GetDashboardById(ctx, id)
	dashboardPipelines := []models.PipeLineDashboardDto{}
	if err != nil {
		return []models.PipeLineDashboardDto{}, err
	}
	for i := range dashboard {
		dashboardPipelines = append(dashboardPipelines, models.PipeLineDashboardDto{
			Id:          int64(dashboard[i].ID),
			Title:       dashboard[i].Title,
			Description: dashboard[i].PipelineDescription,
		})
	}
	return dashboardPipelines, nil
}

func (pg *pg) GetPipelineById(ctx context.Context, id int64) (models.PipeLineDto, error) {
	fullpipeline, err := pg.Queries.GetPipelineById(ctx, id)
	pipeline := models.PipeLineDto{}
	if err != nil {
		return models.PipeLineDto{}, err
	}
	pipeline.Id = int64(fullpipeline.ID)
	pipeline.Title = fullpipeline.Title
	pipeline.Description = fullpipeline.PipelineDescription

	return pipeline, nil
}

// type PipeLineDto struct {
// 	Id            int64             `json:"id"`
// 	Title         string            `json:"title"`
// 	Description   string            `json:"description"`
// 	DataBlocks    []DataBlockDto    `json:"data_blocks"`
// 	InputBlocks   []InputBlockDto   `json:"input_blocks"`
// 	Widgets       []WidgetBlockDto  `json:"widgets"`
// 	LLMs          []LLMDto          `json:"llms"`
// 	VectorStores  []VectorStoreDto  `json:"vector_stores"`
// 	TextSplitters []TextSplitterDto `json:"text_splitters"`
// }

func (pg *pg) CreateInputBlock(ctx context.Context, payload models.CreateInputBlock) (int64, error) {
	newInputBlock, err := pg.Queries.CreateInputBlock(ctx, db.CreateInputBlockParams{
		PipelineID: pgtype.Int8{
			Int64: payload.PipeLineID,
			Valid: true,
		},
		DataBlockID: payload.DataBlockId,
		LlmID:       payload.LlmId,
	})
	if err != nil {
		return 0, err
	}
	return int64(newInputBlock.ID), nil
}

func (pg *pg) CreateDataBlock(ctx context.Context, payload models.CreateDataBlock) (int64, error) {
	newDataBlock, err := pg.Queries.CreateDataBlock(ctx, db.CreateDataBlockParams{
		InputBlockID:   IntToPgType(payload.InputBlockId),
		StorageUrl:     payload.Url,
		StorageType:    payload.Type,
		TextSplitterID: payload.TextSplitterId,
		VectorStoreID:  payload.VectorStoreId,
	})
	if err != nil {
		return 0, err
	}
	return int64(newDataBlock.ID), nil
}
func (pg *pg) CreateWidgetBlock(ctx context.Context, payload models.CreateWidgetBlock) (int64, error) {
	newWidgetBlock, err := pg.Queries.CreateWidgetBlock(ctx, db.CreateWidgetBlockParams{
		LlmBlockID: IntToPgType(payload.LlmId),
		ImageUrl:   payload.ImageUrl,
		Styles:     payload.Styles.(string),
	})
	if err != nil {
		return 0, err
	}
	return int64(newWidgetBlock.ID), nil
}
func (pg *pg) CreateTextSplitter(ctx context.Context, payload models.CreateTextSplitter) (int64, error) {
	newTextSplitter, err := pg.Queries.CreateTextSplitter(ctx, db.CreateTextSplitterParams{
		DataBlockID:  IntToPgType(payload.DataBlockID),
		SplitterType: payload.Type,
		Config:       payload.Config.(string),
	})
	if err != nil {
		return 0, err
	}
	return int64(newTextSplitter.ID), nil
}
func (pg *pg) CreateVectorStore(ctx context.Context, payload models.CreateVectorStore) (int64, error) {
	newVectorStore, err := pg.Queries.CreateVectorStore(ctx, db.CreateVectorStoreParams{
		DataBlockID:      IntToPgType(payload.DataBlockID),
		StoreType:        payload.Type,
		CollectionName:   payload.CollectionName,
		PersistDirectory: payload.PersistDirectory,
	})
	if err != nil {
		return 0, err
	}
	return int64(newVectorStore.ID), nil
}
func (pg *pg) CreateLLMBlock(ctx context.Context, payload models.CreateLLMBlock) (int64, error) {
	newLlmBlock, err := pg.Queries.CreateLlmBlock(ctx, db.CreateLlmBlockParams{
		InputBlockID:  IntToPgType(payload.InputBlockId),
		LlmType:       payload.Type,
		Model:         payload.Model,
		Endpoint:      payload.Endpoint,
		Prompt:        payload.Prompt,
		Template:      payload.Template,
		WidgetBlockID: payload.WidgetBlockId,
	})
	if err != nil {
		return 0, err
	}
	return int64(newLlmBlock.ID), nil
}
