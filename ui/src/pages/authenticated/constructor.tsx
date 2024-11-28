import {
    addEdge, applyEdgeChanges, applyNodeChanges,
    Controls,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    ReactFlow, 
    ReactFlowProvider,
    type Node,
    type Edge,
    Panel,
} from "@xyflow/react";
import Dagre from '@dagrejs/dagre';
import { memo, useCallback, useState, useEffect, useLayoutEffect } from "react";
import { nodeTypes } from '@/components/nodes/nodeTypes';
import { createNode } from '@/components/nodes/nodeFactory';
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import axios from "axios";
import { useStores } from "@/hooks/useStores";
import { observer } from 'mobx-react-lite';

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

type fieldFlowProps = {
    _edges: Edge[],
    _nodes: Node[]
}

function FieldFlow({_edges , _nodes}: fieldFlowProps){
    
    const [nodes, setNodes] = useState<Node[]>(_nodes);
    const [edges, setEdges] = useState<Edge[]>(_edges);

    
    const getLayoutedElements = (nodes: any[], edges: any[], options: { direction: "TB" | "LR" }) => {
        const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
        g.setGraph({ rankdir: options.direction });
        edges.forEach(edge => g.setEdge(edge.source, edge.target));
        nodes.forEach(node => g.setNode(node.id, node));
        Dagre.layout(g);
        return {
            nodes: nodes.map(node => {
                const { x, y } = g.node(node.id);
                return { ...node, position: { x, y } };
            }),
            edges,
        };
    };

        

    const onLayout = useCallback((direction: "TB" | "LR") => {
        const layouted = getLayoutedElements(nodes, edges, { direction });
        setNodes(layouted.nodes);
        setEdges(layouted.edges);
    }, [nodes, edges]);
    
    useLayoutEffect(() => {
        onLayout('LR');
    }, []);
    
    
    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );

    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => {
            console.log('Edge changes:', changes);
            setEdges((eds) => {
                const newEdges = applyEdgeChanges(changes, eds);
                console.log('Updated edges:', newEdges);
                return newEdges;
            });
        },
        [],
    );

    const onConnect: OnConnect = useCallback(
        (connection) => {
            console.log('New connection:', connection);
            setEdges((eds) => {
                const newEdges = addEdge(connection, eds);
                console.log('Edges after connection:', newEdges);
                return newEdges;
            });
        },
        [],
    );
    return (
        
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            defaultViewport={defaultViewport}
            style={{ width: '100%', height: '100%' }}
        >
            <Panel position="top-right">
                <button onClick={() => onLayout('TB')}>vertical layout</button>
                <button onClick={() => onLayout('LR')}>horizontal layout</button>
            </Panel>
            <Controls />
        </ReactFlow>

    )
}

const Constructor = memo(observer(function Constructor() {

    const { pipelineId } = useParams({ strict: false });
    const navigate = useNavigate();
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const { rootStore } = useStores();


    const fetchNodesAndEdges = async (id: string = "0") => {
        const endpoint = `https://larek.tech/api/dashboard/pipeline/${id}`;
        try {
            const response = await axios.get(endpoint);
            console.log(endpoint);
            const nodes = Object.values(response.data.nodes).map((node: any) => ({
                id: node.id.toString(),
                type: node.block_type,
                data: { ...node }
            }));
            const edges = Object.values(response.data.edges).map((edge: any) => ({
                id: edge.id.toString(),
                source: edge.source.toString(),
                sourceHandle: edge.sourceHandle.toString(),
                target: edge.target.toString(),
                targetHandle: edge.targetHandle.toString(),
            }));
            rootStore.changeFetched(true);
            return { nodes, edges };
        } catch (error) {
            console.error('Error fetching nodes:', error);
            return { nodes: [], edges: [] };
        }
    };
    const getNodes = async () => {
        const initial = await fetchNodesAndEdges(pipelineId);
        setNodes(initial.nodes.map(node => ({ ...node, position: { x: 0, y: 0 } })));
        setEdges(initial.edges);
        console.log(initial.edges);
        rootStore.changeLoading(false);
    };
    useEffect(() => {
        if(!rootStore.isFetched){
            getNodes();
        }
    });

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDrop = useCallback((event: any) => {
        const nodeType = event.dataTransfer.getData('application/reactflow');
        if (!nodeType) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const position = {
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top,
        };
        const newNode = {
            id: `${nodes.length + 1}`,
            type: nodeType,
            position,
            data: { label: `Node ${nodes.length + 1}`, type: nodeType },
        };
        setNodes((nds) => nds.concat(newNode));
        createNode(pipelineId, nodeType, position);
        console.log("newNode:", newNode);
    }, [nodes, pipelineId]);

    const onDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const handleButtonClick = () => {
        navigate({ to: '/dashboard' });
    };
    
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
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold">Конструктор</h1>
                        <Button onClick={handleButtonClick}>Назад</Button>
                    </div>
                    

                    <div
                        className="flex-1"
                        style={{ border: '2px solid #000' }}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                    >
                        {rootStore.isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <ReactFlowProvider>
                                <FieldFlow _edges={edges} _nodes={nodes} />
                            </ReactFlowProvider>
                        )}
                    </div>
                    
                </div>
            </main>
    )
}));

export default Constructor;