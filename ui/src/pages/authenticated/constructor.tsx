import {
    addEdge, applyEdgeChanges, applyNodeChanges,
    Controls,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    ReactFlow,
    ReactFlowProvider,
    type Node,
    type Edge, OnNodeDrag,
} from "@xyflow/react";

import { memo, useCallback, useState, useEffect } from "react";
import { EdgeInfo, NodeInfo } from "@/models/nodeInfo.ts";
import { nodeTypes } from '@/components/nodes/nodeTypes';
import { createNode } from '@/components/nodes/nodeFactory';
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
// import { Route, useParams } from "@tanstack/react-router";

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const snapGrid: [number, number] = [20, 20];

const initialNodes: NodeInfo[] = [
];

const initialEdges: EdgeInfo[] = [];

const onNodeDrag: OnNodeDrag = (_, node) => {
    console.log('drag event', node.data);
};

const Constructor = memo(function Constructor() {

    // const { pipelineId } = useParams({ strict: false });
    // console.log('pipelineId', pipelineId);

    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    useEffect(() => {
        setNodes([]);

        setEdges([
        ]);
    }, []);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => {
            console.log('Edge changes:', changes);
            return setEdges((eds) => {
                const newEdges = applyEdgeChanges(changes, eds);
                console.log('Updated edges:', newEdges);
                return newEdges;
            });
        },
        [setEdges],
    );

    const onConnect: OnConnect = useCallback(
        (connection) => {
            console.log('New connection:', connection);
            return setEdges((eds) => {
                const newEdges = addEdge(connection, eds);
                console.log('Edges after connection:', newEdges);
                return newEdges;
            });
        },
        [setEdges],
    );

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDrop = (event: React.DragEvent) => {
        event.preventDefault();

        const reactFlowBounds = event.currentTarget.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        };

        const newNode = createNode(type, position);
        setNodes((nds) => nds.concat(newNode));
    };

    const onDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

  
    const navigate = useNavigate();
    function handleButtonClick(): void {
        // alert("Button clicked!");
        navigate({
            to: '/dashboard', 
        });
    }
    return (
    

        <main className="flex gap-4 p-4 h-screen">
            <aside className="w-1/4 p-4 border-r border-gray-300">
                <h2 className="text-xl font-bold mb-4">Блоки для базы знаний</h2>
                
                <ul>
                    {Object.keys(nodeTypes).map((key) => (
                        <li
                            key={key}
                            className="m-1 p-2 border rounded cursor-pointer"
                            onDragStart={(event) => onDragStart(event, key)}
                            draggable
                        >
                            {key}
                        </li>
                    ))}
                </ul>
            </aside>
            <div className="flex-1 flex flex-col h-full">
            <div className="flex justify-between items-center align-center mb-4">
                    <h1 className="text-2xl font-semibold">Конструктор</h1>
                    <Button onClick={handleButtonClick}>Назад</Button>
                </div>
                
                <div
                    className="flex-1"
                    style={{ border: '2px solid #000' }}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    <ReactFlowProvider>
                        <ReactFlow
                            nodes={nodes}
                            nodeTypes={nodeTypes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onNodeDrag={onNodeDrag}
                            fitView
                            snapGrid={snapGrid}
                            defaultViewport={defaultViewport}
                            style={{ width: '100%', height: '100%' }}
                        />
                        <Controls />
                    </ReactFlowProvider>
                </div>
            </div>
        </main>
    )
});

export default Constructor;