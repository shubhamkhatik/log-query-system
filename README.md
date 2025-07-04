
# 📋 Log Ingestion and Querying System

A full-stack developer tool to ingest and query logs using filters, built with **Node.js**, **React**, and a JSON file-based storage system.

## 🚀 Features

- Ingest structured logs via API or UI form
- Filter logs by:
  - Level (error, warn, info, debug)
  - Message (full-text search)
  - Resource ID
  - Timestamp range
- Sort logs in reverse-chronological order
- Clear filters with one click
- JSON file used for data persistence (no DB)

## 🧠 Tech Stack

- **Backend:** Node.js, Express, Joi, fs-extra
- **Frontend:** React, Axios, React-DatePicker
- **Storage:** `logs.json` file

## 📦 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/shubhamkhatik/log-query-system.git
cd log-query-system
```

### 2. Start Backend

```bash
cd backend
npm install
node server.js
```

> Runs at: `http://localhost:5000`

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

> Runs at: `http://localhost:5173`

## ✍️ Design Decisions

- JSON file used for simplicity and to demonstrate in-memory data handling (`fs-extra`)
- Filters use chained `Array.prototype.filter()` with AND logic
- `useState` lifted to `App.jsx` for a single source of truth
- `LogForm` allows manual ingestion and testability
- No DB or global state libs — clean and minimal

## ✅ API Endpoints

### POST `/logs`

```json
{
  "level": "error",
  "message": "Failed to connect",
  "resourceId": "server-1",
  "timestamp": "2025-07-03T12:00:00Z",
  "traceId": "abc-123",
  "spanId": "span-456",
  "commit": "deadbeef",
  "metadata": { "parentResourceId": "server-2" }
}
```

### GET `/logs`

Supports query params:
```
/logs?level=error&resourceId=server-1&timestamp_start=...&timestamp_end=...
```
✅ Additional Features (Bonus Implemented)
🔹 Basic Analytics View
A bar chart was added to show the count of logs grouped by severity level (error, warn, info, debug) using Recharts.

Dynamically reflects current filters

Visually helpful for spotting log trends

Component: LogAnalytics.jsx

🔹 Unit Testing with Jest
Implemented unit tests for backend log filtering logic.

Tests cover:

Filtering by level, message, timestamp

Combined filters

Located in backend/utils/filterLogs.test.js
```
cd backend
npm test
```
🔹 - Docker support 
###  Build and Run the Containers

From the root folder, run:

```
docker-compose up --build
```
This will:

Build both frontend and backend images

Start both containers

Mount logs.json into the backend container

3. Open in Browser
Frontend: http://localhost:5173

Backend: http://localhost:5000

🔁 Port Mapping Explanation
In docker-compose.yml, 

frontend:
```
  ports:
    - "5173:4173"
```
4173 is the internal port that Vite preview uses inside the container

5173 is the port exposed on your host machine

So you should open http://localhost:5173 in your browser.

Even though Vite logs this inside the container:


➜  Local: http://localhost:4173/
➜  Network: use --host to expose
This refers to localhost inside the container, which is not directly accessible from your host OS.

To fix this, we run:

frontend/package.json
```
"preview": "vite preview --host"
```
This makes Vite listen on 0.0.0.0, allowing Docker to expose it correctly.
✅ Summary
.env contains VITE_API_URL and is injected securely

docker-compose.yml maps ports 5173:4173 and 5000:5000

--host is required for Vite to expose its internal preview server

http://localhost:5173 is the correct address for accessing the app



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



## 🧑‍💻 Author

**Shubham Khatik**  
Full Stack MERN Developer  
[LinkedIn](https://www.linkedin.com/in/shubhamkhatik)
