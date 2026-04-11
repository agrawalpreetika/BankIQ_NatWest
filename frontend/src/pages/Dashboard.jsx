import { useState } from "react";
import ChatBox from "../components/ChatBox";
import InsightCard from "../components/InsightCard";
import ChartView from "../components/ChartView";
import WarningBox from "../components/WarningBox";
import { askQuery } from "../services/api";

export default function Dashboard() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAsk = async (query) => {
        setLoading(true);
        const res = await askQuery(query);
        setResponse(res);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">🏦 BankIQ Dashboard</h1>

            <ChatBox onAsk={handleAsk} />

            {loading && <p className="mt-4">Loading...</p>}

            {response && (
                <div className="mt-6 space-y-4">
                    <InsightCard data={response} />
                    <ChartView chart={response.chart} />
                    <WarningBox warning={response.warning} />
                </div>
            )}
        </div>
    );
}