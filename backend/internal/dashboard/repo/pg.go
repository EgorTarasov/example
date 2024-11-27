package repo

import (
	"context"

	"github.com/EgorTarasov/example/internal/dashboard/models"
	"github.com/EgorTarasov/example/pkg/db"
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

// func (pg *pg) CreateInputBlock(ctx context.Context, payload models.CreateInputBlock) (int64, error) {
// }
// func (pg *pg) CreateDataBlock(ctx context.Context, payload models.CreateDataBlock) (int64, error) {
// }
// func (pg *pg) CreateWidgetBlock(ctx context.Context, payload models.CreateWidgetBlock) (int64, error) {
// }
// func (pg *pg) CreateTextSplitter(ctx context.Context, payload models.CreateTextSplitter) (int64, error) {
// }
// func (pg *pg) CreateVectorStore(ctx context.Context, payload models.CreateVectorStore) (int64, error) {
// }
// func (pg *pg) CreateLLMBlock(ctx context.Context, payload models.CreateLLMBlock) (int64, error) {
// }
