import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CirclePlus } from "lucide-react";
import { Input } from './ui/input';
import { Button } from './ui/button';


import { useNavigate } from '@tanstack/react-router';
import { useStores } from '@/hooks/useStores';

interface DocumentCardProps {
    name: string
    count: number
}



export function DocumentCard({ name, count }: DocumentCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{count}</div>
                <p className="text-xs text-muted-foreground">documents</p>
            </CardContent>
        </Card>
    )
}



export const DocumentCardAdd = () => {
    const { rootStore } = useStores();
    const navigate = useNavigate();

    const handleCreatePipeline = async () => {
        await rootStore.createPipeline();
        if (rootStore.currentPipelineId === undefined) {
            return;
        }
        navigate({
            to: '/pipeline/' + rootStore.currentPipelineId
        });

    }

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
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <Input
                    type="text"
                    placeholder="Описание"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <Button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleCreatePipeline}
                >
                    Добавить pipeline
                </Button>
            </CardContent>
        </Card >
    );
};
