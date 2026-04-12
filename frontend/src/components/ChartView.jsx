import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const CHART_CYAN = "#38bdf8";
const CHART_VIOLET = "#818cf8";
const CHART_MINT = "#34d399";
const CHART_AMBER = "#fbbf24";
const CHART_ROSE = "#f472b6";
const PIE_COLORS = [CHART_CYAN, CHART_VIOLET, CHART_MINT, CHART_AMBER, CHART_ROSE];

const axisProps = {
    stroke: "#475569",
    tick: { fill: "#94a3b8", fontSize: 12 },
    tickLine: { stroke: "#334155" },
};

const tooltipContentStyle = {
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    borderRadius: "12px",
    padding: "10px 12px",
};

const tooltipLabelStyle = { color: "#e2e8f0", fontWeight: 600 };

function ChartInner({ type, data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            {type === "line" ? (
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="label" {...axisProps} />
                    <YAxis {...axisProps} />
                    <Tooltip
                        contentStyle={tooltipContentStyle}
                        labelStyle={tooltipLabelStyle}
                        itemStyle={{ color: CHART_CYAN }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={CHART_CYAN}
                        strokeWidth={2.5}
                        dot={{ fill: CHART_CYAN, strokeWidth: 0, r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            ) : type === "pie" ? (
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="label"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={36}
                        paddingAngle={2}
                        stroke="rgba(15,23,42,0.9)"
                        strokeWidth={2}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={entry.label ?? index}
                                fill={PIE_COLORS[index % PIE_COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} />
                </PieChart>
            ) : (
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="label" {...axisProps} />
                    <YAxis {...axisProps} />
                    <Tooltip
                        contentStyle={tooltipContentStyle}
                        labelStyle={tooltipLabelStyle}
                        itemStyle={{ color: CHART_CYAN }}
                    />
                    <Bar
                        dataKey="value"
                        fill={CHART_CYAN}
                        radius={[6, 6, 0, 0]}
                        maxBarSize={56}
                    />
                </BarChart>
            )}
        </ResponsiveContainer>
    );
}

export default function ChartView({ chart, embedded = false }) {
    const hasData = chart?.data?.length;

    if (!hasData) {
        if (embedded) {
            return (
                <div className="flex h-[min(280px,40vh)] min-h-[200px] items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#020617]/60 text-center text-sm text-slate-500">
                    Run a BankIQ query to populate this chart.
                </div>
            );
        }
        return null;
    }

    const { type, data } = chart;

    const chartBlock = (
        <div className={embedded ? "h-[min(280px,40vh)] min-h-[220px] w-full min-w-0" : "mt-6 h-[300px] w-full min-w-0"}>
            <ChartInner type={type} data={data} />
        </div>
    );

    if (embedded) {
        return chartBlock;
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white">Visualization</h2>
            <p className="mt-1 text-xs text-slate-500">Chart type: {type}</p>
            {chartBlock}
        </div>
    );
}
