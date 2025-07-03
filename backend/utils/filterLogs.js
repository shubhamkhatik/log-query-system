function filterLogs(logs, query) {
  return logs.filter(log => {
    const {
      level,
      message,
      resourceId,
      timestamp_start,
      timestamp_end,
      traceId,
      spanId,
      commit,
    } = query;

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
}

module.exports = { filterLogs };
