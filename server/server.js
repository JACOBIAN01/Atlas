const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Your GAS Web App URL
const GAS_URL =
  "https://script.google.com/macros/s/AKfycbz5Dkhrv2MpGF8i01NA3JJc7kN91_1C9lQZ7jp7Tv0LgrjD2ggw7FYng1HoxA13HMLO/exec";

// --------------------------------------
//           VERIFY EMAIL (GET)
// --------------------------------------
app.get("/verify-email", async (req, res) => {
  try {
    const email = req.query.email;

    const response = await fetch(`${GAS_URL}?email=${email}`);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err });
  }
});

// --------------------------------------
//           SUBMIT MODULES (POST)
// --------------------------------------
app.post("/submit-modules", async (req, res) => {
  try {
    const body = req.body;

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err });
  }
});


// GET /grade-groups
app.get("/grade-groups", async (req, res) => {
  try {
    const response = await fetch(`${GAS_URL}?action=gradeGroups`);

    if (!response.ok) {
      return res.status(500).json({
        success: false,
        message: "Failed to contact Google Apps Script",
      });
    }

    const data = await response.json();

    // GAS should return { success: true, gradeGroups: [...] }
    return res.json(data);
  } catch (err) {
    console.error("Backend Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// --------------------------------------
app.listen(5000, () => console.log("Server running on port 5000"));
