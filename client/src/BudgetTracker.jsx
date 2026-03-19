// BudgetTracker.jsx
// Root layout — wires useBudget hook to all components.
//
// Day 8 changes:
//   - edit flow uses useCallback to avoid stale closure issues
//   - over-budget state passed explicitly to StatsRow for red highlighting
//   - page title updates to reflect budget status

import { useState, useCallback } from "react";
import { useBudget } from "./hooks/useBudget";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import BudgetSettings from "./components/BudgetSettings";
import StatsRow from "./components/StatsRow";
import ExpectedBanner from "./components/ExpectedBanner";
import ProgressBar from "./components/ProgressBar";
import TabBar from "./components/TabBar";
import Dashboard from "./components/Dashboard";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpectedTab from "./components/ExpectedTab";
import AllExpenses from "./components/AllExpenses";

export default function BudgetTracker() {
  const [tab, setTab] = useState("dashboard");

  const {
    // Settings
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
  } = useBudget();

  const isOverBudget = remaining < 0;

  // useCallback prevents a new function reference on every render,
  // avoiding unnecessary re-renders in AllExpenses
  const handleEditExpense = useCallback((expense) => {
    setTab("add");
    setTimeout(() => AddExpenseForm.triggerEdit?.(expense), 0);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Syne', sans-serif",
        minHeight: "100vh",
        background: "#0a0a0f",
        color: "#f0f0f5",
      }}
    >
      <GlobalStyles />
      <Header isOverBudget={isOverBudget} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        <BudgetSettings
          budget={budget}
          budgetInput={budgetInput}
          setBudgetInput={setBudgetInput}
          showBudgetEdit={showBudgetEdit}
          setShowBudgetEdit={setShowBudgetEdit}
          saveBudget={saveBudget}
          endDate={endDate}
          setEndDate={setEndDate}
          daysLeft={daysLeft}
        />

        <StatsRow
          totalSpent={totalSpent}
          remaining={remaining}
          dailyAllowanceRaw={dailyAllowanceRaw}
          daysLeft={daysLeft}
          pct={pct}
          isOverBudget={isOverBudget}
        />

        <ExpectedBanner
          expectedExpenses={expectedExpenses}
          totalExpected={totalExpected}
          dailyAllowanceAdjusted={dailyAllowanceAdjusted}
          remainingAfterExpected={remainingAfterExpected}
        />

        <ProgressBar
          pct={pct}
          statusColor={statusColor}
          totalSpent={totalSpent}
          totalExpected={totalExpected}
          budget={budget}
          hasExpected={expectedExpenses.length > 0}
        />

        <TabBar
          tab={tab}
          setTab={setTab}
          expectedCount={expectedExpenses.length}
        />

        {tab === "dashboard" && (
          <Dashboard
            expenses={expenses}
            byCategory={byCategory}
            totalSpent={totalSpent}
            totalExpected={totalExpected}
            budget={budget}
            remaining={remaining}
            daysLeft={daysLeft}
            dailyAllowanceRaw={dailyAllowanceRaw}
            dailyAllowanceAdjusted={dailyAllowanceAdjusted}
            hasExpected={expectedExpenses.length > 0}
          />
        )}

        {tab === "add" && (
          <AddExpenseForm addExpense={addExpense} />
        )}

        {tab === "expected" && (
          <ExpectedTab
            expectedExpenses={expectedExpenses}
            totalExpected={totalExpected}
            dailyAllowanceRaw={dailyAllowanceRaw}
            dailyAllowanceAdjusted={dailyAllowanceAdjusted}
            remainingAfterExpected={remainingAfterExpected}
            addExpected={addExpected}
            deleteExpected={deleteExpected}
          />
        )}

        {tab === "expenses" && (
          <AllExpenses
            expenses={expenses}
            deleteExpense={deleteExpense}
            onEdit={handleEditExpense}
          />
        )}
      </div>
    </div>
  );
}
