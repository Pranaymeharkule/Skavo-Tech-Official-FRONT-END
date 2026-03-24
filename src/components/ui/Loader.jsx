import { motion } from "framer-motion";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-xl">

      {/* Gradient Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30 blur-3xl"
      />

      {/* Loader Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative glass px-12 py-10 rounded-3xl shadow-2xl text-center"
      >
        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-12 h-12 mx-auto mb-6 border-4 border-brand border-t-transparent rounded-full"
        />

        {/* Text */}
        <p className="text-gray-600 tracking-wide">{text}</p>
      </motion.div>
    </div>
  );
}