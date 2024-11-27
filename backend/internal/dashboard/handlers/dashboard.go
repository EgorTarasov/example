package handlers

import (
	"github.com/EgorTarasov/example/internal/auth"
	"github.com/EgorTarasov/example/internal/auth/middleware"
	"github.com/EgorTarasov/example/internal/dashboard/service"
	"github.com/gofiber/fiber/v2"
)

type handler struct {
	s service.Service
}

type Handler interface {
	CreatePipeline(*fiber.Ctx) error
	GetDashboardById(*fiber.Ctx) error
	GetPipelineById(*fiber.Ctx) error
	CreateInputBlock(*fiber.Ctx) error
	CreateDataBlock(*fiber.Ctx) error
	CreateWidgetBlock(*fiber.Ctx) error
	CreateTextSplitter(*fiber.Ctx) error
	CreateVectorStore(*fiber.Ctx) error
	CreateLLMBlock(*fiber.Ctx) error
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
	dashboard.Post("/datablock", h.CreateDataBlock)
	dashboard.Post("/inputblock", h.CreateInputBlock)

	pipeline := dashboard.Group("/pipeline")
	pipeline.Post("/", middleware.RoleMiddleware(auth.Admin), h.CreatePipeline)

	pipeline.Get("/", middleware.RoleMiddleware(auth.Admin), h.GetDashboardById)

	eachPipeline := pipeline.Group("/:id")

	eachPipeline.Get("/", middleware.RoleMiddleware(auth.Admin), h.GetPipelineById)
	eachPipeline.Post("/widgetblock", h.CreateWidgetBlock)
	eachPipeline.Post("/textsplitter", h.CreateTextSplitter)
	eachPipeline.Post("/vectorstore", h.CreateVectorStore)
	eachPipeline.Post("/llm", h.CreateLLMBlock)

	return nil
}
