import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {CirclePlus} from "lucide-react";

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



export function DocumentCardAdd() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                <CirclePlus size={64}/>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-center space-y-0 pb-2">
                <p className="text-sm text-muted-foreground font-medium">Add document</p>
            </CardContent>
        </Card>
    )
}