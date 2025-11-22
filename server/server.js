const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyuo7EXFVTbUZSGy4D-Nv3T8IR2l_vQyWKkpJqbeDRs9OFRo4IyJL4AxFAFMsgElIb3/exec";

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
//          GET LAST Submitted Modules
// --------------------------------------
app.get("/get-last-module", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email missing" });
    }

    const response = await fetch(
      `${GAS_URL}?lastModule=true&email=${encodeURIComponent(email)}`
    );

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error("Error fetching last module:", err);
    return res.status(500).json({
      success: false,
      error: "Server error while fetching last module",
      details: err.message,
    });
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

const GAS_URL_CG =
  "https://script.google.com/macros/s/AKfycbzQ2jLjySJupAeH7xS2Bs0_eiQU8hJg86zr_ZR8Y6be6ha15rm4rBJehMiUSlA8dLx2/exec";

// ------------------------------
//  FETCH ROWS FROM GOOGLE SHEET
// ------------------------------
app.get("/fetch-rows", async (req, res) => {
  try {
    const response = await fetch(`${GAS_URL_CG}?action=getData`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching rows:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// ------------------------------
//  GENERATE CERTIFICATE
// ------------------------------
app.post("/generate", async (req, res) => {
  try {
    const response = await fetch(`${GAS_URL_CG}?action=generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Certificate generation error:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});
// --------------------------------------
app.listen(5000, () => console.log("Server running on port 5000"));
