import { Navbar } from '@/components/navbar'
import {
    addEdge, applyEdgeChanges, applyNodeChanges,
    Controls,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    ReactFlow,
    type Node,
    type Edge, NodeTypes, OnNodeDrag,
} from "@xyflow/react";
import {FileInputNode} from "@/components/inputNode.tsx";
import {memo, useCallback, useState} from "react";
import {EdgeInfo, NodeInfo} from "@/models/nodeInfo.ts";

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const snapGrid: [number, number] = [20, 20];

const nodeTypes: NodeTypes = {
    fileInputNode: FileInputNode,
};


// const initialNodes: Node[] = [
//     {
//         id: "1",
//         position: { x: 0, y: 0 },
//         type: "fileInputNode",
//         data: {
//             label: "Ввод документа",
//         },
//     },
// ];

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


    setNodes([
        {
            id: "1",
            position: {x: 0, y: 0},
            type: "fileInputNode",
            data: {
                lable: "Ввод документа",
            },
        }
    ]);

    setEdges([
        {
            id: "e1",
            source: "1",
            target: "2",
        }
    ])



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



    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 p-4 md:p-6">
                <h1 className="mb-4 text-2xl font-bold">Конструктор</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                    />
                    <Controls/>
                </div>


            </main>
        </div>
    )
});

export default Constructor;