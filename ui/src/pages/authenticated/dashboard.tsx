import React, { useEffect, useState } from 'react';
import ApiService from '@/api/ApiService';
import { PipeLineDashboardDto } from '@/api/models/models';
import { DocumentCardAdd } from '@/components/document-card';
import { Link } from '@tanstack/react-router';

const Dashboard = () => {
    const [pipelines, setPipelines] = useState<PipeLineDashboardDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPipelines = async () => {
            try {
                const data = await ApiService.getPipelines();
                setPipelines(data);
            } catch (err) {
                setError('Failed to fetch pipelines');
            } finally {
                setLoading(false);
            }
        };

        fetchPipelines();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
        <h1 className="mb-4 ml-4 text-2xl font-bold">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pipelines.map((pipeline) => (
                <div key={pipeline.id} className="p-4 border rounded shadow grid grid-cols-1 gap-2">
                    <div className='border-b mb-4 pb-2'>
                        <h2 className="text-lg font-semibold mb-2">{pipeline.title}</h2>
                    </div>
                    
                    <div className="mb-4">
                        <p>{pipeline.description}</p>
                    </div>
                    <Link
                        to={`/pipeline/${pipeline.id}`}
                        className="mt-auto px-4 py-2 bg-blue-500 text-white rounded text-center"
                    >
                        Редактировать
                    </Link>
                </div>
            ))}
            <DocumentCardAdd />
        </div>
    </div>
    );
};

export default Dashboard;

