import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Cloud, Zap, Bot, ShieldCheck, BarChart3, Search, PenTool, Code2, Rocket } from "lucide-react";

/* ─── INLINE ICONS ─── */
const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const ArrowUpRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
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
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#a855f7" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
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
function CountUp({ to, suffix = "", prefix = "" }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.ceil(to / 55);
    const t = setInterval(() => { n = Math.min(n + step, to); setV(n); if (n >= to) clearInterval(t); }, 26);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}

/* ─── DATA ─── */
const CAPABILITIES = [
  { num: "01", icon: Monitor,     title: "Web & App Development",  desc: "We design and build websites, web apps, and platforms that are fast, beautiful, and ready to scale the moment traffic spikes.",   tags: ["React", "Next.js", "Node.js"] },
  { num: "02", icon: Smartphone,  title: "Mobile Applications",    desc: "Native-quality iOS and Android apps built with React Native — one codebase, two platforms, zero compromises on feel.",           tags: ["iOS", "Android", "React Native"] },
  { num: "03", icon: Cloud,       title: "Cloud & Infrastructure",  desc: "We set up and manage the cloud systems that keep your product alive 24/7 — auto-scaling, monitored, and bulletproof.",           tags: ["AWS", "GCP", "DevOps"] },
  { num: "04", icon: Bot,         title: "AI & Smart Features",     desc: "We embed AI directly into your product — intelligent search, chatbots, recommendations, and automation that actually works.",    tags: ["LLMs", "Automation", "ML"] },
  { num: "05", icon: ShieldCheck, title: "Security & Compliance",   desc: "From penetration testing to SOC 2 readiness — we harden your product so your users' data stays safe and your audits pass.",     tags: ["SOC 2", "GDPR", "Pen Testing"] },
  { num: "06", icon: BarChart3,   title: "Data & Analytics",        desc: "We turn scattered numbers into real-time dashboards and reports that let you make faster, smarter business decisions.",          tags: ["Dashboards", "BI", "Pipelines"] },
];

const WORKS = [
  { client: "MedFlowAI", industry: "Healthcare",  year: "2025", result: "61% more accurate diagnoses",   sub: "An AI triage engine processing 50,000 patient records daily — built from scratch in 14 weeks.",      color: "#7c3aed" },
  { client: "CartPilot",  industry: "E-Commerce", year: "2024", result: "34% jump in conversions",       sub: "Complete rebuild of a $40M ARR storefront — pages now load in under 0.8 seconds on mobile.",         color: "#6d28d9" },
  { client: "FleetOps",   industry: "Logistics",  year: "2025", result: "28% reduction in fuel costs",   sub: "Real-time tracking platform for 12,000 delivery trucks across 6 countries. 99.97% uptime.",          color: "#5b21b6" },
];

const REVIEWS = [
  { quote: "Skavo rebuilt our checkout in 6 weeks. Sales jumped 34% overnight. They think like founders, not just developers.", name: "Sarah Chen",     role: "CTO, Mercantile AI",    initials: "SC" },
  { quote: "Our Series B investors specifically praised our product quality. Skavo delivered what three previous agencies couldn't.", name: "Marcus Williams", role: "CEO, Pulse Health",     initials: "MW" },
  { quote: "Six months post-launch — zero critical bugs. The architecture they designed will serve us for the next decade.", name: "Priya Nair",      role: "VP Engineering, FinStack", initials: "PN" },
];

const PROCESS = [
  { icon: Search,   title: "Discovery",      desc: "We study your business, users, and goals before writing a single line of code. We ask the hard questions." },
  { icon: PenTool,  title: "Design & Plan",  desc: "You see exactly what we're building — real designs, real architecture — before we start. No surprises." },
  { icon: Code2,    title: "Build & Ship",   desc: "Two-week sprints. Live staging. Weekly demos. You're in full control at every step of the build." },
  { icon: Rocket,   title: "Launch & Grow",  desc: "We go live with you and stay for 90 days. If anything breaks, we fix it — immediately, no extra charge." },
];

