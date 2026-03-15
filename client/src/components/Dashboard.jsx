// components/Dashboard.jsx
// Default tab — shows three sections:
//   1. Spending by Category — color-coded horizontal bars
//   2. Month Summary — line-item breakdown + daily allowance cards
//   3. Recent Expenses — last 5 expenses sorted by date

import { CAT_COLORS } from "../constants";
import { formatCur } from "../utils/helpers";

export default function Dashboard({
  expenses,
  byCategory,
  totalSpent,
  totalExpected,
  budget,
  remaining,
  daysLeft,
  dailyAllowanceRaw,
  dailyAllowanceAdjusted,
  hasExpected,
}) {
  return (
    <div className="fade-in">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

        {/* ── Spending by Category ── */}
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>
            Spending by Category
          </div>

          {Object.entries(byCategory).length === 0 ? (
            <div
              style={{ color: "#6b7280", fontSize: 13, textAlign: "center", padding: "20px 0" }}
            >
              No expenses yet
            </div>
          ) : (
            Object.entries(byCategory)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, amt]) => (
                <div key={cat} style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 5,
                      fontSize: 13,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 3,
                          background: CAT_COLORS[cat] || "#6b7280",
                        }}
                      />
                      <span>{cat}</span>
                    </div>
                    <span
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}
                    >
                      {formatCur(amt)}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 5,
                      background: "#1e1e2e",
                      borderRadius: 5,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${(amt / totalSpent) * 100}%`,
                        height: "100%",
                        background: CAT_COLORS[cat] || "#6b7280",
                        borderRadius: 5,
                        transition: "width 0.8s ease",
                      }}
                    />
                  </div>
                </div>
              ))
          )}
        </div>

        {/* ── Right column: Summary + Allowance ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Month Summary */}
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>
              Month Summary
            </div>
            {[
              ["Total Budget",       formatCur(budget),        "#f0f0f5"],
              ["Pre-set Expenses",   formatCur(expenses.filter((e) => e.isPreset).reduce((s, e) => s + e.amount, 0)),  "#8b5cf6"],
              ["Daily Expenses",     formatCur(expenses.filter((e) => !e.isPreset).reduce((s, e) => s + e.amount, 0)), "#3b82f6"],
              ["Expected (pending)", formatCur(totalExpected),  "#f59e0b"],
              ["Total Spent",        formatCur(totalSpent),     "#f97316"],
              ["Balance",            formatCur(remaining),      remaining < 0 ? "#ef4444" : "#10b981"],
            ].map(([l, v, c]) => (
              <div
                key={l}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: "1px solid #1e1e2e",
                  fontSize: 13,
                }}
              >
                <span style={{ color: "#a0a0b0" }}>{l}</span>
                <span
                  style={{
                    color: c,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* Daily allowance cards — splits into two when expected expenses exist */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: hasExpected ? "1fr 1fr" : "1fr",
              gap: 8,
            }}
          >
            <div className="card" style={{ background: "#0a1a10", borderColor: "#103a20" }}>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>
                Daily allowance
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#10b981" }}>
                {formatCur(Math.max(0, dailyAllowanceRaw))}
              </div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3 }}>
                next {daysLeft} days
              </div>
            </div>

            {hasExpected && (
              <div className="card" style={{ background: "#100f00", borderColor: "#3a3000" }}>
                <div style={{ fontSize: 11, color: "#f59e0b", marginBottom: 4 }}>
                  After expected
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: dailyAllowanceAdjusted < 0 ? "#ef4444" : "#f59e0b",
                  }}
                >
                  {formatCur(Math.max(0, dailyAllowanceAdjusted))}
                </div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3 }}>
                  next {daysLeft} days
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Recent Expenses ── */}
      <div className="card" style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>
          Recent Expenses
        </div>

        {expenses.length === 0 ? (
          <div
            style={{ color: "#6b7280", fontSize: 13, textAlign: "center", padding: 20 }}
          >
            No expenses yet
          </div>
        ) : (
          expenses
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map((e) => (
              <div
                key={e.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #1e1e2e",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: `${CAT_COLORS[e.category]}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      color: CAT_COLORS[e.category],
                    }}
                  >
                    {e.category[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{e.name}</div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>
                      {e.date} · {e.isPreset ? "Pre-set" : "Daily"}
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    color: "#f97316",
                  }}
                >
                  -{formatCur(e.amount)}
                </span>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
