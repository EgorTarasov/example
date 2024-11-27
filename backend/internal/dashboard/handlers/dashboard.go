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

	eachPipeline.Delete("/widgetblock/:id", middleware.RoleMiddleware(auth.Admin), h.DeleteWidgetBlock)
	eachPipeline.Delete("/textsplitter/:id", middleware.RoleMiddleware(auth.Admin), h.DeleteTextSplitter)
	eachPipeline.Delete("/vectorstore/:id", middleware.RoleMiddleware(auth.Admin), h.DeleteVectorStore)
	eachPipeline.Delete("/llm/:id", middleware.RoleMiddleware(auth.Admin), h.DeleteLLMBlock)
	eachPipeline.Delete("/datablock/:id", middleware.RoleMiddleware(auth.Admin), h.DeleteDataBlock)
	eachPipeline.Delete("/inputblock/:id", middleware.RoleMiddleware(auth.Admin), h.DeleteInputBlock)

	// eachPipeline.Put("/widgetblock", middleware.RoleMiddleware(auth.Admin), h.PutWidgetBlock)
	// eachPipeline.Put("/textsplitter", middleware.RoleMiddleware(auth.Admin), h.PutTextSplitter)
	// eachPipeline.Put("/vectorstore", middleware.RoleMiddleware(auth.Admin), h.PutVectorStore)
	// eachPipeline.Put("/llm", middleware.RoleMiddleware(auth.Admin), h.PutLLMBlock)
	// eachPipeline.Put("/datablock", middleware.RoleMiddleware(auth.Admin), h.PutDataBlock)
	// eachPipeline.Put("/inputblock", middleware.RoleMiddleware(auth.Admin), h.PutInputBlock)

	return nil
}
