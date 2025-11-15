import { useState } from "react";
import { VerifyEmail } from "../api";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Mail } from "lucide-react";

function AskEmail({ setTeacherData }) {
  const [email, setEmail] = useState("");
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnContinue = () => {
    setTeacherData(value);
  };

  const handleEmail = async () => {
    setLoading(true);
    setValue(null);

    try {
      const data = await VerifyEmail(email);

      const result = {
        success: data.success,
        name: data.name,
        batch: data.batch,
        email: email,
      };

      setValue(result);
    } catch (err) {
      console.log(err);
      setValue({
        error: "Something went wrong!",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FFECEC] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10 border border-[#ffe0e0]"
      >
        {/* Title Section */}
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-3">
          Verify Your Codingal Email
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter the email you used to register on Codingal
        </p>

        {/* Input Field */}
        <div className="relative mb-6">
          <Mail className="absolute left-4 top-3.5 text-gray-400" size={22} />
          <input
            type="email"
            placeholder="example@codingal.com"
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 
                       rounded-2xl text-gray-700 placeholder-gray-400 
                       focus:ring-2 focus:ring-[#FF5C39] focus:border-[#FF5C39] 
                       transition shadow-sm"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Verify Button */}
        <button
          onClick={handleEmail}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl text-lg font-semibold 
                     bg-[#FF5C39] hover:bg-[#e64e33] transition
                     active:scale-95 text-white shadow-md"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        {/* Result Box */}
        <AnimatePresence>
          {value && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="mt-8 p-6 rounded-2xl bg-[#FFF7F7] border border-[#FFE0E0] shadow-sm"
            >
              {/* Success */}
              {value.success && (
                <div className="flex items-start space-x-4">
                  <CheckCircle size={40} className="text-green-500" />
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      Email Verified 🎉
                    </p>
                    <p className="text-gray-600 mt-1">Name: {value.name}</p>
                    <p className="text-gray-600">Batch: {value.batch}</p>
                    <button
                      onClick={() => handleOnContinue()}
                      className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold shadow-md transition-all duration-200"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Error */}
              {!value.success && (
                <div className="flex items-start space-x-4">
                  <XCircle size={40} className="text-red-500" />
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      Your email is not registered with us. Please use your
                      Codingal-registered email address.
                    </p>
                    <p className="text-gray-600 mt-1">{value.error}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default AskEmail;
