import { HelpCircle } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function KnowYourDev() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Icon */}
      <HelpCircle className="w-5 h-5 text-gray-600 hover:text-[#FF5C39] cursor-pointer transition-colors duration-150" />

      {/* Tooltip */}
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
              absolute left-7 top-0 w-72 
              bg-white shadow-xl border border-gray-200 
              rounded-xl px-4 py-3 z-20
            "
          >
            {/* Tooltip Arrow */}
            <div className="absolute -left-1 top-4 w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45"></div>

            <h3 className="text-sm font-semibold text-gray-800">
              Creator’s Note
            </h3>

            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Hi! I’m <b className="text-gray-800">Subhadeep</b> — Teacher
              Mentor (Course Training) & Senior Coding Instructor at Codingal.
              <br />
              This platform is crafted to ensure a smooth and effortless module
              submission experience.
              <br />
              For feedback or support, reach me at:
              <br />
              <b className="text-[#FF5C39]">subhadeepghorai23@gmail.com</b>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
