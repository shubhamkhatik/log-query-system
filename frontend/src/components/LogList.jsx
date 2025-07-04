import LogCard from "./LogCard";

export default function LogList({ logs }) {
  if (!logs.length) return <p>No logs found.</p>;

  return (
    <div>
      {logs.map((log, index) => (
        <LogCard key={index} log={log} />
      ))}
    </div>
  );
}
