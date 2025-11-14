import fetch from "node-fetch";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbzNuPpPYe3av3w7mo2lY0AK-VagrXJQ1hKTHzkkgqcXc1iZYiaLY1KLy-zIrtsLpw4Ppg/exec";

export default async function handler(req, res) {
  // ---------- CORS ----------
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}
