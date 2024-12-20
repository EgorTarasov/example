package handlers

import (
	"strconv"

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

func (h *handler) GetPipelineById(c *fiber.Ctx) error {

	idStr := c.Params("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}

	pipelineDto, err := h.s.GetPipelineById(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	pipeline := pipelineDto.ToPipeLine()
	return c.JSON(pipeline)

}

// CreatePipeline godoc
// @Summary Create a new input block
// @Description Create a new input block for the authenticated user
// @Tags pipelines
// @Accept json
// @Produce json
// @Param payload body models.CreateInputBlock true "Create Input Block Payload"
// @Success 201 {object} map[string]interface{} "id"
// @Failure 400 {object} map[string]interface{} "error"
// @Failure 500 {object} map[string]interface{} "error"
// @Router /api/dashboard/inputblock [post]
// @Security BearerAuth
func (h *handler) CreateInputBlock(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}
	var payload models.CreateInputBlock
	payload.PipeLineID = id
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}

	id, err = h.s.CreateInputBlock(c.Context(), payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"id": id})
}

// CreatePipeline godoc
// @Summary Create a new input block
// @Description Create a new input block for the authenticated user
// @Tags pipelines
// @Accept json
// @Produce json
// @Param payload body models.CreateInputBlock true "Create Input Block Payload"
// @Success 201 {object} map[string]interface{} "id"
// @Failure 400 {object} map[string]interface{} "error"
// @Failure 500 {object} map[string]interface{} "error"
// @Router /api/dashboard/inputblock [post]
// @Security BearerAuth
func (h *handler) CreateDataBlock(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}
	var payload models.CreateDataBlock
	payload.PipeLineID = id
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}

	id, err = h.s.CreateDataBlock(c.Context(), payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"id": id})
}

// CreatePipeline godoc
// @Summary Create a new input block
// @Description Create a new input block for the authenticated user
// @Tags pipelines
// @Accept json
// @Produce json
// @Param payload body models.CreateInputBlock true "Create Input Block Payload"
// @Success 201 {object} map[string]interface{} "id"
// @Failure 400 {object} map[string]interface{} "error"
// @Failure 500 {object} map[string]interface{} "error"
// @Router /api/dashboard/inputblock [post]
// @Security BearerAuth
func (h *handler) CreateWidgetBlock(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}
	var payload models.CreateWidgetBlock
	payload.PipeLineID = id
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}

	id, err = h.s.CreateWidgetBlock(c.Context(), payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"id": id})
}

func (h *handler) CreateTextSplitter(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}
	var payload models.CreateTextSplitter
	payload.PipeLineID = id

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}

	id, err = h.s.CreateTextSplitter(c.Context(), payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"id": id})
}

func (h *handler) CreateVectorStore(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}
	var payload models.CreateVectorStore
	payload.PipeLineID = id

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}

	id, err = h.s.CreateVectorStore(c.Context(), payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"id": id})
}

func (h *handler) CreateLLMBlock(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}
	var payload models.CreateLLMBlock
	payload.PipeLineID = id

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}

	id, err = h.s.CreateLLMBlock(c.Context(), payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"id": id})
}

func (h *handler) DeleteInputBlock(c *fiber.Ctx) error {
	idStr := c.Params("block_id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}

	err = h.s.DeleteInputBlock(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return nil
}

func (h *handler) DeleteDataBlock(c *fiber.Ctx) error {
	idStr := c.Params("block_id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}

	err = h.s.DeleteDataBlock(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return nil
}

func (h *handler) DeleteWidgetBlock(c *fiber.Ctx) error {
	idStr := c.Params("block_id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}

	err = h.s.DeleteWidgetBlock(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return nil
}

func (h *handler) DeleteTextSplitter(c *fiber.Ctx) error {
	idStr := c.Params("block_id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}

	err = h.s.DeleteTextSplitter(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return nil
}

func (h *handler) DeleteVectorStore(c *fiber.Ctx) error {
	idStr := c.Params("block_id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}

	err = h.s.DeleteVectorStore(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return nil
}

func (h *handler) DeleteLLMBlock(c *fiber.Ctx) error {
	idStr := c.Params("block_id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}

	err = h.s.DeleteLLMBlock(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return nil
}

func (h *handler) UpdateInputBlock(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}
	var payload models.CreateInputBlock
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}

	payload.PipeLineID = id

	idBlockStr := c.Params("block_id")
	idBlock, err := strconv.ParseInt(idBlockStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}

	err = h.s.UpdateInputBlock(c.Context(), idBlock, payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return nil
}

func (h *handler) UpdateDataBlock(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}
	var payload models.CreateDataBlock
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}

	payload.PipeLineID = id

	idBlockStr := c.Params("block_id")
	idBlock, err := strconv.ParseInt(idBlockStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}

	err = h.s.UpdateDataBlock(c.Context(), idBlock, payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return nil
}

func (h *handler) UpdateWidgetBlock(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}
	var payload models.CreateWidgetBlock
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}

	payload.PipeLineID = id

	idBlockStr := c.Params("block_id")
	idBlock, err := strconv.ParseInt(idBlockStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}

	err = h.s.UpdateWidgetBlock(c.Context(), idBlock, payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return nil
}

func (h *handler) UpdateLLMBlock(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}
	var payload models.CreateLLMBlock
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}

	payload.PipeLineID = id

	idBlockStr := c.Params("block_id")
	idBlock, err := strconv.ParseInt(idBlockStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}

	err = h.s.UpdateLLMBlock(c.Context(), idBlock, payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return nil
}

func (h *handler) UpdateTextSplitter(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}
	var payload models.CreateTextSplitter
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}

	payload.PipeLineID = id

	idBlockStr := c.Params("block_id")
	idBlock, err := strconv.ParseInt(idBlockStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}

	err = h.s.UpdateTextSplitter(c.Context(), idBlock, payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return nil
}

func (h *handler) UpdateVectorStore(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}
	var payload models.CreateVectorStore
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid payload"})
	}

	payload.PipeLineID = id

	idBlockStr := c.Params("block_id")
	idBlock, err := strconv.ParseInt(idBlockStr, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid id"})
	}

	err = h.s.UpdateVectorStore(c.Context(), idBlock, payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return nil
}
