import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const levels = ["error", "warn", "info", "debug"];

export default function FilterBar({ filters, setFilters }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        marginBottom: "1rem",
      }}
    >
      <select
        value={filters.level}
        onChange={(e) => setFilters((f) => ({ ...f, level: e.target.value }))}
      >
        <option value="">All Levels</option>
        {levels.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={filters.message}
        placeholder="Search message"
        onChange={(e) => setFilters((f) => ({ ...f, message: e.target.value }))}
      />

      <input
        type="text"
        value={filters.resourceId}
        placeholder="Resource ID"
        onChange={(e) =>
          setFilters((f) => ({ ...f, resourceId: e.target.value }))
        }
      />

      <DatePicker
        selected={
          filters.timestamp_start ? new Date(filters.timestamp_start) : null
        }
        onChange={(date) =>
          setFilters((f) => ({
            ...f,
            timestamp_start: date?.toISOString() || "",
          }))
        }
        placeholderText="Start time"
        showTimeSelect
        dateFormat="Pp"
      />

      <DatePicker
        selected={
          filters.timestamp_end ? new Date(filters.timestamp_end) : null
        }
        onChange={(date) =>
          setFilters((f) => ({
            ...f,
            timestamp_end: date?.toISOString() || "",
          }))
        }
        placeholderText="End time"
        showTimeSelect
        dateFormat="Pp"
      />
      <button
  onClick={() =>
    setFilters({
      level: '',
      message: '',
      resourceId: '',
      timestamp_start: '',
      timestamp_end: ''
    })
  }
  style={{
    padding: '6px 12px',
    backgroundColor: '#e0e0e0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }}
>
  Clear Filters
</button>

    </div>
  );
}
