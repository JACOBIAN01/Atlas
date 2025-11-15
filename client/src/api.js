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

// export const GAS_URL =
//   "https://script.google.com/macros/s/AKfycbz5Dkhrv2MpGF8i01NA3JJc7kN91_1C9lQZ7jp7Tv0LgrjD2ggw7FYng1HoxA13HMLO/exec";

// export const VerifyEmail = async (email) => {
//   return fetch(`${GAS_URL}?email=${email}`).then((res) => res.json());
// };

// export const SubmitModules = async (data) => {
//   return fetch(GAS_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   }).then((res) => res.json());
// };
