import { memo, useState } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
// import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { TextSplitterDto } from '@/api/models/models';
import { isValidConnection } from './utils';

export type TextSplitterNodeType = Node<{
    dto: TextSplitterDto;
}, 'dataBlock'>;



const TextSplitterBlock = ({ data, isConnectable, id }: NodeProps<TextSplitterNodeType>) => {
    const [type, setType] = useState(data.dto.type);
    

    const typeOptions = [
        { value: 'TokenTextSplitter', label: 'Token text splitter' },
        { value: 'Recursive', label: 'Recursive' }
    ];

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
                <div className="flex w-[150px] h-[150px]">
                    <div className="flex flex-col gap-2 w-2/2">
                        <div className="font-bold text-sm border-b pb-2">Text Splitter Block</div>
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

export default memo(TextSplitterBlock);