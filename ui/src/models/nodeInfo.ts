export interface NodeInfo {
    id: string;
    type?: string;
    data: {
        label: string
    };
    position: {
        x: number;
        y: number;
    };
}

export interface EdgeInfo{
    id: string;
    source: string;
    target: string;

}