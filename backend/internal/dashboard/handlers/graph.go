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
// @Router /api/dashboard/pipelines [post]
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
