import {BaseNode} from "@/components/ui/base-node.tsx";
import {Handle, NodeProps, Position} from "@xyflow/react";
import {Input} from "@/components/ui/input.tsx";

//
// const defaultNodes = [
//     {
//         id: "1",
//         position: { x: 0, y: 0 },
//         type: "customNode",
//         data: {
//             label: "Custom Node",
//         },
//     }
// ];
//
// const nodeTypes = {
//     fileInputNode: FileInputNode,
// };


export function FileInputNode({data}: NodeProps){
    return (
        <BaseNode>
            <>
                {data.label}
                <Handle type="source" position={Position.Right} isConnectable={true}/>
                <Input className="nodrag" type='file' placeholder="Выберите файл"></Input>
            </>
        </BaseNode>
    )
}
