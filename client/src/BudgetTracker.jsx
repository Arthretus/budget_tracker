// BudgetTracker.jsx
// Root layout — wires useBudget hook to all components.
// Components are still stubs at this stage; this file establishes
// the full prop-passing contract so each component can be built independently.

import { useState } from "react";
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

  // Switches to the Add tab and pre-fills form for editing an existing expense
  function handleEditExpense(expense) {
    setTab("add");
    setTimeout(() => AddExpenseForm.triggerEdit?.(expense), 0);
  }

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
      <Header />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        {/* Budget amount + end date */}
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

        {/* Spent / Remaining / Daily Allowance */}
        <StatsRow
          totalSpent={totalSpent}
          remaining={remaining}
          dailyAllowanceRaw={dailyAllowanceRaw}
          daysLeft={daysLeft}
          pct={pct}
        />

        {/* Only visible when expected expenses exist */}
        <ExpectedBanner
          expectedExpenses={expectedExpenses}
          totalExpected={totalExpected}
          dailyAllowanceAdjusted={dailyAllowanceAdjusted}
          remainingAfterExpected={remainingAfterExpected}
        />

        {/* Animated budget used bar */}
        <ProgressBar
          pct={pct}
          statusColor={statusColor}
          totalSpent={totalSpent}
          totalExpected={totalExpected}
          budget={budget}
          hasExpected={expectedExpenses.length > 0}
        />

        {/* Tab navigation */}
        <TabBar
          tab={tab}
          setTab={setTab}
          expectedCount={expectedExpenses.length}
        />

        {/* Tab content */}
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
