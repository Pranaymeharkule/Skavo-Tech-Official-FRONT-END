import { useEffect, useState } from "react";
import api from "../api/axios";

import ProjectsPreview from "../components/sections/ProjectsPreview";
import Loader from "../components/ui/Loader";
import { motion } from "framer-motion";

export default function Projects() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  api.get("/projects")
    .then(res => {
      setData(res.data);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
}, []);

  if (loading) return <Loader />;

  return (
    <section className="relative min-h-screen bg-[#070707] text-white overflow-hidden">

      {/* Premium Ambient Background */}
      <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-purple-600/25 blur-[180px] rounded-full" />
      <div className="absolute -bottom-40 right-1/3 w-[600px] h-[600px] bg-blue-600/25 blur-[180px] rounded-full" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative pt-40 pb-32 max-w-7xl mx-auto px-6"
      >

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 tracking-tight"
        >
          Selected{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Work
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-center mb-28 max-w-3xl mx-auto leading-relaxed"
        >
          A curated showcase of scalable digital systems, enterprise-grade platforms,
          and high-performance architectures engineered for modern businesses.
        </motion.p>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          <ProjectsPreview data={data} />
        </motion.div>

      </motion.div>
    </section>
  );
}