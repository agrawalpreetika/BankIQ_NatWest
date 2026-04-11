export default function InsightCard({ data }) {
    return (
        <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">💬 Summary</h2>
            <p>{data.insights?.summary}</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">📊 Why?</h2>
            <p>{data.insights?.root_cause}</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">💡 Recommendation</h2>
            <p>{data.recommendation}</p>
        </div>
    );
}