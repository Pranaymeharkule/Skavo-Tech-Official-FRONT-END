import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectsPreview({ data }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">

      {data.map((project, i) => (
        <Tilt
          key={project._id}
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          scale={1.04}
          glareEnable
          glareMaxOpacity={0.08}
          className="rounded-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 overflow-hidden shadow-2xl transition-all duration-500 hover:border-purple-500/40"
          >

            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-transparent opacity-60" />

            {/* Glow Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

            {/* Project Index */}
            <div className="text-xs tracking-widest uppercase text-purple-400 mb-4">
              Project {String(i + 1).padStart(2, "0")}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold mb-5 text-white group-hover:text-purple-300 transition">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              {project.description}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-white transition">
              View Case Study
              <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>

            {/* Bottom Animated Line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500" />

          </motion.div>
        </Tilt>
      ))}

    </div>
  );
}