// src/components/WidgetNode.tsx

import React, { memo, useState, useEffect } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { ChatBotWidget } from '../chat-bot-widget';
import { CustomTheme, defaultTheme } from '@/models/customTheme';
import { WidgetBlockDto } from '@/api/models/models';

interface ColorSelectorNodeProps extends NodeProps<WidgetNodeType> {
    data: {
        dto: WidgetBlockDto;
        customTheme?: CustomTheme;
        onThemeChange: (theme: CustomTheme) => void;
    };
    isConnectable: boolean;
}

export type WidgetNodeType = Node<{
    dto: WidgetBlockDto;
}, 'widgetNode'>;

const ColorSelectorNode = ({ data, isConnectable }: ColorSelectorNodeProps) => {
    const { customTheme = defaultTheme, onThemeChange = () => {} } =data;
    const [themeInput, setThemeInput] = useState<CustomTheme>({ ...customTheme });

    useEffect(() => {
        setThemeInput({ ...customTheme });
    }, [customTheme]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setThemeInput(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyTheme = () => {
        onThemeChange(themeInput);
    };

    return (
        <>
            {console.log('customTheme', customTheme)}
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div className="p-2">
                <h3 className="text-lg font-semibold">Custom Theme</h3>
                <div className='grid grid-cols-2'>
                <div className="flex flex-col space-y-2 mt-2">
                    {/* Background Color */}
                    <label className="flex flex-col">
                        <span>Background Color:</span>
                        <input
                            type="text"
                            name="bgColor"
                            value={themeInput.bgColor || defaultTheme.bgColor}
                            onChange={handleChange}
                            placeholder="e.g., bg-secondary"
                            className="mt-1 p-1 border rounded"
                        />
                    </label>
                    
                    {/* Header Color */}
                    <label className="flex flex-col">
                        <span>Header Color:</span>
                        <input
                            type="text"
                            name="headerColor"
                            value={themeInput.headerColor || defaultTheme.headerColor}
                            onChange={handleChange}
                            placeholder="e.g., bg-green-500"
                            className="mt-1 p-1 border rounded"
                        />
                    </label>

                    {/* Text Color */}
                    <label className="flex flex-col">
                        <span>Text Color:</span>
                        <input
                            type="text"
                            name="textColor"
                            value={themeInput.textColor || defaultTheme.textColor}
                            onChange={handleChange}
                            placeholder="e.g., text-primary"
                            className="mt-1 p-1 border rounded"
                        />
                    </label>

                    {/* Button Color */}
                    <label className="flex flex-col">
                        <span>Button Color:</span>
                        <input
                            type="text"
                            name="buttonColor"
                            value={themeInput.buttonColor || defaultTheme.buttonColor}
                            onChange={handleChange}
                            placeholder="e.g., bg-sky-500"
                            className="mt-1 p-1 border rounded"
                        />
                    </label>

                    {/* Send Button Color */}
                    <label className="flex flex-col">
                        <span>Send Button Color:</span>
                        <input
                            type="text"
                            name="sendButtonColor"
                            value={themeInput.sendButtonColor || defaultTheme.sendButtonColor}
                            onChange={handleChange}
                            placeholder="e.g., bg-sky-500"
                            className="mt-1 p-1 border rounded"
                        />
                    </label>

                    {/* Message Color */}
                    <label className="flex flex-col">
                        <span>Message Color:</span>
                        <input
                            type="text"
                            name="messageColor"
                            value={themeInput.messageColor || defaultTheme.messageColor}
                            onChange={handleChange}
                            placeholder="e.g., bg-muted"
                            className="mt-1 p-1 border rounded"
                        />
                    </label>

                    {/* User Message Color */}
                    <label className="flex flex-col">
                        <span>User Message Color:</span>
                        <input
                            type="text"
                            name="userMessageColor"
                            value={themeInput.userMessageColor || defaultTheme.userMessageColor}
                            onChange={handleChange}
                            placeholder="e.g., bg-sky-500"
                            className="mt-1 p-1 border rounded"
                        />
                    </label>

                    {/* Apply Theme Button */}
                    <button
                        onClick={handleApplyTheme}
                        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Apply Theme
                    </button>
                </div>
            </div>
            
                <ChatBotWidget customTheme={customTheme} />
            </div>
            
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="b"
                isConnectable={isConnectable}
            />
        </>
    );
}
export default memo(ColorSelectorNode);