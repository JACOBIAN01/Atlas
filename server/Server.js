const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

// =============================
// ✅ FIXED CORS MIDDLEWARE
// =============================
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all domains
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allowed methods
  res.header("Access-Control-Allow-Headers", "Content-Type"); // Allowed headers

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // 🚀 IMPORTANT: Handle preflight
  }

  next();
});

app.use(express.json());

// Google Script URL
const GAS_URL =
  "https://script.google.com/macros/s/AKfycbzNuPpPYe3av3w7mo2lY0AK-VagrXJQ1hKTHzkkgqcXc1iZYiaLY1KLy-zIrtsLpw4Ppg/exec";

// ====== API ROUTE FOR REACT ======
app.post("/submit", async (req, res) => {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit" });
  }
});

// ====== VERIFY ROUTE ======
app.get("/verify", async (req, res) => {
  const emailValue = req.query.email;

  try {
    const response = await fetch(
      `${GAS_URL}?email=${encodeURIComponent(emailValue)}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error verifying email:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
