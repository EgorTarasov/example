
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
    input_block: InputBlockNodeType,
    data_block: DataBlockNode,
    selector_node: ColorSelectorNode,
    llm_block: LLMNode,
    text_splitter: TextSplitterNodeType,
    vector_store: VectorStoreNodeType,
    widget_block: WidgetNodeType,
};