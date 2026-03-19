// components/AddExpenseForm.jsx
// Form for adding a new expense or editing an existing one.
//
// Day 8 changes:
//   - shows inline validation error when name or amount is missing on submit
//   - error clears as soon as the user starts typing
//   - amount field rejects negative numbers via onKeyDown
//   - form scrolls into view on edit trigger for better UX

import { useState } from "react";
import { CATEGORIES } from "../constants";
import { getToday } from "../utils/helpers";

const EMPTY_FORM = {
  name: "",
  amount: "",
  category: "Food",
  date: getToday(),
  isPreset: false,
};

export default function AddExpenseForm({ addExpense }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // Called by BudgetTracker when user clicks ✎ on an expense row
  AddExpenseForm.triggerEdit = (expense) => {
    setEditingId(expense.id);
    setError("");
    setForm({
      name: expense.name,
      amount: String(expense.amount),
      category: expense.category,
      date: expense.date,
      isPreset: expense.isPreset,
    });
    // Scroll form into view smoothly
    setTimeout(() => {
      document.getElementById("expense-form")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  function handleSubmit() {
    // Inline validation
    if (!form.name.trim()) {
      setError("Please enter an expense name.");
      return;
    }
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }

    setError("");
    addExpense(form, editingId, () => {
      setForm(EMPTY_FORM);
      setEditingId(null);
    });
  }

  function handleCancel() {
    setEditingId(null);
    setError("");
    setForm(EMPTY_FORM);
  }

  function clearError() {
    if (error) setError("");
  }

  return (
    <div id="expense-form" className="card fade-in">
      <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 20 }}>
        {editingId ? "Edit Expense" : "Add Expense"}
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
            placeholder="e.g. Groceries"
            value={form.name}
            onChange={(e) => {
              clearError();
              setForm((f) => ({ ...f, name: e.target.value }));
            }}
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
            min="0"
            value={form.amount}
            onKeyDown={(e) => {
              // Block minus sign
              if (e.key === "-") e.preventDefault();
            }}
            onChange={(e) => {
              clearError();
              setForm((f) => ({ ...f, amount: e.target.value }));
            }}
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
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Date */}
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
            Date
          </label>
          <input
            className="input"
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          />
        </div>

        {/* Type toggle */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label
            style={{
              fontSize: 12,
              color: "#6b7280",
              display: "block",
              marginBottom: 8,
              fontWeight: 700,
            }}
          >
            Type
          </label>
          <div style={{ display: "flex", gap: 10 }}>
            {[false, true].map((isP) => (
              <button
                key={String(isP)}
                className="btn"
                onClick={() => setForm((f) => ({ ...f, isPreset: isP }))}
                style={{
                  padding: "10px 20px",
                  fontSize: 13,
                  background:
                    form.isPreset === isP
                      ? isP ? "#8b5cf6" : "#3b82f6"
                      : "#1e1e2e",
                  color: form.isPreset === isP ? "#fff" : "#a0a0b0",
                }}
              >
                {isP ? "🔒 Pre-set (Monthly)" : "📅 Daily Expense"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Validation error */}
      {error && (
        <div
          style={{
            marginTop: 14,
            padding: "10px 14px",
            background: "#1a0a0a",
            border: "1px solid #ef444433",
            borderRadius: 10,
            fontSize: 13,
            color: "#ef4444",
          }}
        >
          {error}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button
          className="btn"
          style={{
            background: "#6c63ff",
            color: "#fff",
            padding: "12px 28px",
            fontSize: 14,
          }}
          onClick={handleSubmit}
        >
          {editingId ? "Update" : "Add Expense"}
        </button>

        {editingId && (
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
  );
}
