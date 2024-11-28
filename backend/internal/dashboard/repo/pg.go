package repo

import (
	"context"
	"encoding/json"

	"github.com/EgorTarasov/example/internal/dashboard/models"
	"github.com/EgorTarasov/example/pkg/db"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type pg struct {
	*db.Queries
	pool *pgxpool.Pool
}

func NewPgRepo(pool *pgxpool.Pool) GraphRepo {
	return &pg{
		Queries: db.New(pool),
		pool:    pool,
	}
}

func IntToPgType(value int64) pgtype.Int8 {
	v := pgtype.Int8{
		Int64: value,
		Valid: true,
	}
	return v
}

func NewNull() pgtype.Int8 {
	v := pgtype.Int8{
		Int64: 0,
		Valid: false,
	}
	return v

}

func (pg *pg) CreatePipeline(ctx context.Context, payload models.CreatePipeLine) (int64, error) {
	newPipeline, err := pg.Queries.CreatePipeLine(ctx, db.CreatePipeLineParams{
		UserID:              IntToPgType(payload.UserID),
		Title:               payload.Title,
		PipelineDescription: payload.Description,
	})
	if err != nil {
		return 0, err
	}
	return int64(newPipeline.ID), nil
}

func (pg *pg) GetDashboardById(ctx context.Context, id int64) ([]models.PipeLineDashboardDto, error) {
	dashboard, err := pg.Queries.GetDashboardById(ctx, IntToPgType(id))
	dashboardPipelines := []models.PipeLineDashboardDto{}
	if err != nil {
		return []models.PipeLineDashboardDto{}, err
	}
	for i := range dashboard {
		dashboardPipelines = append(dashboardPipelines, models.PipeLineDashboardDto{
			Id:          int64(dashboard[i].ID),
			Title:       dashboard[i].Title,
			Description: dashboard[i].PipelineDescription,
		})
	}
	return dashboardPipelines, nil
}

func (pg *pg) GetPipelineById(ctx context.Context, id int64) (models.PipeLineDto, error) {
	pipeline := models.PipeLineDto{}

	inputblocks, err := pg.Queries.GetInputBlocksById(ctx, IntToPgType(id))
	if err != nil {
		return models.PipeLineDto{}, err
	}

	for i := range inputblocks {
		pipeline.InputBlocks = append(pipeline.InputBlocks, models.InputBlockDto{
			Id:          int64(inputblocks[i].ID),
			DataBlockID: inputblocks[i].DataBlockID,
			PipeLineID:  inputblocks[i].PipelineID.Int64,
			LLMID:       inputblocks[i].LlmID,
			CreatedAt:   inputblocks[i].CreatedAt.Time.String(),
			UpdateAt:    inputblocks[i].CreatedAt.Time.String(),
		})
	}

	datablocks, err := pg.Queries.GetDataBlocksById(ctx, IntToPgType(id))
	if err != nil {
		return models.PipeLineDto{}, err
	}
	for i := range datablocks {
		pipeline.DataBlocks = append(pipeline.DataBlocks, models.DataBlockDto{
			Id:             int64(datablocks[i].ID),
			Type:           datablocks[i].StorageType,
			Url:            datablocks[i].StorageUrl,
			TextSplitterID: datablocks[i].TextSplitterID,
		})
	}

	widgetblocks, err := pg.Queries.GetWidgetBlocksById(ctx, IntToPgType(id))
	if err != nil {
		return models.PipeLineDto{}, err
	}
	for i := range widgetblocks {
		pipeline.Widgets = append(pipeline.Widgets, models.WidgetBlockDto{
			Id:       int64(datablocks[i].ID),
			Styles:   widgetblocks[i].Styles,
			ImageUrl: widgetblocks[i].ImageUrl,
		})
	}

	llms, err := pg.Queries.GetLlmBlocksById(ctx, IntToPgType(id))
	if err != nil {
		return models.PipeLineDto{}, err
	}
	for i := range llms {
		pipeline.LLMs = append(pipeline.LLMs, models.LLMDto{
			Id:            int64(llms[i].ID),
			Type:          llms[i].LlmType,
			Endpoint:      llms[i].LlmEndpoint,
			Model:         llms[i].Model,
			Prompt:        llms[i].Prompt,
			Template:      llms[i].Template,
			WidgetBlockID: llms[i].WidgetBlockID,
		})
	}

	vectorstores, err := pg.Queries.GetVectorStoresById(ctx, IntToPgType(id))
	if err != nil {
		return models.PipeLineDto{}, err
	}
	for i := range vectorstores {
		pipeline.VectorStores = append(pipeline.VectorStores, models.VectorStoreDto{
			Id:             int64(vectorstores[i].ID),
			Type:           vectorstores[i].StoreType,
			CollectionName: vectorstores[i].CollectionName,
		})
	}

	textsplitters, err := pg.Queries.GetTextSplittersById(ctx, IntToPgType(id))
	if err != nil {
		return models.PipeLineDto{}, err
	}
	for i := range textsplitters {
		pipeline.TextSplitters = append(pipeline.TextSplitters, models.TextSplitterDto{
			Id:          int64(textsplitters[i].ID),
			Type:        textsplitters[i].SplitterType,
			Config:      textsplitters[i].Config,
			DataBlockID: textsplitters[i].DataBlockID.Int64,
		})
	}

	pipelineInfo, err := pg.Queries.GetPipelineInfoById(ctx, int32(id))
	if err != nil {
		return models.PipeLineDto{}, err
	}
	pipeline.Id = int64(pipelineInfo.ID)
	pipeline.Title = pipelineInfo.Title
	pipeline.Description = pipelineInfo.PipelineDescription

	return pipeline, nil
}

func (pg *pg) CreateInputBlock(ctx context.Context, payload models.CreateInputBlock) (int64, error) {

	newInputBlock, err := pg.Queries.CreateInputBlock(ctx, db.CreateInputBlockParams{
		PipelineID: pgtype.Int8{
			Int64: payload.PipeLineID,
			Valid: true,
		},
		DataBlockID: payload.DataBlockId,
		LlmID:       payload.LlmId,
	})
	if err != nil {
		return 0, err
	}
	return int64(newInputBlock.ID), nil
}

func (pg *pg) CreateDataBlock(ctx context.Context, payload models.CreateDataBlock) (int64, error) {

	inputId := NewNull()

	if payload.InputBlockId != 0 {
		inputId = IntToPgType(payload.InputBlockId)
	}

	newDataBlock, err := pg.Queries.CreateDataBlock(ctx, db.CreateDataBlockParams{
		PipelineID:     IntToPgType(payload.PipeLineID),
		InputBlockID:   inputId,
		StorageUrl:     payload.Url,
		StorageType:    payload.Type,
		TextSplitterID: payload.TextSplitterId,
		VectorStoreID:  payload.VectorStoreId,
	})
	if err != nil {
		return 0, err
	}
	return int64(newDataBlock.ID), nil
}
func (pg *pg) CreateWidgetBlock(ctx context.Context, payload models.CreateWidgetBlock) (int64, error) {

	inputId := NewNull()

	if payload.LlmId != 0 {
		inputId = IntToPgType(payload.LlmId)
	}

	temp, err := json.Marshal(payload.Styles)
	if err != nil {
		return 0, err
	}

	newWidgetBlock, err := pg.Queries.CreateWidgetBlock(ctx, db.CreateWidgetBlockParams{
		PipelineID: IntToPgType(payload.PipeLineID),
		LlmBlockID: inputId,
		ImageUrl:   payload.ImageUrl,
		Styles:     temp,
	})
	if err != nil {
		return 0, err
	}
	return int64(newWidgetBlock.ID), nil
}
func (pg *pg) CreateTextSplitter(ctx context.Context, payload models.CreateTextSplitter) (int64, error) {

	inputId := NewNull()

	if payload.DataBlockID != 0 {
		inputId = IntToPgType(payload.DataBlockID)
	}

	newTextSplitter, err := pg.Queries.CreateTextSplitter(ctx, db.CreateTextSplitterParams{
		PipelineID:   IntToPgType(payload.PipeLineID),
		DataBlockID:  inputId,
		SplitterType: payload.Type,
		Config:       payload.Config.(string),
	})
	if err != nil {
		return 0, err
	}
	return int64(newTextSplitter.ID), nil
}
func (pg *pg) CreateVectorStore(ctx context.Context, payload models.CreateVectorStore) (int64, error) {

	inputId := NewNull()

	if payload.DataBlockID != 0 {
		inputId = IntToPgType(payload.DataBlockID)
	}

	newVectorStore, err := pg.Queries.CreateVectorStore(ctx, db.CreateVectorStoreParams{
		PipelineID:       IntToPgType(payload.PipeLineID),
		DataBlockID:      inputId,
		StoreType:        payload.Type,
		CollectionName:   payload.CollectionName,
		PersistDirectory: payload.PersistDirectory,
	})
	if err != nil {
		return 0, err
	}
	return int64(newVectorStore.ID), nil
}

func (pg *pg) CreateLLMBlock(ctx context.Context, payload models.CreateLLMBlock) (int64, error) {

	inputId := NewNull()

	if payload.InputBlockId != 0 {
		inputId = IntToPgType(payload.InputBlockId)
	}

	newLlmBlock, err := pg.Queries.CreateLlmBlock(ctx, db.CreateLlmBlockParams{
		PipelineID:    IntToPgType(payload.PipeLineID),
		InputBlockID:  inputId,
		LlmType:       payload.Type,
		Model:         payload.Model,
		LlmEndpoint:   payload.Endpoint,
		Prompt:        payload.Prompt,
		Template:      payload.Template,
		WidgetBlockID: payload.WidgetBlockId,
	})
	if err != nil {
		return 0, err
	}
	return int64(newLlmBlock.ID), nil
}

func (pg *pg) DeleteInputBlock(ctx context.Context, id int64) error {
	err := pg.Queries.DeleteInputBloc(ctx, int32(id))
	if err != nil {
		return err
	}
	return nil
}

func (pg *pg) DeleteDataBlock(ctx context.Context, id int64) error {
	err := pg.Queries.DeleteDataBlock(ctx, int32(id))
	if err != nil {
		return err
	}
	return nil
}

func (pg *pg) DeleteWidgetBlock(ctx context.Context, id int64) error {
	err := pg.Queries.DeleteWidgetBlock(ctx, int32(id))
	if err != nil {
		return err
	}
	return nil
}

func (pg *pg) DeleteTextSplitter(ctx context.Context, id int64) error {
	err := pg.Queries.DeleteTextSplitter(ctx, int32(id))
	if err != nil {
		return err
	}
	return nil
}

func (pg *pg) DeleteLLMBlock(ctx context.Context, id int64) error {
	err := pg.Queries.DeleteLlmBlock(ctx, int32(id))
	if err != nil {
		return err
	}
	return nil
}

func (pg *pg) DeleteVectorStore(ctx context.Context, id int64) error {
	err := pg.Queries.DeleteVectorStore(ctx, int32(id))
	if err != nil {
		return err
	}
	return nil
}

func (pg *pg) UpdateInputBlock(ctx context.Context, id int64, payload models.CreateInputBlock) error {
	err := pg.Queries.UpdateInputBlock(ctx, db.UpdateInputBlockParams{
		ID:          int32(id),
		DataBlockID: payload.DataBlockId,
		LlmID:       payload.LlmId,
	})

	if err != nil {
		return err
	}
	return nil
}

func (pg *pg) UpdateDataBlock(ctx context.Context, id int64, payload models.CreateDataBlock) error {
	err := pg.Queries.UpdateDataBlock(ctx, db.UpdateDataBlockParams{
		InputBlockID:   IntToPgType(payload.InputBlockId),
		StorageUrl:     payload.Url,
		TextSplitterID: payload.TextSplitterId,
		VectorStoreID:  payload.VectorStoreId,
		ID:             int32(id),
	})
	if err != nil {
		return err
	}
	return nil
}

func (pg *pg) UpdateWidgetBlock(ctx context.Context, id int64, payload models.CreateWidgetBlock) error {
	temp, err := json.Marshal(payload.Styles)
	if err != nil {
		return err
	}

	err = pg.Queries.UpdateWidgetBlock(ctx, db.UpdateWidgetBlockParams{
		LlmBlockID: IntToPgType(payload.LlmId),
		ImageUrl:   payload.ImageUrl,
		Styles:     temp,
		ID:         int32(id),
	})
	if err != nil {
		return err
	}
	return nil
}

func (pg *pg) UpdateTextSplitter(ctx context.Context, id int64, payload models.CreateTextSplitter) error {
	temp, err := json.Marshal(payload.Config)
	if err != nil {
		return err
	}
	err = pg.Queries.UpdateTextSplitter(ctx, db.UpdateTextSplitterParams{
		DataBlockID:  IntToPgType(payload.DataBlockID),
		SplitterType: payload.Type,
		Config:       string(temp),
		ID:           int32(id),
	})
	if err != nil {
		return err
	}
	return nil
}

func (pg *pg) UpdateLLMBlock(ctx context.Context, id int64, payload models.CreateLLMBlock) error {
	err := pg.Queries.UpdateLlmBlock(ctx, db.UpdateLlmBlockParams{
		InputBlockID:  IntToPgType(payload.InputBlockId),
		LlmType:       payload.Type,
		Model:         payload.Model,
		Prompt:        payload.Prompt,
		LlmEndpoint:   payload.Endpoint,
		Template:      payload.Template,
		WidgetBlockID: payload.WidgetBlockId,
		ID:            int32(id),
	})
	if err != nil {
		return err
	}
	return nil
}

func (pg *pg) UpdateVectorStore(ctx context.Context, id int64, payload models.CreateVectorStore) error {
	err := pg.Queries.UpdateVectorStore(ctx, db.UpdateVectorStoreParams{
		DataBlockID:      IntToPgType(payload.DataBlockID),
		StoreType:        payload.Type,
		CollectionName:   payload.CollectionName,
		PersistDirectory: payload.PersistDirectory,
		ID:               int32(id),
	})
	if err != nil {
		return err
	}
	return nil
}
