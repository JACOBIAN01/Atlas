function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 h-4 rounded-lg overflow-hidden mt-4">
      <div
        className="bg-green-600 h-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
