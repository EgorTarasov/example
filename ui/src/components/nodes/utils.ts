import { Connection, Edge } from '@xyflow/react';

export const isValidConnection = (connection: Connection | Edge): boolean => {
    console.log('connection', connection);
    const sourceNodeType = connection.sourceHandle?.split('|')[0];
    const targetNodeType = connection.targetHandle?.split('|')[0];

    // Allow connections only from InputBlockNode to DataBlockNode
    // and from LLMNode to InputBlockNode

    // { source: '1732699979453', sourceHandle: 'inputBlock|1732699979453|source', target: '1732699246918', targetHandle: 'llm|1732699246918|target' }
    return (
        (sourceNodeType === 'inputBlock' && targetNodeType === 'dataBlock') ||
        (sourceNodeType === 'inputBlock' && targetNodeType === 'llm') ||
        (sourceNodeType === 'dataBlock' && targetNodeType === 'textSplitter') ||
        (sourceNodeType === 'dataBlock' && targetNodeType === 'vectorStore')
    );
};