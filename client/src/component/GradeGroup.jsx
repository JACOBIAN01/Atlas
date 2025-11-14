import { useState } from "react";

export default function GradeGroup({ onContinue, gradeGroup, setGradeGroup }) {
  const [error, setError] = useState("");

  const gradeOptions = [
    "Grade 1-3",
    "Grade 4-5",
    "Grade 6-8",
    "Grade 9-12",
    "Roblox",
    "AI expert (6-12)",
    "AI genius (1-5)",
    "Android Application Development Course",
    "AP Computer Science A",
    "Prompt Engineering for Kids",
    "Block Coding Legend (Advance Level)",
  ];

  const handleContinue = () => {
    if (!gradeGroup) {
      setError("Required");
      return;
    }
    setError("");
    onContinue(gradeGroup);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-[#f4ecff] py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md border border-purple-200">
        <div className="bg-purple-700 text-white p-4 rounded-t-xl text-lg font-medium">
          Choose Grade Group
        </div>

        <div className="p-6">
          <label className="text-lg font-medium text-gray-800">
            Choose your Grade Group <span className="text-red-600">*</span>
          </label>

          <select
            value={gradeGroup}
            onChange={(e) => setGradeGroup(e.target.value)}
            className={`w-full mt-3 p-3 border rounded-lg focus:ring-2 outline-none ${
              error
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-purple-400"
            }`}
          >
            <option value="">Choose</option>
            {gradeOptions.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          {error && (
            <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
              ⚠️ This is a required question
            </p>
          )}

          <button
            onClick={handleContinue}
            className="mt-6 bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg w-full font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
