// components/Header.jsx
// Sticky top bar — BudgetMate logo on the left, today's date on the right.
//
// Day 8 changes:
//   - accepts isOverBudget prop — shows a red alert pill when over budget

export default function Header({ isOverBudget }) {
  const today = new Date();

  return (
    <div
      style={{
        background: "#0d0d14",
        borderBottom: `1px solid ${isOverBudget ? "#ef444433" : "#1e1e2e"}`,
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "border-color 0.3s",
      }}
    >
      {/* Logo + app name */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            background: "linear-gradient(135deg, #6c63ff, #ec4899)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
          }}
        >
          ₹
        </div>
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px" }}>
          BudgetMate
        </span>

        {/* Over-budget alert pill */}
        {isOverBudget && (
          <span
            style={{
              background: "#ef444422",
              color: "#ef4444",
              border: "1px solid #ef444433",
              borderRadius: 20,
              padding: "2px 10px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            ⚠ Over Budget
          </span>
        )}
      </div>

      {/* Today's date */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          color: "#6b7280",
        }}
      >
        {today.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </div>
    </div>
  );
}
