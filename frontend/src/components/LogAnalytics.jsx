import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function LogAnalytics({ logs }) {
  // Count logs by level
  const data = ["error", "warn", "info", "debug"].map((level) => ({
    level,
    count: logs.filter((log) => log.level === level).length,
  }));

  return (
    <div style={{ marginBottom: "2rem", height: "300px" }}>
      <h3>📊 Log Count by Level</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="level" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
