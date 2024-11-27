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
	// CreateInputBlock(ctx context.Context, payload models.CreateInputBlock) (int64, error)
	// CreateDataBlock(ctx context.Context, payload models.CreateDataBlock) (int64, error)
	// CreateWidgetBlock(ctx context.Context, payload models.CreateWidgetBlock) (int64, error)
	// CreateTextSplitter(ctx context.Context, payload models.CreateTextSplitter) (int64, error)
	// CreateVectorStore(ctx context.Context, payload models.CreateVectorStore) (int64, error)
	// CreateLLMBlock(ctx context.Context, payload models.CreateLLMBlock) (int64, error)
}

func New(graphRepo repo.GraphRepo) Service {
	return &service{
		graph: graphRepo,
	}
}

func (s *service) CreatePipeline(ctx context.Context, payload models.CreatePipeLine) (int64, error) {
	return s.graph.CreatePipeline(ctx, payload)
}

// func (s *service) CreateDataBlock(ctx context.Context, payload models.CreateDataBlock) (int64, error) {
// 	return s.graph.CreateDataBlock(ctx, payload)
// }

// func (s *service) CreateInputBlock(ctx context.Context, payload models.CreateInputBlock) (int64, error) {
// 	return s.graph.CreateInputBlock(ctx, payload)
// }
// func (s *service) CreateWidgetBlock(ctx context.Context, payload models.CreateWidgetBlock) (int64, error) {
// 	return s.graph.CreateWidgetBlock(ctx, payload)
// }
// func (s *service) CreateTextSplitter(ctx context.Context, payload models.CreateTextSplitter) (int64, error) {
// 	return s.graph.CreateTextSplitter(ctx, payload)
// }

// func (s *service) CreateVectorStore(ctx context.Context, payload models.CreateVectorStore) (int64, error) {
// 	return s.graph.CreateVectorStore(ctx, payload)
// }

// func (s *service) CreateLLMBlock(ctx context.Context, payload models.CreateLLMBlock) (int64, error) {
// 	return s.graph.CreateLLMBlock(ctx, payload)
// }
