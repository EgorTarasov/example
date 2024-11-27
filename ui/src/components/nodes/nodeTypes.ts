
// nodeTypes.ts
import { NodeTypes } from "@xyflow/react";
import InputBlockNodeType from "./InputBlockNode";
import DataBlockNode from "./DataBlockNode";
import ColorSelectorNode from "./ColorSelectorNode";


export const nodeTypes: NodeTypes = {
    inputBlock: InputBlockNodeType,
    dataBlock: DataBlockNode,
    selectorNode: ColorSelectorNode,
};