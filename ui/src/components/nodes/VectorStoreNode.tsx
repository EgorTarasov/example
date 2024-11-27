import { memo, useState } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
// import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { VectorStoreDto } from '@/api/models/models';
import { isValidConnection } from './utils';
import { Input } from '../ui/input';

export type VectorStoreNodeType = Node<{
    dto: VectorStoreDto;
}, 'vectorStoreBlock'>;



const VectorStoreBlock = ({ data, isConnectable, id }: NodeProps<VectorStoreNodeType>) => {
    const [type, setType] = useState(data.dto.type);
    const [collectionName, setCollectionName] = useState(data.dto.collectionName);
    

    const typeOptions = [
        { value: 'chroma', label: 'Chroma' },
        { value: 'qdrant', label: 'Qdrant' },
        { value: 'click', label: 'Click' },
        { value: 'pgvector', label: 'Pgvector' }
    ];
    //Chroma, qdrant, click, pgvector
    const handleParse = () => {
        console.log('Parsing data...');
    };

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                id={`textSplitter|${id}|target`}
                isConnectable={isConnectable}
                style={{ width: '8px', height: '8px', background: '#555' }}
                isValidConnection={isValidConnection}
            />
            <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
                <div className="flex w-[250px] h-[220px]">
                    <div className="flex flex-col gap-2 w-2/2">
                        <div className="font-bold text-sm border-b pb-2">Vector Store Block</div>
                        <div className="text-xs space-y-2">
                            <div>ID: {data.dto.id}</div>
                            <Select
                                value={type}
                                onValueChange={(value) => setType(value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent className='w-full'>
                                    {typeOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Input
                                className="nodrag"
                                type="text"
                                value={collectionName}
                                onChange={(e) => setCollectionName(e.target.value)}
                                placeholder="Enter collection name"
                            />
                            
                            <button
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handleParse}
                            >
                                Parse
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(VectorStoreBlock);