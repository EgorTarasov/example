import { memo, useState } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { GenerateResponse, LLMDto } from '@/api/models/models';
import { isValidConnection } from './utils';
// import ollama from 'ollama';
import axios from 'axios';

export type LLMNodeType = Node<{
    dto: LLMDto;
}, 'llm'>;


const LLMNode = ({ data, isConnectable, id }: NodeProps<LLMNodeType>) => {
    const [type, setType] = useState(data.dto.type);
    const [endpoint, setEndpoint] = useState("http://10.0.1.70:7869/api/generate");
    const [prompt, setPrompt] = useState('Привет! Ты цифровой ассистент?');
    const [template] = useState('');

    const [response, setResponse] = useState('');
    // const [loading, setLoading] = useState(false); 

    const typeOptions = [
        { value: 'mistral', label: 'mistral 7b' },
        { value: 'gemma:7b-instruct-q3_K_S', label: 'gemma' },
        { value: 'llama3.2', label: 'llama3.2 3b' },
    ];
//7869
    
    //3 try
    
    // const handleTestConnection = async () => {
    //     setLoading(true);
    //     try {
    //         const payload = {
    //             model: type, // Use selected model from state
    //             prompt: prompt,
    //             stream: false,
    //         };

    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             stream: false, 
    //         };
    //         console.log("i've tried(")
    //         console.log(`endpoint ${endpoint} \n payload \n ${payload.model} \n ${payload.prompt}`)
    //         // Make an HTTP POST request to the Ollama API
    //         const res = await axios.post<GenerateResponse>(endpoint, payload, {});

    //         // Assuming the API returns a JSON response with a 'reply' field
    //         setResponse(res.response);
    //     } catch (error) {
    //         console.error('Error testing connection:', error);
    //         setResponse('Error testing connection');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleTestConnection = async () => {
        // setLoading(true);
        try {
            const payload = {
                model: type,
                prompt: prompt,
                stream: false,
            };
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                // stream: false, // Set stream to false
            };
    
            // Make an HTTP POST request to the Ollama API with the GenerateResponse type
            const res = await axios.post<GenerateResponse>(endpoint, payload, config);
    
            // Access the 'response' field from the API response
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error testing connection:', error);
            if (axios.isAxiosError(error) && error.response) {
                setResponse(`Error: ${error.response.data.error || 'Unknown error'}`);
            } else {
                setResponse('Error testing connection');
            }
        } finally {
            // setLoading(false);/
            console.log('done')
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
                                        <SelectItem key={option.value} value={option.value} className='border m-2 rounded'>
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
                                className='nodrag'
                                type='text' 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={`Enter Prompt (exmaple: ${prompt})`}
                            
                            />
                            <div className='ont-bold text-sm border-t pb-2'>
                                    <strong>Template:</strong>
                                    {template ? (
                                        <p className='border-l'>&#123; context &#123; {template}</p>
                                        ):
                                        (
                                            <p className='border-l'>No Template</p>

                                        )}
                                    
                            </div>
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