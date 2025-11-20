import { useState, useEffect, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { SubmitModules } from "../api";
import toast from "react-hot-toast";
import { fetchModulesByGrade } from "../api";
import Loader from "./Loader";
import confetti from "canvas-confetti";

export default function ModuleSubmission({
  teacherData,
  gradeGroup,
  setTeacherData,
  setGradeGroup,
  lastSubmission,
}) {
  const [selectedModules, setSelectedModules] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [modules, setModules] = useState([]);
  const [loadingModules, setLoadingModules] = useState(true);

  const LastSubmissionList = useMemo(() => {
    return lastSubmission
      ? lastSubmission.modules.split(",").map((m) => m.trim())
      : [];
  }, [lastSubmission]);

  useEffect(() => {
    if (selectedModules.length === 0) return;

    const hasDuplicate = selectedModules.some((m) =>
      LastSubmissionList.includes(m)
    );

    if (hasDuplicate) {
      toast.dismiss();
      toast.error("⚠️ You selected a module already submitted earlier!");
    }
  }, [selectedModules, LastSubmissionList]);

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
      toast("Please Select Completed Modules.");
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
        // Main confetti blast
        confetti({
          particleCount: 120,
          spread: 70,
          startVelocity: 25,
          origin: { y: 0.65 },
          colors: ["#FF5C39", "#FFD6C8", "#FF9B85", "#FFFFFF"],
        });

        // Small follow-up burst
        setTimeout(() => {
          confetti({
            particleCount: 40,
            spread: 50,
            startVelocity: 15,
            origin: { y: 0.7 },
            colors: ["#FF5C39", "#FFFFFF"],
          });
        }, 500);

        toast.success(`🎉 Great Work ${getFirstName(teacherData.name)}`, {
          duration: 3500,
        });

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
                <div className="flex justify-center items-center">
                  <Loader />
                </div>
              ) : (
                modules.map((module) => (
                  <label
                    key={module}
                    className={`flex items-center space-x-3 cursor-pointer rounded-2xl p-3 transition border 
      ${
        LastSubmissionList.includes(module)
          ? "bg-red-50 border-red-300"
          : "bg-[#FFF7F7] hover:bg-[#FFE6E6] border-[#ffe0e0]"
      }`}
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
        {lastSubmission && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.35 }}
            className="hidden lg:block w-80 fixed right-10 top-24 bg-white 
                   shadow-xl rounded-2xl border border-[#ffe0e0] p-6"
          >
            <h3 className="text-lg font-bold text-[#FF5C39] mb-3">
              🗂️ Submission History
            </h3>

            <div className="bg-[#FFF7DC] border border-[#FFE29A] p-4 rounded-xl">
              <p className="mb-2 text-gray-700">
                <span className="font-semibold">Grade Group:</span>{" "}
                {lastSubmission.gradeGroup}
              </p>

              <p className="font-semibold text-gray-800 mt-3">
                Modules Submitted:
              </p>
              <ul className="list-disc ml-5 mt-1 text-gray-700">
                {lastSubmission.modules
                  .split(",")
                  .map((m) => m.trim())
                  .filter(Boolean)
                  .map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
              </ul>

              <p className="mt-4 text-gray-700">
                <span className="font-semibold">Submitted At:</span>{" "}
                {new Date(lastSubmission.timestamp).toLocaleString()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
