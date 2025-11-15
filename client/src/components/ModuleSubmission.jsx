import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { modulesData } from "./ModuleData";
import { SubmitModules } from "../api"; // adjust path as needed

export default function ModuleSubmission({ teacherData, gradeGroup }) {
  const [selectedModules, setSelectedModules] = useState([]);

  const modules = modulesData[gradeGroup] || [];

  const toggleModule = (module) => {
    setSelectedModules(
      (prev) =>
        prev.includes(module)
          ? prev.filter((m) => m !== module) // remove
          : [...prev, module] // add
    );
  };

  const handleSelectedModule = async () => {
    const Data = {
      email: teacherData.email,
      name: teacherData.name,
      batch: teacherData.batch,
      gradeGroup: gradeGroup,
      moduleCompleted: selectedModules,
    };
    console.log(Data);
    try {
      const res = await SubmitModules(Data);
      console.log("RES:", res);

      if (res.success) {
        alert("Module Submitted Successfully!");
      } else {
        alert("Error: " + res.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FFECEC] px-4">
      <AnimatePresence>
        {gradeGroup && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10 border border-[#ffe0e0]"
          >
            {/* Heading */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-3 text-center">
              Select Completed Modules
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Choose all modules the student has completed
            </p>

            {/* CHECKBOX LIST */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {modules.map((module) => (
                <label
                  key={module}
                  className="flex items-center space-x-3 cursor-pointer bg-[#FFF7F7] hover:bg-[#FFE6E6] 
                             border border-[#ffe0e0] rounded-2xl p-3 transition"
                >
                  {/* CUSTOM CHECKBOX */}
                  <input
                    type="checkbox"
                    checked={selectedModules.includes(module)}
                    onChange={() => toggleModule(module)}
                    className="h-5 w-5 rounded-md border-gray-300 text-[#FF5C39] focus:ring-[#FF5C39]"
                  />
                  <span className="text-gray-700 font-medium">{module}</span>
                </label>
              ))}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleSelectedModule}
              disabled={selectedModules.length === 0}
              className={`mt-8 w-full py-3.5 rounded-2xl text-lg font-semibold shadow-md transition-all 
                ${
                  selectedModules.length > 0
                    ? "bg-[#FF5C39] hover:bg-[#e64e33] text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
