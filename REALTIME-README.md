
## 🔁 Real-Time Updates via WebSockets (Socket.IO)

The application supports real-time log updates using **Socket.IO**:

- When a new log is created on the backend (`POST /logs`), the server emits a `log:new` event via WebSocket.
- The frontend listens for this event and instantly updates the UI.

### ✅ Optimized Strategy (No API Re-fetch)

Instead of re-fetching all logs from the backend, the frontend checks if the new log matches the current filters using:

```js
function checkIfMatchesFilters(log, filters) {
  return (
    (!filters.level || log.level === filters.level) &&
    (!filters.message || log.message.toLowerCase().includes(filters.message.toLowerCase())) &&
    (!filters.resourceId || log.resourceId === filters.resourceId) &&
    (!filters.timestamp_start || new Date(log.timestamp) >= new Date(filters.timestamp_start)) &&
    (!filters.timestamp_end || new Date(log.timestamp) <= new Date(filters.timestamp_end))
  );
}
```

If it matches:

```js
socket.on('log:new', (newLog) => {
  if (checkIfMatchesFilters(newLog, filters)) {
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  }
});
```

### 🧠 Why This Matters

- Avoids extra API calls on every update
- Enables ultra-fast updates
- Still respects filters (client-side match)
- Keeps the UI lightweight and responsive

This assumes the backend emits complete and valid log objects.
Still assume filter changes from Admin panel so we allowed in else case
```js
socket.on('log:new', (newLog) => {
  if (checkIfMatchesFilters(newLog, filters)) {
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  }else {
    loadLogs();
  }
});
```
