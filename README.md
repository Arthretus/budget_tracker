# 💰 BudgetMate

A full-stack monthly budget tracker built with React + Express.

## Features (in progress)
- Set a monthly budget and custom end date
- Add pre-set monthly expenses (rent, bills, etc.)
- Log daily expenses as you spend
- Track remaining balance and daily allowance
- Expected expenses — reserve money for upcoming costs without deducting yet
- Month-wise summary and category breakdown

## Tech Stack
- **Frontend:** React 18, Vite
- **Backend:** Node.js, Express
- **Styling:** Custom CSS-in-JS (dark theme)

## Getting Started

### Client
```bash
cd client
npm install
npm run dev
```

### Server
```bash
cd server
npm install
npm run dev
```

## Project Structure
```
budget_tracker/
├── client/
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Helper functions
│   │   ├── constants.js  # App-wide constants
│   │   ├── BudgetTracker.jsx
│   │   └── App.jsx
│   └── package.json
├── server/
│   ├── index.js
│   └── package.json
└── .gitignore
```

## Status
🚧 Under active development
