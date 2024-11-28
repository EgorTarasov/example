// import { pipelineId } from "@/pages/authenticated/constructor";
// import { useNodesState, useEdgesState, ReactFlow, Panel,type  Node,
//     type Edge } from "@xyflow/react";
// import axios from "axios";
// import { useState, useEffect, useCallback, useLayoutEffect } from "react";
// import { nodeTypes } from "./nodes/nodeTypes";
// import Dagre from '@dagrejs/dagre';

// export const LayoutFlow = () => {
//     const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
//     const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
//     const [wasFetched, setWasFetched] = useState(false);

    
//     const fetchNodesAndEdges = async (id: string = "0") => {
        
    
//     const endpoint = `https://larek.tech/api/dashboard/pipeline/${id}`;
    
//     try {
//         const response = await axios.get(endpoint);
        
//         console.log('endpoint', endpoint)
//         const nodesObject = response.data.nodes;
//         const nodes = Object.values(nodesObject).map((node: any) => ({
//             id: node.id.toString(),
//             type: node.block_type,
//             data: { ...node }
//         }));
//         const edgeObj = response.data.edges;
//         const edges = Object.values(edgeObj).map((edge: any) => ({
//             id: edge.id.toString(),
//             source: edge.source.toString(),
//             sourceHandle: edge.sourceHandle.toString(),
//             target: edge.target.toString(),
//             targetHandle: edge.targetHandle.toString(),
//         }));
//         console.log('edges in get', edges);
//         console.log('nodes', nodes);
//         return {nodes, edges};
//     } catch (error) {
//         console.log("pipelineId", id)

//         console.log('endpoint', endpoint)
//         console.error('Error fetching nodes:', error);
//         return {nodes: [], edges: []};
//     }

//     };

//     console.log(fetchNodesAndEdges(pipelineId));

//     const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

//     const getLayoutedElements = (nodes: any[], edges: any[], options: { direction: "TB" | any; }) => {
//         g.setGraph({ rankdir: options.direction });
        
//         edges.forEach((edge) => g.setEdge(edge.source, edge.target));
//         edges.forEach((edge) => console.log("source and target", edge.source, edge.target));
//         nodes.forEach((node) => g.setNode(node.id, node));

//         Dagre.layout(g);

//         return {
//             nodes: nodes.map((node) => {
//             const { x, y } = g.node(node.id);

//             return { ...node, position: { x, y } };
//             }),
//             edges,
//         };
//     };

//     const getNodes = async () => {
//         const initialNodesAndEdges = await fetchNodesAndEdges("15");
//         console.log("initialNodes from array:", initialNodesAndEdges.nodes)
//         const initialNodes = initialNodesAndEdges.nodes;
//         const initialEdges = initialNodesAndEdges.edges;

//         setNodes(initialNodes.map((node) => ({ 
//             ...node, 
//             position: { x: 0, y: 0 } })));
//         setEdges(initialEdges);
//         console.log('initialNodes that were fethced', nodes, edges);
//     };

//     useEffect(() => {
//         if (!wasFetched) {
//           setWasFetched(true);
//           getNodes();
//         }
//       }, [wasFetched]);
    

//     useEffect(() => {
//         console.log('Nodes:', nodes);
//     });

    

//     const onLayout = useCallback(
//         (direction: any) => {
        
//         console.log('edges layout:', edges);

//         const layouted = getLayoutedElements(nodes, edges, { direction });

//         console.log('layouted:', layouted);
//         setNodes([...layouted.nodes]);
//         setEdges([...layouted.edges]);

//         },
//         [nodes, edges]
//     );


//     useLayoutEffect(() => {
//         onLayout('LR');
//     }, []);

//     return (
//         <div
//         style={{ height: '500px', width: '1000px', border: '1px solid black' }}
//         >
//         <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             nodeTypes={nodeTypes}
//             style={{ width: '100%', height: '100%' }}
//         >
//             <Panel position="top-right">
//             <button onClick={() => onLayout('TB')}>vertical layout</button>
//             <button onClick={() => onLayout('LR')}>horizontal layout</button>
//             </Panel>
//         </ReactFlow>
//         </div>
//     );
//     };

// export default LayoutFlow;
