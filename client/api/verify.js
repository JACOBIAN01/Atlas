export default async function handler(req, res) {
  // ---- CORS ----
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const email = req.query.email;

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxDA3Q_5dTotv2eM5WxphW0l9OQrm-pIPwoJVLfO59URAz7j5W2slVC-OhvZ5_qcHFb/exec";

  try {
    const response = await fetch(
      `${GAS_URL}?email=${encodeURIComponent(email)}`
    );

    const text = await response.text(); // <-- get raw text

    try {
      const data = JSON.parse(text); // <-- convert to JSON
      return res.status(200).json(data);
    } catch {
      console.error("GAS returned non-JSON:", text);
      return res.status(500).json({ error: "GAS returned invalid JSON" });
    }
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
