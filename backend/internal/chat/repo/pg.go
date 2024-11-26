package repo

import (
	"context"

	"github.com/EgorTarasov/example/internal/chat/models"
	"github.com/EgorTarasov/example/pkg/db"
	"github.com/jackc/pgx/v5/pgxpool"
)

type pg struct {
	*db.Queries
	pool *pgxpool.Pool
}

func NewPgRepo(pool *pgxpool.Pool) ChatRepo {
	return &pg{
		Queries: db.New(pool),
		pool:    pool,
	}
}

func (repo *pg) CreateChat(ctx context.Context, userID int64, title string) (models.Chat, error) {
	return models.Chat{}, nil
}
func (repo *pg) SaveMessage(ctx context.Context, msg models.Message) error {

	return nil
}

func (repo *pg) ListMessages(ctx context.Context, userID int64) ([]models.Message, error) {
	var messages []models.Message

	return messages, nil
}
