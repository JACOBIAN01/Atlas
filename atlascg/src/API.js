// ===============================
// BASE URL OF YOUR EXPRESS SERVER
// ===============================
const BASE_URL = "https://atlas-3-pl8c.onrender.com";

// ===============================
// FETCH ROWS (GET)
// ===============================
export const fetchRows = async () => {
  try {
    const res = await fetch(`${BASE_URL}/fetch-rows`);
    if (!res.ok) throw new Error("Failed to fetch rows");
    const data = await res.json();

    // Convert Google Sheet 2D array -> Objects
    const rows = data.slice(1).map((row) => ({
      id: row[0],
      name: row[1],
      email: row[2],
      skills: row[3],
    }));

    return rows;
  } catch (err) {
    console.error("Frontend FetchRows Error:", err);
    return [];
  }
};

// ===============================
// GENERATE CERTIFICATE (POST)
// ===============================
export const generateCertificate = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Frontend Certificate Error:", err);
    return { success: false, message: "Network Error" };
  }
};
