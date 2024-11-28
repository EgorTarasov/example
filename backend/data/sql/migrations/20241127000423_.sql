-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';
CREATE TABLE IF NOT EXISTS pipelines(
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    pipeline_description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS input_blocks(
    id SERIAL PRIMARY KEY,
    pipeline_id BIGINT REFERENCES pipelines(id) ON DELETE CASCADE,
    data_block_id BIGINT NOT NULL,
    llm_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS llm_blocks(
    id SERIAL PRIMARY KEY,
    input_block_id BIGINT REFERENCES input_blocks(id) ON DELETE CASCADE,
    llm_endpoint TEXT NOT NULL,
    llm_type TEXT NOT NULL,
    model TEXT NOT NULL,
    prompt TEXT NOT NULL,
    template TEXT NOT NULL,
    widget_block_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS widget_blocks(
    id SERIAL PRIMARY KEY,
    llm_block_id BIGINT REFERENCES llm_blocks(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    styles JSON NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS data_blocks(
    id SERIAL PRIMARY KEY,
    input_block_id BIGINT REFERENCES input_blocks(id) ON DELETE CASCADE,
    storage_url TEXT NOT NULL,
    storage_type TEXT NOT NULL,
    text_splitter_id BIGINT NOT NULL,
    vector_store_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS text_splitters(
    id SERIAL PRIMARY KEY,
    data_block_id BIGINT REFERENCES data_blocks(id) ON DELETE CASCADE,
    splitter_type TEXT NOT NULL,
    config TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS vector_stores(
    id SERIAL PRIMARY KEY,
    data_block_id BIGINT REFERENCES data_blocks(id) ON DELETE CASCADE,
    store_type TEXT NOT NULL,
    collection_name TEXT NOT NULL,
    persist_directory TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';

DROP TABLE IF EXISTS text_splitters;
DROP TABLE IF EXISTS vector_stores;
DROP TABLE IF EXISTS widget_blocks;
DROP TABLE IF EXISTS data_blocks;
DROP TABLE IF EXISTS llm_blocks;
DROP TABLE IF EXISTS input_blocks;
DROP TABLE IF EXISTS pipelines;


-- +goose StatementEnd