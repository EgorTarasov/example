
// nodeTypes.ts
import { NodeTypes } from "@xyflow/react";
import InputBlockNodeType from "./InputBlockNode";
import DataBlockNode from "./DataBlockNode";
import ColorSelectorNode from "./ColorSelectorNode";
import LLMNode from "./LLMNode";


export const nodeTypes: NodeTypes = {
    inputBlock: InputBlockNodeType,
    dataBlock: DataBlockNode,
    selectorNode: ColorSelectorNode,
    llm: LLMNode,
};