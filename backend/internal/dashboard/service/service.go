package service

import (
	"context"

	"github.com/EgorTarasov/example/internal/dashboard/models"
	"github.com/EgorTarasov/example/internal/dashboard/repo"
)

type service struct {
	graph repo.GraphRepo
}

type Service interface {
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
}

func New(graphRepo repo.GraphRepo) Service {
	return &service{
		graph: graphRepo,
	}
}

func (s *service) CreatePipeline(ctx context.Context, payload models.CreatePipeLine) (int64, error) {
	return s.graph.CreatePipeline(ctx, payload)
}

func (s *service) GetDashboardById(ctx context.Context, id int64) ([]models.PipeLineDashboardDto, error) {
	return s.graph.GetDashboardById(ctx, id)
}

func (s *service) GetPipelineById(ctx context.Context, id int64) (models.PipeLineDto, error) {
	return s.graph.GetPipelineById(ctx, id)
}

func (s *service) CreateDataBlock(ctx context.Context, payload models.CreateDataBlock) (int64, error) {
	return s.graph.CreateDataBlock(ctx, payload)
}

func (s *service) CreateInputBlock(ctx context.Context, payload models.CreateInputBlock) (int64, error) {
	return s.graph.CreateInputBlock(ctx, payload)
}
func (s *service) CreateWidgetBlock(ctx context.Context, payload models.CreateWidgetBlock) (int64, error) {
	return s.graph.CreateWidgetBlock(ctx, payload)
}
func (s *service) CreateTextSplitter(ctx context.Context, payload models.CreateTextSplitter) (int64, error) {
	return s.graph.CreateTextSplitter(ctx, payload)
}

func (s *service) CreateVectorStore(ctx context.Context, payload models.CreateVectorStore) (int64, error) {
	return s.graph.CreateVectorStore(ctx, payload)
}

func (s *service) CreateLLMBlock(ctx context.Context, payload models.CreateLLMBlock) (int64, error) {
	return s.graph.CreateLLMBlock(ctx, payload)
}

func (s *service) DeleteDataBlock(ctx context.Context, id int64) error {
	return s.graph.DeleteDataBlock(ctx, id)
}

func (s *service) DeleteInputBlock(ctx context.Context, id int64) error {
	return s.graph.DeleteInputBlock(ctx, id)
}
func (s *service) DeleteWidgetBlock(ctx context.Context, id int64) error {
	return s.graph.DeleteWidgetBlock(ctx, id)
}
func (s *service) DeleteTextSplitter(ctx context.Context, id int64) error {
	return s.graph.DeleteTextSplitter(ctx, id)
}

func (s *service) DeleteVectorStore(ctx context.Context, id int64) error {
	return s.graph.DeleteVectorStore(ctx, id)
}

func (s *service) DeleteLLMBlock(ctx context.Context, id int64) error {
	return s.graph.DeleteLLMBlock(ctx, id)
}
