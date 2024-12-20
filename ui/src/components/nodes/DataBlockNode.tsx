import { memo, useState } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { DataBlockDto } from '@/api/models/models';
import { isValidConnection } from './utils';

export type DataBlockNodeType = Node<{
    id: DataBlockDto;
    dto: DataBlockDto;
    type: DataBlockDto;
    url: DataBlockDto;
}, 'dataBlock'>;

const DataBlockNode = ({ data, isConnectable, id }: NodeProps<DataBlockNodeType>) => {
    const [type, setType] = useState(data.type.toString());
    const [url, setUrl] = useState(data.url.toString());

    const typeOptions = [
        { value: 'txt', label: 'Text' },
        { value: 'pdf', label: 'PDF' },
        { value: 'notion', label: 'Notion' },
        { value: 'confluence', label: 'Confluence' }
    ];

    const handleParse = () => {
        console.log('Parsing data...');
    };

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                id={`dataBlock|${id}|target`}
                isConnectable={isConnectable}
                style={{ width: '8px', height: '8px', background: '#555' }}
                isValidConnection={isValidConnection}
            />
            <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
                <div className="flex flex-row gap-2 w-[500px] h-[300px]">
                    <div className="flex flex-col gap-2 w-1/2">
                        <div className="font-bold text-sm border-b pb-2">Data Block</div>
                        <div className="text-xs space-y-2">
                            <div>ID: {data.id.toString()}</div>
                            <Select
                                value={type}
                                onValueChange={(value) => setType(value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
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
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Enter URL"
                            />
                            <button
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handleParse}
                            >
                                Parse
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden w-1/2">
                        <iframe
                            src={url}
                            className="w-full h-full border-0"
                            title="Preview"
                        />
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id={`dataBlock|${id}|source`}
                isConnectable={isConnectable}
                style={{ width: '8px', height: '8px', background: '#555' }}
                isValidConnection={isValidConnection}
            />
        </>
    );
};

export default memo(DataBlockNode);