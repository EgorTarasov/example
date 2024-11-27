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
	dashboard.Get("/", middleware.RoleMiddleware(auth.Admin), h.GetDashboardById)

	pipeline := dashboard.Group("/pipeline")
	pipeline.Post("/", middleware.RoleMiddleware(auth.Admin), h.CreatePipeline)

	eachPipeline := pipeline.Group("/:id")

	eachPipeline.Get("/", h.GetPipelineById)
	eachPipeline.Post("/widgetblock", middleware.RoleMiddleware(auth.Admin), h.CreateWidgetBlock)
	eachPipeline.Post("/textsplitter", middleware.RoleMiddleware(auth.Admin), h.CreateTextSplitter)
	eachPipeline.Post("/vectorstore", middleware.RoleMiddleware(auth.Admin), h.CreateVectorStore)
	eachPipeline.Post("/llm", middleware.RoleMiddleware(auth.Admin), h.CreateLLMBlock)
	eachPipeline.Post("/datablock", middleware.RoleMiddleware(auth.Admin), h.CreateDataBlock)
	eachPipeline.Post("/inputblock", middleware.RoleMiddleware(auth.Admin), h.CreateInputBlock)

	return nil
}
