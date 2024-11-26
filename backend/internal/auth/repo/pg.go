package repo

import (
	"context"

	"github.com/EgorTarasov/example/internal/auth"
	"github.com/EgorTarasov/example/internal/auth/models"
	"github.com/EgorTarasov/example/pkg/db"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog/log"
)

type pg struct {
	*db.Queries
	pool *pgxpool.Pool
}

func NewPgRepo(pool *pgxpool.Pool) UserRepo {
	return &pg{
		Queries: db.New(pool),
		pool:    pool,
	}
}

func (pg *pg) CreateUser(ctx context.Context, email string, password models.Password, roles ...auth.UserRole) (int64, error) {
	tx, err := pg.pool.Begin(ctx)
	if err != nil {
		return 0, err
	}
	defer tx.Rollback(ctx)

	u, err := pg.Queries.CreateUser(ctx, db.CreateUserParams{
		Email: email,
		PasswordHash: pgtype.Text{
			String: string(password),
			Valid:  true,
		},
	})
	if err != nil {
		return 0, err
	}

	if len(roles) > 0 {
		for _, role := range roles {
			// check if role exists in the database
			roleID, err := pg.Queries.GetRoleIdByName(ctx, string(role))
			if err != nil {
				log.Err(err).Msg("role not found")
				continue
			}
			_, err = pg.Queries.AssignRoleToUser(ctx, db.AssignRoleToUserParams{
				UserID: u.ID,
				RoleID: roleID,
			})
			if err != nil {
				log.Err(err).Str("role", string(role)).Msg("unable to assign role to user")
				continue
			}
		}
	}
	return int64(u.ID), tx.Commit(ctx)
}

func (pg *pg) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	u, err := pg.Queries.GetUserWithRoles(ctx, email)
	if err != nil {
		return nil, auth.ErrUserNotFound
	}
	return &models.User{
		ID:           int64(u.ID),
		Email:        u.Email,
		PasswordHash: models.Password(u.PasswordHash.String),
		CreatedAt:    u.CreatedAt.Time,
		UpdatedAt:    u.UpdatedAt.Time,
		Role:         auth.UserRole(u.Role.String),
	}, nil
}
