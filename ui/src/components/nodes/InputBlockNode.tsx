import { memo, useState } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { InputBlockDto } from '@/api/models/models';
import { Input } from "@/components/ui/input";

export type InputBlockNodeType = Node<{
    dto: InputBlockDto;
}, 'inputBlock'>;

const InputBlockNode = ({ data, isConnectable }: NodeProps<InputBlockNodeType>) => {
    const [dataBlockId, setDataBlockId] = useState(data.dto.dataBlockId);
    const [llmId, setLlmId] = useState(data.dto.llmId);

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
                style={{ width: '8px', height: '8px', background: '#555' }}
            />
            <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
                <div className="flex flex-col gap-2">
                    <div className="font-bold text-sm border-b pb-2">Input Block</div>
                    <div className="text-xs space-y-2">
                        <div>ID: {data.dto.id}</div>
                        <div className="flex flex-col gap-1">
                            <label>Data Block ID:</label>
                            <Input
                                className="nodrag"
                                type="number"
                                value={dataBlockId}
                                onChange={(e) => setDataBlockId(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>LLM ID:</label>
                            <Input
                                className="nodrag"
                                type="number"
                                value={llmId}
                                onChange={(e) => setLlmId(Number(e.target.value))}
                            />
                        </div>
                        <div className="text-gray-500 text-[10px]">
                            Created: {new Date(data.dto.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
                style={{ width: '8px', height: '8px', background: '#555' }}
            />
        </>
    );
};

export default memo(InputBlockNode);