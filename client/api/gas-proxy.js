export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).json({ status: "ok" });
  }

  try {
    const gasUrl =
      "https://script.google.com/macros/s/AKfycbyO-OqgCnZ4uZwV-xHOZTJq4tqJP0DrCTJd8R9PcVRyxpx27USPWdVTxNgYQBCWQAdx/exec";

    const forwardResponse = await fetch(gasUrl, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await forwardResponse.json();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Proxy failed" });
  }
}
