// components/ExpectedTab.jsx
// Tab for managing expected future expenses — costs that are coming
// but have no fixed date yet.
//
// Expected expenses do NOT deduct from the current balance.
// They only reduce the daily allowance calculation so you don't
// overspend before they arrive.

import { useState } from "react";
import { CATEGORIES, CAT_COLORS } from "../constants";
import { formatCur } from "../utils/helpers";

const EMPTY_EXP_FORM = { name: "", amount: "", category: "Food", note: "" };

export default function ExpectedTab({
  expectedExpenses,
  totalExpected,
  dailyAllowanceRaw,
  dailyAllowanceAdjusted,
  remainingAfterExpected,
  addExpected,
  deleteExpected,
}) {
  const [expForm, setExpForm] = useState(EMPTY_EXP_FORM);
  const [editingExpId, setEditingExpId] = useState(null);

  function handleSubmit() {
    addExpected(expForm, editingExpId, () => {
      setExpForm(EMPTY_EXP_FORM);
      setEditingExpId(null);
    });
  }

  function handleCancel() {
    setEditingExpId(null);
    setExpForm(EMPTY_EXP_FORM);
  }

  function startEditExpected(e) {
    setEditingExpId(e.id);
    setExpForm({
      name: e.name,
      amount: String(e.amount),
      category: e.category,
      note: e.note || "",
    });
  }

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* ── Explainer ── */}
      <div
        style={{
          background: "#0f0f1e",
          border: "1px solid #f59e0b33",
          borderRadius: 14,
          padding: "14px 18px",
          fontSize: 13,
          color: "#a0a0b0",
          lineHeight: 1.7,
        }}
      >
        <span style={{ color: "#f59e0b", fontWeight: 700 }}>🔮 Expected Expenses</span> are costs
        you know are coming but haven't paid yet — no date needed. They{" "}
        <strong style={{ color: "#f0f0f5" }}>don't reduce your current balance</strong>, but they
        pull down your <strong style={{ color: "#f0f0f5" }}>daily allowance</strong> so you don't
        overspend before they hit.
      </div>

      {/* ── Add / Edit Form ── */}
      <div className="card">
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>
          {editingExpId ? "Edit Expected Expense" : "Add Expected Expense"}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

          {/* Name */}
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#6b7280",
                display: "block",
                marginBottom: 6,
                fontWeight: 700,
              }}
            >
              Name *
            </label>
            <input
              className="input"
              placeholder="e.g. Birthday gift, Trip ticket"
              value={expForm.name}
              onChange={(e) => setExpForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>

          {/* Amount */}
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#6b7280",
                display: "block",
                marginBottom: 6,
                fontWeight: 700,
              }}
            >
              Amount (₹) *
            </label>
            <input
              className="input"
              type="number"
              placeholder="0"
              value={expForm.amount}
              onChange={(e) => setExpForm((f) => ({ ...f, amount: e.target.value }))}
            />
          </div>

          {/* Category */}
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#6b7280",
                display: "block",
                marginBottom: 6,
                fontWeight: 700,
              }}
            >
              Category
            </label>
            <select
              className="input"
              value={expForm.category}
              onChange={(e) => setExpForm((f) => ({ ...f, category: e.target.value }))}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Note — optional, replaces date since no fixed date */}
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#6b7280",
                display: "block",
                marginBottom: 6,
                fontWeight: 700,
              }}
            >
              When / Note{" "}
              <span style={{ color: "#3a3a4e" }}>(optional)</span>
            </label>
            <input
              className="input"
              placeholder="e.g. Sometime this week, end of month…"
              value={expForm.note}
              onChange={(e) => setExpForm((f) => ({ ...f, note: e.target.value }))}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button
            className="btn"
            style={{
              background: "#f59e0b",
              color: "#000",
              padding: "12px 28px",
              fontSize: 14,
            }}
            onClick={handleSubmit}
          >
            {editingExpId ? "Update" : "Add Expected"}
          </button>
          {editingExpId && (
            <button
              className="btn"
              style={{
                background: "#1e1e2e",
                color: "#a0a0b0",
                padding: "12px 20px",
                fontSize: 14,
              }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ── Expected List ── */}
      {expectedExpenses.length > 0 ? (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>

          {/* List header */}
          <div
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid #1e1e2e",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 14 }}>Expected List</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: "#f59e0b",
              }}
            >
              Total: {formatCur(totalExpected)}
            </span>
          </div>

          {/* Rows */}
          {expectedExpenses.map((e, i) => (
            <div
              key={e.id}
              className="row-hover"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 20px",
                borderBottom:
                  i < expectedExpenses.length - 1 ? "1px solid #1e1e2e" : "none",
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

              {/* Name + tags + note */}
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
                    style={{ background: "#f59e0b18", color: "#f59e0b" }}
                  >
                    Expected
                  </span>
                  {e.note && (
                    <span style={{ fontSize: 11, color: "#6b7280", fontStyle: "italic" }}>
                      {e.note}
                    </span>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  color: "#f59e0b",
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
                  onClick={() => startEditExpected(e)}
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
                  onClick={() => deleteExpected(e.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          {/* Footer — daily allowance impact summary */}
          <div
            style={{
              padding: "14px 20px",
              background: "#0f0f1a",
              borderTop: "1px solid #1e1e2e",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 13, color: "#6b7280" }}>
              Daily:{" "}
              <span style={{ color: "#10b981", fontWeight: 700 }}>
                {formatCur(Math.max(0, dailyAllowanceRaw))}
              </span>
              <span style={{ margin: "0 8px", color: "#3a3a4e" }}>→</span>
              <span style={{ color: "#f59e0b", fontWeight: 700 }}>
                {formatCur(Math.max(0, dailyAllowanceAdjusted))}
              </span>
              <span style={{ color: "#6b7280" }}> after expected</span>
            </span>
            <span style={{ fontSize: 13, color: "#6b7280" }}>
              Balance after expected:{" "}
              <span
                style={{
                  color: remainingAfterExpected < 0 ? "#ef4444" : "#10b981",
                  fontWeight: 700,
                }}
              >
                {formatCur(remainingAfterExpected)}
              </span>
            </span>
          </div>
        </div>
      ) : (
        <div
          style={{ textAlign: "center", padding: "40px 0", color: "#3a3a4e", fontSize: 14 }}
        >
          No expected expenses added yet
        </div>
      )}
    </div>
  );
}
