import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

export interface WidgetBlock{
    name: string;
    value: number;
}

const widgetBlockSchema: JSONSchemaType<WidgetBlock> = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        value: {type: 'number'}
    },
    required: ['name', 'value']
}

const validateWidgetBlock = ajv.compile(widgetBlockSchema);

export function isValidWidgetBlock(widgetBlock: unknown): widgetBlock is WidgetBlock {
    return validateWidgetBlock(widgetBlock);
}