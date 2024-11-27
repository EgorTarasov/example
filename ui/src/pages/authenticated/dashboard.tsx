import { DocumentCard, DocumentCardAdd } from '@/components/document-card'
import { useStores } from '@/hooks/useStores';
import { observer } from 'mobx-react';

const documentTypes = [
    { name: 'Invoices', count: 145 },
    { name: 'Contracts', count: 67 },
    { name: 'Proposals', count: 89 },
    { name: 'Reports', count: 234 },
]
const Dashboard = observer(() => {
    const rootStore = useStores();

    return (
        <main className="flex-1 p-4 md:p-6">
            <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {documentTypes.map((doc) => (
                    <DocumentCard key={doc.name} name={doc.name} count={doc.count} />
                ))}
                <DocumentCardAdd />
            </div>
        </main>

    )
});

export default Dashboard;