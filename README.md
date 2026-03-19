# 💰 BudgetMate

A full-stack monthly budget tracker built with React + Express. Track your monthly budget, log daily expenses, plan for upcoming costs, and always know exactly how much you can spend per day.

## Features

- **Monthly budget** — set your budget and edit it anytime
- **Custom end date** — track until any date, not just the end of the month
- **Pre-set expenses** — add fixed monthly costs (rent, bills) that count toward your budget from day one
- **Daily expenses** — log spending as it happens throughout the month
- **Expected expenses** — reserve money for upcoming costs without deducting from your current balance; automatically adjusts your daily allowance so you don't overspend before they arrive
- **Daily allowance calculator** — remaining balance ÷ days left, shown both raw and adjusted for expected expenses
- **Over-budget alerts** — header, stats, and cards all turn red when you exceed your budget
- **Month summary** — full line-item breakdown of pre-set, daily, expected, and balance
- **Category breakdown** — color-coded bars showing spending distribution
- **Budget progress bar** — with a gold marker showing projected spend including expected costs
- **Filters** — filter all expenses by category and type (pre-set / daily)
- **Edit and delete** — for all expense types with inline form validation

## Tech Stack

- **Frontend:** React 18, Vite
- **Backend:** Node.js, Express
- **Styling:** Custom CSS-in-JS — dark theme
- **Fonts:** [Syne](https://fonts.google.com/specimen/Syne) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Client

```bash
cd client
npm install
npm run dev
```

Runs at **http://localhost:5173**

### Server

```bash
cd server
npm install
npm run dev
```

Runs at **http://localhost:3000**

> The frontend proxies `/api` requests to the backend automatically via Vite config — no manual CORS setup needed.

## Project Structure

```
budget_tracker/
├── client/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx                  # React entry point
│       ├── App.jsx                   # Root — renders BudgetTracker
│       ├── BudgetTracker.jsx         # Layout hub — wires hook to components
│       ├── constants.js              # Categories, colors, seed data
│       ├── utils/
│       │   └── helpers.js            # getToday, daysRemaining, formatCur
│       ├── hooks/
│       │   └── useBudget.js          # All state, calculations, and actions
│       └── components/
│           ├── GlobalStyles.jsx      # Google Fonts + shared CSS classes
│           ├── Header.jsx            # Sticky top bar, over-budget indicator
│           ├── BudgetSettings.jsx    # Budget amount + track-until date
│           ├── StatsRow.jsx          # Spent / Remaining / Daily Allowance
│           ├── ExpectedBanner.jsx    # Amber banner for expected expenses
│           ├── ProgressBar.jsx       # Animated bar + projected marker
│           ├── TabBar.jsx            # Tab navigation with badge
│           ├── Dashboard.jsx         # Category chart + summary + recent list
│           ├── AddExpenseForm.jsx    # Add / edit expense form
│           ├── ExpectedTab.jsx       # Manage expected future expenses
│           └── AllExpenses.jsx       # Filterable expense list
├── server/
│   ├── index.js                      # Express server + API routes
│   └── package.json
└── .gitignore
```

## How Expected Expenses Work

Expected expenses are upcoming costs you know will happen but haven't paid yet — no date required. Examples: a birthday gift, a trip ticket, a subscription renewal.

- They **do not** reduce your current balance
- They **do** reduce your daily allowance so you naturally spend less before they arrive
- A gold marker on the progress bar shows your projected total spend including expected costs
- Once you actually pay the expense, delete it from Expected and add it as a real Daily expense

## Currency

All amounts are in **Indian Rupees (₹)** formatted with the `en-IN` locale.
