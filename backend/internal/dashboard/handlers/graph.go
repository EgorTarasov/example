package handlers

import (
	"github.com/EgorTarasov/example/internal/dashboard/models"
	"github.com/gofiber/fiber/v2"
)

func (h *handler) CreatePipeline(c *fiber.Ctx) error {
	var payload models.CreatePipeLine
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}

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
