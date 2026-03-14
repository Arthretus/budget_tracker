// hooks/useBudget.js
// Central hook — owns all budget state, derived calculations, and actions.
// All components are purely presentational and consume this hook via BudgetTracker.jsx.

import { useState, useMemo } from "react";
import { INITIAL_PRESET_EXPENSES } from "../constants";
import { getToday, getLastDayOfMonth, daysRemaining } from "../utils/helpers";

export function useBudget() {
  // ── Core settings ────────────────────────────────────────────
  const [budget, setBudget] = useState(30000);
  const [budgetInput, setBudgetInput] = useState("30000");
  const [endDate, setEndDate] = useState(getLastDayOfMonth());
  const [showBudgetEdit, setShowBudgetEdit] = useState(false);

  // ── Expense lists ────────────────────────────────────────────
  const [expenses, setExpenses] = useState(INITIAL_PRESET_EXPENSES);
  const [expectedExpenses, setExpectedExpenses] = useState([]);

  // ── Derived calculations ─────────────────────────────────────
  const totalSpent = useMemo(
    () => expenses.reduce((s, e) => s + Number(e.amount), 0),
    [expenses]
  );

  const totalExpected = useMemo(
    () => expectedExpenses.reduce((s, e) => s + Number(e.amount), 0),
    [expectedExpenses]
  );

  const remaining = budget - totalSpent;
  const daysLeft = daysRemaining(endDate);

  // Daily allowance without factoring in expected expenses
  const dailyAllowanceRaw = daysLeft > 0 ? remaining / daysLeft : 0;

  // Daily allowance after reserving for expected expenses
  const remainingAfterExpected = remaining - totalExpected;
  const dailyAllowanceAdjusted =
    daysLeft > 0 ? remainingAfterExpected / daysLeft : 0;

  // Percentage of budget consumed (capped at 100)
  const pct = Math.min(100, (totalSpent / budget) * 100);

  // Progress bar color — green → amber → red as budget depletes
  const statusColor =
    pct > 90 ? "#ef4444" : pct > 70 ? "#f59e0b" : "#10b981";

  // Spending totals grouped by category
  const byCategory = useMemo(() => {
    const map = {};
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + Number(e.amount);
    });
    return map;
  }, [expenses]);

  // ── Budget actions ───────────────────────────────────────────
  function saveBudget() {
    const val = parseFloat(budgetInput);
    if (!isNaN(val) && val > 0) setBudget(val);
    setShowBudgetEdit(false);
  }

  // ── Actual expense actions ───────────────────────────────────
  /**
   * Add a new expense or update an existing one.
   * @param {object} form      - form field values
   * @param {number|null} editingId - id of expense being edited, or null for new
   * @param {function} onDone  - callback to reset form state after save
   */
  function addExpense(form, editingId, onDone) {
    if (
      !form.name ||
      !form.amount ||
      isNaN(form.amount) ||
      Number(form.amount) <= 0
    )
      return;

    if (editingId !== null) {
      setExpenses((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? { ...e, ...form, amount: Number(form.amount) }
            : e
        )
      );
    } else {
      setExpenses((prev) => [
        ...prev,
        { ...form, id: Date.now(), amount: Number(form.amount) },
      ]);
    }
    onDone();
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  // ── Expected expense actions ─────────────────────────────────
  /**
   * Add a new expected expense or update an existing one.
   * Expected expenses have no fixed date — they only affect the daily allowance.
   */
  function addExpected(expForm, editingExpId, onDone) {
    if (
      !expForm.name ||
      !expForm.amount ||
      isNaN(expForm.amount) ||
      Number(expForm.amount) <= 0
    )
      return;

    if (editingExpId !== null) {
      setExpectedExpenses((prev) =>
        prev.map((e) =>
          e.id === editingExpId
            ? { ...e, ...expForm, amount: Number(expForm.amount) }
            : e
        )
      );
    } else {
      setExpectedExpenses((prev) => [
        ...prev,
        { ...expForm, id: Date.now(), amount: Number(expForm.amount) },
      ]);
    }
    onDone();
  }

  function deleteExpected(id) {
    setExpectedExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return {
    // Settings state
    budget, budgetInput, setBudgetInput,
    endDate, setEndDate,
    showBudgetEdit, setShowBudgetEdit,
    saveBudget,

    // Data
    expenses, expectedExpenses,
    byCategory,

    // Derived numbers
    totalSpent, totalExpected,
    remaining, remainingAfterExpected,
    daysLeft,
    dailyAllowanceRaw, dailyAllowanceAdjusted,
    pct, statusColor,

    // Actions
    addExpense, deleteExpense,
    addExpected, deleteExpected,
  };
}
