export const VerifyEmail = async (email) => {
  return fetch(
    `https://atlas-3-pl8c.onrender.com/verify-email?email=${email}`
  ).then((res) => res.json());
};

export const SubmitModules = async (data) => {
  return fetch("https://atlas-3-pl8c.onrender.com/submit-modules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export async function fetchGradeGroups() {
  try {
    const res = await fetch("https://atlas-3-pl8c.onrender.com/grade-groups");

    if (!res.ok) throw new Error("Network error");

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch grade groups");
    }

    return data.gradeGroups || [];
  } catch (err) {
    console.error("Frontend Fetch Error:", err);
    return [];
  }
}

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
