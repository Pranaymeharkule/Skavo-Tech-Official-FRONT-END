import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Container from "../layout/Container";

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
      className="fixed top-0 w-full z-[999]
      bg-white/80 backdrop-blur-xl
      border-b border-gray-200
      transition-all"
    >
      <Container className="flex justify-between items-center py-4" paddingY="py-4">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          <span className="text-gray-900">Skavo</span>
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            {" "}Tech
          </span>
        </Link>

        {/* MENU */}
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
                className={`relative group font-medium transition ${
                  active
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item}

                <span
                  className={`absolute left-0 -bottom-1 h-[2px]
                  bg-gradient-to-r from-purple-500 to-indigo-500
                  transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-6 py-2 rounded-full text-sm font-medium
          bg-gradient-to-r from-purple-500 to-indigo-500
          text-white shadow-md hover:shadow-lg transition"
        >
          Start Project
        </motion.button>

      </Container>
    </motion.nav>
  );
}