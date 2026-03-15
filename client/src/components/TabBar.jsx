// components/TabBar.jsx
// Four navigation tabs: Dashboard / Add Expense / Expected / All Expenses.
// Expected tab shows a badge with the count when items exist.

const TABS = [
  { key: "dashboard", label: "📊 Dashboard" },
  { key: "add",       label: "➕ Add Expense" },
  { key: "expected",  label: "🔮 Expected" },
  { key: "expenses",  label: "📋 All Expenses" },
];

export default function TabBar({ tab, setTab, expectedCount }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          className="btn"
          style={{
            padding: "10px 18px",
            fontSize: 13,
            background: tab === key ? "#6c63ff" : "#13131a",
            color: tab === key ? "#fff" : "#a0a0b0",
            border: tab === key ? "none" : "1px solid #1e1e2e",
          }}
          onClick={() => setTab(key)}
        >
          {label}

          {/* Badge — only on Expected tab when items exist */}
          {key === "expected" && expectedCount > 0 && (
            <span
              style={{
                marginLeft: 6,
                background: "#f59e0b",
                color: "#000",
                borderRadius: 20,
                padding: "1px 7px",
                fontSize: 11,
              }}
            >
              {expectedCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
