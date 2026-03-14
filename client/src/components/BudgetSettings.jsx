// components/BudgetSettings.jsx
// Two side-by-side cards:
//   Left  — monthly budget amount with inline edit
//   Right — track-until date picker + days remaining counter

import { getToday, formatCur } from "../utils/helpers";

export default function BudgetSettings({
  budget,
  budgetInput,
  setBudgetInput,
  showBudgetEdit,
  setShowBudgetEdit,
  saveBudget,
  endDate,
  setEndDate,
  daysLeft,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginBottom: 16,
      }}
    >
      {/* ── Monthly Budget Card ── */}
      <div
        className="card fade-in"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: "#6b7280",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Monthly Budget
          </div>

          {showBudgetEdit ? (
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <input
                className="input"
                style={{ width: 130 }}
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveBudget()}
                autoFocus
              />
              <button
                className="btn"
                style={{
                  background: "#6c63ff",
                  color: "#fff",
                  padding: "8px 14px",
                  fontSize: 13,
                }}
                onClick={saveBudget}
              >
                Save
              </button>
            </div>
          ) : (
            <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>
              {formatCur(budget)}
            </div>
          )}
        </div>

        <button
          className="btn"
          style={{
            background: "#1e1e2e",
            color: "#a0a0b0",
            padding: "8px 14px",
            fontSize: 12,
          }}
          onClick={() => {
            setShowBudgetEdit(!showBudgetEdit);
            setBudgetInput(String(budget));
          }}
        >
          {showBudgetEdit ? "Cancel" : "✎ Edit"}
        </button>
      </div>

      {/* ── Track Until Card ── */}
      <div
        className="card fade-in"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: "#6b7280",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Track Until
          </div>
          <input
            type="date"
            className="input"
            style={{
              width: "auto",
              marginTop: 6,
              background: "transparent",
              border: "none",
              fontSize: 20,
              fontWeight: 800,
              padding: 0,
              color: "#f0f0f5",
            }}
            value={endDate}
            min={getToday()}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#6b7280" }}>Days left</div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: daysLeft <= 3 ? "#ef4444" : "#6c63ff",
            }}
          >
            {daysLeft}
          </div>
        </div>
      </div>
    </div>
  );
}
