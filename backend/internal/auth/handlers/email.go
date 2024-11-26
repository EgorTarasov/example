package handlers

import (
	"github.com/EgorTarasov/example/internal/auth/models"
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
)

type emailPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// RegisterWithEmail godoc
//
//	создание аккаунта с использованием почти как метода авторизации
//
// @Summary Register with email
// @Description Register a new user with email and password
// @Tags auth
// @Param  payload body emailPayload true "Email Payload"
// @Accept  json
// @Produce  json
// @Success 200 {object} models.AccessTokenResponse
// @Failure 400
// @Failure 422
// @Router /api/auth/register [post]
func (h *handler) RegisterWithEmail(c *fiber.Ctx) error {
	var payload emailPayload

	if err := c.BodyParser(&payload); err != nil {
		return c.SendStatus(fiber.StatusUnprocessableEntity)
	}

	token, err := h.s.CreateEmailAccount(c.Context(), models.CreateUser{
		Email:    payload.Email,
		Password: payload.Password,
	})
	if err != nil {
		log.Err(err).Interface("data", payload).Msg("unable to create account for")
		return c.SendStatus(fiber.StatusBadRequest)
	}
	return c.JSON(models.NewAccessTokenResponse(token))
}

type emailLoginPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginWithEmail godoc
//
// @Summary Login with email
// @Description Login a user with email and password
// @Tags auth
// @Accept  json
// @Produce  json
// @Param   emailLoginPayload body emailLoginPayload true "Email Login Payload"
// @Success 200 {object} map[string]interface{}
// @Failure 400
// @Failure 422
// @Router /api/auth/login [post]
func (h *handler) LoginWithEmail(c *fiber.Ctx) error {
	var payload emailLoginPayload

	if err := c.BodyParser(&payload); err != nil {
		return c.SendStatus(fiber.StatusUnprocessableEntity)
	}

	token, err := h.s.AuthWithEmail(c.Context(), models.LoginData{
		Email:    payload.Email,
		Password: payload.Password,
	})
	if err != nil {
		log.Err(err).Interface("data", payload).Msg("unable to create account for")
		return c.SendStatus(fiber.StatusBadRequest)
	}
	return c.JSON(fiber.Map{"access_token": token, "type": "Bearer"})
}

// MeEndpoint godoc
//
// @Summary Get user information
// @Description Get the information of the authenticated user
// @Tags auth
// @Produce  json
// @Success 200 {object} models.UserData
// @Router /api/auth/me [get]
func (h *handler) MeEndpoint(c *fiber.Ctx) error {
	user := c.Locals("userData").(models.UserData)
	return c.JSON(user)
}
