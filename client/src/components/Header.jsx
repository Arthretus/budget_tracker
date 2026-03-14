// components/Header.jsx
// Sticky top bar — BudgetMate logo on the left, today's date on the right.

export default function Header() {
  const today = new Date();

  return (
    <div
      style={{
        background: "#0d0d14",
        borderBottom: "1px solid #1e1e2e",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
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
