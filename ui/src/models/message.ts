export interface Message {
    id: number;
    chatId: number;
    userId: number;
    text: string;
    metadata: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}