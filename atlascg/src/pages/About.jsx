// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { BookOpen, Database, Rocket } from "lucide-react";

export default function AboutAtlas({ onBegin }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-[#FFE5E0] to-[#FFD2C6]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white w-full max-w-3xl p-10 rounded-3xl shadow-xl border border-gray-200"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl font-extrabold text-center text-gray-900 mb-4"
        >
          <span className="text-[#FF5F33]">Atlas CG</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-gray-600 text-lg leading-relaxed mb-6"
        >
          Atlas CG is a premium automation workflow engine designed to process
          data, generate certificates, and streamline tasks with precision and
          speed. Built for reliability, scalability, and a delightful user
          experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
        >
          {/* TEMPLATE BUTTON */}
          <motion.a
            href="https://docs.google.com/presentation/d/1L-ttFwcAXfSSEqPgnkVnMYMYYJM8Dkl1eL5TgAYjNuw/edit?slide=id.g3a83aabe381_1_0#slide=id.g3a83aabe381_1_0"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-[#FF7A50] to-[#FF5F33] text-white rounded-2xl shadow-lg cursor-pointer"
          >
            <BookOpen className="w-10 h-10" />
            <p className="font-semibold text-lg text-center">
              Certificate Template
            </p>
          </motion.a>

          {/* DATABASE BUTTON */}
          <motion.a
            href="https://docs.google.com/spreadsheets/d/1XK0U6T_6J-Xx7ldZw2yV3yvZJzaAJ328P4b367TEhXM/edit?gid=0#gid=0"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-[#5F9BFF] to-[#337BFF] text-white rounded-2xl shadow-lg cursor-pointer"
          >
            <Database className="w-10 h-10" />
            <p className="font-semibold text-lg text-center">Atlas Datasheet</p>
          </motion.a>

          {/* BEGIN BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBegin(false)}
            className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-[#34D399] to-[#10B981] text-white rounded-2xl shadow-lg cursor-pointer"
          >
            <Rocket className="w-10 h-10" />
            <p className="font-semibold text-lg text-center">Let's Begin</p>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
