import { useState } from "react";
import { CheckCircle2, XCircle, Loader2, Rocket } from "lucide-react";

import PreviewTable from "../components/PreviewTable";
import ProcessTable from "../components/ProcessTable";
import ProgressBar from "../components/ProgressBar";

import { fetchRows, generateCertificate } from "../API";

function HomePage() {
  const [step, setStep] = useState("fetch");
  const [rows, setRows] = useState([]);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleFetchData = async () => {
    try {
      const data = await fetchRows();
      setRows(data);
      setStep("preview");
    } catch (err) {
      alert("Failed to fetch data: " + err);
    }
  };

  const handleStartProcessing = async () => {
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
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 flex justify-center items-center gap-2 text-blue-600">
        <Rocket className="w-7 h-7" />
        Atlas Certificate Generator
      </h1>

      {/* STEP 1: FETCH */}
      {step === "fetch" && (
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Step 1: Fetch Data</h2>
          <p className="text-gray-600">Click the button to load data.</p>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={handleFetchData}
          >
            Fetch Data
          </button>
        </div>
      )}

      {/* STEP 2: PREVIEW */}
      {step === "preview" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 2: Preview Data</h2>

          <PreviewTable rows={rows} />

          <div className="flex gap-3 mt-4">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={handleStartProcessing}
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              Start Processing
            </button>

            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setStep("fetch")}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PROCESSING */}
      {step === "process" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Processing Certificates</h2>

          <ProgressBar progress={progress} />

          <ProcessTable rows={rows} results={results} />
        </div>
      )}

      {/* STEP 4: SUMMARY */}
      {step === "summary" && (
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Summary</h2>

          <p className="text-gray-700">Total: {rows.length}</p>

          <p className="text-green-600 flex justify-center items-center gap-1">
            <CheckCircle2 className="w-5 h-5" />
            Success: {results.filter((r) => r.status === "success").length}
          </p>

          <p className="text-red-600 flex justify-center items-center gap-1">
            <XCircle className="w-5 h-5" />
            Failed: {results.filter((r) => r.status === "failed").length}
          </p>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              setRows([]);
              setResults([]);
              setProgress(0);
              setStep("fetch");
            }}
          >
            Start Again
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
