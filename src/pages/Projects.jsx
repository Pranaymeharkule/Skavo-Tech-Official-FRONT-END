import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Zap, Globe2, Users, TrendingUp, Filter } from "lucide-react";

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

const PROJECTS = [
  { id:1, client:"MedFlowAI", industry:"Healthcare", year:"2025", category:"AI & Automation", result:"61% more accurate diagnoses", metric:"50,000 patient records/day", desc:"An AI triage engine processing 50,000 patient records daily — built from scratch in 14 weeks. Integrated with 3 major hospital ERP systems.", tags:["Python","FastAPI","TensorFlow","AWS","React"], color:"#7c3aed", bg:"#f5f3ff", scope:["AI Model Development","Backend APIs","Hospital ERP Integration","Real-time Dashboard"] },
  { id:2, client:"CartPilot", industry:"E-Commerce", year:"2024", category:"Web Development", result:"34% jump in conversions", metric:"$40M ARR Platform", desc:"Complete rebuild of a $40M ARR storefront. Pages now load in under 0.8 seconds on mobile. Checkout redesign alone drove a 34% conversion lift.", tags:["Next.js","Node.js","Stripe","PostgreSQL","Redis"], color:"#6d28d9", bg:"#ede9fe", scope:["Full Frontend Rebuild","Performance Optimization","Payment Integration","A/B Testing Framework"] },
  { id:3, client:"FleetOps", industry:"Logistics", year:"2025", category:"Web Development", result:"28% reduction in fuel costs", metric:"12,000 trucks, 6 countries", desc:"Real-time tracking platform for 12,000 delivery trucks across 6 countries. 99.97% uptime SLA. Custom route optimization algorithm cut fuel costs by 28%.", tags:["React","Node.js","Google Maps API","MongoDB","Docker"], color:"#5b21b6", bg:"#f5f3ff", scope:["Real-time Tracking","Route Optimization","Multi-tenant SaaS","Mobile Driver App"] },
  { id:4, client:"FinStack", industry:"Fintech", year:"2024", category:"Mobile Apps", result:"2.1M app downloads", metric:"₹500Cr+ processed", desc:"A UPI-enabled personal finance app that hit 2.1M downloads in 8 months. Built from zero to launch in 18 weeks with full RBI compliance.", tags:["React Native","Python","PostgreSQL","AWS","Razorpay"], color:"#a855f7", bg:"#fdf4ff", scope:["iOS & Android App","Payment Gateway","Compliance & Security","Analytics Dashboard"] },
  { id:5, client:"EduSphere", industry:"EdTech", year:"2024", category:"Web Development", result:"3x student engagement", metric:"500K+ learners", desc:"A live learning platform with real-time video, AI-powered assessments, and adaptive content paths. Scaled to 500K+ learners within 6 months.", tags:["Next.js","WebRTC","Python","AWS","Redis"], color:"#6d28d9", bg:"#ede9fe", scope:["Live Video Platform","AI Assessment Engine","Adaptive Learning","Mobile App"] },
  { id:6, client:"HireLoop", industry:"HR Tech", year:"2023", category:"AI & Automation", result:"70% faster hiring cycle", metric:"10,000+ companies", desc:"AI-powered ATS and hiring automation platform. Resume parsing, candidate scoring, and interview scheduling — all automated. Used by 10,000+ companies.", tags:["React","FastAPI","OpenAI","PostgreSQL","Zapier"], color:"#7c3aed", bg:"#f5f3ff", scope:["AI Resume Parser","Candidate Scoring","Interview Automation","Integrations (50+)"] },
  { id:7, client:"GreenMetrics", industry:"SaaS", year:"2025", category:"Data & Analytics", result:"ESG reporting in 10 mins", metric:"200+ enterprise clients", desc:"ESG reporting SaaS platform for enterprises. What used to take weeks of consulting now takes 10 minutes. 200+ enterprise clients in year one.", tags:["React","Python","Snowflake","Tableau API","GCP"], color:"#4c1d95", bg:"#f5f3ff", scope:["Data Pipeline","ESG Calculator","Automated Reports","Enterprise Dashboard"] },
  { id:8, client:"CropSense", industry:"AgriTech", year:"2023", category:"Mobile Apps", result:"40% yield improvement", metric:"50,000+ farmers", desc:"IoT-connected crop monitoring app for 50,000+ farmers. Real-time soil, weather, and pest alerts. Works offline in low-connectivity rural areas.", tags:["React Native","Python","IoT","AWS IoT","SQLite"], color:"#5b21b6", bg:"#ede9fe", scope:["IoT Integration","Offline-First App","Weather API","Multilingual Support"] },
  { id:9, client:"PulseHealth", industry:"Healthcare", year:"2023", category:"Web Development", result:"4.8★ patient rating", metric:"200+ clinics", desc:"A patient management and telemedicine platform for 200+ clinics. Online consultations, prescription tracking, and lab report sharing — fully digital.", tags:["Next.js","Node.js","WebRTC","HIPAA","PostgreSQL"], color:"#a855f7", bg:"#fdf4ff", scope:["Telemedicine Platform","EMR Integration","Video Consultation","Patient Portal"] },
];

