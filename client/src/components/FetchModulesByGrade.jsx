export async function fetchModulesByGrade(gradeGroup) {
  try {
    const res = await fetch(
      `https://script.google.com/macros/s/AKfycbw5gM9qGCS4d6IJOOnfDfvrEPh1QCMreRagXoTyYo2VBrIUf9gqrI_23BmjidymnMfi/exec?grade=${encodeURIComponent(
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
