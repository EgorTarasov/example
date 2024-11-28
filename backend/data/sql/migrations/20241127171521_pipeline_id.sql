-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';
-- +goose StatementEnd
ALTER TABLE data_blocks ADD pipeline_id BIGINT;
ALTER TABLE widget_blocks ADD pipeline_id BIGINT;
ALTER TABLE llm_blocks ADD pipeline_id BIGINT;
ALTER TABLE vector_stores ADD pipeline_id BIGINT;
ALTER TABLE text_splitters ADD pipeline_id BIGINT;

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
