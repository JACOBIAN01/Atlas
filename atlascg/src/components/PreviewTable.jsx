function PreviewTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <p className="text-gray-500">No data found.</p>;
  }

  return (
    <div className="overflow-x-auto border rounded-lg mt-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left font-semibold">ID</th>
            <th className="px-4 py-2 text-left font-semibold">Name</th>
            <th className="px-4 py-2 text-left font-semibold">Email</th>
            <th className="px-4 py-2 text-left font-semibold">Skills</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{row.id}</td>
              <td className="px-4 py-2">{row.name}</td>
              <td className="px-4 py-2">{row.email}</td>
              <td className="px-4 py-2">{row.skills}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PreviewTable;
