export default function Loader() {
  return (
    <div className="flex flex-row gap-2 p-2 text-center mx-auto">
      <div className="w-4 h-4 rounded-full bg-[#FF5C39] animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-[#FF5C39] animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-[#FF5C39] animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}