const CATEGORIES = ["All", "Web Development", "Mobile Apps", "AI & Automation", "Data & Analytics"];
const INDUSTRIES = ["All", "Healthcare", "Fintech", "E-Commerce", "Logistics", "EdTech", "HR Tech", "SaaS", "AgriTech"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const filtered = PROJECTS.filter(p => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const indMatch = activeIndustry === "All" || p.industry === activeIndustry;
    return catMatch && indMatch;
  });

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif" }} className="bg-white text-gray-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,600;1,9..144,800&display=swap');
        .serif{font-family:'Fraunces',Georgia,serif} .sans{font-family:'DM Sans',system-ui,sans-serif}
        html{scroll-behavior:smooth} ::selection{background:#ddd6fe;color:#4c1d95}
        .grad{background:linear-gradient(120deg,#6d28d9,#c026d3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .filter-btn{transition:all .2s;border:2px solid #e8e8e8;cursor:pointer;font-family:'DM Sans',system-ui,sans-serif;background:white}
        .filter-btn.active{border-color:#7c3aed;background:#ede9fe;color:#4c1d95;font-weight:700}
        .filter-btn:not(.active):hover{border-color:#c4b5fd;background:#faf5ff}
        .proj-card{transition:all .35s cubic-bezier(.22,1,.36,1);cursor:pointer}
        .proj-card:hover{transform:translateY(-7px);box-shadow:0 28px 56px rgba(109,40,217,.13)}
        .ticker{display:flex;gap:5rem;width:max-content;animation:tick 28s linear infinite}
        .ticker:hover{animation-play-state:paused}
        @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .float-icon{animation:float 3.5s ease-in-out infinite}
        @keyframes cta-shimmer{0%{transform:translateX(-100%) skewX(-15deg)}100%{transform:translateX(200%) skewX(-15deg)}}
        .cta-shimmer{animation:cta-shimmer 3.5s ease-in-out infinite}
        .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(10px);z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:4px}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-[#fdfdff] py-20 sm:py-27 min-h-[100dvh]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-[-8%] left-[-4%] w-[55%] h-[55%] rounded-full bg-violet-200/60 blur-[120px]" />
          <div className="absolute bottom-[5%] right-[-4%] w-[45%] h-[50%] rounded-full bg-fuchsia-200/60 blur-[120px]" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible"
            variants={{hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.09}}}}
            className="flex flex-col items-center text-center w-full max-w-3xl mx-auto">

            <motion.div variants={{hidden:{opacity:0,y:14},visible:{opacity:1,y:0}}}
              className="flex items-center justify-center gap-3 mb-7">
              <div className="h-px w-10 bg-violet-500" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">Our Portfolio</span>
              <div className="h-px w-10 bg-violet-500" />
            </motion.div>

            <motion.h1 variants={{hidden:{opacity:0,y:20},visible:{opacity:1,y:0}}}
              className="serif font-bold text-slate-900 leading-[1.03] tracking-tight mb-6"
              style={{fontSize:"clamp(3.2rem,6.5vw,5.4rem)"}}>
              200+ Products.<br />
              <span className="grad italic">Real Results.</span>
            </motion.h1>

            <motion.p variants={{hidden:{opacity:0,y:18},visible:{opacity:1,y:0}}}
              className="sans text-lg text-slate-500 leading-relaxed max-w-xl mb-10">
              From MVPs to enterprise platforms — every product we build is judged by one thing:{" "}
              <strong className="text-slate-800 font-semibold">does it actually grow your business?</strong>
            </motion.p>

          

            <motion.div variants={{hidden:{opacity:0,y:16},visible:{opacity:1,y:0}}}
              className="flex flex-wrap justify-center gap-4">
              <a href="#projects"
                className="sans flex items-center gap-2.5 px-8 py-4 bg-slate-900 text-white font-semibold text-sm rounded-2xl hover:bg-violet-800 transition-all shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 group">
                Browse Projects <span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={16}/></span>
              </a>
              <a href="/contact"
                className="sans flex items-center gap-2.5 px-8 py-4 bg-white text-slate-800 font-semibold text-sm rounded-2xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all">
                Start Your Project
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <section className="py-8 bg-white border-t border-b border-black overflow-hidden">
        <div className="ticker">
          {["200+ PRODUCTS SHIPPED","14 COUNTRIES","₹500CR+ REVENUE GENERATED","99.97% UPTIME","8 YEARS EXPERIENCE","60+ ENGINEERS",
            "200+ PRODUCTS SHIPPED","14 COUNTRIES","₹500CR+ REVENUE GENERATED","99.97% UPTIME","8 YEARS EXPERIENCE","60+ ENGINEERS"].map((c,i)=>(
            <span key={i} className="serif text-base font-bold tracking-widest select-none whitespace-nowrap text-black">{c}</span>
          ))}
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section id="projects" className="py-24 sm:py-28 bg-[#fdfdff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-violet-100/40 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-fuchsia-100/30 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

          {/* Filters — styled like home */}
          <Reveal className="mb-14">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <div className="h-px w-10 bg-fuchsia-500" />
                <span className="sans text-fuchsia-600 font-black uppercase tracking-[0.3em] text-sm sm:text-2xl">Filter Projects</span>
                <div className="h-px w-10 bg-fuchsia-500" />
              </div>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)}
                  className={`filter-btn sans text-sm font-semibold px-5 py-2.5 rounded-2xl ${activeCategory===c?"active":""}`}>
                  {c}
                </button>
              ))}
            </div>

            {/* Industry filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {INDUSTRIES.map(ind => (
                <button key={ind} onClick={() => setActiveIndustry(ind)}
                  className={`filter-btn sans text-xs font-semibold px-4 py-1.5 rounded-full ${activeIndustry===ind?"active":""}`}>
                  {ind}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((proj, i) => (
                <motion.div key={proj.id}
                  initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.95}}
                  transition={{duration:.4,delay:i*0.05,ease:[.22,1,.36,1]}}>
                  <div className="proj-card group relative h-full flex flex-col rounded-[2.5rem] border border-black bg-white overflow-hidden"
                    onClick={() => setSelected(proj)}>
                    {/* Gradient top bar */}
                    <div className="h-[3px] w-full" style={{background:`linear-gradient(90deg,${proj.color},#c026d3)`}} />
                    {/* Subtle pattern bg on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{background:`radial-gradient(ellipse at top right, ${proj.bg} 0%, transparent 60%)`}} />

                    <div className="relative z-10 p-8 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <span className="sans text-[13px] font-black uppercase tracking-[0.2em] text-violet-600 block mb-1">{proj.industry}</span>
                          <span className="sans text-[11px] font-bold text-slate-400">{proj.year} · {proj.category}</span>
                        </div>
                        <div className="w-9 h-9 rounded-xl border border-slate-100 flex items-center justify-center group-hover:bg-violet-900 group-hover:border-violet-900 transition-all duration-300">
                          <ExternalLink size={14} className="text-slate-300 group-hover:text-white transition-colors" />
                        </div>
                      </div>

                      <h3 className="serif text-2xl font-bold text-slate-900 tracking-tight mb-3 group-hover:text-violet-800 transition-colors">{proj.client}</h3>
                      <p className="sans text-sm text-slate-500 leading-relaxed mb-auto pb-6">{proj.desc}</p>

                      {/* Key result card */}
                      <div className="relative p-4 rounded-2xl overflow-hidden mb-4">
                        <div className="absolute inset-0 bg-slate-50 rounded-2xl" />
                        <div className="relative flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                            <Zap size={14} style={{color:proj.color}} fill={proj.color} />
                          </div>
                          <div>
                            <p className="sans text-[9px] font-black uppercase tracking-widest text-violet-500 mb-0.5">Key Result</p>
                            <p className="serif text-base font-bold text-slate-900 leading-tight">{proj.result}</p>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.slice(0,3).map(t => (
                          <span key={t} className="sans text-[10px] font-bold px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 uppercase tracking-wider group-hover:bg-violet-100 transition-colors">{t}</span>
                        ))}
                        {proj.tags.length > 3 && (
                          <span className="sans text-[10px] font-bold px-2.5 py-1 rounded-lg bg-violet-50 text-violet-400">+{proj.tags.length-3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="serif text-2xl font-bold text-slate-300 mb-2">No projects match your filters</p>
              <p className="sans text-slate-400 text-sm">Try a different combination.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── PROJECT DETAIL MODAL ── */}
      <AnimatePresence>
        {selected && (
          <motion.div className="modal-backdrop"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={() => setSelected(null)}>
            <motion.div
              initial={{opacity:0,scale:.95,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.95,y:20}}
              transition={{duration:.35,ease:[.22,1,.36,1]}}
              className="bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={e => e.stopPropagation()}>
              {/* Top gradient bar */}
              <div className="h-[3px] w-full rounded-t-[2.5rem]" style={{background:`linear-gradient(90deg,${selected.color},#c026d3)`}} />

              <div className="p-8 sm:p-12">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
                      style={{background:`${selected.color}12`, border:`1px solid ${selected.color}25`}}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{background:selected.color}} />
                      <span className="sans text-xs font-bold uppercase tracking-widest" style={{color:selected.color}}>{selected.industry} · {selected.year}</span>
                    </div>
                    <h2 className="serif text-3xl font-bold text-slate-900">{selected.client}</h2>
                  </div>
                  <button onClick={() => setSelected(null)}
                    className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-violet-300 hover:bg-violet-50 transition-all text-slate-400 hover:text-violet-600 flex-shrink-0">
                    ✕
                  </button>
                </div>

                <p className="sans text-base text-slate-500 leading-relaxed mb-8">{selected.desc}</p>

                {/* Key metrics */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    {label:"Key Result", value:selected.result},
                    {label:"Scale", value:selected.metric}
                  ].map((m,i) => (
                    <div key={i} className="p-5 rounded-2xl border border-black relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{background:`linear-gradient(90deg,${selected.color},#c026d3)`}} />
                      <p className="sans text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{m.label}</p>
                      <p className="serif text-xl font-bold text-slate-900">{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Scope */}
                <div className="mb-8">
                  <p className="sans text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Scope of Work</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selected.scope.map((s,i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-violet-50 border border-violet-100">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:selected.color}} />
                        <span className="sans text-sm text-violet-800 font-medium">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="mb-8">
                  <p className="sans text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.tags.map(t => (
                      <span key={t} className="sans text-xs font-bold px-3 py-1.5 rounded-xl border-2 border-violet-100 text-violet-700 hover:bg-violet-50 transition-colors">{t}</span>
                    ))}
                  </div>
                </div>

                <a href="/contact"
                  className="sans flex items-center justify-center gap-2.5 w-full px-8 py-4 bg-violet-900 text-white font-bold text-sm rounded-2xl hover:bg-fuchsia-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-200">
                  Build Something Similar <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA ── */}
      <section className="py-14 px-4 sm:px-8">
        <Reveal>
          <div className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden relative"
            style={{background:"linear-gradient(135deg,#3b0764 0%,#6d28d9 55%,#c026d3 100%)"}}>
            <div className="absolute inset-0 opacity-[0.04]"
              style={{backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)",backgroundSize:"28px 28px"}} />
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-fuchsia-400/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-violet-300/20 blur-3xl" />
            {/* Shimmer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="cta-shimmer absolute top-0 bottom-0 w-32 opacity-10"
                style={{background:"linear-gradient(90deg,transparent,white,transparent)"}} />
            </div>

            <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-24 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)"}}>
                <div className="w-2 h-2 rounded-full bg-fuchsia-300 animate-pulse" />
                <span className="sans text-xs font-bold text-white/80 uppercase tracking-widest">Currently accepting new clients</span>
              </div>

              <h2 className="serif font-bold text-white tracking-tight leading-[1.05] mb-7"
                style={{fontSize:"clamp(2.4rem,6vw,5rem)"}}>
                Ready to Be Our<br /><span className="italic text-fuchsia-200">Next Success Story?</span>
              </h2>
              <p className="sans text-violet-200 text-base sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                Let's talk about your project. Free strategy call, no strings attached.
              </p>
              <a href="/contact"
                className="sans inline-flex items-center gap-2.5 px-10 py-5 bg-white text-violet-900 rounded-2xl font-bold text-base hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
                Start Your Project <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}