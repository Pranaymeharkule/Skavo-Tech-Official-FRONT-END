import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    "Home",
    "About",
    "Services",
    "Projects",
    "Training",
    "Careers",
    "Contact",
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-[999] 
      bg-[#070b14]/80 
      backdrop-blur-2xl 
      border-b border-white/10 
      shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          <span className="text-white">Skavo</span>
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {" "}Tech
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-10 text-sm">
          {links.map((item) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            const active =
              location.pathname === path ||
              location.pathname.startsWith(path);

            return (
              <Link
                key={item}
                to={path}
                className={`relative group font-medium tracking-wide transition ${
                  active
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item}

                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* CTA BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-6 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
        >
          Start Project
        </motion.button>
      </div>
    </motion.nav>
  );
}