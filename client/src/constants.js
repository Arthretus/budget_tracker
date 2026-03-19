// constants.js
// App-wide constants — categories, colors, and default seed data.

export const CATEGORIES = [
  "Food",
  "Transport",
  "Rent",
  "Utilities",
  "Entertainment",
  "Health",
  "Shopping",
  "Other",
];

export const CAT_COLORS = {
  Food:          "#f97316",
  Transport:     "#3b82f6",
  Rent:          "#8b5cf6",
  Utilities:     "#06b6d4",
  Entertainment: "#ec4899",
  Health:        "#10b981",
  Shopping:      "#f59e0b",
  Other:         "#6b7280",
};

export const INITIAL_PRESET_EXPENSES = [
  {
    id: 1,
    name: "Rent",
    amount: 8000,
    category: "Rent",
    isPreset: true,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 2,
    name: "Electricity Bill",
    amount: 1200,
    category: "Utilities",
    isPreset: true,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 3,
    name: "Internet",
    amount: 600,
    category: "Utilities",
    isPreset: true,
    date: new Date().toISOString().split("T")[0],
  },
];
