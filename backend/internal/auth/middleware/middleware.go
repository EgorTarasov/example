package middleware

import (
	"strings"

	"github.com/EgorTarasov/example/internal/auth"
	"github.com/EgorTarasov/example/internal/auth/models"
	"github.com/gofiber/fiber/v2"
)

// RoleMiddleware checks if the user has the required role
func RoleMiddleware(requiredRole auth.UserRole) fiber.Handler {
	return func(c *fiber.Ctx) error {
		authToken := c.Get("Authorization")
		if authToken == "" || len(strings.Split(authToken, " ")) != 2 {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "missing authToken",
			})
		}
		values := strings.Split(authToken, " ")
		token := models.AuthToken(values[1])
		userData, err := token.Decode()
		if err != nil || userData.Role != requiredRole {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "invalid authToken or insufficient role",
			})
		}

		c.Locals("userData", userData)

		return c.Next()
	}
}
