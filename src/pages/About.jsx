import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Target, Eye, Heart, Zap, Users, Globe2, Award, Clock,
  Code2, Smartphone, Cloud, Bot, BarChart3, ShieldCheck,
  Palette, TrendingUp, CheckCircle2, ArrowRight, Linkedin,
  MapPin, Calendar, Coffee, Lightbulb
} from "lucide-react";

/* ─── INLINE ICONS ─── */
const ArrowUpRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#a855f7" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

/* ─── SCROLL REVEAL ─── */
function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ─── COUNT UP ─── */
function CountUp({ to, suffix = "", prefix = "", decimals = 0 }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = to / 55;
    const t = setInterval(() => {
      n = Math.min(n + step, to);
      setV(parseFloat(n.toFixed(decimals)));
      if (n >= to) clearInterval(t);
    }, 26);
    return () => clearInterval(t);
  }, [inView, to, decimals]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}



const SERVICES = [
  { icon: Code2,       title: "Web Development",        desc: "Modern, fast, and scalable websites and web apps built to convert." },
  { icon: Smartphone,  title: "Mobile Applications",    desc: "Cross-platform iOS & Android apps with native-quality experience." },
  { icon: Bot,         title: "AI & Automation",        desc: "Smart features, chatbots, and workflow automation that save hours daily." },
  { icon: BarChart3,   title: "ERP & CRM Systems",      desc: "Custom enterprise tools that streamline operations and boost efficiency." },
  { icon: TrendingUp,  title: "Digital Marketing",      desc: "Data-driven campaigns that reach the right audience and drive real growth." },
  { icon: Palette,     title: "Graphic Design",         desc: "Brand identities, UI/UX, and visuals that make lasting impressions." },
];

const VALUES = [
  { icon: Target,    title: "Outcome-First",    desc: "Every decision we make is measured against one question: does this move your business forward?" },
  { icon: Heart,     title: "Client-Focused",   desc: "We treat your product like our own. Your success is our benchmark, not billable hours." },
  { icon: Zap,       title: "Move Fast",        desc: "48-hour onboarding. First deliverable within 10 days. Speed without compromise." },
  { icon: ShieldCheck, title: "Transparent",   desc: "Real designs, real architecture, real timelines — no surprises, ever." },
];

const WHY_CHOOSE = [
  "Customized solutions tailored to your exact business needs",
  "Dedicated project manager and 24-hour response guarantee",
  "Full IP ownership — every line of code is yours from day one",
  "Modern tech stack: React, Next.js, Node.js, Python, AWS",
  "90-day post-launch support at no extra charge",
  "Scalable architecture designed to grow with your business",
];

const STATS = [
  { value: 60,  suffix: "+",   label: "Engineers & Designers",  icon: Users,    color: "#4c1d95", bg: "#f5f3ff" },
  { value: 200, suffix: "+",   label: "Products Shipped",       icon: Zap,      color: "#7c3aed", bg: "#ede9fe" },
  { value: 8,   suffix: " yrs",label: "Industry Experience",    icon: Calendar, color: "#6d28d9", bg: "#f5f3ff" },
  { value: 14,  suffix: "+",   label: "Countries Served",       icon: Globe2,   color: "#a855f7", bg: "#fdf4ff" },
  { value: 4.9, suffix: "★",   label: "Average Client Rating",  icon: Award,    color: "#c026d3", bg: "#fdf4ff", decimals: 1 },
  { value: 80,  suffix: "+",   label: "Active Client Partners", icon: Coffee,   color: "#7c3aed", bg: "#ede9fe" },
];

const OFFICES = [
  { city: "Nagpur",     country: "Maharashtra, India", type: "Headquarters" },
];



