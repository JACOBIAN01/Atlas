import { useState } from "react";
import { moduleData } from "../Modules";

export default function ModuleSubmission({ teacher, gradeGroup }) {
  const [moduleName, setModuleName] = useState("");
  const [error, setError] = useState("");

  async function submitToSheet(payload) {
    const res = await fetch("https://atlas-mu-teal.vercel.app/api/submit", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  }

  const handleSubmit = async () => {
    if (!moduleName) {
      setError("Required");
      return;
    }

    setError("");
    const payload = {
      name: teacher.name,
      email: teacher.email ?? "",
      batch: teacher.batch,
      gradeGroup: gradeGroup,
      moduleName: moduleName,
    };

    console.log("Submitting:", payload);

    await submitToSheet(payload);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-[#f4ecff] py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md border border-purple-200">
        <div className="bg-purple-700 text-white p-4 rounded-t-xl text-lg font-medium">
          Choose Module Completed
        </div>

        <div className="p-6">
          <label className="text-lg font-medium text-gray-800">
            Choose the Module <span className="text-red-600">*</span>
          </label>

          <select
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            disabled={!gradeGroup}
            className={`w-full mt-3 p-3 border rounded-lg focus:ring-2 outline-none ${
              error
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-purple-400"
            }`}
          >
            <option value="">Choose Module</option>

            {gradeGroup &&
              moduleData[gradeGroup]?.map((module, idx) => (
                <option key={idx} value={module}>
                  {module}
                </option>
              ))}
          </select>

          {error && (
            <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
              ⚠️ This is a required question
            </p>
          )}

          <button
            onClick={handleSubmit}
            className="mt-6 bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg w-full font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
