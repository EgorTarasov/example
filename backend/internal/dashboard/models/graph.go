package models

type Edge struct {
	Id       string `json:"id"`
	Source   string `json:"source"`
	Target   string `json:"target"`
	Animated bool   `json:"animated"`
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

type PipeLine struct {
	Id          int64         `json:"id"`
	Title       string        `json:"title"`
	Description string        `json:"description"`
	Nodes       []interface{} `json:"nodes"`
	Edges       []interface{} `json:"edges"`
	CreatedAt   string        `json:"Created_at"`
	UpdateAt    string        `json:"update_at"`
}

type CreateInputBlock struct {
	PipeLineID int64 `json:"pipeline_id"`
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
	Type string `json:"type"` // txt,pdf, notion, confluence
	Url  string `json:"url"`
}

type DataBlockDto struct {
	Id             int64  `json:"id"`
	Type           string `json:"type"` // txt,pdf, notion, confluence
	Url            string `json:"url"`
	TextSplitterID int64  `json:"text_splitter_id"`
	VectorStoreID  int64  `json:"vector_store_id"`
}

type CreateTextSplitter struct {
	Type   string      `json:"type"` // regex, split
	Config interface{} `json:"config"`
}
type TextSplitterDto struct {
	Id          int64       `json:"id"`
	Type        string      `json:"type"` // regex, split
	Config      interface{} `json:"config"`
	DataBlockID int64       `json:"data_block_id"`
}

type CreateVectorStore struct {
	Type           string `json:"type"` // clichouse, pgvector
	CollectionName string `json:"collection_name"`
}

type VectorStoreDto struct {
	Id             int64  `json:"id"`
	Type           string `json:"type"` // clichouse, pgvector
	CollectionName string `json:"collection_name"`
}
type CreateWidgetBlock struct {
	ImageUrl string      `json:"image_url"`
	Styles   interface{} `json:"styles"`
}

type WidgetBlockDto struct {
	Id       int64       `json:"id"`
	ImageUrl string      `json:"image_url"`
	Styles   interface{} `json:"styles"`
}

type CreateLLMBlock struct {
	Type          string `json:"type"`
	Endpoint      string `json:"endpoint"`
	Model         string `json:"model"`
	Prompt        string `json:"prompt"`
	Template      string `json:"template"`
	WidgetBlockID int64  `json:"widget_block_id"`
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
