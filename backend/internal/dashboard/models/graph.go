package models

import "strconv"

type Edge struct {
	Id           string `json:"id"`
	Source       string `json:"source"`
	Target       string `json:"target"`
	Animated     bool   `json:"animated"`
	SourceHandle string `json:"sourceHandle"`
	TargetHandle string `json:"targetHandle"`
}

type CreatePipeLine struct {
	UserID      int64  `json:"user_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type PipeLineDto struct {
	Id            int64             `json:"id"`
	Title         string            `json:"title"`
	Description   string            `json:"description"`
	DataBlocks    []DataBlockDto    `json:"data_blocks"`
	InputBlocks   []InputBlockDto   `json:"input_blocks"`
	Widgets       []WidgetBlockDto  `json:"widgets"`
	LLMs          []LLMDto          `json:"llms"`
	VectorStores  []VectorStoreDto  `json:"vector_stores"`
	TextSplitters []TextSplitterDto `json:"text_splitters"`
}

type PipeLineDashboardDto struct {
	Id          int64  `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type PipeLine struct {
	Id          int64         `json:"id"`
	Title       string        `json:"title"`
	Description string        `json:"description"`
	Nodes       []interface{} `json:"nodes"`
	Edges       []Edge        `json:"edges"`
	CreatedAt   string        `json:"Created_at"`
	UpdateAt    string        `json:"update_at"`
}

type CreateInputBlock struct {
	PipeLineID  int64 `json:"pipeline_id"`
	DataBlockId int64 `json:"data_block_id"`
	LlmId       int64 `json:"llm_id"`
}

type InputBlockDto struct {
	Id          int64  `json:"id"`
	DataBlockID int64  `json:"data_block_id"`
	PipeLineID  int64  `json:"pipeline_id"`
	LLMID       int64  `json:"llm_id"`
	CreatedAt   string `json:"Created_at"`
	UpdateAt    string `json:"update_at"`
}

type CreateDataBlock struct {
	PipeLineID     int64  `json:"pipeline_id"`
	InputBlockId   int64  `json:"input_block_id"`
	Type           string `json:"type"` // txt,pdf, notion, confluence
	Url            string `json:"url"`
	TextSplitterId int64  `json:"text_splitter_id"`
	VectorStoreId  int64  `json:"vector_store_id"`
}

type DataBlockDto struct {
	Id             int64  `json:"id"`
	Type           string `json:"type"` // txt,pdf, notion, confluence
	Url            string `json:"url"`
	TextSplitterID int64  `json:"text_splitter_id"`
	VectorStoreID  int64  `json:"vector_store_id"`
}

type CreateTextSplitter struct {
	PipeLineID  int64       `json:"pipeline_id"`
	DataBlockID int64       `json:"data_block_id"`
	Type        string      `json:"type"` // regex, split
	Config      interface{} `json:"config"`
}
type TextSplitterDto struct {
	Id          int64       `json:"id"`
	Type        string      `json:"type"` // regex, split
	Config      interface{} `json:"config"`
	DataBlockID int64       `json:"data_block_id"`
}

type CreateVectorStore struct {
	PipeLineID       int64  `json:"pipeline_id"`
	DataBlockID      int64  `json:"data_block_id"`
	Type             string `json:"type"` // clichouse, pgvector
	CollectionName   string `json:"collection_name"`
	PersistDirectory string `json:"persist_directory"`
}

type VectorStoreDto struct {
	Id             int64  `json:"id"`
	Type           string `json:"type"` // clichouse, pgvector
	CollectionName string `json:"collection_name"`
}
type CreateWidgetBlock struct {
	PipeLineID int64       `json:"pipeline_id"`
	LlmId      int64       `json:"llm_id"`
	ImageUrl   string      `json:"image_url"`
	Styles     interface{} `json:"styles"`
}

type WidgetBlockDto struct {
	Id       int64       `json:"id"`
	ImageUrl string      `json:"image_url"`
	Styles   interface{} `json:"styles"`
}

type CreateLLMBlock struct {
	PipeLineID    int64  `json:"pipeline_id"`
	InputBlockId  int64  `json:"input_block_id"`
	Type          string `json:"type"`
	Endpoint      string `json:"endpoint"`
	Model         string `json:"model"`
	Prompt        string `json:"prompt"`
	Template      string `json:"template"`
	WidgetBlockId int64  `json:"widget_block_id"`
}

type LLMDto struct {
	Id            int64  `json:"id"`
	Type          string `json:"type"`
	Endpoint      string `json:"endpoint"`
	Model         string `json:"model"`
	Prompt        string `json:"prompt"`
	Template      string `json:"template"`
	WidgetBlockID int64  `json:"widget_block_id"`
}

func (p PipeLineDto) ToPipeLine() PipeLine {
	var (
		nodes []interface{}
		edges []Edge
	)
	// inputs and edges for data blocks and llms
	for _, i := range p.InputBlocks {
		nodes = append(nodes, struct {
			InputBlockDto
			Block string `json:"block_type"`
		}{
			InputBlockDto: i,
			Block:         "input_block",
		})
		if i.DataBlockID != 0 {
			sourceID := "inputBlock" + strconv.FormatInt(i.Id, 10)
			dest := "dataBlock" + strconv.FormatInt(i.DataBlockID, 10)
			edges = append(edges, Edge{
				Id:           sourceID + "-" + dest,
				Source:       sourceID,
				Target:       dest,
				SourceHandle: "inputBlock|" + strconv.FormatInt(i.Id, 10) + "|source",
				TargetHandle: "dataBlock|" + strconv.FormatInt(i.DataBlockID, 10) + "|target",
			})
		}
		if i.LLMID != 0 {
			sourceID := "inputBlock" + strconv.FormatInt(i.Id, 10)
			dest := "llmBlock" + strconv.FormatInt(i.LLMID, 10)
			edges = append(edges, Edge{
				Id:           sourceID + "-" + dest,
				Source:       sourceID,
				Target:       dest,
				SourceHandle: "inputBlock|" + strconv.FormatInt(i.Id, 10) + "|source",
				TargetHandle: "llm|" + strconv.FormatInt(i.LLMID, 10) + "|target",
			})
		}
	}
	// llms and edges for widgets
	for _, llm := range p.LLMs {
		nodes = append(nodes, struct {
			LLMDto
			Block string `json:"block_type"`
		}{
			LLMDto: llm,
			Block:  "llm_block",
		})
		if llm.WidgetBlockID != 0 {
			sourceID := "llmBlock" + strconv.FormatInt(llm.Id, 10)
			dest := "widgetBlock" + strconv.FormatInt(llm.WidgetBlockID, 10)
			edges = append(edges, Edge{
				Id:           sourceID + "-" + dest,
				Source:       sourceID,
				Target:       dest,
				SourceHandle: "llm|" + strconv.FormatInt(llm.Id, 10) + "|source",
				TargetHandle: "widget|" + strconv.FormatInt(llm.WidgetBlockID, 10) + "|target",
			})
		}
	}

	for _, data := range p.DataBlocks {
		nodes = append(nodes, struct {
			DataBlockDto
			Block string `json:"block_type"`
		}{
			DataBlockDto: data,
			Block:        "data_block",
		})
		if data.TextSplitterID != 0 {
			sourceID := "dataBlock" + strconv.FormatInt(data.Id, 10)
			dest := "textSplitter" + strconv.FormatInt(data.TextSplitterID, 10)
			edges = append(edges, Edge{
				Id:           sourceID + "-" + dest,
				Source:       sourceID,
				Target:       dest,
				SourceHandle: "dataBlock|" + strconv.FormatInt(data.Id, 10) + "|source",
				TargetHandle: "textSplitter|" + strconv.FormatInt(data.TextSplitterID, 10) + "|target",
			})
		}
		if data.VectorStoreID != 0 {
			sourceID := "dataBlock" + strconv.FormatInt(data.Id, 10)
			dest := "vectorStore" + strconv.FormatInt(data.VectorStoreID, 10)
			edges = append(edges, Edge{
				Id:           sourceID + "-" + dest,
				Source:       sourceID,
				Target:       dest,
				SourceHandle: "dataBlock|" + strconv.FormatInt(data.Id, 10) + "|source",
				TargetHandle: "vectorStore|" + strconv.FormatInt(data.VectorStoreID, 10) + "|target",
			})
		}
	}

	for _, splitter := range p.TextSplitters {
		nodes = append(nodes, struct {
			TextSplitterDto
			Block string `json:"block_type"`
		}{
			TextSplitterDto: splitter,
			Block:           "text_splitter",
		})
	}

	for _, store := range p.VectorStores {
		nodes = append(nodes, struct {
			VectorStoreDto
			Block string `json:"block_type"`
		}{
			VectorStoreDto: store,
			Block:          "vector_store",
		})
	}

	for _, widget := range p.Widgets {
		nodes = append(nodes, struct {
			WidgetBlockDto
			Block string `json:"block_type"`
		}{
			WidgetBlockDto: widget,
			Block:          "widget_block",
		})
	}

	return PipeLine{
		Id:          p.Id,
		Title:       p.Title,
		Description: p.Description,
		Edges:       edges,
		Nodes:       nodes,
	}
}
