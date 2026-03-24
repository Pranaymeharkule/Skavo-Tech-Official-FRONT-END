import { motion } from "framer-motion";
import Container from "../layout/Container";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303]">
      
      {/* Background Gradients (Replacing Video) */}
      <div className="absolute inset-0">
        {/* Large soft glow top-right */}
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse" />
        {/* Large soft glow bottom-left */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      {/* Optional: Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <Container>
        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-4xl">
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl lg:text-7xl font-bold leading-tight text-white tracking-tight"
            >
              Build Powerful{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Digital Products
              </span>{" "}
              for Modern Businesses
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-8 text-lg text-gray-400 max-w-2xl leading-relaxed"
            >
              Enterprise-grade web platforms, AI-powered solutions, and 
              high-performance architectures designed to grow with your vision.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-12 flex flex-wrap gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/services")}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Our Services
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 1)", color: "#000" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/projects")}
                className="px-8 py-4 rounded-full border border-white/10 backdrop-blur-sm text-white transition-all duration-300"
              >
                View Our Work
              </motion.button>
            </motion.div>

            {/* Trust Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 text-sm text-gray-500 uppercase tracking-[0.2em] font-medium"
            >
              Trusted by fast-growing startups
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-purple-400 mt-2 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}