const FAQS = [
  { q: "How quickly can we get started?",                   a: "Within 48 hours of signing. You'll have your first deliverable in hand within 10 days." },
  { q: "Do we own all the code you write?",                  a: "100%. Every line of code and every design is yours from day one. No lock-in, ever." },
  { q: "We already have a product. Can you improve it?",    a: "That's one of our specialities. We audit your existing product and improve, extend, or rebuild — whatever gives you the best return." },
  { q: "What if something breaks after launch?",            a: "We support you for 90 days post-launch. Anything that breaks, we fix it — fast, no extra charge." },
  { q: "Do you work with startups or only enterprises?",    a: "Both. We love early-stage founders as much as enterprise product teams. Everyone gets the same focus and quality." },
];

/* ═══════════════════════════════════════ MAIN ════════════════════════════════════════ */
export default function SkavoTech() {
  const [scrolled,     setScrolled]    = useState(false);
  const [menuOpen,     setMenuOpen]    = useState(false);
  const [activeReview, setActive]      = useState(0);
  const [openFaq,      setOpenFaq]     = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const NAV = [
    { label: "Services", href: "#services" },
    { label: "Our Work", href: "#work"     },
    { label: "Process",  href: "#process"  },
    { label: "About",    href: "#about"    },
    { label: "FAQ",      href: "#faq"      },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}
      className="bg-white text-gray-900 overflow-x-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,9..40,600&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,600;1,9..144,800&display=swap');

        .serif { font-family: 'Fraunces', Georgia, serif; }
        .sans  { font-family: 'DM Sans',  system-ui, sans-serif; }

        html { scroll-behavior: smooth; }
        ::selection { background: #ddd6fe; color: #4c1d95; }

        /* gradient text */
        .grad { background: linear-gradient(120deg,#6d28d9,#c026d3); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        /* live pulse */
        .pulse-live { animation: pulselive 2s ease-in-out infinite; }
        @keyframes pulselive { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.6)} }

        /* ticker */
        .ticker { display:flex; gap:5rem; width:max-content; animation:tick 28s linear infinite; }
        .ticker:hover { animation-play-state:paused; }
        @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* shimmer sweep */
        @keyframes sweep { from{left:-80%} to{left:120%} }

        /* service row hover */
        .svc-row { border-bottom:1px solid #ede9fe; transition:background .25s,padding-left .3s; }
        .svc-row:first-child { border-top:1px solid #ede9fe; }
        .svc-row:hover { background:#faf8ff; padding-left:1.75rem; }

        /* card lift */
        .card-lift { transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
        .card-lift:hover { transform:translateY(-7px); box-shadow:0 28px 56px rgba(109,40,217,.13); }

        /* glow border on hover */
        .glow-hover { position:relative; }
        .glow-hover::before { content:''; position:absolute; inset:-1px; border-radius:inherit; background:linear-gradient(135deg,#7c3aed,#c026d3); z-index:-1; opacity:0; transition:opacity .3s; }
        .glow-hover:hover::before { opacity:1; }

        /* process icon float */
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .float-icon { animation:float 3.5s ease-in-out infinite; }

        /* custom scrollbar */
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#7c3aed; border-radius:4px; }
      `}</style>

      {/* ════════ NAV ════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "py-3 bg-white/95 backdrop-blur-xl shadow-sm shadow-violet-100/50" : "py-5 bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <a href="#" className="serif text-2xl font-bold text-violet-950 tracking-tight">
            Skavo<span className="text-fuchsia-600 italic">.</span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {NAV.map(l => (
              <a key={l.label} href={l.href}
                className="sans px-4 py-2 text-sm font-medium text-gray-500 hover:text-violet-800 rounded-lg hover:bg-violet-50 transition-all">
                {l.label}
              </a>
            ))}
          </div>

          <a href="#contact"
            className="hidden lg:flex items-center gap-2 px-6 py-3 bg-violet-900 text-white text-sm font-semibold rounded-xl hover:bg-fuchsia-700 transition-all shadow-lg shadow-violet-200 hover:scale-105 active:scale-95">
            Start a Project <ArrowRight />
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-violet-50 text-violet-900">
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="lg:hidden bg-white border-t border-violet-50 shadow-xl px-6 py-5 flex flex-col gap-1">
              {NAV.map(l => (
                <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                  className="sans text-base font-semibold text-gray-700 hover:text-violet-800 hover:bg-violet-50 px-3 py-3 rounded-xl transition">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)}
                className="mt-3 text-center px-6 py-3.5 bg-violet-900 text-white font-bold text-sm rounded-xl">
                Start a Project
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ════════ HERO ════════ */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#fdfdff]">

        {/* Mesh gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-8%] left-[-4%] w-[55%] h-[55%] rounded-full bg-violet-100/60 blur-[110px]" />
          <div className="absolute bottom-[5%] right-[-4%] w-[45%] h-[50%] rounded-full bg-fuchsia-100/50 blur-[110px]" />
          <div className="absolute inset-0 opacity-[0.022]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%236d28d9'/%3E%3C/svg%3E\")" }} />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

            {/* Left */}
            <motion.div initial="hidden" animate="visible"
              variants={{ hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:.09}} }}>

              
              <motion.h1 variants={{ hidden:{opacity:0,y:20}, visible:{opacity:1,y:0} }}
                className="serif font-bold text-slate-900 leading-[1.05] tracking-tight mb-7"
                style={{ fontSize: "clamp(3.2rem, 6vw, 5.4rem)" }}>
                Architecting the<br />
                <span className="grad italic">Next Big Thing.</span>
              </motion.h1>

              <motion.p variants={{ hidden:{opacity:0,y:18}, visible:{opacity:1,y:0} }}
                className="sans text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
                We partner with ambitious companies to build{" "}
                <strong className="text-slate-800 font-semibold">industry-defining software</strong>{" "}
                — from MVP to enterprise scale. 80+ clients. 14 countries.
              </motion.p>

              <motion.div variants={{ hidden:{opacity:0}, visible:{opacity:1} }}
                className="flex flex-wrap gap-4 mb-12">
                <a href="#contact"
                  className="sans flex items-center gap-2.5 px-8 py-4 bg-slate-900 text-white font-semibold text-sm rounded-2xl hover:bg-violet-800 transition-all shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 group">
                  Launch Your Vision
                  <span className="group-hover:translate-x-1 transition-transform"><ArrowRight /></span>
                </a>
                <a href="#work"
                  className="sans flex items-center gap-2.5 px-8 py-4 bg-white text-slate-800 font-semibold text-sm rounded-2xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all">
                  Explore Portfolio
                </a>
              </motion.div>

              {/* Social proof */}
              <motion.div variants={{ hidden:{opacity:0}, visible:{opacity:1} }}
                className="flex items-center gap-5 flex-wrap">
                <div className="flex -space-x-3">
                  {["SC","MW","PN","JL","AR"].map((a, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                      style={{ background:`hsl(${270+i*12},60%,${36+i*6}%)`, zIndex:5-i }}>
                      {a}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1">{[0,1,2,3,4].map(i=><StarIcon key={i}/>)}</div>
                  <p className="sans text-xs text-gray-500"><strong className="text-gray-700">4.9/5</strong> · 200+ satisfied clients</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Live Project Card */}
            <motion.div initial={{ opacity:0, x:36 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:.8, ease:"easeOut" }} className="relative">

              {/* Glow halo */}
              <div className="absolute -inset-5 bg-gradient-to-tr from-violet-500/10 to-fuchsia-500/10 blur-2xl rounded-[3rem]" />

              <div className="relative bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/90 shadow-[0_24px_64px_rgba(109,40,217,0.1)] overflow-hidden">

                {/* Card header */}
                <div className="px-8 py-6 flex items-center justify-between border-b border-slate-50/80 bg-gradient-to-r from-violet-950 to-violet-800">
                  <div>
                    <p className="sans text-xs text-violet-300 font-semibold mb-0.5 uppercase tracking-wider">Currently Building</p>
                    <p className="serif text-white font-bold text-xl tracking-tight">Aetheris · AI Platform</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-live" />
                    <span className="sans text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Live Sprint</span>
                  </div>
                </div>

                <div className="p-7">
                  {/* Metrics row */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label:"Inference Time", val:"12ms",  sub:"↓ 40% faster" },
                      { label:"Throughput",     val:"8.2k/s",sub:"↑ 2× this week" },
                      { label:"Accuracy",       val:"97.4%", sub:"↑ 3.2pts" },
                    ].map(({ label, val, sub }) => (
                      <div key={label} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80 text-center">
                        <p className="serif text-lg font-bold text-slate-900 leading-none mb-1">{val}</p>
                        <p className="sans text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">{label}</p>
                        <p className="sans text-[9px] text-green-500 font-semibold">{sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-3 mb-6">
                    <p className="sans text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">Sprint 6 — Delivery Progress</p>
                    {[
                      { task:"AI Model Integration",     pct:94, color:"#7c3aed" },
                      { task:"API Gateway & Auth",       pct:82, color:"#c026d3" },
                      { task:"Performance Optimisation", pct:100, color:"#16a34a" },
                      { task:"Mobile Responsiveness",    pct:67, color:"#7c3aed" },
                    ].map(({ task, pct, color }) => (
                      <div key={task}>
                        <div className="flex justify-between mb-1.5">
                          <span className="sans text-xs text-slate-600 font-medium">{task}</span>
                          <span className="sans text-xs font-bold" style={{ color }}>{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div initial={{ width:0 }} animate={{ width:`${pct}%` }}
                            transition={{ duration:1.2, delay:0.7, ease:[0.22,1,.36,1] }}
                            className="h-full rounded-full"
                            style={{ background: pct===100 ? "#16a34a" : `linear-gradient(90deg, ${color}, #c026d3)` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Team */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="flex -space-x-2">
                        {[["AD","#5b21b6"],["KR","#7c3aed"],["SL","#a855f7"],["NP","#6d28d9"]].map(([a,c])=>(
                          <div key={a} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
                            style={{ background:c }}>{a}</div>
                        ))}
                      </div>
                      <span className="sans text-xs text-slate-400 font-medium">4-person team</span>
                    </div>
                    <span className="sans text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">On Track ✓</span>
                  </div>
                </div>
              </div>

             
            </motion.div>

          </div>
        </div>
      </section>

     

      {/* ════════ TRUSTED TICKER ════════ */}
      <section className="py-10 bg-white border-b border-black overflow-hidden">
        <p className="sans text-center text-[20px] font-bold uppercase tracking-[0.22em] text-black mb-7">Trusted by product teams at</p>
        <div className="ticker">
          {["STRIPE","NOTION","LINEAR","VERCEL","FIGMA","LOOM","PADDLE","SUPERHUMAN",
            "STRIPE","NOTION","LINEAR","VERCEL","FIGMA","LOOM","PADDLE","SUPERHUMAN"].map((c,i)=>(
            <span key={i}
              className="serif text-xl font-bold tracking-widest select-none whitespace-nowrap cursor-default transition-colors duration-300 "
              style={{ color: i%2===0?"black":"black" }}
              onMouseEnter={e=>e.target.style.color="black"}
              onMouseLeave={e=>e.target.style.color=i%2===0?"black":"black"}>
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ════════ SERVICES ════════ */}
      <section id="services" className="py-24 sm:py-32 bg-[#fdfdff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-violet-100/50 blur-[120px] pointer-events-none opacity-60" />
        <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-fuchsia-100/40 blur-[120px] pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

          {/* Heading */}
          <Reveal className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-violet-500" />
                  <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">Our Capabilities</span>
                </div>
                <h2 className="serif font-bold text-slate-900 tracking-tight leading-[1.07]"
                  style={{ fontSize:"clamp(2.6rem, 5vw, 4.4rem)" }}>
                  Pushing the Boundaries<br />
                  <span className="grad italic">of Digital Engineering.</span>
                </h2>
              </div>
              
            </div>
          </Reveal>

          {/* Service cards */}
          <div className="space-y-5">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="group relative">
                    {/* animated glow border */}
                    <div className="absolute -inset-[1px] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]"
                      style={{ background:"linear-gradient(135deg,#7c3aed,#c026d3,#7c3aed)" }} />

                    <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 px-7 sm:px-10 py-8 sm:py-10 rounded-[2rem] bg-white border  border-black group-hover:border-transparent group-hover:shadow-[0_32px_64px_rgba(124,58,237,0.14)] group-hover:-translate-y-1 transition-all duration-500 overflow-hidden">

                      {/* shimmer */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700"
                        style={{ background:"linear-gradient(105deg, transparent 40%, rgba(255,255,255,.5) 50%, transparent 60%)", animation:"sweep 1.5s ease forwards" }} />

                      {/* Number */}
                      <span className="serif text-4xl font-bold text-black   group-hover:text-violet-500 transition-colors flex-shrink-0 w-10">
                        {cap.num}
                      </span>

                      {/* Icon */}
                      <div className="hidden lg:flex w-16 h-16 rounded-[1.2rem] bg-violet-50 border border-violet-100 items-center justify-center group-hover:bg-violet-900 transition-all duration-400 float-icon flex-shrink-0">
                        <Icon size={26} className="text-violet-600 group-hover:text-white transition-colors duration-400" strokeWidth={1.8}/>
                      </div>

                      {/* Title + Tags */}
                      <div className="lg:w-56 flex-shrink-0">
                        <h3 className="serif text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-violet-800 transition-colors mb-3">
                          {cap.title}
                        </h3>
                        <div className="flex gap-2 flex-wrap">
                          {cap.tags.map(t => (
                            <span key={t}
                              className="sans text-[10px] font-bold text-violet-700 uppercase tracking-wider px-2.5 py-1 bg-violet-50 rounded-lg group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="sans flex-1 text-slate-500 text-base leading-relaxed group-hover:text-slate-700 transition-colors">
                        {cap.desc}
                      </p>

                      {/* Arrow */}
                      <div className="hidden lg:flex w-12 h-12 rounded-full border border-black items-center justify-center text-slate-300 group-hover:bg-white group-hover:text-white group-hover:border-slate-900 transition-all duration-400 flex-shrink-0">
                        <ArrowUpRight />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ OUR WORK ════════ */}
      <section id="work" className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-fuchsia-500" />
                <span className="sans text-fuchsia-600 font-black uppercase tracking-[0.35em] text-[25px]">Case Studies</span>
              </div>
              <h2 className="serif font-bold text-slate-900 tracking-tight leading-[1.07]"
                style={{ fontSize:"clamp(2.4rem, 4.8vw, 4rem)" }}>
                Products Built for<br />
                <span className="grad italic">Peak Performance.</span>
              </h2>
            </div>
            <a href="#contact"
              className="sans flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-violet-700 transition-colors underline underline-offset-4 decoration-violet-200 hover:decoration-violet-600">
              See all transformations <ArrowUpRight />
            </a>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORKS.map((w, i) => (
              <Reveal key={i} delay={i*.1}>
                <div className="card-lift group relative h-full flex flex-col rounded-[2.5rem] border border-black bg-white overflow-hidden cursor-pointer">

                  <div className="p-8 flex flex-col flex-1">
                    {/* header */}
                    <div className="flex items-start justify-between mb-10">
                      <div>
                        <span className="sans text-[15px] font-black uppercase tracking-[0.2em] text-black block mb-1 group-hover:text-violet-500 transition-colors">{w.industry}</span>
                        <span className="sans text-[12px] font-bold text-black">{w.year}</span>
                      </div>
                      <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-400 shadow-sm">
                        <ArrowUpRight />
                      </div>
                    </div>

                    <h3 className="serif text-3xl font-bold text-slate-900 tracking-tight mb-3 group-hover:text-violet-800 transition-colors">
                      {w.client}
                    </h3>
                    <p className="sans text-sm text-slate-500 leading-relaxed mb-auto font-medium pb-8">{w.sub}</p>

                    {/* result chip */}
                    <div className="relative p-5 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 opacity-8 group-hover:opacity-15 transition-opacity" style={{ background:w.color }} />
                      <div className="absolute inset-0 bg-slate-50 -z-10" />
                      <div className="relative flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center">
                          <Zap size={16} style={{ color:w.color }} fill={w.color} />
                        </div>
                        <div>
                          <p className="sans text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Key Result</p>
                          <p className="serif text-lg font-bold text-slate-900 leading-tight">{w.result}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PROCESS ════════ */}
      <section id="process" className="py-24 sm:py-32 bg-[#fdfdff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-100/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <Reveal className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-violet-400" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[10px]">How We Work</span>
              <div className="h-px w-10 bg-violet-400" />
            </div>
            <h2 className="serif font-bold text-slate-900 tracking-tight leading-[1.07]"
              style={{ fontSize:"clamp(2.4rem, 4.8vw, 4rem)" }}>
              From Idea to{" "}
              <span className="grad italic">Live Product.</span>
            </h2>
            <p className="sans text-slate-500 text-base sm:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
              A battle-tested playbook across 200+ products. No confusion — you always know exactly what's happening.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={i} delay={i*.1}>
                  <div className="group relative">
                    {/* step number background */}
                    <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center mb-7 shadow-sm group-hover:bg-violet-900 group-hover:border-violet-900 transition-all duration-400">
                      <span className="sans text-xs font-black text-slate-400 group-hover:text-white transition-colors">0{i+1}</span>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-white border border-slate-100 h-full transition-all duration-400 group-hover:shadow-[0_28px_56px_rgba(124,58,237,0.10)] group-hover:border-violet-100">
                      <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-6 group-hover:bg-violet-100 transition-colors float-icon">
                        <Icon size={22} className="text-violet-600" strokeWidth={1.8} />
                      </div>
                      <h3 className="serif text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
                      <p className="sans text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ TESTIMONIALS ════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-fuchsia-400" />
              <span className="sans text-fuchsia-600 font-black uppercase tracking-[0.35em] text-[10px]">Client Stories</span>
              <div className="h-px w-10 bg-fuchsia-400" />
            </div>
            <h2 className="serif font-bold text-slate-900 tracking-tight"
              style={{ fontSize:"clamp(2.4rem, 4.8vw, 4rem)" }}>
              Heard From<br />
              <span className="grad italic">Our Clients.</span>
            </h2>
          </Reveal>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative min-h-[300px] sm:min-h-[240px]">
              <AnimatePresence mode="wait">
                {REVIEWS.map((r, i) =>
                  i === activeReview ? (
                    <motion.div key={i}
                      initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
                      transition={{ duration:.5, ease:[.22,1,.36,1] }}
                      className="absolute inset-0">
                      <div className="bg-white rounded-3xl p-9 sm:p-14 shadow-2xl shadow-violet-100/60 border border-violet-100 h-full flex flex-col justify-between">
                        <div>
                          <div className="serif text-7xl text-violet-100 leading-none mb-5 font-bold select-none">"</div>
                          <p className="sans text-xl sm:text-2xl text-slate-700 leading-relaxed italic font-light">{r.quote}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8 pt-6 border-t border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm text-white"
                              style={{ background:"linear-gradient(135deg,#4c1d95,#a855f7)" }}>
                              {r.initials}
                            </div>
                            <div>
                              <p className="serif font-bold text-violet-900">{r.name}</p>
                              <p className="sans text-sm text-slate-400">{r.role}</p>
                            </div>
                          </div>
                          <div className="sm:ml-auto flex gap-0.5">{[0,1,2,3,4].map(s=><StarIcon key={s}/>)}</div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null
                )}
              </AnimatePresence>
            </div>
            <div className="flex justify-center gap-3 mt-8">
              {REVIEWS.map((_,i)=>(
                <button key={i} onClick={()=>setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i===activeReview?"bg-violet-900 w-10":"bg-violet-200 w-2.5"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ABOUT ════════ */}
      <section id="about" className="py-24 sm:py-32 bg-[#fdfdff]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-violet-400" />
                <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[10px]">Who We Are</span>
              </div>
              <h2 className="serif font-bold text-slate-900 tracking-tight leading-[1.07] mb-8"
                style={{ fontSize:"clamp(2rem, 4vw, 3.4rem)" }}>
                We Think Like Founders.<br />
                <span className="grad italic">We Build Like Engineers.</span>
              </h2>
              <p className="sans text-slate-500 leading-relaxed mb-5 text-base sm:text-lg">
                Most agencies bill hours. We care about your outcomes. Every technical decision we make is measured against one question:{" "}
                <em className="text-slate-700">does this move the business forward?</em>
              </p>
              <p className="sans text-slate-400 leading-relaxed text-sm sm:text-base mb-10">
                Our team of 60+ engineers, designers, and product strategists has shipped 200+ products across healthcare, fintech, logistics, SaaS, and consumer apps — in 14 countries.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Outcome-First","Full IP Ownership","No Lock-In","24h Response"].map((t,i)=>(
                  <span key={i}
                    className="sans px-5 py-2.5 border-2 border-violet-100 text-violet-800 rounded-full text-sm font-semibold hover:border-fuchsia-400 hover:text-fuchsia-700 hover:bg-fuchsia-50 transition-all cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat:"60+",   desc:"Engineers & Designers", c:"#4c1d95", bg:"#f5f3ff" },
                  { stat:"200+",  desc:"Products Shipped",       c:"#7c3aed", bg:"#ede9fe" },
                  { stat:"8 yrs", desc:"Industry Experience",    c:"#6d28d9", bg:"#f5f3ff" },
                  { stat:"4.9★",  desc:"Average Client Rating",  c:"#a855f7", bg:"#fdf4ff" },
                ].map(({ stat, desc, c, bg },i)=>(
                  <div key={i} className="glow-hover p-7 rounded-3xl border border-violet-100 hover:shadow-xl hover:shadow-violet-100/50 transition-all"
                    style={{ backgroundColor:bg }}>
                    <p className="serif font-bold leading-none mb-2" style={{ color:c, fontSize:"clamp(2rem,4vw,2.8rem)" }}>{stat}</p>
                    <p className="sans text-slate-500 text-sm leading-snug">{desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section id="faq" className="py-24 sm:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-violet-400" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[10px]">FAQ</span>
              <div className="h-px w-10 bg-violet-400" />
            </div>
            <h2 className="serif font-bold text-slate-900 tracking-tight"
              style={{ fontSize:"clamp(2rem,4vw,3.2rem)" }}>
              Questions We Get Asked
            </h2>
          </Reveal>
          <div className="space-y-3">
            {FAQS.map((f,i)=>(
              <Reveal key={i} delay={i*.05}>
                <div className={`rounded-2xl border overflow-hidden transition-all ${
                  openFaq===i ? "border-violet-300 bg-white shadow-lg shadow-violet-100" : "border-slate-100 bg-white hover:border-violet-200"
                }`}>
                  <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                    className="w-full flex items-center justify-between px-7 py-5 sm:py-6 text-left gap-6">
                    <span className="serif font-bold text-slate-900 text-base sm:text-lg">{f.q}</span>
                    <motion.span animate={{ rotate:openFaq===i?45:0 }} transition={{ duration:.22 }}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl transition-colors ${
                        openFaq===i ? "bg-fuchsia-500 text-white" : "bg-violet-100 text-violet-800"
                      }`}>
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq===i && (
                      <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
                        transition={{ duration:.32, ease:[.22,1,.36,1] }} style={{ overflow:"hidden" }}>
                        <p className="sans px-7 pb-6 text-slate-500 leading-relaxed text-sm sm:text-base">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section id="contact" className="py-16 px-4 sm:px-8">
        <Reveal>
          <div className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden relative"
            style={{ background:"linear-gradient(135deg,#3b0764 0%,#6d28d9 55%,#c026d3 100%)" }}>
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize:"28px 28px" }} />
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-fuchsia-400/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-violet-300/20 blur-3xl" />

            <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-24 text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full pulse-live" />
                Limited Availability · Q3 2026
              </div>

              <h2 className="serif font-bold text-white tracking-tight leading-[1.05] mb-7"
                style={{ fontSize:"clamp(2.4rem,6vw,5rem)" }}>
                Let's Build Your<br />
                <span className="italic text-fuchsia-200">Next Big Thing.</span>
              </h2>

              <p className="sans text-violet-200 text-base sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                Join 80+ companies that chose Skavo to turn ambitious ideas into world-class digital products.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:hello@skavo.tech"
                  className="sans flex items-center justify-center gap-2.5 px-10 py-5 bg-white text-violet-900 rounded-2xl font-bold text-base hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
                  Book a Free Strategy Call <ArrowRight />
                </a>
                <a href="#work"
                  className="sans flex items-center justify-center gap-2.5 px-10 py-5 bg-transparent border-2 border-white/25 text-white rounded-2xl font-semibold text-base hover:bg-white/10 transition-all">
                  View Case Studies
                </a>
              </div>

              <p className="sans text-violet-300 text-xs mt-8 font-medium">
                No commitment required · Free 30-min discovery call · Response within 24 hours
              </p>
            </div>
          </div>
        </Reveal>
      </section>


       {/* ════════ STATS BAND ════════ */}
      <section className="py-12 sm:py-16 bg-violet-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage:"repeating-linear-gradient(45deg,#fff,#fff 1px,transparent 0,transparent 42px)" }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center relative z-10">
          {[
            { to:80,  suffix:"+",    prefix:"",  label:"Happy Clients"     },
            { to:200, suffix:"M+",   prefix:"$", label:"Revenue Generated" },
            { to:14,  suffix:"",     prefix:"",  label:"Countries Served"  },
            { to:99,  suffix:".97%", prefix:"",  label:"Average Uptime"    },
          ].map(({ to, suffix, prefix, label }, i) => (
            <Reveal key={i} delay={i*.09}>
              <p className="serif text-4xl sm:text-5xl font-bold mb-2">
                <CountUp to={to} suffix={suffix} prefix={prefix} />
              </p>
              <p className="sans text-sm font-medium text-violet-300">{label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="pt-16 pb-8 bg-white border-t border-violet-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            <div className="sm:col-span-2">
              <p className="serif text-3xl font-bold text-violet-950 tracking-tight mb-4">
                Skavo<span className="text-fuchsia-600 italic">.</span>
              </p>
              <p className="sans text-slate-400 max-w-xs leading-relaxed text-sm mb-7">
                A technology partner for ambitious companies. We design, build, and scale digital products that create measurable business value.
              </p>
              <div className="flex gap-3">
                {[["X","Twitter"],["in","LinkedIn"],["gh","GitHub"],["dr","Dribbble"]].map(([s,l])=>(
                  <button key={s} aria-label={l}
                    className="serif w-10 h-10 rounded-xl border-2 border-violet-100 text-violet-400 text-xs font-bold hover:border-fuchsia-400 hover:text-fuchsia-600 hover:bg-fuchsia-50 transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {[
              { title:"Services", links:["Web & App Development","Mobile Applications","Cloud & Infrastructure","AI Features","Security & Compliance"] },
              { title:"Company",  links:["About Us","Our Work","Case Studies","Careers","Contact"] },
            ].map((col,i)=>(
              <div key={i}>
                <p className="sans font-bold text-slate-900 mb-5 text-xs uppercase tracking-[0.15em]">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map(l=>(
                    <li key={l}><a href="#" className="sans text-slate-400 hover:text-fuchsia-600 transition-colors text-sm">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-violet-50 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="sans text-slate-400 text-xs">© 2026 Skavo Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy","Terms of Service","Cookie Policy"].map(l=>(
                <a key={l} href="#" className="sans text-slate-400 hover:text-fuchsia-600 transition-colors text-xs">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}