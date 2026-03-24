import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 text-gray-400 pt-28 pb-10 overflow-hidden">

  {/* Subtle Ambient Glow */}
  <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-purple-600/10 blur-[200px] rounded-full" />
  <div className="absolute -bottom-40 right-1/3 w-[500px] h-[500px] bg-blue-600/10 blur-[200px] rounded-full" />

  <div className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-16">

    <div>
      <h3 className="text-white font-semibold text-lg mb-4 tracking-wide">
        Skavo
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Tech
        </span>
      </h3>
      <p className="leading-relaxed">
        Engineering scalable digital systems and performance-driven growth solutions.
      </p>
    </div>

    <div>
      <h4 className="text-white mb-4">Services</h4>
      <ul className="space-y-3">
        <li className="hover:text-white transition">Web Development</li>
        <li className="hover:text-white transition">Software Systems</li>
        <li className="hover:text-white transition">IT Consulting</li>
        <li className="hover:text-white transition">Digital Marketing</li>
      </ul>
    </div>

    <div>
      <h4 className="text-white mb-4">Company</h4>
      <ul className="space-y-3">
        <li>Projects</li>
        <li>Careers</li>
        <li>Contact</li>
      </ul>
    </div>

    <div>
      <h4 className="text-white mb-4">Contact</h4>
      <p>info@skavotech.com</p>
      <p>Nagpur, Maharashtra, India</p>
    </div>

  </div>

  <div className="relative border-t border-white/10 mt-20 pt-6 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} Skavo Tech Solutions Pvt. Ltd.
  </div>

</footer>
  );
}