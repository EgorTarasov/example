package repo

import (
	"context"

	"github.com/EgorTarasov/example/internal/auth"
	"github.com/EgorTarasov/example/internal/auth/models"
)

type UserRepo interface {
	CreateUser(ctx context.Context, email string, password models.Password, roles ...auth.UserRole) (int64, error)
	GetUserByEmail(ctx context.Context, email string) (*models.User, error)
}
