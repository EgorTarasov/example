
// nodeTypes.ts
import { NodeTypes } from "@xyflow/react";
import InputBlockNodeType from "./InputBlockNode";
import DataBlockNode from "./DataBlockNode";
import ColorSelectorNode from "./ColorSelectorNode";
import LLMNode from "./LLMNode";
import TextSplitterNodeType from "./TextSplitterNode";
import VectorStoreNodeType from "./VectorStoreNode";
import WidgetNodeType from "./WidgetNode";


export const nodeTypes: NodeTypes = {
    inputBlock: InputBlockNodeType,
    dataBlock: DataBlockNode,
    selectorNode: ColorSelectorNode,
    llm: LLMNode,
    textSplitter: TextSplitterNodeType,
    vectorStore: VectorStoreNodeType,
    widgetNode: WidgetNodeType,
};