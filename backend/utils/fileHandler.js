const fs = require('fs-extra');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', 'logs.json');

async function readLogs() {
  try {
    await fs.ensureFile(LOG_FILE);
    const data = await fs.readJson(LOG_FILE);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error reading log file:', error);
    return [];
  }
}

async function writeLogs(logs) {
  try {
    await fs.writeJson(LOG_FILE, logs, { spaces: 2 });
  } catch (error) {
    console.error('Error writing log file:', error);
    throw error;
  }
}

module.exports = {
  readLogs,
  writeLogs
};
