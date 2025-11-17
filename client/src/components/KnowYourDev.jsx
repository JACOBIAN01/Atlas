import { HelpCircle } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

export default function KnowYourDev() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Info Icon */}
      <HelpCircle className="w-5 h-5 text-blue-600 cursor-pointer" />

      {/* Tooltip */}
      {hover && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute left-6 top-0 w-80 bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-20"
        >
          <h3 className="text-sm font-semibold">Creator’s Note</h3>
          <p className="text-xs text-gray-600 mt-1">
            Hi! I’m Subhadeep — Teacher Mentor-Course Training & Senior Coding
            Instructor at Codingal. This Web is designed to make your experience
            smoother and help you submit modules easily. I’d love to hear your
            feedback at subhadeepghorai23@gmail.com .
          </p>
        </motion.div>
      )}
    </div>
  );
}
