import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-[#fdfdff] border-t border-gray-200 text-gray-600 pt-24 pb-10 overflow-hidden">

      {/* Soft Glow */}
      <div className="absolute -top-40 left-1/3 w-[400px] h-[400px] bg-purple-200/40 blur-[120px] rounded-full" />
      <div className="absolute -bottom-40 right-1/3 w-[400px] h-[400px] bg-indigo-200/40 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-16">

        {/* BRAND */}
        <div>
          <h3 className="text-gray-900 font-semibold text-xl mb-4">
            Skavo
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Tech
            </span>
          </h3>

          <p className="leading-relaxed text-gray-500 mb-6">
            Engineering scalable digital systems and performance-driven growth solutions.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-3">
            {["in", "tw", "gh"].map((s, i) => (
              <div
                key={i}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200
                hover:border-purple-400 hover:bg-purple-50 hover:text-purple-600 transition cursor-pointer"
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="text-gray-900 mb-4 font-semibold">Services</h4>
          <ul className="space-y-3">
            <li>
              <Link to="/services" className="hover:text-purple-600 hover:translate-x-1 inline-block transition">
                Web Development
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-purple-600 hover:translate-x-1 inline-block transition">
                Software Systems
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-purple-600 hover:translate-x-1 inline-block transition">
                IT Consulting
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-purple-600 hover:translate-x-1 inline-block transition">
                Digital Marketing
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-gray-900 mb-4 font-semibold">Company</h4>
          <ul className="space-y-3">
            <li>
              <Link to="/projects" className="hover:text-purple-600 hover:translate-x-1 inline-block transition">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-purple-600 hover:translate-x-1 inline-block transition">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-purple-600 hover:translate-x-1 inline-block transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-gray-900 mb-4 font-semibold">Contact</h4>
          <p className="mb-2">info@skavotech.com</p>
          <p>Nagpur, Maharashtra, India</p>

          {/* CTA */}
          <Link
            to="/contact"
            className="inline-block mt-5 px-5 py-2 rounded-full text-sm font-medium
            bg-gradient-to-r from-purple-500 to-indigo-500 text-white
            hover:shadow-lg transition"
          >
            Get in Touch →
          </Link>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="relative border-t border-gray-200 mt-20 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Skavo Tech Solutions Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
}