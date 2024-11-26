import { Navbar } from '@/components/navbar'
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

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const snapGrid: [number, number] = [20, 20];


const initialNodes: NodeInfo[] = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
];

const initialEdges: EdgeInfo[] = [{ id: 'e1-2', source: '1', target: '2' }];

const onNodeDrag: OnNodeDrag = (_, node) => {
    console.log('drag event', node.data);
};

const Constructor = memo(function Constructor() {

    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    useEffect(() => {
        setNodes([
            {
                id: "1",
                position: { x: 0, y: 0 },
                type: "fileInputNode",
                data: {
                    label: "Ввод документа",
                },
            }
        ]);

        setEdges([
            {
                id: "e1",
                source: "1",
                target: "2",
            }
        ]);
    }, []);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
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

    return (
        <>
            <Navbar />
            <main className="flex gap-4 p-4 h-screen">
                <aside className="w-1/4 p-4 border-r border-gray-300">
                    <h2 className="text-xl font-bold mb-4">Available Node Types</h2>
                    <ul>
                        {Object.keys(nodeTypes).map((key) => (
                            <li
                                key={key}
                                className="mb-2 cursor-pointer"
                                onDragStart={(event) => onDragStart(event, key)}
                                draggable
                            >
                                {key}
                            </li>
                        ))}
                    </ul>
                </aside>
                <div className="flex-1 flex flex-col h-full">
                    <h1 className="mb-4 text-2xl font-bold">Конструктор</h1>
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
        </>
    )
});

export default Constructor;