import { Connection, Edge } from '@xyflow/react';

export const isValidConnection = (connection: Connection | Edge): boolean => {
    console.log('connection', connection);
    const sourceNodeType = connection.sourceHandle?.split('|')[0];
    const targetNodeType = connection.targetHandle?.split('|')[0];

    // Allow connections only from InputBlockNode to DataBlockNode
    // and from LLMNode to InputBlockNode
    return (
        (sourceNodeType === 'inputBlock' && targetNodeType === 'dataBlock') ||
        (sourceNodeType === 'llm' && targetNodeType === 'inputBlock')
    );
};