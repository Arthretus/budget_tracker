// components/StatsRow.jsx
// Three stat cards in a row: Spent / Remaining / Daily Allowance.
// Colors react to budget state (green → amber → red).

import { formatCur } from "../utils/helpers";

export default function StatsRow({
  totalSpent,
  remaining,
  dailyAllowanceRaw,
  daysLeft,
  pct,
}) {
  const stats = [
    {
      label: "Spent",
      value: formatCur(totalSpent),
      color: "#f97316",
      sub: `${pct.toFixed(1)}% of budget`,
    },
    {
      label: "Remaining",
      value: formatCur(Math.max(0, remaining)),
      color: remaining < 0 ? "#ef4444" : "#10b981",
      sub: remaining < 0 ? "Over budget!" : "Available",
    },
    {
      label: "Daily Allowance",
      value: formatCur(Math.max(0, dailyAllowanceRaw)),
      color: "#6c63ff",
      sub: `For next ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        marginBottom: 16,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className="card fade-in"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#6b7280",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {s.label}
          </div>
          <div
            style={{ fontSize: 22, fontWeight: 800, color: s.color, marginTop: 6 }}
          >
            {s.value}
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
            {s.sub}
          </div>
        </div>
      ))}
    </div>
  );
}
