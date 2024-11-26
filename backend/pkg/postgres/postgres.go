package postgres

import (
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

func InitPostgres(ctx context.Context, cfg *Config) (*pgxpool.Pool, error) {
	if cfg == nil {
		return nil, errors.New("invalid config for postgres")
	}
	pool, err := pgxpool.New(ctx, cfg.Dsn)
	if err != nil {
		return nil, err
	}
	if err := pool.Ping(ctx); err != nil {
		return nil, fmt.Errorf("unable to connect to pg %s", cfg.Dsn)

	}
	return pool, nil
}
