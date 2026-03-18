// components/ExpectedBanner.jsx
// Amber warning banner shown between StatsRow and ProgressBar
// whenever the user has added expected expenses.
// Shows adjusted daily allowance and remaining balance after expected costs.
// Returns null (renders nothing) when no expected expenses exist.

import { formatCur } from "../utils/helpers";

export default function ExpectedBanner({
  expectedExpenses,
  totalExpected,
  dailyAllowanceAdjusted,
  remainingAfterExpected,
}) {
  if (expectedExpenses.length === 0) return null;

  return (
    <div
      className="card fade-in"
      style={{ marginBottom: 16, background: "#0f0f1e", borderColor: "#f59e0b44" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {/* Left — icon + title + item count */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 22 }}>🔮</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b" }}>
              Expected Expenses Ahead
            </div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
              {expectedExpenses.length} item{expectedExpenses.length !== 1 ? "s" : ""} ·{" "}
              {formatCur(totalExpected)} reserved
            </div>
          </div>
        </div>

        {/* Right — adjusted daily + remaining after expected */}
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#6b7280" }}>Adjusted daily allowance</div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: dailyAllowanceAdjusted < 0 ? "#ef4444" : "#f59e0b",
              }}
            >
              {formatCur(Math.max(0, dailyAllowanceAdjusted))}
              <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 400, marginLeft: 4 }}>
                /day
              </span>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#6b7280" }}>Remaining after expected</div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: remainingAfterExpected < 0 ? "#ef4444" : "#10b981",
              }}
            >
              {formatCur(remainingAfterExpected)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
