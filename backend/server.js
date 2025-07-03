const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Joi = require('joi');
const { readLogs, writeLogs } = require('./utils/fileHandler');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Log Schema
const logSchema = Joi.object({
  level: Joi.string().valid('error', 'warn', 'info', 'debug').required(),
  message: Joi.string().required(),
  resourceId: Joi.string().required(),
  timestamp: Joi.string().isoDate().required(),
  traceId: Joi.string().required(),
  spanId: Joi.string().required(),
  commit: Joi.string().required(),
  metadata: Joi.object().required()
});

// POST /logs - Ingest a new log
app.post('/logs', async (req, res) => {
  const { error, value } = logSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const logs = await readLogs();
    logs.push(value);
    await writeLogs(logs);
    res.status(201).json(value);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to store log' });
  }
});

// GET /logs - Filtered query
app.get('/logs', async (req, res) => {
  try {
    let logs = await readLogs();

    const {
      level, message, resourceId,
      timestamp_start, timestamp_end,
      traceId, spanId, commit
    } = req.query;

    logs = logs.filter(log => {
      const conditions = [];

      if (level) conditions.push(log.level === level);
      if (message) conditions.push(log.message.toLowerCase().includes(message.toLowerCase()));
      if (resourceId) conditions.push(log.resourceId === resourceId);
      if (traceId) conditions.push(log.traceId === traceId);
      if (spanId) conditions.push(log.spanId === spanId);
      if (commit) conditions.push(log.commit === commit);
      if (timestamp_start) conditions.push(new Date(log.timestamp) >= new Date(timestamp_start));
      if (timestamp_end) conditions.push(new Date(log.timestamp) <= new Date(timestamp_end));

      return conditions.every(Boolean);
    });

    // Sort reverse chronologically
    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
