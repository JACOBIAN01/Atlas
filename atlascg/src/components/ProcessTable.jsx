function ProcessTable({ rows, results }) {
  return (
    <div className="mt-4 space-y-3">
      {rows.map((row, i) => {
        const result = results[i];

        return (
          <div
            key={i}
            className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all"
          >
            {/* Grid Layout */}
            <div className="flex flex-row justify-center items-center gap-10">
              {/* ID */}
              <div>
                <p className="text-xs text-gray-500 font-medium">ID</p>
                <p className="text-gray-800 font-semibold">{row.id}</p>
              </div>

              {/* Name */}
              <div>
                <p className="text-xs text-gray-500 font-medium">Name</p>
                <p className="text-gray-800 font-semibold">{row.name}</p>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs text-gray-500 font-medium">Email</p>
                <p className="text-gray-800 font-semibold break-all">
                  {row.email}
                </p>
              </div>

              {/* Skill */}
              <div>
                <p className="text-xs text-gray-500 font-medium">Skill</p>
                <p className="text-gray-800 font-semibold break-all">
                  {row.skills}
                </p>
              </div>

              {/* Grade */}
              <div>
                <p className="text-xs text-gray-500 font-medium">Grade</p>
                <p className="text-gray-800 font-semibold break-all">
                  {row.grade}
                </p>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs text-gray-500 font-medium">Status</p>

                {result?.status === "success" && (
                  <p className="text-green-600 font-bold">Success</p>
                )}

                {result?.status === "failed" && (
                  <p className="text-red-600 font-bold">Failed</p>
                )}

                {!result && (
                  <p className="text-gray-500 font-medium">Pending...</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProcessTable;
