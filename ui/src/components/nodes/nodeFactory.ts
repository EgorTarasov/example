import { Node } from '@xyflow/react';
import { DataBlockDto, InputBlockDto, LLMDto, TextSplitterDto, VectorStoreDto, WidgetBlockDto } from '@/api/models/models';

import axios from 'axios';


export type NodeData = {
    dataBlock: DataBlockDto;
    inputBlock: InputBlockDto;
    llm: LLMDto;
    textSplitter: TextSplitterDto;
    vectorStore: VectorStoreDto;
    widget: WidgetBlockDto;
};

export const defaultValues: NodeData = {
    dataBlock: {
        id: 0,
        type: 'txt',
        url: '',
        textSplitterId: 0,
        vectorStoreId: 0
    },
    inputBlock: {
        id: 0,
        dataBlockId: 0,
        pipelineId: 0,
        llmId: 0,
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString()
    },
    llm: {
        id: 0,
        type: 'gpt3',
        endpoint: '',
        model: '',
        prompt: '',
        template: '',
        widgetBlockId: 0
    },
    textSplitter: {
        id: 0,
        type: 'regex',
        config: {},
        dataBlockId: 0
    },
    vectorStore: {
        id: 0,
        type: 'pgvector',
        collectionName: ''
    },
    widget: {
        id: 0,
        imageUrl: '',
        styles: {}
    }
};


export function createNode(type: string, position: { x: number  , y: number } = {x: 0, y: 0}): Node {
    let nodeId = '';
    const nodeTypes = {
        dataBlock: { type: 'dataBlock', data: { dto: defaultValues.dataBlock } },
        inputBlock: { type: 'inputBlock', data: { dto: defaultValues.inputBlock } },
        llm: { type: 'llm', data: { dto: defaultValues.llm } },
        textSplitter: { type: 'textSplitter', data: { dto: defaultValues.textSplitter } },
        vectorStore: { type: 'vectorStore', data: { dto: defaultValues.vectorStore } },
        widget: { type: 'widget', data: { dto: defaultValues.widget } }
    };
    function getCurrentURL () {
        return window.location.href
    };
    const url = getCurrentURL();
    console.log(url);
    type NodeType = 'dataBlock' | 'inputBlock' | 'llm' | 'textSplitter' | 'vectorStore' | 'widget';
    
    interface resID {
        id: string
    }
    const handleCreate = async () => {
        const endpoint = `https://larek.tech/api/dashboard/pipeline/11/${type}`
        const typeValue: NodeType = type as NodeType;

        const res = await axios.post<resID>(endpoint, nodeTypes[typeValue].data);
        nodeId = res.data.id;
    }
    
    handleCreate();   
    return {
        id: `${nodeId}`,
        type,
        position: position,
        data: nodeTypes[type as keyof typeof nodeTypes]?.data || { label: `${type} node` },
    };
}