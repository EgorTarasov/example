package repo

import (
	"context"
	"encoding/json"

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
	v := pgtype.Int8{
		Int64: value,
		Valid: true,
	}
	return v
}

func NewNull() pgtype.Int8 {
	v := pgtype.Int8{
		Int64: 0,
		Valid: false,
	}
	return v

}

func (pg *pg) CreatePipeline(ctx context.Context, payload models.CreatePipeLine) (int64, error) {
	newPipeline, err := pg.Queries.CreatePipeLine(ctx, db.CreatePipeLineParams{
		UserID:              IntToPgType(payload.UserID),
		Title:               payload.Title,
		PipelineDescription: payload.Description,
	})
	if err != nil {
		return 0, err
	}
	return int64(newPipeline.ID), nil
}

func (pg *pg) GetDashboardById(ctx context.Context, id int64) ([]models.PipeLineDashboardDto, error) {
	dashboard, err := pg.Queries.GetDashboardById(ctx, IntToPgType(id))
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
	fullpipeline, err := pg.Queries.GetPipelineById(ctx, IntToPgType(id))
	pipeline := models.PipeLineDto{}
	if err != nil {
		return models.PipeLineDto{}, err
	}
	pipeline.Id = int64(fullpipeline.ID)
	pipeline.Title = fullpipeline.Title
	pipeline.Description = fullpipeline.PipelineDescription

	return pipeline, nil
}

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

	inputId := NewNull()

	if payload.InputBlockId != 0 {
		inputId = IntToPgType(payload.InputBlockId)
	}

	newDataBlock, err := pg.Queries.CreateDataBlock(ctx, db.CreateDataBlockParams{
		InputBlockID:   inputId,
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

	inputId := NewNull()

	if payload.LlmId != 0 {
		inputId = IntToPgType(payload.LlmId)
	}

	temp, err := json.Marshal(payload.Styles)
	if err != nil {
		return 0, err
	}

	newWidgetBlock, err := pg.Queries.CreateWidgetBlock(ctx, db.CreateWidgetBlockParams{
		LlmBlockID: inputId,
		ImageUrl:   payload.ImageUrl,
		Styles:     temp,
	})
	if err != nil {
		return 0, err
	}
	return int64(newWidgetBlock.ID), nil
}
func (pg *pg) CreateTextSplitter(ctx context.Context, payload models.CreateTextSplitter) (int64, error) {

	inputId := NewNull()

	if payload.DataBlockID != 0 {
		inputId = IntToPgType(payload.DataBlockID)
	}

	newTextSplitter, err := pg.Queries.CreateTextSplitter(ctx, db.CreateTextSplitterParams{
		DataBlockID:  inputId,
		SplitterType: payload.Type,
		Config:       payload.Config.(string),
	})
	if err != nil {
		return 0, err
	}
	return int64(newTextSplitter.ID), nil
}
func (pg *pg) CreateVectorStore(ctx context.Context, payload models.CreateVectorStore) (int64, error) {

	inputId := NewNull()

	if payload.DataBlockID != 0 {
		inputId = IntToPgType(payload.DataBlockID)
	}

	newVectorStore, err := pg.Queries.CreateVectorStore(ctx, db.CreateVectorStoreParams{
		DataBlockID:      inputId,
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

	inputId := NewNull()

	if payload.InputBlockId != 0 {
		inputId = IntToPgType(payload.InputBlockId)
	}

	newLlmBlock, err := pg.Queries.CreateLlmBlock(ctx, db.CreateLlmBlockParams{
		InputBlockID:  inputId,
		LlmType:       payload.Type,
		Model:         payload.Model,
		LlmEndpoint:   payload.Endpoint,
		Prompt:        payload.Prompt,
		Template:      payload.Template,
		WidgetBlockID: payload.WidgetBlockId,
	})
	if err != nil {
		return 0, err
	}
	return int64(newLlmBlock.ID), nil
}
