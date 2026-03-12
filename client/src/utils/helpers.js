// utils/helpers.js
// Pure utility functions used across the app.

/**
 * Returns today's date as a YYYY-MM-DD string.
 * @returns {string}
 */
export function getToday() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Returns the number of days from today up to and including endDate.
 * Returns 0 if endDate is in the past.
 * @param {string} endDate - YYYY-MM-DD
 * @returns {number}
 */
export function daysRemaining(endDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff + 1);
}

/**
 * Formats a number as an Indian Rupee string.
 * e.g. 10000 → "₹10,000"
 * @param {number} n
 * @returns {string}
 */
export function formatCur(n) {
  return "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

/**
 * Returns the last calendar day of the current month as YYYY-MM-DD.
 * @returns {string}
 */
export function getLastDayOfMonth() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];
}
