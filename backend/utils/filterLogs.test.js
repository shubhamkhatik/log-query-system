const { filterLogs } = require('./filterLogs');

const logs = [
  {
    level: 'error',
    message: 'Database connection failed',
    resourceId: 'server-1',
    timestamp: '2025-07-01T12:00:00Z',
    traceId: 'trace-1',
    spanId: 'span-1',
    commit: 'abc123',
    metadata: {},
  },
  {
    level: 'info',
    message: 'User login successful',
    resourceId: 'server-2',
    timestamp: '2025-07-02T13:00:00Z',
    traceId: 'trace-2',
    spanId: 'span-2',
    commit: 'def456',
    metadata: {},
  }
];

test('filters by level', () => {
  const result = filterLogs(logs, { level: 'error' });
  expect(result).toHaveLength(1);
  expect(result[0].level).toBe('error');
});

test('filters by message (case insensitive)', () => {
  const result = filterLogs(logs, { message: 'user login' });
  expect(result).toHaveLength(1);
  expect(result[0].message).toMatch(/login/i);
});

test('filters by timestamp range', () => {
  const result = filterLogs(logs, {
    timestamp_start: '2025-07-01T00:00:00Z',
    timestamp_end: '2025-07-01T23:59:59Z'
  });
  expect(result).toHaveLength(1);
  expect(result[0].timestamp).toContain('2025-07-01');
});

test('filters by multiple fields', () => {
  const result = filterLogs(logs, {
    level: 'info',
    resourceId: 'server-2'
  });
  expect(result).toHaveLength(1);
  expect(result[0].level).toBe('info');
  expect(result[0].resourceId).toBe('server-2');
});
