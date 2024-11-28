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
	GetDashboardById(*fiber.Ctx) error

	CreatePipeline(*fiber.Ctx) error
	GetPipelineById(*fiber.Ctx) error

	CreateInputBlock(*fiber.Ctx) error
	CreateDataBlock(*fiber.Ctx) error
	CreateWidgetBlock(*fiber.Ctx) error
	CreateTextSplitter(*fiber.Ctx) error
	CreateVectorStore(*fiber.Ctx) error
	CreateLLMBlock(*fiber.Ctx) error

	DeleteInputBlock(*fiber.Ctx) error
	DeleteDataBlock(*fiber.Ctx) error
	DeleteWidgetBlock(*fiber.Ctx) error
	DeleteTextSplitter(*fiber.Ctx) error
	DeleteVectorStore(*fiber.Ctx) error
	DeleteLLMBlock(*fiber.Ctx) error

	UpdateInputBlock(*fiber.Ctx) error
	UpdateDataBlock(*fiber.Ctx) error
	UpdateWidgetBlock(*fiber.Ctx) error
	UpdateTextSplitter(*fiber.Ctx) error
	UpdateVectorStore(*fiber.Ctx) error
	UpdateLLMBlock(*fiber.Ctx) error
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
	pipeline.Delete("/", middleware.RoleMiddleware(auth.Admin), h.CreatePipeline)

	eachPipeline := pipeline.Group("/:id")

	eachPipeline.Get("/", h.GetPipelineById)
	eachPipeline.Post("/widgetblock", middleware.RoleMiddleware(auth.Admin), h.CreateWidgetBlock)
	eachPipeline.Post("/textsplitter", middleware.RoleMiddleware(auth.Admin), h.CreateTextSplitter)
	eachPipeline.Post("/vectorstore", middleware.RoleMiddleware(auth.Admin), h.CreateVectorStore)
	eachPipeline.Post("/llm", middleware.RoleMiddleware(auth.Admin), h.CreateLLMBlock)
	eachPipeline.Post("/datablock", middleware.RoleMiddleware(auth.Admin), h.CreateDataBlock)
	eachPipeline.Post("/inputblock", middleware.RoleMiddleware(auth.Admin), h.CreateInputBlock)

	eachPipeline.Delete("/widgetblock/:block_id", middleware.RoleMiddleware(auth.Admin), h.DeleteWidgetBlock)
	eachPipeline.Delete("/textsplitter/:block_id", middleware.RoleMiddleware(auth.Admin), h.DeleteTextSplitter)
	eachPipeline.Delete("/vectorstore/:block_id", middleware.RoleMiddleware(auth.Admin), h.DeleteVectorStore)
	eachPipeline.Delete("/llm/:block_id", middleware.RoleMiddleware(auth.Admin), h.DeleteLLMBlock)
	eachPipeline.Delete("/datablock/:block_id", middleware.RoleMiddleware(auth.Admin), h.DeleteDataBlock)
	eachPipeline.Delete("/inputblock/:block_id", middleware.RoleMiddleware(auth.Admin), h.DeleteInputBlock)

	eachPipeline.Put("/widgetblock/:block_id", middleware.RoleMiddleware(auth.Admin), h.UpdateWidgetBlock)
	eachPipeline.Put("/textsplitter/:block_id", middleware.RoleMiddleware(auth.Admin), h.UpdateTextSplitter)
	eachPipeline.Put("/vectorstore/:block_id", middleware.RoleMiddleware(auth.Admin), h.UpdateVectorStore)
	eachPipeline.Put("/llm/:block_id", middleware.RoleMiddleware(auth.Admin), h.UpdateLLMBlock)
	eachPipeline.Put("/datablock/:block_id", middleware.RoleMiddleware(auth.Admin), h.UpdateDataBlock)
	eachPipeline.Put("/inputblock/:block_id", middleware.RoleMiddleware(auth.Admin), h.UpdateInputBlock)

	return nil
}
