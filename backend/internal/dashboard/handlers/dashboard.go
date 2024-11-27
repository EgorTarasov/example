package handlers

import (
	"github.com/EgorTarasov/example/internal/dashboard/service"
	"github.com/gofiber/fiber/v2"
)

type handler struct {
	s service.Service
}

type Handler interface {
	CreatePipeline(*fiber.Ctx) error
	// CreateInputBlock(*fiber.Ctx) error
	// CreateDataBlock(*fiber.Ctx) error
	// CreateWidgetBlock(*fiber.Ctx) error
	// CreateTextSplitter(*fiber.Ctx) error
	// CreateVectorStore(*fiber.Ctx) error
	// CreatePipeLine(*fiber.Ctx) error
	// CreateLLMBlock(*fiber.Ctx) error
}

func NewHandler(s service.Service) Handler {
	return &handler{s}
}

func InitRoutes(api fiber.Router, view fiber.Router, h Handler) error {
	initApi(api, h)
	return nil
}

func initApi(api fiber.Router, h Handler) error {
	dashboard := api.Group("/dashboard")
	// dashboard.Post("/datablock", h.CreateDataBlock)
	// dashboard.Post("/inputblock", h.CreateInputBlock)
	dashboard.Post("/pipeline", h.CreatePipeline)
	// dashboard.Post("/widgetblock", h.CreateWidgetBlock)
	// dashboard.Post("/textsplitterblock", h.CreateTextSplitter)
	// dashboard.Post("/vectorstoreblock", h.CreateVectorStore)

	return nil
}
