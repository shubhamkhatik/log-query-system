import { useEffect, useState, useCallback } from 'react';
import { fetchLogs } from './api/logs';
import FilterBar from './components/FilterBar';
import LogList from './components/LogList';
import LogForm from './components/LogForm';

function App() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    level: '',
    message: '',
    resourceId: '',
    timestamp_start: '',
    timestamp_end: ''
  });

  const loadLogs = useCallback(async () => {
    try {
      const data = await fetchLogs(filters);
      setLogs(data);
    } catch (err) {
      console.error('Failed to fetch logs:', err.message);
    }
  }, [filters]);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📋 Log Ingestion & Query Tool</h2>
      <LogForm onSuccess={loadLogs} />
    <FilterBar filters={filters} setFilters={setFilters} />
      <LogList logs={logs} />
    </div>
  );
}

export default App;
