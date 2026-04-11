// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer,
// } from "recharts";

// export default function ChartView({ chartData }) {
//     if (!chartData || chartData.length === 0) return null;

//     return (
//         <div className="bg-white p-5 rounded-xl shadow">
//             <h2 className="text-xl font-semibold mb-4">📈 Data Visualization</h2>

//             <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={chartData}>
//                     <XAxis dataKey="label" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="value" />
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }

import {
    BarChart, Bar,
    LineChart, Line,
    PieChart, Pie,
    XAxis, YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function ChartView({ chart }) {

    if (!chart || !chart.data?.length) return null;

    const { type, data } = chart;

    return (
        <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">📊 Visualization</h2>

            <ResponsiveContainer width="100%" height={300}>

                {type === "line" ? (
                    <LineChart data={data}>
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" />
                    </LineChart>

                ) : type === "pie" ? (
                    <PieChart>
                        <Pie data={data} dataKey="value" nameKey="label" />
                        <Tooltip />
                    </PieChart>

                ) : (
                    <BarChart data={data}>
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" />
                    </BarChart>
                )}

            </ResponsiveContainer>
        </div>
    );
}