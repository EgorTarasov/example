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
    useReactFlow,
    useNodesState,
    useEdgesState,
    Panel,
} from "@xyflow/react";
import Dagre from '@dagrejs/dagre';
import { memo, useCallback, useState, useEffect, useLayoutEffect } from "react";
import { nodeTypes } from '@/components/nodes/nodeTypes';
import { createNode } from '@/components/nodes/nodeFactory';
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import axios from "axios";


const Constructor = memo(function Constructor() {

    const { pipelineId } = useParams({ strict: false });
    console.log('pipelineId', pipelineId);

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchNodes = async (pipelineId: string = "0") => {
        const endpoint = `https://larek.tech/api/dashboard/pipeline/${pipelineId}`;
        try {
            const response = await axios.get(endpoint);
            const nodesObject = response.data.nodes;
            const nodes = Object.values(nodesObject).map((node: any) => ({
                id: node.id.toString(),
                type: node.block_type,
                data: { ...node }
            }));
            return nodes;
        } catch (error) {
            console.error('Error fetching nodes:', error);
            return [];
        }
    
    };

    const fetchEdges = async (pipelineId: string = "0") => {
        const endpoint = `https://larek.tech/api/dashboard/pipeline/${pipelineId}`;
        try {
            const response = await axios.get(endpoint);
            const edges = response.data.edges;
            console.log('edges', edges);
            return edges;
        } catch (error) {
            console.error('Error fetching edges:', error);
            return [];
        }
    }

    console.log(fetchNodes(pipelineId));

    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

        const getLayoutedElements = (nodes: any[], edges: any[], options: { direction: any; }) => {
        g.setGraph({ rankdir: options.direction });

        edges.forEach((edge) => g.setEdge(edge.source, edge.target));
        nodes.forEach((node) => g.setNode(node.id, node));

        Dagre.layout(g);

        return {
            nodes: nodes.map((node) => {
            const { x, y } = g.node(node.id);

            return { ...node, position: { x, y } };
            }),
            edges,
        };
        };

    const LayoutFlow = () => {
        const { fitView } = useReactFlow();
        const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
        const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
        const [wasFetched, setWasFetched] = useState(false);
        const getNodes = async () => {
            const initialNodes = await fetchNodes(pipelineId);
            setNodes(initialNodes.map((node) => ({ ...node, position: { x: 0, y: 0 } })));
            console.log('initialNodes that were fethced', initialNodes);
        };
        const getEdges = async () => {
            const initialEdges = await fetchEdges(pipelineId);
            setEdges(initialEdges);
            console.log('initialEdges that were fethced', initialEdges);
        }

        if (!wasFetched) {
            useEffect(() => {
                setWasFetched(true);
                getEdges();
                getNodes();
            });
        }
        

        useEffect(() => {
            console.log('Nodes:', nodes);
        });

        

        const onLayout = useCallback(
            (direction: any) => {
            const layouted = getLayoutedElements(nodes, edges, { direction });

            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);

            window.requestAnimationFrame(() => {
                fitView();
            });
            },
            [nodes, edges]
        );


        useLayoutEffect(() => {
            onLayout('LR');
        }, []);

        return (
            <div
            style={{ height: '500px', width: '1000px', border: '1px solid black' }}
            >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                style={{ width: '100%', height: '100%' }}
            >
                <Panel position="top-right">
                <button onClick={() => onLayout('TB')}>vertical layout</button>
                <button onClick={() => onLayout('LR')}>horizontal layout</button>
                </Panel>
            </ReactFlow>
            </div>
        );
        };



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
                        {/* {isLoading ? (
                            <p>Loading...</p>
                        ) : (
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
                        )
                        }*/}
                        <LayoutFlow />

                        
                        <Controls /> 
                    </ReactFlowProvider>
                </div>
            </div>
        </main>
    )
});

export default Constructor;
