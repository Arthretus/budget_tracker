// components/ProgressBar.jsx
// Animated budget-used progress bar.
// When expected expenses exist, shows a gold marker indicating projected spend.

import { formatCur } from "../utils/helpers";

export default function ProgressBar({
  pct,
  statusColor,
  totalSpent,
  totalExpected,
  budget,
  hasExpected,
}) {
  return (
    <div className="card fade-in" style={{ marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
          fontSize: 13,
        }}
      >
        <span style={{ fontWeight: 700 }}>Budget Used</span>
        <span
          style={{ fontFamily: "'JetBrains Mono', monospace", color: statusColor }}
        >
          {pct.toFixed(1)}%
        </span>
      </div>

      {/* Bar track */}
      <div
        style={{
          height: 10,
          background: "#1e1e2e",
          borderRadius: 10,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Animated fill */}
        <div
          className="prog-bar"
          style={{
            "--w": `${pct}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${statusColor}88, ${statusColor})`,
            borderRadius: 10,
          }}
        />

        {/* Gold projected-spend marker */}
        {hasExpected && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `${Math.min(99, ((totalSpent + totalExpected) / budget) * 100)}%`,
              width: 2,
              height: "100%",
              background: "#f59e0b",
              transform: "translateX(-1px)",
            }}
            title="Projected spend including expected"
          />
        )}
      </div>

      {/* Labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
          fontSize: 11,
          color: "#6b7280",
        }}
      >
        <span>₹0</span>
        {hasExpected && (
          <span style={{ color: "#f59e0b88" }}>
            ▲ projected: {formatCur(totalSpent + totalExpected)}
          </span>
        )}
        <span>{formatCur(budget)}</span>
      </div>
    </div>
  );
}
