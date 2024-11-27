import { memo, useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { LLMDto } from '@/api/models/models';
import { isValidConnection } from './utils';
import ollama from 'ollama';

export type LLMNodeType = Node<{
    dto: LLMDto;
}, 'llm'>;

const LLMNode = ({ data, isConnectable, id }: NodeProps<LLMNodeType>) => {
    const [type, setType] = useState(data.dto.type);
    const [endpoint, setEndpoint] = useState(data.dto.endpoint);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const typeOptions = [
        { value: 'mistral', label: 'mistral 7b' },
        { value: 'llama3.1', label: 'llama3.1 8b' },
        { value: 'llama3.2:3b', label: 'llama3.2 3b' },
        { value: 'custom', label: 'custom' }
    ];

    const handleTestConnection = async () => {
        try {
            const message = { role: 'user', content: prompt };
            const responseStream = await ollama.chat({ model: type, messages: [message], stream: true });
            let fullResponse = '';
            for await (const part of responseStream) {
                fullResponse += part.message.content;
            }
            setResponse(fullResponse);
        } catch (error) {
            console.error('Error testing connection:', error);
            setResponse('Error testing connection');
        }
    };

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                id={`llm|${id}|target`}
                isConnectable={isConnectable}
                style={{ width: '8px', height: '8px', background: '#555' }}
                isValidConnection={isValidConnection}
            />
            <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
                <div className="flex flex-row gap-2 w-[500px] h-[300px]">
                    <div className="flex flex-col gap-2 w-1/2">
                        <div className="font-bold text-sm border-b pb-2">LLM Node</div>
                        <div className="text-xs space-y-2">
                            <div>ID: {data.dto.id}</div>
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
                                value={endpoint}
                                onChange={(e) => setEndpoint(e.target.value)}
                                placeholder="Enter Endpoint"
                            />
                            <Input
                                className="nodrag"
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Enter Test Prompt"
                            />
                            <button
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handleTestConnection}
                            >
                                Test Connection
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden w-1/2">
                        {response && (
                            <div className="mt-2 p-2 border border-gray-300 rounded-md h-full">
                                <strong>Response:</strong>
                                <p>{response}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id={`llm|${id}|source`}
                isConnectable={isConnectable}
                style={{ width: '8px', height: '8px', background: '#555' }}
                isValidConnection={isValidConnection}
            />
        </>
    );
};

export default memo(LLMNode);