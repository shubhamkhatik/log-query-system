export default function LogCard({ log }) {
  const color =
    {
      error: "#eba925",
      warn: "#de7d21 ",
      info: "#21ded8 ",
      debug: "#d821de ",
    }[log.level] || "#e9d9ea ";

  return (
    <div
      style={{
        background: color,
        padding: "10px",
        borderLeft: "4px solid black",
        marginBottom: "10px",
      }}
    >
      <strong style={{ color: "black" }}>{log.level.toUpperCase()}</strong> -{" "}
      <p style={{ color: "black" }}>{log.timestamp}</p>
      <em style={{ color: "black" }}>{log.resourceId}</em>:{" "}
      <p style={{ color: "black" }}>{log.message}</p>
    </div>
  );
}
