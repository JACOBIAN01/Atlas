import { useState } from "react";
import PreviewTable from "../components/PreviewTable";
import ProcessTable from "../components/ProcessTable";
import ProgressBar from "../components/ProgressBar";
import { fetchRows, generateCertificate } from "../API";

function HomePage() {
  const [step, setStep] = useState("fetch");
  const [rows, setRows] = useState([]);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);

  /***********************
   * 1) FETCH GOOGLE SHEET DATA
   ***********************/
  const handleFetchData = async () => {
    try {
      const data = await fetchRows(); // from GAS
      setRows(data);
      setStep("preview");
    } catch (err) {
      alert("Failed to fetch data: " + err);
    }
  };

  /***********************
   * 2) PROCESS CERTIFICATES
   ***********************/
  const handleStartProcessing = async () => {
    setStep("process");
    let tempResults = [];
    setResults(tempResults);
    setProgress(0);

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      // Call Google Apps Script to generate certificate
      const res = await generateCertificate(row);

      // Push result (success/failed)
      tempResults.push({
        status: res.success ? "success" : "failed",
        message: res.message || "",
      });

      // Update UI state
      setResults([...tempResults]);

      // Update progress bar
      const percent = Math.round(((i + 1) / rows.length) * 100);
      setProgress(percent);
    }

    setStep("summary");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Atlas Certificate Generator
      </h1>

      {/* ---------------------- STEP 1: FETCH DATA ---------------------- */}
      {step === "fetch" && (
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold">Step 1: Fetch Data</h2>
          <p className="text-gray-600">
            Click the button to load data from Google Sheet.
          </p>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
            onClick={handleFetchData}
          >
            Fetch Data From Google Sheet
          </button>
        </div>
      )}

      {/* ---------------------- STEP 2: PREVIEW DATA ---------------------- */}
      {step === "preview" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 2: Preview Data</h2>

          <PreviewTable rows={rows} />

          <div className="flex gap-4 mt-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              onClick={handleStartProcessing}
            >
              Start Generating Certificates
            </button>

            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setStep("fetch")}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* ---------------------- STEP 3: PROCESSING ---------------------- */}
      {step === "process" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Step 3: Processing Certificates
          </h2>

          <ProgressBar progress={progress} />

          <ProcessTable rows={rows} results={results} />
        </div>
      )}

      {/* ---------------------- STEP 4: SUMMARY ---------------------- */}
      {step === "summary" && (
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold">Step 4: Summary</h2>

          <p className="text-gray-700">Total Records: {rows.length}</p>
          <p className="text-green-700">
            Success: {results.filter((r) => r.status === "success").length}
          </p>
          <p className="text-red-600">
            Failed: {results.filter((r) => r.status === "failed").length}
          </p>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
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
