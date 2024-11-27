import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CirclePlus } from "lucide-react";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useStores } from '@/hooks/useStores';
import { useState } from 'react';

interface DocumentCardProps {
    title: string;
    description: number;
}

export function DocumentCard({ title, description }: DocumentCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{description}</div>
                <p className="text-xs text-muted-foreground">documents</p>
            </CardContent>
        </Card>
    );
}

export const DocumentCardAdd = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const { rootStore } = useStores();
    const navigate = useNavigate();

    const handleCreatePipeline = async () => {
        await rootStore.createPipeline({
            title: title,
            description: description,
        });
        if (rootStore.currentPipelineId === undefined || rootStore.currentPipelineId === null) {
            return;
        }
        navigate({
            to: '/pipeline/' + rootStore.currentPipelineId
        });
    };

    return (
        <Card className="p-4 shadow-lg rounded-lg">
            <CardHeader className="flex flex-col items-center justify-center space-y-2 pb-4">
                <CirclePlus size={64} className="text-blue-500" />
                <p className="text-lg font-semibold">Добавить новый pipeline</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
                <Input
                    type="text"
                    placeholder="Название"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <Input
                    type="text"
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <Button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleCreatePipeline}
                >
                    Добавить pipeline
                </Button>
            </CardContent>
        </Card>
    );
};