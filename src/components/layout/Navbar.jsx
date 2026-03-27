import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

/* ── Inline SVG Icons ── */
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

/* ── Dropdown data ── */
const SERVICES_MENU = [
  { label: "Web & App Development", sub: "React, Next.js, Node.js", href: "/services" },
  { label: "Mobile Applications",   sub: "iOS & Android",          href: "/services" },
  { label: "AI & Automation",       sub: "LLMs, Python, ML",       href: "/services" },
  { label: "Digital Marketing",     sub: "SEO, Ads, Analytics",    href: "/services" },
  { label: "Cloud & Infrastructure",sub: "AWS, GCP, DevOps",       href: "/services" },
  { label: "Data & Analytics",      sub: "BI, Dashboards, Pipelines", href: "/services" },
];

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services", dropdown: true },
  { label: "Projects", href: "/projects" },
  { label: "Training", href: "/training" },
  { label: "Careers",  href: "/careers" },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropRef  = useRef(null);
  const timerRef = useRef(null);

  /* scroll detection */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 30));

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  const isActive = (href) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);

  /* hover delay helpers */
  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,800;1,9..144,700&display=swap');

        .nav-serif { font-family: 'Fraunces', Georgia, serif; }
        .nav-sans  { font-family: 'DM Sans', system-ui, sans-serif; }

        /* Pill active glow */
        .nav-link-pill {
          position: relative;
          transition: color .2s;
        }
        .nav-link-pill::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #6d28d9, #c026d3);
          transition: width .28s cubic-bezier(.22,1,.36,1);
        }
        .nav-link-pill.active::after,
        .nav-link-pill:hover::after { width: 100%; }

        /* Dropdown item */
        .drop-item {
          transition: background .18s, transform .18s;
        }
        .drop-item:hover {
          background: #f5f3ff;
          transform: translateX(4px);
        }

        /* CTA shimmer */
        .cta-btn {
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
          transition: left .5s ease;
        }
        .cta-btn:hover::before { left: 160%; }

        /* Mobile drawer */
        .mobile-link {
          transition: color .18s, background .18s, padding-left .22s;
          border-radius: 1rem;
        }
        .mobile-link:hover {
          background: #f5f3ff;
          padding-left: 1.25rem;
          color: #4c1d95;
        }
        .mobile-link.active {
          background: #ede9fe;
          color: #4c1d95;
        }

        /* Hamburger lines */
        .ham-line {
          display: block;
          width: 22px; height: 2px;
          background: #1e293b;
          border-radius: 2px;
          transition: transform .3s cubic-bezier(.22,1,.36,1), opacity .2s, width .3s;
          transform-origin: center;
        }

        /* Gradient text */
        .grad-text {
          background: linear-gradient(120deg, #6d28d9, #c026d3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* ══════════════════════ DESKTOP NAV ══════════════════════ */}
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-400 ${
          scrolled
            ? "py-3 bg-white/95 backdrop-blur-2xl shadow-[0_2px_24px_rgba(109,40,217,.08)] border-b border-violet-50"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link to="/" className="flex-shrink-0 group">
            <span className="nav-serif text-[1.6rem] font-bold text-violet-950 tracking-tight leading-none">
              Skavo
              <span className="italic grad-text">.</span>
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                /* Services with dropdown */
                <div
                  key={link.label}
                  ref={dropRef}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => setDropdownOpen(o => !o)}
                    className={`nav-sans flex items-center gap-1.5 px-4 py-2 text-[.875rem] font-medium rounded-xl transition-all nav-link-pill
                      ${isActive(link.href)
                        ? "text-violet-900 active"
                        : "text-slate-500 hover:text-violet-900 hover:bg-violet-50/60"
                      }`}
                  >
                    {link.label}
                    <motion.span
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: .2 }}
                      className="opacity-50"
                    >
                      <ChevronDown />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: .97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: .97 }}
                        transition={{ duration: .22, ease: [.22, 1, .36, 1] }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-[1.5rem] border border-violet-100 shadow-[0_20px_60px_rgba(109,40,217,.15)] overflow-hidden"
                      >
                        {/* Dropdown header */}
                        <div className="px-5 pt-4 pb-3 border-b border-violet-50">
                          <p className="nav-sans text-[10px] font-black uppercase tracking-[.25em] text-violet-400">Our Capabilities</p>
                        </div>

                        <div className="p-2">
                          {SERVICES_MENU.map((item, i) => (
                            <Link
                              key={i}
                              to={item.href}
                              className="drop-item flex flex-col px-4 py-3 rounded-xl"
                            >
                              <span className="nav-sans text-[.82rem] font-semibold text-slate-800">{item.label}</span>
                              <span className="nav-sans text-[.72rem] text-slate-400 mt-0.5">{item.sub}</span>
                            </Link>
                          ))}
                        </div>

                        <div className="px-3 pb-3">
                          <Link
                            to="/services"
                            className="nav-sans flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-violet-50 border border-violet-100 text-[.78rem] font-bold text-violet-700 hover:bg-violet-900 hover:text-white hover:border-violet-900 transition-all duration-200"
                          >
                            View All Services <ArrowRight />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Regular link */
                <Link
                  key={link.label}
                  to={link.href}
                  className={`nav-sans px-4 py-2 text-[.875rem] font-medium rounded-xl transition-all nav-link-pill
                    ${isActive(link.href)
                      ? "text-violet-900 active"
                      : "text-slate-500 hover:text-violet-900 hover:bg-violet-50/60"
                    }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* ── Right side ── */}
          <div className="flex items-center gap-3">

        

            {/* CTA button */}
            <Link
              to="/contact"
              className="hidden sm:flex cta-btn nav-sans items-center gap-2 px-5 py-2.5 bg-violet-900 text-white text-[.82rem] font-bold rounded-xl hover:bg-fuchsia-700 active:scale-95 transition-all duration-200 shadow-lg shadow-violet-200/60 hover:shadow-violet-300/60 hover:scale-105"
            >
              Contact Us <ArrowRight />
            </Link>

            {/* ── Hamburger ── */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 rounded-xl hover:bg-violet-50 transition-all p-2.5"
            >
              <span className="ham-line" style={menuOpen ? { transform: "translateY(7px) rotate(45deg)" } : {}} />
              <span className="ham-line" style={menuOpen ? { opacity: 0, width: "14px" } : {}} />
              <span className="ham-line" style={menuOpen ? { transform: "translateY(-7px) rotate(-45deg)" } : {}} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ══════════════════════ MOBILE DRAWER ══════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: .25 }}
              className="fixed inset-0 z-[998] bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-[999] w-[82vw] max-w-[340px] lg:hidden flex flex-col bg-white shadow-[−20px_0_80px_rgba(109,40,217,.12)]"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-violet-50">
                <Link to="/" onClick={() => setMenuOpen(false)} className="nav-serif text-xl font-bold text-violet-950">
                  Skavo<span className="italic grad-text">.</span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-500 hover:bg-violet-100 transition-all text-lg leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Drawer links */}
              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
                {NAV_LINKS.map((link, i) =>
                  link.dropdown ? (
                    <div key={link.label}>
                      <button
                        onClick={() => setMobileServicesOpen(o => !o)}
                        className={`mobile-link nav-sans w-full flex items-center justify-between px-4 py-3.5 text-[.9rem] font-semibold text-left transition-all ${
                          isActive(link.href) ? "active" : "text-slate-700"
                        }`}
                      >
                        Services
                        <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }} transition={{ duration: .2 }}>
                          <ChevronDown />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: .28, ease: [.22, 1, .36, 1] }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="pl-3 pb-1 space-y-0.5">
                              {SERVICES_MENU.map((svc, si) => (
                                <Link
                                  key={si}
                                  to={svc.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="nav-sans flex flex-col px-4 py-2.5 rounded-xl hover:bg-violet-50 transition-all"
                                >
                                  <span className="text-[.82rem] font-semibold text-slate-700">{svc.label}</span>
                                  <span className="text-[.7rem] text-slate-400 mt-0.5">{svc.sub}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045, duration: .35, ease: [.22, 1, .36, 1] }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`mobile-link nav-sans flex items-center px-4 py-3.5 text-[.9rem] font-semibold transition-all ${
                          isActive(link.href) ? "active" : "text-slate-700"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}

                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.045, duration: .35 }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className={`mobile-link nav-sans flex items-center px-4 py-3.5 text-[.9rem] font-semibold transition-all ${
                      isActive("/contact") ? "active" : "text-slate-700"
                    }`}
                  >
                    Contact
                  </Link>
                </motion.div>
              </div>

             
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}