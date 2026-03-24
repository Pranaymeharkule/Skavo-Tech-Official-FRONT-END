import { motion } from "framer-motion";

export default function GradientBlob({ className }) {
 return (
  <motion.div
   animate={{ scale:[1,1.2,1], rotate:[0,90,0] }}
   transition={{ duration:20, repeat:Infinity }}
   className={`absolute blur-3xl opacity-40 rounded-full ${className}`}
  />
 );
}