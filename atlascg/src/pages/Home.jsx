import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Rocket } from "lucide-react";

import PreviewTable from "../components/PreviewTable";
import ProcessTable from "../components/ProcessTable";
import ProgressBar from "../components/ProgressBar";

import { fetchRows, generateCertificate } from "../API";
import AboutAtlas from "./About";

const cardAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -30, transition: { duration: 0.25, ease: "easeIn" } },
};

export default function HomePage() {
  const [begin, setBegin] = useState(true);
  const [step, setStep] = useState("fetch");
  const [rows, setRows] = useState([]);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);
  const [fetchLoading, setFetchLoading] = useState(false);

  if (begin) {
    return <AboutAtlas onBegin={setBegin} />;
  }

  const handleFetchData = async () => {
    setFetchLoading(true);
    try {
      const data = await fetchRows();
      setRows(data);
      setStep("preview");
      setFetchLoading(false);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch data: " + err);
      setFetchLoading(false);
    }
  };

  const handleStartProcessing = async () => {
    console.log("Processing Started. Inside handleStartProcessing");
    setStep("process");
    let temp = [];
    setProgress(0);

    for (let i = 0; i < rows.length; i++) {
      const res = await generateCertificate(rows[i]);

      temp.push({
        status: res.success ? "success" : "failed",
        message: res.message || "",
      });
      setResults([...temp]);
      setProgress(Math.round(((i + 1) / rows.length) * 100));
    }

    setStep("summary");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{ background: "#FDECEC" }} // Codingal soft-pink background
    >
      <AnimatePresence mode="wait">
        {/* FETCH STEP */}
        {step === "fetch" && (
          <motion.div
            key="fetch"
            variants={cardAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white w-full max-w-xl p-10 rounded-3xl shadow-xl border border-gray-100 items-center justify-center"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Fetch Certificate Data
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Click the button to load all student records.
            </p>

            <motion.button
              disabled={fetchLoading}
              whileTap={{ scale: 0.97 }}
              onClick={handleFetchData}
              className={`w-full bg-[#FF5F33] text-white py-3 rounded-xl text-lg font-semibold shadow-md ${
                fetchLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#FF5C39] hover:bg-[#e64e33] text-white"
              }`}
            >
              {fetchLoading ? "Data on the way" : "Fetch Data"}
            </motion.button>
          </motion.div>
        )}

        {/* PREVIEW STEP */}
        {step === "preview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel: Action Buttons */}
            <div className="flex flex-col justify-start items-center gap-4 bg-white p-6 rounded-3xl shadow-md border border-gray-100 h-fit">
              <h2 className="text-lg font-semibold text-gray-700">Actions</h2>

              <div className="flex flex-col gap-3 w-full">
                <motion.button
                  className="w-full px-6 py-3 bg-[#FF5F33] hover:bg-[#e6542f] text-white rounded-xl font-semibold shadow"
                  onClick={handleStartProcessing}
                >
                  Start Processing
                </motion.button>
                <motion.button
                  className={`w-full px-6 py-3 hover:bg-blue-700 text-white rounded-xl font-semibold shadow ${
                    fetchLoading ? "bg-blue-300" : "bg-blue-600"
                  }`}
                  onClick={handleFetchData}
                >
                  {fetchLoading ? "Data on the way" : "Update Data"}
                </motion.button>
              </div>
            </div>

            {/* Preview Card */}
            <motion.div
              key="preview"
              variants={cardAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-xl border border-gray-100"
            >
              <h2 className="text-xl font-bold text-center text-gray-800 mb-5">
                Preview Data
              </h2>

              <div className="bg-gray-50 p-4 rounded-xl shadow-inner overflow-y-auto h-[500px]">
                <PreviewTable rows={rows} />
              </div>
            </motion.div>
          </div>
        )}

        {/* PROCESSING STEP */}
        {step === "process" && (
          <motion.div
            key="process"
            variants={cardAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white w-full max-w-4xl p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Processing Certificates
            </h2>

            <ProgressBar progress={progress} />

            <div className="bg-gray-50 p-4 rounded-xl shadow-inner mt-6">
              <ProcessTable rows={rows} results={results} />
            </div>
          </motion.div>
        )}
        {/* SUMMARY STEP */}
        {step === "summary" && (
          <motion.div
            key="summary"
            variants={cardAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white w-full max-w-xl p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Summary
            </h2>

            <div className="space-y-3 text-center text-lg">
              <p>Total: {rows.length}</p>

              <p className="text-green-600 flex justify-center gap-2 items-center">
                <CheckCircle2 className="w-6 h-6" />
                Success: {results.filter((r) => r.status === "success").length}
              </p>

              <p className="text-red-600 flex justify-center gap-2 items-center">
                <XCircle className="w-6 h-6" />
                Failed: {results.filter((r) => r.status === "failed").length}
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              className="w-full mt-6 bg-[#FF5F33] text-white py-3 rounded-xl font-semibold"
              onClick={() => {
                setRows([]);
                setResults([]);
                setProgress(0);
                setStep("fetch");
              }}
            >
              Start Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
