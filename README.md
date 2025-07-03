
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
git clone https://github.com/your-username/log-query-system.git
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

## 🧪 Bonus Features (Optional)

- Real-time updates via WebSockets (pending)
- Docker support (not included)
- Chart.js analytics (optional)

## 🧑‍💻 Author

**Shubham Khatik**  
Full Stack MERN Developer  
[LinkedIn](https://www.linkedin.com/in/shubhamkhatik)
