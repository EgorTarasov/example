import { BaseNode } from "@/components/ui/base-node";
import { Handle, NodeProps, Position, Node } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select"
import { DataBlockDto } from "@/api/models/models";
import { useState } from 'react';

export type DataBlockNodeType = Node<{
    dto: DataBlockDto;
}, 'dataBlock'>;

export function DataBlockNode({ data }: NodeProps<DataBlockNodeType>) {
    const [type, setType] = useState(data.dto.type);
    const [url, setUrl] = useState(data.dto.url);

    const typeOptions = [
        { value: 'txt', label: 'Text' },
        { value: 'pdf', label: 'PDF' },
        { value: 'notion', label: 'Notion' },
        { value: 'confluence', label: 'Confluence' }
    ];

    return (
        <BaseNode>
            <div className="flex flex-col gap-2">
                <div className="font-bold text-sm border-b pb-2">Data Block</div>
                <Handle
                    type="target"
                    position={Position.Top}
                    style={{ width: '8px', height: '8px' }}
                />
                <div className="text-xs space-y-2">
                    <div>ID: {data.dto.id}</div>
                    <Select
                        value={type}
                        onValueChange={(value) => setType(value)}
                    >
                        {typeOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        className="nodrag"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL"
                    />
                </div>
                <Handle
                    type="source"
                    position={Position.Bottom}
                    style={{ width: '8px', height: '8px' }}
                />
            </div>
        </BaseNode>
    );
}