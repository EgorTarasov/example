-- SQLBook: Code
-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';
CREATE TABLE IF NOT EXISTS telegram_data(
    telegram_id BIGINT PRIMARY KEY NOT NULL,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    username TEXT,
    first_name TEXT,
    last_name TEXT,
    language_code TEXT,
    last_activity TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL
);
CREATE INDEX IF NOT EXISTS telegram_data_user_id_idx ON telegram_data(user_id);
-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
DROP TABLE IF EXISTS telegram_data;
-- +goose StatementEnd