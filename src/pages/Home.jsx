import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Cloud, Zap, Bot, ShieldCheck, BarChart3, Search, PenTool, Code2, Rocket, CheckCircle2 } from "lucide-react";
import { Code, Globe} from "lucide-react";

/* ─── INLINE ICONS ─── */
const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#a855f7" stroke="none">
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

const TECH_CORE = [
  { title: "Web Development", category: "Core Tech", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
  { title: "Mobile Apps", category: "Core Tech", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop" },
  { title: "Cloud Systems", category: "Core Tech", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" },
  { title: "AI Solutions", category: "Core Tech", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop" },
{ 
    title: "UI/UX Design", 
    category: "Creative", 
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000",
    desc: "Modern, conversion-focused design systems."
  },
  { title: "Cyber Security", category: "Core Tech", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" },
];

const DIGITAL_GROW = [
  { title: "SEO Strategy", category: "Growth", image: "https://images.unsplash.com/photo-1571721738239-743c94bb586d?q=80&w=800&auto=format&fit=crop" },
  { title: "Social Marketing", category: "Growth", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" },
  { title: "Paid Ads", category: "Growth", image: "https://images.unsplash.com/photo-1551288049-bbbda536ad37?q=80&w=800&auto=format&fit=crop" },
  { title: "E-mail Campaigns", category: "Growth", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" },
  { title: "Content Creation", category: "Growth", image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=800&auto=format&fit=crop" },
  { title: "Data Analytics", category: "Growth", image: "https://images.unsplash.com/photo-1551288049-bbbda536ad37?q=80&w=800&auto=format&fit=crop" },
];

const CAPABILITIES = [
  {
    title: "Web Development",
    desc: "High-performance, scalable websites using modern technologies like React and Tailwind.",
    tags: ["React", "Tailwind", "Frontend"],
    icon: Code,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    title: "UI/UX Design",
    desc: "Beautiful and intuitive user interfaces designed to maximize user engagement.",
    tags: ["Figma", "Design", "UX"],
    icon: Globe,
    image: "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5",
  },
  {
    title: "Mobile Apps",
    desc: "Responsive and fast mobile applications for Android and iOS platforms.",
    tags: ["App", "Android", "iOS"],
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
  },
  {
    title: "Digital Marketing",
    desc: "Grow your business with SEO, social media, and paid marketing strategies.",
    tags: ["SEO", "Ads", "Growth"],
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312",
  },
];

const WORKS = [
  { client: "MBA SAAS",   industry: "Healthcare",  year: "2025", result: "61% more accurate diagnoses",   sub: "An AI triage engine processing 50,000 patient records daily — built from scratch in 14 weeks.", color: "#7c3aed" },
  { client: "CartPilot",  industry: "E-Commerce",  year: "2024", result: "34% jump in conversions",       sub: "Complete rebuild of a $40M ARR storefront — pages now load in under 0.8 seconds on mobile.",   color: "#6d28d9" },
  { client: "FleetOps",   industry: "Logistics",   year: "2025", result: "28% reduction in fuel costs",   sub: "Real-time tracking platform for 12,000 delivery trucks across 6 countries. 99.97% uptime.",     color: "#5b21b6" },
];

const REVIEWS = [
  { quote: "Skavo rebuilt our checkout in 6 weeks. Sales jumped 34% overnight. They think like founders, not just developers.", name: "Sarah Chen",     role: "CTO, Mercantile AI",       initials: "SC" },
  { quote: "Our Series B investors specifically praised our product quality. Skavo delivered what three previous agencies couldn't.", name: "Marcus Williams", role: "CEO, Pulse Health",        initials: "MW" },
  { quote: "Six months post-launch — zero critical bugs. The architecture they designed will serve us for the next decade.", name: "Priya Nair",      role: "VP Engineering, FinStack", initials: "PN" },
];

const PROCESS = [
  {
    icon: Search, step: "01", title: "Discovery & Strategy",
    desc: "We study your business, users, and goals before writing a single line of code. We ask the hard questions others skip — market fit, user pain points, and long-term scalability.",
    bullets: ["Stakeholder interviews", "Competitive analysis", "Technical scoping"],
    color: "#6d28d9", bg: "#f5f3ff",
  },
  {
    icon: PenTool, step: "02", title: "Design & Architecture",
    desc: "You see exactly what we're building — real designs, real system architecture — before we start. Every decision is explained and agreed upon. Zero surprises.",
    bullets: ["Wireframes & prototypes", "System design review", "Timeline & milestones"],
    color: "#7c3aed", bg: "#ede9fe",
  },
  {
    icon: Code2, step: "03", title: "Build & Iterate",
    desc: "Two-week sprints. Live staging environment. Weekly demos. You're in full control at every step. Feedback is taken seriously and acted on immediately.",
    bullets: ["Agile 2-week sprints", "Weekly demo calls", "Live staging access"],
    color: "#9333ea", bg: "#faf5ff",
  },
  {
    icon: Rocket, step: "04", title: "Launch & Support",
    desc: "We go live with you and stay on for 90 days. Monitoring, bug fixes, performance tuning — all included. If anything breaks, we fix it immediately at no extra charge.",
    bullets: ["90-day post-launch cover", "Performance monitoring", "Zero extra charge fixes"],
    color: "#a855f7", bg: "#fdf4ff",
  },
];

const FAQS = [
  { q: "How quickly can we get started?",                a: "Within 48 hours of signing. You'll have your first deliverable in hand within 10 days." },
  { q: "Do we own all the code you write?",              a: "100%. Every line of code and every design is yours from day one. No lock-in, ever." },
  { q: "We already have a product. Can you improve it?", a: "That's one of our specialities. We audit your existing product and improve, extend, or rebuild — whatever gives you the best return." },
  { q: "What if something breaks after launch?",         a: "We support you for 90 days post-launch. Anything that breaks, we fix it — fast, no extra charge." },
  { q: "Do you work with startups or only enterprises?", a: "Both. We love early-stage founders as much as enterprise product teams. Everyone gets the same focus and quality." },
];

const ServiceCard = ({ item }) => (
  <div className="group relative h-[230px] w-full rounded-[24px] overflow-hidden bg-slate-900 shadow-lg transition-all duration-500 hover:-translate-y-1 cursor-pointer">
    
    <img 
      src={item.image} 
      alt={item.title}
      className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 group-hover:scale-110 group-hover:opacity-80 transition-all duration-1000 ease-in-out"
    />
    
    {/* Stronger Bottom Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

    {/* Slimmer, Bottom-Anchored Glass Box */}
    <div className="absolute bottom-3 left-3 right-3 p-4 rounded-[18px] border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 overflow-hidden">
      
      {/* Animated Shine */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000" />
      
      {/* Tiny Badge */}
      <span className="inline-block px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-400/30 text-[8px] font-bold text-violet-300 uppercase tracking-[0.2em] mb-1">
        {item.category}
      </span>
      
      {/* Smaller Heading - fits better in 230px */}
      <h3 className="text-lg font-bold text-white tracking-tight leading-tight group-hover:mb-2 transition-all duration-300">
        {item.title}
      </h3>
      
      {/* Description - only appears on hover to save space */}
      <p className="text-[11px] text-slate-300 opacity-0 max-h-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-500 ease-in-out leading-tight">
        {item.desc}
      </p>
    </div>
  </div>
);

/* ═══════════════════════════════════════ MAIN ════════════════════════════════════════ */
export default function SkavoTech() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq,  setOpenFaq]  = useState(null);

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

        /* Ticker */
        .ticker-track { display:flex; gap:5rem; width:max-content; animation:tick 28s linear infinite; }
        .ticker-track:hover { animation-play-state:paused; }
        @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* Card lift */
        .card-lift { transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
        .card-lift:hover { transform:translateY(-7px); box-shadow:0 28px 56px rgba(109,40,217,.13); }

        /* Float icon */
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .float-icon { animation:float 3.5s ease-in-out infinite; }

        /* Testimonial auto-scroll */
        @keyframes tscroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .t-track {
          display:flex;
          gap:1.5rem;
          width:max-content;
          animation:tscroll 22s linear infinite;
        }
        .t-track:hover { animation-play-state:paused; }

        /* Scrollbar */
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#7c3aed; border-radius:4px; }

        /* Stat card */
        .stat-card { transition:transform .3s ease, box-shadow .3s ease; }
        .stat-card:hover { transform:translateY(-4px); box-shadow:0 20px 40px rgba(109,40,217,.12); }

        /* Process card */
        .process-card { transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease, border-color .3s ease; }
        .process-card:hover { transform:translateY(-6px); box-shadow:0 24px 48px rgba(109,40,217,.14); border-color:#c4b5fd !important; }

        /* Services divider */
        .services-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2d9f3, transparent);
          margin: 2rem 0;
        }
      `}</style>

      {/* ════════ HERO ════════ */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-[#fdfdff]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-8%] left-[-4%] w-[55%] h-[55%] rounded-full bg-violet-100/60 blur-[110px]" />
          <div className="absolute bottom-[5%] right-[-4%] w-[45%] h-[50%] rounded-full bg-fuchsia-100/50 blur-[110px]" />
          <div className="absolute inset-0 opacity-[0.022]"
            style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%236d28d9'/%3E%3C/svg%3E\")" }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            <motion.div initial="hidden" animate="visible"
              variants={{ hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:.09}} }}>
              <motion.h1 variants={{ hidden:{opacity:0,y:20}, visible:{opacity:1,y:0} }}
                className="serif font-bold text-slate-900 leading-[1.05] tracking-tight mb-6"
                style={{ fontSize:"clamp(2.8rem,6vw,5.4rem)" }}>
                Architecting the<br />
                <span className="grad italic">Next Big Thing.</span>
              </motion.h1>
              <motion.p variants={{ hidden:{opacity:0,y:18}, visible:{opacity:1,y:0} }}
                className="sans text-base sm:text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
                We partner with ambitious companies to build{" "}
                <strong className="text-slate-800 font-semibold">industry-defining software</strong>{" "}
                — from MVP to enterprise scale. 80+ clients. 14 countries.
              </motion.p>
              <motion.div variants={{ hidden:{opacity:0}, visible:{opacity:1} }}
                className="flex flex-wrap gap-4 mb-12">
                <a href="#contact"
                  className="sans flex items-center gap-2.5 px-7 py-4 bg-slate-900 text-white font-semibold text-sm rounded-2xl hover:bg-violet-800 transition-all shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 group">
                  Launch Your Vision
                  <span className="group-hover:translate-x-1 transition-transform"><ArrowRight /></span>
                </a>
                <a href="#work"
                  className="sans flex items-center gap-2.5 px-7 py-4 bg-white text-slate-800 font-semibold text-sm rounded-2xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all">
                  Explore Portfolio
                </a>
              </motion.div>
              <motion.div variants={{ hidden:{opacity:0}, visible:{opacity:1} }}
                className="flex items-center gap-5 flex-wrap">
                <div className="flex -space-x-3">
                  {["https://randomuser.me/api/portraits/men/32.jpg","https://randomuser.me/api/portraits/women/44.jpg",
                    "https://randomuser.me/api/portraits/men/76.jpg","https://randomuser.me/api/portraits/women/68.jpg",
                    "https://randomuser.me/api/portraits/men/91.jpg"].map((img,i) => (
                    <img key={i} src={img} alt="client"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover" style={{ zIndex:5-i }} />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1">{[0,1,2,3,4].map(i=><StarIcon key={i}/>)}</div>
                  <p className="sans text-sm text-black"><strong className="text-gray-700">4.9/5</strong> · 200+ satisfied clients</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8 }}
              className="relative flex justify-center items-center">
              <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-violet-400/30 to-fuchsia-400/30 blur-[100px] rounded-full" />
              <div className="relative">
                <div className="absolute -inset-[1px] rounded-[2.6rem] bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-20 blur-md" />
                <div className="relative bg-white rounded-[2.5rem] border border-white/50 shadow-[0_25px_80px_rgba(124,58,237,0.18)] p-8 sm:p-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent rounded-[2.1rem] pointer-events-none" />
                  <motion.img src="/illustration.png" alt="Development Illustration"
                    className="w-full max-w-[360px] object-contain mx-auto relative z-10"
                    animate={{ y:[0,-12,0] }} transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }} />
                </div>
              </div>
              <div className="absolute bottom-[-30px] w-[70%] h-[40px] bg-black/10 blur-2xl rounded-full mx-auto left-0 right-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ TICKER ════════ */}
      <section className="py-10 bg-white border-y border-black overflow-hidden">
        <p className="sans text-center text-sm font-bold uppercase tracking-[0.22em] text-black mb-6">Trusted by product teams at</p>
        <div className="ticker-track">
          {["STRIPE","NOTION","LINEAR","VERCEL","FIGMA","LOOM","PADDLE","SUPERHUMAN",
            "STRIPE","NOTION","LINEAR","VERCEL","FIGMA","LOOM","PADDLE","SUPERHUMAN"].map((c,i) => (
            <span key={i} className="serif text-xl font-bold tracking-widest select-none whitespace-nowrap text-black">{c}</span>
          ))}
        </div>
      </section>


           {/* ════════ SERVICES ════════ */}

     <section id="services" className="py-10 bg-[#fafbff] relative overflow-hidden">
      {/* Background Glows (Pro Branding) */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-200/30 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-fuchsia-200/30 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-slate-900 font-extrabold tracking-tight mb-4" style={{ fontSize: "clamp(2.5rem, 3vw, 4rem)" }}>
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 italic">Core Expertise</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-violet-600 to-fuchsia-600 mx-auto rounded-full" />
        </div>

        {/* --- TECH CORE --- */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h4 className="text-2xl font-bold text-slate-800 relative">Tech Core</h4>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {TECH_CORE.map((item, i) => (
              <ServiceCard key={i} item={item} />
            ))}
          </div>
        </div>

        {/* --- DIGITAL GROW --- */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h4 className="text-2xl font-bold text-slate-800 relative">Digital Grow</h4>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {DIGITAL_GROW.map((item, i) => (
              <ServiceCard key={i} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>


      {/* ════════ OUR WORK ════════ */}
      <section id="work" className=" bg-white relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="mb-14 sm:mb-16">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-3 justify-center">
                <div className="h-px w-10 bg-fuchsia-500" />
                <span className="sans text-fuchsia-600 font-black uppercase tracking-[0.3em] text-sm sm:text-2xl">Case Studies</span>
                <div className="h-px w-10 bg-fuchsia-500" />
              </div>
             <h2
               className="serif font-bold text-slate-900 tracking-tight leading-[1.07]"
               style={{ fontSize: "clamp(2.2rem,4.8vw,4rem)" }}
            >
               Products Built for{" "}
              <span className="grad italic">Peak Performance.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORKS.map((w, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-lift group relative h-full flex flex-col rounded-[2.5rem] border border-black bg-white overflow-hidden cursor-pointer">
                  <div className="p-7 sm:p-8 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-10">
                      <div>
                        <span className="sans text-sm font-black uppercase tracking-[0.2em] text-black block mb-1 group-hover:text-violet-500 transition-colors">{w.industry}</span>
                        <span className="sans text-xs font-bold text-slate-400">{w.year}</span>
                      </div>
                    </div>
                    <h3 className="serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3 group-hover:text-violet-800 transition-colors">{w.client}</h3>
                    <p className="sans text-sm text-slate-500 leading-relaxed mb-auto font-medium pb-8">{w.sub}</p>
                    <div className="relative p-5 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-slate-50 -z-10" />
                      <div className="relative flex items-center gap-3 border border-black rounded-xl px-4 py-3">
                        <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center">
                          <Zap size={16} style={{ color:w.color }} fill={w.color} />
                        </div>
                        <div>
                          <p className="sans text-[9px] font-black uppercase tracking-widest text-violet-500 mb-0.5">Key Result</p>
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
      <section id="process" className="py-20 sm:py-20 bg-[#fdfdff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-100/40 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-100/30 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <Reveal className="mb-16 sm:mb-10">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <div className="h-px w-10 bg-violet-400" />
                <span className="sans text-violet-600 font-black uppercase tracking-[0.3em] text-sm sm:text-2xl">How We Work</span>
                <div className="h-px w-10 bg-violet-400" />
              </div>
              <h2 className="serif font-bold text-slate-900 leading-tight"
                style={{ fontSize:"clamp(2.2rem,4.8vw,4rem)" }}>
                From Idea to <span className="grad italic">Live Product.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="process-card relative flex flex-col h-full rounded-[2rem] bg-white border border-black p-7 sm:p-8 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem]"
                      style={{ background:`linear-gradient(90deg,${p.color},#c026d3)` }} />
                    <div className="flex items-center justify-between mb-7">
                      <span className="sans text-[13px] font-black uppercase tracking-[0.25em] text-black">Step {p.step}</span>
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor:p.bg, border:`1.5px solid ${p.color}30` }}>
                        <Icon size={22} style={{ color:p.color }} strokeWidth={2} />
                      </div>
                    </div>
                    <h3 className="serif text-2xl font-bold text-slate-900 mb-3 leading-snug">{p.title}</h3>
                    <p className="sans text-base text-black leading-relaxed mb-7">{p.desc}</p>
                    <ul className="mt-auto space-y-2.5">
                      {p.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color:p.color }} strokeWidth={2.5} />
                          <span className="sans text-sm font-medium text-slate-600">{b}</span>
                        </li>
                      ))}
                    </ul>
                    {i < PROCESS.length - 1 && (
                      <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-violet-200 items-center justify-center shadow-sm">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ TESTIMONIALS ════════ */}
      <section className="py-4 sm:py-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="mb-14 sm:mb-16">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <div className="h-px w-10 bg-fuchsia-400" />
                <span className="sans text-fuchsia-600 font-black uppercase tracking-[0.3em] text-sm sm:text-2xl">Client Stories</span>
                <div className="h-px w-10 bg-fuchsia-400" />
              </div>
              <h2 className="serif font-bold text-slate-900 tracking-tight"
                  style={{ fontSize: "clamp(2.2rem,4.8vw,4rem)" }}>
                 Heard From{" "}
                  <span className="grad italic">Our Clients.</span>
              </h2>
            </div>
          </Reveal>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="t-track py-2">
              {[...REVIEWS, ...REVIEWS].map((r, i) => (
                <div key={i} className="flex-shrink-0" style={{ width:"clamp(260px,30vw,380px)" }}>
                  <div className="bg-white rounded-[1.75rem] p-7 border border-black shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                    <div className="flex gap-0.5 mb-5">{[0,1,2,3,4].map(s=><StarIcon key={s}/>)}</div>
                    <p className="sans text-base text-black leading-relaxed flex-1 mb-6 italic">"{r.quote}"</p>
                    <div className="flex items-center gap-3 pt-5 border-t border-black/8">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                        style={{ background:"linear-gradient(135deg,#4c1d95,#a855f7)" }}>
                        {r.initials}
                      </div>
                      <div>
                        <p className="sans text-base font-semibold text-black">{r.name}</p>
                        <p className="sans text-sm text-slate-400">{r.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section id="faq" className="py-20 sm:py-15 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <Reveal className="mb-12 sm:mb-16">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <div className="h-px w-10 bg-violet-400" />
                <span className="sans text-violet-600 font-black uppercase tracking-[0.3em] text-sm sm:text-2xl">FAQ</span>
                <div className="h-px w-10 bg-violet-400" />
              </div>
              <h2 className="serif font-bold text-slate-900 tracking-tight"
                style={{ fontSize:"clamp(2rem,4vw,3.2rem)" }}>
                Questions We Get Asked
              </h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {FAQS.map((f,i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className={`rounded-2xl border overflow-hidden transition-all ${openFaq===i ? "border-violet-300 bg-white shadow-lg shadow-violet-100" : "border-black bg-white hover:border-violet-200"}`}>
                  <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                    className="w-full flex items-center justify-between px-6 sm:px-7 py-5 sm:py-6 text-left gap-5">
                    <span className="serif font-bold text-slate-900 text-sm sm:text-base lg:text-lg">{f.q}</span>
                    <motion.span animate={{ rotate:openFaq===i ? 45 : 0 }} transition={{ duration:.22 }}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl transition-colors ${openFaq===i ? "bg-fuchsia-500 text-white" : "bg-violet-100 text-violet-800"}`}>
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq===i && (
                      <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
                        exit={{ height:0, opacity:0 }} transition={{ duration:.32, ease:[.22,1,.36,1] }}
                        style={{ overflow:"hidden" }}>
                        <p className="sans px-6 sm:px-7 pb-6 text-slate-500 leading-relaxed text-sm sm:text-base">{f.a}</p>
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
      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-8">
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
                Let's Build Your<br />
                <span className="italic text-fuchsia-200">Next Big Thing.</span>
              </h2>
              <p className="sans text-violet-200 text-sm sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
                Join 80+ companies that chose Skavo to turn ambitious ideas into world-class digital products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:hello@skavo.tech"
                  className="sans flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 sm:py-5 bg-white text-violet-900 rounded-2xl font-bold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
                  Book a Free Strategy Call <ArrowRight />
                </a>
                <a href="#work"
                  className="sans flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-white/25 text-white rounded-2xl font-semibold text-sm sm:text-base hover:bg-white/10 transition-all">
                  View Case Studies
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}