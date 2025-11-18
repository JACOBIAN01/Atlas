export async function fetchModulesByGrade(gradeGroup) {
  try {
    const res = await fetch(
      `https://script.google.com/macros/s/AKfycbyuo7EXFVTbUZSGy4D-Nv3T8IR2l_vQyWKkpJqbeDRs9OFRo4IyJL4AxFAFMsgElIb3/exec?grade=${encodeURIComponent(
        gradeGroup
      )}`
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch modules");
    }

    return data.modules || [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}
