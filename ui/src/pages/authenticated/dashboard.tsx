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
            <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {pipelines.map((pipeline) => (

                    <div key={pipeline.id} className="p-4 border rounded shadow">
                        <h2 className="text-lg font-semibold">{pipeline.title}</h2>
                        <p>{pipeline.description}</p>
                        <Link key={pipeline.id} to={`/pipeline/${pipeline.id}`}>Редактировать</Link>
                    </div>

                ))}
                <DocumentCardAdd />
            </div>
        </div>
    );
};

export default Dashboard;

