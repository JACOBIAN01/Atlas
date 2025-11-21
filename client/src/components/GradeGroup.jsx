import { useState } from "react";
import { User } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function GradeGroup({
  teacherData,
  setGradeGroup,
  gradeOptions,
}) {
  const [selected, setSelected] = useState("Grade 1-3");
  const handleOnContinue = () => {
    toast("⚠️ Please don't submit repeated modules!");
    setGradeGroup(selected);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFECEC] px-4 py-12 flex flex-col items-center">
      {/* SECTION 1 — SELECT GRADE GROUP */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10 border border-[#ffe0e0]">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-3">
          Select Grade Group
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Choose the grade group to proceed
        </p>

        <select
          className="w-full py-3 px-4 rounded-2xl bg-white border border-gray-300 text-gray-700 
             shadow-sm focus:ring-2 focus:ring-[#FF5C39] focus:border-[#FF5C39] 
             outline-none transition"
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
        >
          {gradeOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* SECTION 2 — TEACHER DETAILS */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="w-full max-w-2xl mt-8 bg-white rounded-3xl shadow-xl p-10 border border-[#ffe0e0]"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Teacher Details
          </h2>

          <div className="flex items-start space-x-4">
            <User size={48} className="text-[#FF5C39]" />

            <div className="text-gray-700">
              <p className="text-xl font-semibold">{teacherData?.name}</p>
              <p className="text-gray-500">{teacherData?.email}</p>

              <p className="mt-4 bg-[#FFF3F0] text-[#FF5C39] px-4 py-2 rounded-xl inline-block text-sm font-medium">
                Selected Grade: {selected}
              </p>
              <br />
              {selected && (
                <button
                  onClick={() => handleOnContinue()}
                  className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold shadow-md transition-all duration-200"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
