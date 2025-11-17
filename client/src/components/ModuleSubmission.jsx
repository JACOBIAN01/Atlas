import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { SubmitModules } from "../api";
import toast from "react-hot-toast";
import { fetchModulesByGrade } from "./FetchModulesByGrade";

export default function ModuleSubmission({
  teacherData,
  gradeGroup,
  setTeacherData,
  setGradeGroup,
}) {
  const [selectedModules, setSelectedModules] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [modules, setModules] = useState([]);
  const [loadingModules, setLoadingModules] = useState(true);

  useEffect(() => {
    async function load() {
      setLoadingModules(true);
      const lessons = await fetchModulesByGrade(gradeGroup);
      setModules(lessons);
      setLoadingModules(false);
    }
    if (gradeGroup) load();
  }, [gradeGroup]);

  const toggleModule = (module) => {
    setSelectedModules((prev) =>
      prev.includes(module)
        ? prev.filter((m) => m !== module)
        : [...prev, module]
    );
  };

  const handleSelectedModule = async () => {
    if (!selectedModules) {
      toast.error("Please Select Completed Modules.");
      return;
    }
    setSubmitting(true);

    const Data = {
      email: teacherData.email,
      name: teacherData.name,
      batch: teacherData.batch,
      gradeGroup: gradeGroup,
      moduleCompleted: selectedModules,
    };

    try {
      const res = await SubmitModules(Data);

      if (res.success) {
        toast.success("Module Submitted Successfully! 🎉");

        //Auto-clear selected modules
        setSelectedModules([]);
        // Return to AskEmail Screen
        setTimeout(() => {
          setGradeGroup(null);
          setTeacherData(null);
        }, 1200);
      } else {
        toast.error("Error submitting module.");
        setSubmitting(false);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      setSubmitting(false);
      console.log(err);
    }
  };

  function getFirstName(fullName) {
    // remove Mr/Mrs/Ms/Dr etc.
    const clean = fullName.replace(/^(mr|mrs|ms|miss|dr|prof|sir)\.?\s+/i, "");
    // split and return ONLY the first word
    return clean.split(" ")[0];
  }

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
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                Hey{" "}
                <span className="text-[#FF5C39]">
                  {getFirstName(teacherData.name)}
                </span>{" "}
                👋
              </h2>
              <p className="text-lg text-gray-600 font-medium mt-1">
                Select the modules you’ve completed
              </p>
            </div>

            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {loadingModules ? (
                <p className="text-center text-gray-500">Loading modules...</p>
              ) : (
                modules.map((module) => (
                  <label
                    key={module}
                    className="flex items-center space-x-3 cursor-pointer bg-[#FFF7F7] hover:bg-[#FFE6E6]
          border border-[#ffe0e0] rounded-2xl p-3 transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedModules.includes(module)}
                      onChange={() => toggleModule(module)}
                      className="h-5 w-5 rounded-md border-gray-300 text-[#FF5C39] focus:ring-[#FF5C39]"
                    />
                    <span className="text-gray-700 font-medium">{module}</span>
                  </label>
                ))
              )}
            </div>

            {!loadingModules && modules.length === 0 && (
              <p className="text-center text-gray-500">
                No modules found for this grade.
              </p>
            )}
            <button
              onClick={handleSelectedModule}
              disabled={selectedModules.length === 0 || submitting}
              className={`mt-8 w-full py-3.5 rounded-2xl text-lg font-semibold shadow-md transition-all 
                ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : selectedModules.length > 0
                    ? "bg-[#FF5C39] hover:bg-[#e64e33] text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {submitting ? "Submitting..." : "Continue"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
