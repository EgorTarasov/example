import { Connection, Edge } from '@xyflow/react';

export const isValidConnection = (connection: Connection | Edge): boolean => {
    const sourceNodeType = connection.sourceHandle?.split('|')[0];
    const targetNodeType = connection.targetHandle?.split('|')[0];

    // Allow connections only from InputBlockNode to DataBlockNode
    return sourceNodeType === 'inputBlock' && targetNodeType === 'dataBlock';
};