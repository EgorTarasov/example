// models.ts

export interface CreatePipeLine {
    name: string;
    description: string;
}

export interface PipeLineDto {
    id: number;
    name: string;
    description: string;
    dataBlocks: DataBlockDto[];
    inputBlocks: InputBlockDto[];
    widgets: WidgetBlockDto[];
    llms: LLMDto[];
    vectorStores: VectorStoreDto[];
    textSplitters: TextSplitterDto[];
}

export interface Edge {
    id: string;
    source: string;
    target: string;
    animated: boolean;
}

export interface PipeLine {
    id: number;
    name: string;
    description: string;
    nodes: Node[];
    edges: Edge[];
    createdAt: string;
    updateAt: string;
}

export interface CreateInputBlock {
    pipelineId: number;
}

export interface InputBlockDto {
    id: number;
    dataBlockId: number;
    pipelineId: number;
    llmId: number;
    createdAt: string;
    updateAt: string;
}

export interface CreateDataBlock {
    type: string; // txt, pdf, notion, confluence
    url: string;
}

export interface DataBlockDto {
    id: number;
    type: string; // txt, pdf, notion, confluence
    url: string;
    textSplitterId: number;
    vectorStoreId: number;
}

export interface CreateTextSplitter {
    type: string; // regex, split
    config: unknown; // interface{} in Go
}

export interface TextSplitterDto {
    id: number;
    type: string; // regex, split
    config: unknown; // interface{} in Go
    dataBlockId: number;
}

export interface CreateVectorStore {
    type: string; // clichouse, pgvector
    collectionName: string;
}

export interface VectorStoreDto {
    id: number;
    type: string; // clichouse, pgvector
    collectionName: string;
}

export interface CreateWidgetBlock {
    imageUrl: string;
    styles: unknown; // interface{} in Go
}

export interface LLMDto {
    id: number;
    type: string;
    endpoint: string;
    model: string;
    prompt: string;
    template: string;
    widgetBlockId: number;
}

export interface WidgetBlockDto {
    id: number;
    imageUrl: string;
    styles: unknown; // interface{} in Go
}