export async function fetchModulesByGrade(gradeGroup) {
  try {
    const res = await fetch(
      `https://script.google.com/macros/s/AKfycbz5Dkhrv2MpGF8i01NA3JJc7kN91_1C9lQZ7jp7Tv0LgrjD2ggw7FYng1HoxA13HMLO/exec?grade=${encodeURIComponent(
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
