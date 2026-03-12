// server/index.js
// Express backend — placeholder for future API routes (auth, persistence, etc.)

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// TODO: add expense routes (Day 2+)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
