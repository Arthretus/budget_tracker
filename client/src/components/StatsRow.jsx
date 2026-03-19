// components/StatsRow.jsx
// Three stat cards in a row: Spent / Remaining / Daily Allowance.
//
// Day 8 changes:
//   - accepts isOverBudget prop
//   - Remaining card gets a red tinted background when over budget
//   - Daily Allowance card dims to grey when over budget (no valid allowance)
//   - staggered fade-in animation delays feel more polished

import { formatCur } from "../utils/helpers";

export default function StatsRow({
  totalSpent,
  remaining,
  dailyAllowanceRaw,
  daysLeft,
  pct,
  isOverBudget,
}) {
  const stats = [
    {
      label: "Spent",
      value: formatCur(totalSpent),
      color: "#f97316",
      sub: `${pct.toFixed(1)}% of budget`,
      cardStyle: {},
    },
    {
      label: "Remaining",
      value: isOverBudget
        ? `-${formatCur(Math.abs(remaining))}`
        : formatCur(remaining),
      color: isOverBudget ? "#ef4444" : "#10b981",
      sub: isOverBudget ? "Over budget!" : "Available",
      cardStyle: isOverBudget
        ? { background: "#1a0a0a", borderColor: "#3a1010" }
        : {},
    },
    {
      label: "Daily Allowance",
      value: isOverBudget ? "—" : formatCur(Math.max(0, dailyAllowanceRaw)),
      color: isOverBudget ? "#4b5563" : "#6c63ff",
      sub: isOverBudget
        ? "Clear deficit first"
        : `For next ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`,
      cardStyle: {},
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
          style={{ animationDelay: `${i * 0.07}s`, ...s.cardStyle }}
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
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: s.color,
              marginTop: 6,
              transition: "color 0.3s",
            }}
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
