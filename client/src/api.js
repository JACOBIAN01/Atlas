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

