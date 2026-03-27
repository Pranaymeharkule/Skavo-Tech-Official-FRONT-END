import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Monitor, Smartphone, Cloud, Zap, Bot, ShieldCheck, BarChart3, TrendingUp, Palette,
  ArrowRight, CheckCircle2, ChevronDown, Search, PenTool, Code2, Rocket
} from "lucide-react";

function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
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

const PROCESS = [
  { step:"01", icon:Search,   title:"Discovery",     desc:"We study your business, users, and goals before writing a single line of code. We ask the hard questions.", color:"#7c3aed", bg:"#f5f3ff", bullets:["Stakeholder interviews","Competitor analysis","Technical scoping"] },
  { step:"02", icon:PenTool,  title:"Design & Plan", desc:"You see exactly what we're building — real designs, real architecture — before we start. No surprises.",    color:"#c026d3", bg:"#fdf4ff", bullets:["High-fidelity UI/UX","System architecture","Sprint roadmapping"] },
  { step:"03", icon:Code2,    title:"Build & Ship",  desc:"Two-week sprints. Live staging. Weekly demos. You're in full control at every step of the build.",           color:"#4c1d95", bg:"#ede9fe", bullets:["Agile development","Automated QA testing","Continuous deployment"] },
  { step:"04", icon:Rocket,   title:"Launch & Grow", desc:"We go live with you and stay for 90 days. If anything breaks, we fix it — immediately, no extra charge.",    color:"#a855f7", bg:"#faf5ff", bullets:["Zero-downtime launch","Performance monitoring","90-day bug warranty"] },
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

export default function ServicesPage() {
  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif" }} className="bg-white text-gray-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,600;1,9..144,800&display=swap');
        .serif{font-family:'Fraunces',Georgia,serif} .sans{font-family:'DM Sans',system-ui,sans-serif}
        html{scroll-behavior:smooth} ::selection{background:#ddd6fe;color:#4c1d95}
        .grad{background:linear-gradient(120deg,#6d28d9,#c026d3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}} .float-icon{animation:float 3.5s ease-in-out infinite}
        .ticker{display:flex;gap:5rem;width:max-content;animation:tick 28s linear infinite}
        .ticker:hover{animation-play-state:paused} @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .svc-row{transition:all .35s cubic-bezier(.22,1,.36,1)}
        .svc-row:hover{transform:translateY(-2px);box-shadow:0 20px 48px rgba(109,40,217,.10)}
        .process-card{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease,border-color .3s ease}
        .process-card:hover{transform:translateY(-6px);box-shadow:0 24px 48px rgba(109,40,217,.14);border-color:#c4b5fd!important}
        @keyframes cta-shimmer{0%{transform:translateX(-100%) skewX(-15deg)}100%{transform:translateX(200%) skewX(-15deg)}}
        .cta-shimmer{animation:cta-shimmer 3.5s ease-in-out infinite}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:4px}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-[110dvh] flex items-center justify-center overflow-hidden bg-[#fdfdff] py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-violet-200/40 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-fuchsia-200/40 blur-[120px]" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible"
            variants={{hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.09}}}}
            className="flex flex-col items-center text-center max-w-3xl mx-auto">

            <motion.div variants={{hidden:{opacity:0,y:14},visible:{opacity:1,y:0}}}
              className="flex items-center justify-center gap-3 mb-7">
              <div className="h-px w-10 bg-violet-500" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">What We Build</span>
              <div className="h-px w-10 bg-violet-500" />
            </motion.div>

            <motion.h1 variants={{hidden:{opacity:0,y:20},visible:{opacity:1,y:0}}}
              className="serif font-bold text-slate-900 leading-[1.05] tracking-tight mb-7"
              style={{fontSize:"clamp(3rem,6.5vw,5.4rem)"}}>
              Eight Ways We Help<br />
              <span className="grad italic">Businesses Grow.</span>
            </motion.h1>

            <motion.p variants={{hidden:{opacity:0,y:18},visible:{opacity:1,y:0}}}
              className="sans text-lg text-slate-500 leading-relaxed max-w-2xl mb-10 font-medium">
              From MVP to enterprise scale. Every capability you need to{" "}
              <strong className="text-slate-800">build, market, and grow</strong> your digital product — under one roof.
            </motion.p>

            <motion.div variants={{hidden:{opacity:0,y:16},visible:{opacity:1,y:0}}}
              className="flex flex-wrap justify-center gap-4">
              <a href="#services"
                className="sans flex items-center gap-2.5 px-8 py-4 bg-slate-900 text-white font-semibold text-sm rounded-2xl hover:bg-violet-800 transition-all shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 group">
                Explore Services <span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={16}/></span>
              </a>
              <a href="/contact"
                className="sans flex items-center gap-2.5 px-8 py-4 bg-white text-slate-800 font-semibold text-sm rounded-2xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all">
                Book Free Consultation
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <section className="py-8 bg-white border-t border-b border-black overflow-hidden">
        <div className="ticker">
          {["WEB DEVELOPMENT","MOBILE APPS","AI & AUTOMATION","CLOUD INFRA","DIGITAL MARKETING","DATA ANALYTICS","UI/UX DESIGN","SECURITY & COMPLIANCE",
            "WEB DEVELOPMENT","MOBILE APPS","AI & AUTOMATION","CLOUD INFRA","DIGITAL MARKETING","DATA ANALYTICS","UI/UX DESIGN","SECURITY & COMPLIANCE"].map((c,i)=>(
            <span key={i} className="serif text-base font-bold tracking-widest select-none whitespace-nowrap text-black">{c}</span>
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

      {/* ── PROCESS ── */}
      <section id="process" className="py-10 sm:py-7 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-100/40 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-100/30 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <Reveal className="mb-16">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <div className="h-px w-10 bg-violet-400" />
                <span className="sans text-violet-600 font-black uppercase tracking-[0.3em] text-sm sm:text-2xl">How We Work</span>
                <div className="h-px w-10 bg-violet-400" />
              </div>
              <h2 className="serif font-bold text-slate-900 leading-tight"
                style={{fontSize:"clamp(2.2rem,4.8vw,4rem)"}}>
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
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[2rem]"
                      style={{background:`linear-gradient(90deg,${p.color},#c026d3)`}} />
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-400 rounded-[2rem]"
                      style={{background:`linear-gradient(135deg,${p.bg} 0%, white 80%)`}} />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-7">
                        <span className="sans text-[13px] font-black uppercase tracking-[0.25em] text-black">Step {p.step}</span>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{backgroundColor:p.bg, border:`1.5px solid ${p.color}30`}}>
                          <Icon size={22} style={{color:p.color}} strokeWidth={2} />
                        </div>
                      </div>
                      <h3 className="serif text-2xl font-bold text-slate-900 mb-3 leading-snug">{p.title}</h3>
                      <p className="sans text-base text-slate-600 leading-relaxed mb-7">{p.desc}</p>
                      <ul className="mt-auto space-y-2.5">
                        {p.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{color:p.color}} strokeWidth={2.5} />
                            <span className="sans text-sm font-medium text-slate-600">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

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

      {/* ── CTA ── */}
      <section className="py-16 px-4 sm:px-8">
        <Reveal>
          <div className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden relative"
            style={{background:"linear-gradient(135deg,#3b0764 0%,#6d28d9 55%,#c026d3 100%)"}}>
            <div className="absolute inset-0 opacity-[0.04]"
              style={{backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)",backgroundSize:"28px 28px"}} />
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-fuchsia-400/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-violet-300/20 blur-3xl" />

            <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-24 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)"}}>
                <div className="w-2 h-2 rounded-full bg-fuchsia-300 animate-pulse" />
                <span className="sans text-xs font-bold text-white/80 uppercase tracking-widest">Free 30-min strategy call</span>
              </div>
              <h2 className="serif font-bold text-white tracking-tight leading-[1.05] mb-7"
                style={{fontSize:"clamp(2.4rem,6vw,5rem)"}}>
                Not Sure Which Service<br /><span className="italic text-fuchsia-200">You Need?</span>
              </h2>
              <p className="sans text-violet-200 text-base sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                Book a free 30-minute strategy call. We'll help you figure out exactly what to build and how.
              </p>
              <a href="/contact"
                className="sans inline-flex items-center gap-2.5 px-10 py-5 bg-white text-violet-900 rounded-2xl font-bold text-base hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
                Book Free Strategy Call <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}