export default function MadeByBadge() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="
          flex items-center gap-2
          bg-white/80 backdrop-blur-md
          border border-orange-200
          shadow-sm 
          px-4 py-2 rounded-full
          text-xs font-medium text-gray-700
        "
      >
        <span>Crafted with</span>
        <span className="text-red-500">❤️</span>
        <span className="font-semibold text-gray-900">by Subhadeep</span>
      </div>
    </div>
  );
}
