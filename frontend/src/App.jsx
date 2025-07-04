import { useEffect, useState, useCallback } from "react";
import { fetchLogs } from "./api/logs";
import FilterBar from "./components/FilterBar";
import LogList from "./components/LogList";
import LogForm from "./components/LogForm";
import LogAnalytics from "./components/LogAnalytics";
import io from 'socket.io-client';
const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');

function App() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    level: "",
    message: "",
    resourceId: "",
    timestamp_start: "",
    timestamp_end: "",
  });
  function checkIfMatchesFilters(log, filters) {
  const {
    level,
    message,
    resourceId,
    timestamp_start,
    timestamp_end,
  } = filters;

  return (
    (!level || log.level === level) &&
    (!message || log.message.toLowerCase().includes(message.toLowerCase())) &&
    (!resourceId || log.resourceId === resourceId) &&
    (!timestamp_start || new Date(log.timestamp) >= new Date(timestamp_start)) &&
    (!timestamp_end || new Date(log.timestamp) <= new Date(timestamp_end))
  );
}


  const loadLogs = useCallback(async () => {
    try {
      const data = await fetchLogs(filters);
      setLogs(data);
    } catch (err) {
      console.error("Failed to fetch logs:", err.message);
    }
  }, [filters]);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);
  // Real-time update
  useEffect(() => {
  socket.on('log:new', (newLog) => {
    if (checkIfMatchesFilters(newLog, filters)) {
      setLogs((prevLogs) => [newLog, ...prevLogs]);
    }else {
      loadLogs(); // Refresh logs if new log doesn't match current filters
    }
  });

  return () => socket.off('log:new');
}, [filters]);


  return (
    <div style={{ padding: "2rem" }}>
      <h2>📋 Log Ingestion & Query Tool</h2>
      <LogForm onSuccess={loadLogs} />
      <LogAnalytics logs={logs} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <LogList logs={logs} />
    </div>
  );
}

export default App;
