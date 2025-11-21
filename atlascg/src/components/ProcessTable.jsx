function ProcessTable({ rows, results }) {
  return (
    <div className="overflow-x-auto mt-4 border rounded-lg">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left font-semibold">ID</th>
            <th className="px-4 py-2 text-left font-semibold">Name</th>
            <th className="px-4 py-2 text-left font-semibold">Email</th>
            <th className="px-4 py-2 text-left font-semibold">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => {
            const result = results[i];

            return (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{row.id}</td>
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.email}</td>
                <td className="px-4 py-2">
                  {result?.status === "success" && (
                    <span className="text-green-600 font-semibold">
                      Success
                    </span>
                  )}
                  {result?.status === "failed" && (
                    <span className="text-red-600 font-semibold">Failed</span>
                  )}
                  {!result && <span className="text-gray-500">Pending...</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProcessTable;
