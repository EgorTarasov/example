import {WidgetBlock} from "@/models/widgetBlock.ts";


export interface InputBlock {
    id: number;
    dataBlockId: number;
    llmId: number;
    widgetBlock: WidgetBlock;
}