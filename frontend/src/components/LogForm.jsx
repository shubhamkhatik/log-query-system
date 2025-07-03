import { useState } from 'react';
import { postLog } from '../api/logs';

export default function LogForm({ onSuccess }) {
  const [form, setForm] = useState({
    level: 'info',
    message: '',
    resourceId: '',
    timestamp: new Date().toISOString(),
    traceId: '',
    spanId: '',
    commit: '',
    metadata: '{}',
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        metadata: JSON.parse(form.metadata),
      };
      await postLog(payload);
      alert('Log created!');
      if (onSuccess) onSuccess(); // refresh logs
      setForm({ ...form, message: '', traceId: '', spanId: '', commit: '', metadata: '{}' });
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>➕ Ingest New Log</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
        <select name="level" value={form.level} onChange={handleChange}>
          <option value="error">error</option>
          <option value="warn">warn</option>
          <option value="info">info</option>
          <option value="debug">debug</option>
        </select>

        <input name="message" placeholder="Message" value={form.message} onChange={handleChange} />
        <input name="resourceId" placeholder="Resource ID" value={form.resourceId} onChange={handleChange} />
        <input name="traceId" placeholder="Trace ID" value={form.traceId} onChange={handleChange} />
        <input name="spanId" placeholder="Span ID" value={form.spanId} onChange={handleChange} />
        <input name="commit" placeholder="Commit Hash" value={form.commit} onChange={handleChange} />
        <input
          name="metadata"
          placeholder="Metadata JSON"
          value={form.metadata}
          onChange={handleChange}
        />

        <button type="submit" style={{ padding: '8px', backgroundColor: '#28a745', color: '#fff' }}>
          Submit Log
        </button>
      </div>
    </form>
  );
}
