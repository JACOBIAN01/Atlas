/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function AskEmail({ onContinue, teacher, setTeacher }) {
  const gasUrl =
    "https://script.google.com/macros/s/AKfycbwQ5ASyf2xyyXbHY2rV4f0DWVIX1HazTvUL1yBBJxOn5YQM9J8ZnIzxSgnKjDLk1DNl/exec";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchTeacher = async (emailValue) => {
    setLoading(true);
    setNotFound(false);

    try {
      const res = await fetch(
        `${gasUrl}?email=${encodeURIComponent(emailValue)}`
      );
      const data = await res.json();

      if (data.found) {
        setTeacher({
          name: data.name,
          batch: data.batch,
        });
      } else {
        setTeacher(null);
        setNotFound(true);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!email) {
      setTeacher(null);
      return;
    }
    fetchTeacher(email);
  }, [email]);

  return (
    <div className="min-h-screen flex items-start justify-center bg-[#f4ecff] py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md border border-purple-200">
        {/* Purple Header */}
        <div className="bg-purple-700 text-white p-4 rounded-t-xl text-lg font-medium text-center">
          Enter Your Email
        </div>

        {/* Body */}
        <div className="p-6">
          <label className="text-lg font-medium text-gray-800">
            Codingal Registered Email <span className="text-red-600">*</span>
          </label>

          {/* Email Input */}
          <input
            type="email"
            placeholder="example@codingal.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full mt-3 p-3 border rounded-lg focus:ring-2 outline-none ${
              notFound
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-purple-400"
            }`}
          />

          {/* Button */}
          <button
            onClick={() => fetchTeacher(email)}
            className="bg-purple-700 text-white mt-6 px-4 py-1 rounded-md ml-135 hover:bg-purple-600 "
          >
            Verify
          </button>

          {/* Checking */}
          {loading && (
            <p className="text-sm text-purple-600 mt-2 font-medium">
              Checking...
            </p>
          )}

          {/* Teacher Found */}
          {teacher && (
            <div className="mt-6 bg-purple-50 border border-purple-300 p-5 rounded-lg">
              <p className="text-lg font-semibold text-gray-800 mb-1">
                {teacher.name}
              </p>
              <p className="text-gray-700">
                Batch: <span className="font-medium">{teacher.batch}</span>
              </p>

              <button
                onClick={onContinue}
                className="mt-4 w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-medium transition"
              >
                Continue
              </button>
            </div>
          )}

          {/* Not Found Error */}
          {!loading && email && !teacher && (
            <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
              ⚠️ No teacher found with this email
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
