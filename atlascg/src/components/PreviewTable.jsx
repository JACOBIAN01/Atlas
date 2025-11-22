function PreviewTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <p className="text-gray-500 mt-4">No data found.</p>;
  }

  return (
    <div className="mt-4 space-y-3">
      {rows.map((row, index) => (
        <div
          key={index}
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

            {/* Skills */}
            <div>
              <p className="text-xs text-gray-500 font-medium">Skills</p>
              <p className="text-gray-800 font-semibold">{row.skills}</p>
            </div>
            {/* Grade */}
            <div>
              <p className="text-xs text-gray-500 font-medium">Skills</p>
              <p className="text-gray-800 font-semibold">{row.grade}</p>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs text-gray-500 font-medium">Email</p>
              <p className="text-gray-800 font-semibold ">
                {row.email}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PreviewTable;
