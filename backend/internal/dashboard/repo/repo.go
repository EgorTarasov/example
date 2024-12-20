package repo

import (
	"context"

	"github.com/EgorTarasov/example/internal/dashboard/models"
)

type GraphRepo interface {
	CreatePipeline(ctx context.Context, payload models.CreatePipeLine) (int64, error)
	GetDashboardById(ctx context.Context, id int64) ([]models.PipeLineDashboardDto, error)
	GetPipelineById(ctx context.Context, id int64) (models.PipeLineDto, error)
	CreateInputBlock(ctx context.Context, payload models.CreateInputBlock) (int64, error)
	CreateDataBlock(ctx context.Context, payload models.CreateDataBlock) (int64, error)
	CreateWidgetBlock(ctx context.Context, payload models.CreateWidgetBlock) (int64, error)
	CreateTextSplitter(ctx context.Context, payload models.CreateTextSplitter) (int64, error)
	CreateVectorStore(ctx context.Context, payload models.CreateVectorStore) (int64, error)
	CreateLLMBlock(ctx context.Context, payload models.CreateLLMBlock) (int64, error)

	DeleteInputBlock(ctx context.Context, id int64) error
	DeleteDataBlock(ctx context.Context, id int64) error
	DeleteWidgetBlock(ctx context.Context, id int64) error
	DeleteTextSplitter(ctx context.Context, id int64) error
	DeleteVectorStore(ctx context.Context, id int64) error
	DeleteLLMBlock(ctx context.Context, id int64) error

	UpdateInputBlock(ctx context.Context, id int64, payload models.CreateInputBlock) error
	UpdateDataBlock(ctx context.Context, id int64, payload models.CreateDataBlock) error
	UpdateWidgetBlock(ctx context.Context, id int64, payload models.CreateWidgetBlock) error
	UpdateTextSplitter(ctx context.Context, id int64, payload models.CreateTextSplitter) error
	UpdateVectorStore(ctx context.Context, id int64, payload models.CreateVectorStore) error
	UpdateLLMBlock(ctx context.Context, id int64, payload models.CreateLLMBlock) error
}
