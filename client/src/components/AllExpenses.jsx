// components/AllExpenses.jsx
// Full list of all actual expenses with category and type filters.
// Sorted by date descending. Each row has edit and delete actions.

import { useState, useMemo } from "react";
import { CATEGORIES, CAT_COLORS } from "../constants";
import { formatCur } from "../utils/helpers";

export default function AllExpenses({ expenses, deleteExpense, onEdit }) {
  const [filterCat, setFilterCat] = useState("All");
  const [filterType, setFilterType] = useState("All");

  // Re-filter only when expenses list or active filters change
  const filtered = useMemo(() => {
    return expenses
      .filter((e) => {
        const catOk = filterCat === "All" || e.category === filterCat;
        const typeOk =
          filterType === "All" ||
          (filterType === "Preset" ? e.isPreset : !e.isPreset);
        return catOk && typeOk;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses, filterCat, filterType]);

  return (
    <div className="fade-in">

      {/* ── Filters ── */}
      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <select
          className="input"
          style={{ width: "auto" }}
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="input"
          style={{ width: "auto" }}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Preset">Pre-set</option>
          <option value="Daily">Daily</option>
        </select>

        {/* Result count */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#6b7280",
          }}
        >
          {filtered.length} expense{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* ── Expense List ── */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: "#6b7280" }}>
            No expenses found
          </div>
        ) : (
          filtered.map((e, i) => (
            <div
              key={e.id}
              className="row-hover"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 20px",
                borderBottom: i < filtered.length - 1 ? "1px solid #1e1e2e" : "none",
                gap: 14,
                transition: "background 0.15s",
              }}
            >
              {/* Category icon */}
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: `${CAT_COLORS[e.category]}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: CAT_COLORS[e.category],
                  fontWeight: 800,
                  fontSize: 15,
                  flexShrink: 0,
                }}
              >
                {e.category[0]}
              </div>

              {/* Name + tags */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{e.name}</div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 3,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="tag"
                    style={{
                      background: `${CAT_COLORS[e.category]}22`,
                      color: CAT_COLORS[e.category],
                    }}
                  >
                    {e.category}
                  </span>
                  <span
                    className="tag"
                    style={{
                      background: e.isPreset ? "#8b5cf611" : "#3b82f611",
                      color: e.isPreset ? "#8b5cf6" : "#3b82f6",
                    }}
                  >
                    {e.isPreset ? "Pre-set" : "Daily"}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#6b7280",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {e.date}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  color: "#f97316",
                  fontSize: 15,
                  flexShrink: 0,
                }}
              >
                -{formatCur(e.amount)}
              </div>

              {/* Edit + Delete */}
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button
                  className="btn"
                  style={{
                    background: "#1e1e2e",
                    color: "#a0a0b0",
                    padding: "6px 12px",
                    fontSize: 12,
                  }}
                  onClick={() => onEdit(e)}
                >
                  ✎
                </button>
                <button
                  className="btn"
                  style={{
                    background: "#2a1010",
                    color: "#ef4444",
                    padding: "6px 12px",
                    fontSize: 12,
                  }}
                  onClick={() => deleteExpense(e.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}