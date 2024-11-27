package handlers

import (
	authModels "github.com/EgorTarasov/example/internal/auth/models"
	"github.com/EgorTarasov/example/internal/dashboard/models"
	"github.com/gofiber/fiber/v2"
)

// CreatePipeline godoc
// @Summary Create a new pipeline
// @Description Create a new pipeline for the authenticated user
// @Tags pipelines
// @Accept json
// @Produce json
// @Param payload body models.CreatePipeLine true "Create Pipeline Payload"
// @Success 201 {object} map[string]interface{} "id"
// @Failure 400 {object} map[string]interface{} "error"
// @Failure 500 {object} map[string]interface{} "error"
// @Router /api/dashboard/pipeline [post]
// @Security BearerAuth
func (h *handler) CreatePipeline(c *fiber.Ctx) error {
	userData := c.Locals("userData").(authModels.UserData)

	var payload models.CreatePipeLine
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}
	payload.UserID = userData.UserID

	id, err := h.s.CreatePipeline(c.Context(), payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"id": id})
}

// GetDashboardById godoc
// @Summary Retrieve a dashboard by its ID
// @Description Retrieve a specific dashboard for the authenticated user using its ID
// @Tags dashboards
// @Accept json
// @Produce json
// @Success 200 {object} []models.PipeLineDashboardDto "Dashboard details"
// @Failure 400 {object} map[string]interface{} "error"
// @Failure 500 {object} map[string]interface{} "error"
// @Router /api/dashboard/ [get]
// @Security BearerAuth
func (h *handler) GetDashboardById(c *fiber.Ctx) error {

	userData := c.Locals("userData").(authModels.UserData)

	id := userData.UserID
	dashboard, err := h.s.GetDashboardById(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(dashboard)

}

// func (h *handler) GetPipelineById(c *fiber.Ctx) error {

// 	idStr := c.Params("id")
// 	id, err := strconv.ParseInt(idStr, 10, 64)
// 	if err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
// 	}

// 	pipelineDto, err := h.s.GetPipelineById(c.Context(), id)
// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
// 	}
// 	pipeline := pipelineDto.ToPipeLine()
// 	return c.JSON(pipeline)

// }

// func (h *handler) CreateInputBlock(c *fiber.Ctx) error {
// 	var payload models.CreateInputBlock
// 	if err := c.BodyParser(&payload); err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
// 	}

// 	id, err := h.s.CreateInputBlock(c.Context(), payload)
// 	if err := c.BodyParser(&payload); err != nil {
// 		return c.SendStatus(fiber.StatusUnprocessableEntity)
// 	}
// 	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"id": id})

// }

// func (h *handler) CreateDataBlock(c *fiber.Ctx) error {
// 	var payload models.CreateDataBlock
// 	if err := c.BodyParser(&payload); err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
// 	}

// 	id, err := h.s.CreateDataBlock(c.Context(), payload)

// 	if err := c.BodyParser(&payload); err != nil {
// 		return c.SendStatus(fiber.StatusUnprocessableEntity)
// 	}
// 	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"id": id})

// }

// func (h *handler) CreateWidgetBlock(c *fiber.Ctx) error {
// 	var (
// 		payload  models.CreateWidgetBlock
// 		response models.WidgetBlockDto
// 	)

// 	if err := c.BodyParser(&payload); err != nil {
// 		return c.SendStatus(fiber.StatusUnprocessableEntity)
// 	}
// 	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"id": id})

// }

// func (h *handler) CreateTextSplitter(c *fiber.Ctx) error {
// 	var (
// 		payload  models.CreateWidgetBlock
// 		response models.WidgetBlockDto
// 	)

// 	if err := c.BodyParser(&payload); err != nil {
// 		return c.SendStatus(fiber.StatusUnprocessableEntity)
// 	}
// 	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"id": id})

// }

// func (h *handler) CreateVectorStore(c *fiber.Ctx) error {
// 	var (
// 		payload  models.CreateWidgetBlock
// 		response models.WidgetBlockDto
// 	)

// 	if err := c.BodyParser(&payload); err != nil {
// 		return c.SendStatus(fiber.StatusUnprocessableEntity)
// 	}
// 	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"id": id})

// }

// func (h *handler) CreateLLMBlock(c *fiber.Ctx) error {
// 	var (
// 		payload  models.CreateLLMBlock
// 		response models.LLMDto
// 	)

// 	if err := c.BodyParser(&payload); err != nil {
// 		return c.SendStatus(fiber.StatusUnprocessableEntity)
// 	}
// 	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"id": id})

// }