/* ═══════════════════════════ MAIN ═══════════════════════════ */
export default function AboutSkavo() {
  const [scrolled,  setScrolled] = useState(false);
  const [menuOpen,  setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("mission");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}
      className="bg-white text-gray-900 overflow-x-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,9..40,600&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,600;1,9..144,800&display=swap');

        .serif { font-family: 'Fraunces', Georgia, serif; }
        .sans  { font-family: 'DM Sans', system-ui, sans-serif; }

        html { scroll-behavior: smooth; }
        ::selection { background: #ddd6fe; color: #4c1d95; }

        .grad { background: linear-gradient(120deg,#6d28d9,#c026d3); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        .card-lift { transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
        .card-lift:hover { transform:translateY(-7px); box-shadow:0 28px 56px rgba(109,40,217,.13); }

        .glow-hover { position:relative; }
        .glow-hover::before { content:''; position:absolute; inset:-1px; border-radius:inherit; background:linear-gradient(135deg,#7c3aed,#c026d3); z-index:-1; opacity:0; transition:opacity .3s; }
        .glow-hover:hover::before { opacity:1; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .float-icon { animation:float 3.5s ease-in-out infinite; }

        @keyframes shimmer { from{left:-80%} to{left:120%} }

        /* Timeline connector */
        .timeline-line { position:relative; }
        .timeline-line::before {
          content:''; position:absolute; left:1.5rem; top:4rem; bottom:-1rem;
          width:2px; background:linear-gradient(180deg,#7c3aed,#c026d3,transparent);
        }
        @media(min-width:768px){
          .timeline-line::before { display:none; }
        }

        /* Ticker */
        .ticker-wrap { overflow:hidden; }
        .ticker { display:flex; gap:5rem; width:max-content; animation:tick 28s linear infinite; }
        .ticker:hover { animation-play-state:paused; }
        @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* Tab underline */
        .tab-btn { position:relative; transition:color .2s; }
        .tab-btn::after { content:''; position:absolute; bottom:-2px; left:0; width:100%; height:2px; background:linear-gradient(90deg,#6d28d9,#c026d3); transform:scaleX(0); transition:transform .25s ease; border-radius:2px; }
        .tab-btn.active::after { transform:scaleX(1); }

        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#7c3aed; border-radius:4px; }
      `}</style>

      

      {/* ══════ HERO ══════ */}
      <section className="relative min-h-[88vh] flex items-center pt-28 pb-20 overflow-hidden bg-[#fdfdff]">
        {/* Mesh gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-8%] left-[-4%] w-[55%] h-[55%] rounded-full bg-violet-100/60 blur-[110px]" />
          <div className="absolute bottom-[5%] right-[-4%] w-[45%] h-[50%] rounded-full bg-fuchsia-100/50 blur-[110px]" />
          <div className="absolute inset-0 opacity-[0.022]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%236d28d9'/%3E%3C/svg%3E\")" }} />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

            {/* Left copy */}
            <motion.div initial="hidden" animate="visible"
              variants={{ hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:.09}} }}>

              <motion.div variants={{ hidden:{opacity:0,y:14}, visible:{opacity:1,y:0} }}
                className="flex items-center gap-3 mb-7">
                <div className="h-px w-10 bg-violet-500" />
                <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">Our Story</span>
              </motion.div>

              <motion.h1 variants={{ hidden:{opacity:0,y:20}, visible:{opacity:1,y:0} }}
                className="serif font-bold text-slate-900 leading-[1.05] tracking-tight mb-7"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
                We Think Like<br />
                <span className="grad italic">Founders.</span>
              </motion.h1>

              <motion.p variants={{ hidden:{opacity:0,y:18}, visible:{opacity:1,y:0} }}
                className="sans text-lg text-slate-500 leading-relaxed mb-6 max-w-lg">
                Skavo Tech Solutions Pvt. Ltd was built by a team that got tired of agencies that bill hours and forget outcomes.{" "}
                <strong className="text-slate-800 font-semibold">We measure success by your growth</strong> — not by invoices.
              </motion.p>

              <motion.p variants={{ hidden:{opacity:0,y:16}, visible:{opacity:1,y:0} }}
                className="sans text-base text-slate-400 leading-relaxed mb-10 max-w-lg">
                Headquartered in Nagpur & Navi Mumbai, we've shipped 200+ products across healthcare, fintech, logistics, SaaS, and e-commerce — in 14 countries.
              </motion.p>

              <motion.div variants={{ hidden:{opacity:0}, visible:{opacity:1} }}
                className="flex flex-wrap gap-4">
                <a href="#contact"
                  className="sans flex items-center gap-2.5 px-8 py-4 bg-slate-900 text-white font-semibold text-sm rounded-2xl hover:bg-violet-800 transition-all shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 group">
                  Work With Us
                  <span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={16} /></span>
                </a>
                <a href="#team"
                  className="sans flex items-center gap-2.5 px-8 py-4 bg-white text-slate-800 font-semibold text-sm rounded-2xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all">
                  Meet the Team
                </a>
              </motion.div>
            </motion.div>

            {/* Right — Stats grid */}
            <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.2 }}
              className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, suffix, label, icon: Icon, color, bg, decimals=0 }, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay: 0.3 + i*0.08, duration:0.5, ease:[0.22,1,0.36,1] }}
                  className="glow-hover p-6 rounded-3xl border border-black hover:shadow-xl hover:shadow-violet-100/50 transition-all"
                  style={{ backgroundColor: bg }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={14} style={{ color }} />
                  </div>
                  <p className="serif font-bold leading-none mb-1.5"
                    style={{ color, fontSize:"clamp(1.8rem,3vw,2.4rem)" }}>
                    <CountUp to={value} suffix={suffix} decimals={decimals} />
                  </p>
                  <p className="sans text-black text-xs leading-snug font-medium">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ TICKER ══════ */}
      <section className="py-8 bg-white border-t border-b border-black overflow-hidden ticker-wrap">
        <div className="ticker">
          {["NAGPUR","NAVI MUMBAI","14 COUNTRIES","200+ PRODUCTS","8 YEARS","60+ ENGINEERS","AI & AUTOMATION","FULL IP OWNERSHIP",
            "NAGPUR","NAVI MUMBAI","14 COUNTRIES","200+ PRODUCTS","8 YEARS","60+ ENGINEERS","AI & AUTOMATION","FULL IP OWNERSHIP"].map((c,i)=>(
            <span key={i} className="serif text-base font-bold tracking-widest select-none whitespace-nowrap text-black">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ══════ MISSION / VISION TABS ══════ */}
      <section className="py-24 sm:py-32 bg-[#fdfdff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-violet-100/50 blur-[120px] pointer-events-none opacity-60" />
        <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-fuchsia-100/40 blur-[120px] pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <Reveal className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-violet-500" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">Who We Are</span>
            </div>
            <h2 className="serif font-bold text-slate-900 tracking-tight leading-[1.07]"
              style={{ fontSize:"clamp(2.4rem,5vw,4rem)" }}>
              Purpose-Driven.<br />
              <span className="grad italic">Results-Obsessed.</span>
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">

            {/* Tab content */}
            <Reveal delay={0.1}>
              {/* Tab buttons */}
              <div className="flex gap-6 border-b-2 border-violet-100 mb-8">
                {["mission","vision","story"].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`tab-btn sans pb-3 text-base font-bold uppercase tracking-widest capitalize transition-colors ${
                      activeTab===tab ? "active text-violet-900" : "text-slate-400 hover:text-slate-700"
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={activeTab}
                  initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
                  transition={{ duration:.35, ease:[.22,1,.36,1] }}>
                  {activeTab === "mission" && (
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center mb-6 float-icon">
                        <Target size={26} className="text-violet-700" strokeWidth={1.8} />
                      </div>
                      <h3 className="serif text-3xl font-bold text-slate-900 mb-4">Our Mission</h3>
                      <p className="sans text-slate-500 leading-relaxed text-lg mb-4">
                        To deliver innovative technology solutions that create real, measurable value for our clients. Through advanced engineering and a customer-focused approach, we help businesses improve efficiency, adopt modern technologies, and grow successfully in the digital world.
                      </p>
                      <p className="sans text-slate-400 leading-relaxed text-base">
                        We don't just build software. We build competitive advantages. Every product we ship is designed to be a business asset — one that compounds in value over time.
                      </p>
                    </div>
                  )}
                  {activeTab === "vision" && (
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-fuchsia-100 border border-fuchsia-200 flex items-center justify-center mb-6 float-icon">
                        <Eye size={26} className="text-fuchsia-700" strokeWidth={1.8} />
                      </div>
                      <h3 className="serif text-3xl font-bold text-slate-900 mb-4">Our Vision</h3>
                      <p className="sans text-slate-500 leading-relaxed text-lg mb-4">
                        To become the most trusted technology partner for ambitious businesses across India and beyond — known not just for code quality, but for the tangible business outcomes we deliver.
                      </p>
                      <p className="sans text-slate-400 leading-relaxed text-base">
                        We envision a future where every business — from early-stage startup to enterprise — has access to world-class engineering talent and strategic technology guidance.
                      </p>
                    </div>
                  )}
                  {activeTab === "story" && (
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center mb-6 float-icon">
                        <Lightbulb size={26} className="text-violet-700" strokeWidth={1.8} />
                      </div>
                      <h3 className="serif text-3xl font-bold text-slate-900 mb-4">How It Started</h3>
                      <p className="sans text-slate-500 leading-relaxed text-lg mb-4">
                        Skavo was founded by Sakshi and Saurabh — a developer and a CA — who shared one frustration: businesses deserved better than overpriced agencies that disappeared after launch.
                      </p>
                      <p className="sans text-slate-400 leading-relaxed text-base">
                        From Nagpur, we started with a single client and a relentless focus on outcomes. Eight years later, we've grown to 60+ people across two cities, shipping products used by thousands worldwide.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </Reveal>

            {/* Values grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                return (
                  <Reveal key={i} delay={i*0.08}>
                    <div className="group relative h-full">
                      <div className="absolute -inset-[1px] rounded-[1.6rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]"
                        style={{ background:"linear-gradient(135deg,#7c3aed,#c026d3)" }} />
                      <div className="relative p-6 rounded-[1.5rem] bg-white border border-black group-hover:border-transparent group-hover:shadow-[0_20px_48px_rgba(124,58,237,0.12)] group-hover:-translate-y-1 transition-all duration-400 h-full">
                        <div className="w-11 h-11 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-4 group-hover:bg-violet-900 transition-all duration-400">
                          <Icon size={22} className="text-violet-600 group-hover:text-white transition-colors" strokeWidth={1.8} />
                        </div>
                        <h4 className="serif text-lg font-bold text-slate-900 mb-2 group-hover:text-violet-800 transition-colors">{v.title}</h4>
                        <p className="sans text-sm text-black leading-relaxed group-hover:text-slate-600 transition-colors">{v.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

     
      {/* ══════ SERVICES ══════ */}
      <section className="py-20 sm:py-10 bg-[#fdfdff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-violet-100/50 blur-[120px] pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <Reveal className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-violet-400" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">What We Do</span>
              <div className="h-px w-10 bg-violet-400" />
            </div>
            <h2 className="serif font-bold text-slate-900 tracking-tight leading-[1.07]"
              style={{ fontSize:"clamp(2.4rem,4.8vw,4rem)" }}>
              Six Ways We Help<br />
              <span className="grad italic">Your Business Grow.</span>
            </h2>
            <p className="sans text-slate-500 text-base sm:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
              From concept to launch and beyond — every capability you need under one roof.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Reveal key={i} delay={i*0.07}>
                  <div className="group relative h-full">
                    <div className="absolute -inset-[1px] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]"
                      style={{ background:"linear-gradient(135deg,#7c3aed,#c026d3)" }} />
                    <div className="relative p-8 rounded-[2rem] bg-white border border-black h-full group-hover:border-transparent group-hover:shadow-[0_24px_56px_rgba(124,58,237,0.12)] group-hover:-translate-y-1.5 transition-all duration-400">
                      {/* shimmer */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-[2rem] transition-opacity duration-700 overflow-hidden"
                        style={{ background:"linear-gradient(105deg, transparent 40%, rgba(255,255,255,.5) 50%, transparent 60%)", animation:"shimmer 1.5s ease forwards" }} />
                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-[1.2rem] bg-violet-50 border border-violet-100 flex items-center justify-center mb-5 group-hover:bg-violet-900 transition-all duration-400 float-icon">
                          <Icon size={24} className="text-violet-600 group-hover:text-white transition-colors duration-400" strokeWidth={1.8} />
                        </div>
                        <h3 className="serif text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-800 transition-colors">{svc.title}</h3>
                        <p className="sans text-sm text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">{svc.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════ WHY CHOOSE US ══════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-violet-400" />
                <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">Our Edge</span>
              </div>
              <h2 className="serif font-bold text-slate-900 tracking-tight leading-[1.07] mb-8"
                style={{ fontSize:"clamp(2rem,4vw,3.4rem)" }}>
                Why 80+ Companies<br />
                <span className="grad italic">Choose Skavo.</span>
              </h2>
              <p className="sans text-slate-400 leading-relaxed text-sm sm:text-base mb-8">
                We're not just another dev shop. Here's what makes working with Skavo different from day one.
              </p>

              {/* Offices */}
              <div className="flex flex-wrap gap-3">
                {OFFICES.map((o, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-violet-100 bg-violet-50">
                    <MapPin size={13} className="text-violet-600" />
                    <span className="sans text-xs font-semibold text-violet-800">{o.city}</span>
                    <span className="sans text-[10px] text-violet-500 bg-violet-100 px-2 py-0.5 rounded-full">{o.type}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-3">
                {WHY_CHOOSE.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
                    transition={{ delay:i*0.07, duration:0.45, ease:[0.22,1,0.36,1] }}
                    viewport={{ once:true }}
                    className="group flex items-start gap-4 p-5 rounded-2xl border border-black hover:border-violet-300 hover:bg-violet-50/60 transition-all cursor-default">
                    <CheckCircle2 size={18} className="text-violet-600 mt-0.5 flex-shrink-0 group-hover:text-fuchsia-600 transition-colors" />
                    <span className="sans text-base text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">{item}</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════ SKILLS / EXPERTISE BAR ══════ */}
      <section className="py-20 sm:py-10 bg-[#fdfdff] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-fuchsia-100/40 blur-[120px] pointer-events-none opacity-60" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-fuchsia-400" />
              <span className="sans text-fuchsia-600 font-black uppercase tracking-[0.35em] text-[25px]">Expertise</span>
              <div className="h-px w-10 bg-fuchsia-400" />
            </div>
            <h2 className="serif font-bold text-slate-900 tracking-tight"
              style={{ fontSize:"clamp(2.2rem,6vw,4rem)" }}>
              Where We Excel
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-x-14 gap-y-8 max-w-4xl mx-auto">
            {[
              { label: "Custom Web Development",        pct: 90, color: "#6d28d9" },
              { label: "Mobile App Development",        pct: 70, color: "#7c3aed" },
              { label: "AI & Automation Solutions",     pct: 75, color: "#a855f7" },
              { label: "Digital Marketing",             pct: 90, color: "#c026d3" },
              { label: "Cloud & DevOps",                pct: 80, color: "#4c1d95" },
              { label: "Graphic & UI/UX Design",        pct: 55, color: "#9333ea" },
            ].map((skill, i) => (
              <Reveal key={i} delay={i*0.07}>
                <SkillBar {...skill} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section id="contact" className="py-16 px-4 sm:px-8">
        <Reveal>
          <div className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden relative"
            style={{ background:"linear-gradient(135deg,#3b0764 0%,#6d28d9 55%,#c026d3 100%)" }}>
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize:"28px 28px" }} />
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-fuchsia-400/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-violet-300/20 blur-3xl" />

            <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-24 text-center">
              

              <h2 className="serif font-bold text-white tracking-tight leading-[1.05] mb-7"
                style={{ fontSize:"clamp(2.2rem,6vw,4rem)" }}>
                Let's Build Something<br />
                <span className="italic text-fuchsia-200">Extraordinary Together.</span>
              </h2>

              <p className="sans text-violet-200 text-base sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                From early-stage startups to enterprise product teams — we partner with ambitious companies ready to build world-class digital products.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:hello@skavo.tech"
                  className="sans flex items-center justify-center gap-2.5 px-10 py-5 bg-white text-violet-900 rounded-2xl font-bold text-base hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
                  Book a Free Strategy Call <ArrowRight size={16} />
                </a>
                <a href="/"
                  className="sans flex items-center justify-center gap-2.5 px-10 py-5 bg-transparent border-2 border-white/25 text-white rounded-2xl font-semibold text-base hover:bg-white/10 transition-all">
                  View Our Work <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      

    </div>
  );
}

/* ─── SKILL BAR COMPONENT ─── */
function SkillBar({ label, pct, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="sans text-sm font-semibold text-slate-700">{label}</span>
        <span className="sans text-xs font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-2.5 bg-violet-50 border border-violet-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, #c026d3)` }}
        />
      </div>
    </div>
  );
}