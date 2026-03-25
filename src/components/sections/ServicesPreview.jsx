import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Monitor, Smartphone, Cloud, Zap, Bot, ShieldCheck, BarChart3, TrendingUp, Palette,
  ArrowRight, CheckCircle2, ChevronDown, Search, PenTool, Code2, Rocket
} from "lucide-react";

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

const SERVICES = [
  {
    num:"01", icon:Monitor, title:"Web & App Development",
    short:"Fast, beautiful, scalable web products built to convert.",
    desc:"We design and build websites, web apps, and platforms that are fast, beautiful, and ready to scale the moment traffic spikes. From landing pages to full SaaS platforms, we handle everything end-to-end.",
    tags:["React","Next.js","Node.js","TypeScript"],
    features:["Pixel-perfect UI/UX implementation","RESTful & GraphQL APIs","Database design & optimization","Performance & Core Web Vitals tuning","SEO-ready architecture","Post-launch support & maintenance"],
    color:"#6d28d9", results:"Average 3x faster load times",
    caseStudy:{client:"CartPilot", result:"34% jump in conversions", desc:"Complete rebuild of $40M ARR storefront"}
  },
  {
    num:"02", icon:Smartphone, title:"Mobile Applications",
    short:"Native-quality iOS & Android apps — one codebase, zero compromises.",
    desc:"Native-quality iOS and Android apps built with React Native — one codebase, two platforms. We handle everything from architecture to App Store submission and ongoing maintenance.",
    tags:["iOS","Android","React Native","Expo"],
    features:["Cross-platform iOS & Android","Offline-first architecture","Push notifications & deep linking","App Store / Play Store submission","Biometric auth & secure storage","OTA updates & analytics"],
    color:"#7c3aed", results:"2.1M+ combined app downloads across clients",
    caseStudy:{client:"FinStack", result:"2.1M downloads in 8 months", desc:"UPI-enabled personal finance app"}
  },
  {
    num:"03", icon:Zap, title:"Digital Marketing",
    short:"Data-driven campaigns that reach the right audience and drive real ROI.",
    desc:"We help you reach the right audience with targeted campaigns that drive real results — not just impressions. Performance marketing, SEO, content strategy, and growth hacking under one roof.",
    tags:["SEO","Meta Ads","Google Ads","Analytics"],
    features:["Performance marketing campaigns","Technical SEO audits & strategy","Content strategy & creation","Social media management","Conversion rate optimization","Monthly analytics reports"],
    color:"#a855f7", results:"Average 4.2x ROAS across campaigns",
    caseStudy:{client:"EduSphere", result:"3x student engagement", desc:"Multi-channel growth campaign"}
  },
  {
    num:"04", icon:Cloud, title:"Cloud & Infrastructure",
    short:"Rock-solid cloud architecture that keeps your product alive 24/7.",
    desc:"We set up and manage the cloud systems that keep your product alive 24/7 — auto-scaling, monitored, and bulletproof. Zero-downtime deployments, disaster recovery, and cost optimization.",
    tags:["AWS","GCP","Docker","Kubernetes"],
    features:["Cloud architecture design","CI/CD pipeline setup","Auto-scaling infrastructure","Database clustering & backups","Security hardening & monitoring","Cost optimization & rightsizing"],
    color:"#4c1d95", results:"99.97% average uptime across managed infra",
    caseStudy:{client:"FleetOps", result:"99.97% uptime, 28% fuel savings", desc:"Real-time logistics platform for 12,000 trucks"}
  },
  {
    num:"05", icon:Bot, title:"AI & Smart Features",
    short:"Real AI embedded into your product — not just a chatbot wrapper.",
    desc:"We embed AI directly into your product — intelligent search, chatbots, recommendations, document processing, and workflow automation that actually works and delivers business value.",
    tags:["LLMs","Python","OpenAI","TensorFlow"],
    features:["Custom AI model fine-tuning","RAG & vector search systems","Document processing pipelines","Intelligent chatbot development","ML-powered recommendations","AI workflow automation"],
    color:"#c026d3", results:"70% average reduction in manual work",
    caseStudy:{client:"MedFlowAI", result:"61% more accurate diagnoses", desc:"AI triage engine for 50,000 patient records/day"}
  },
  {
    num:"06", icon:ShieldCheck, title:"Security & Compliance",
    short:"Bulletproof security so your users' data stays safe and audits pass.",
    desc:"From penetration testing to SOC 2 readiness — we harden your product so your users' data stays safe and your compliance audits pass. Security built in, not bolted on.",
    tags:["SOC 2","GDPR","HIPAA","Pen Testing"],
    features:["Penetration testing & reports","SOC 2 Type II readiness","GDPR / HIPAA compliance","Security code review","Vulnerability management","Employee security training"],
    color:"#6d28d9", results:"Zero critical vulnerabilities post-audit",
    caseStudy:{client:"PulseHealth", result:"Full HIPAA compliance achieved", desc:"Healthcare platform for 200+ clinics"}
  },
  {
    num:"07", icon:BarChart3, title:"Data & Analytics",
    short:"Turn scattered numbers into decisions with real-time dashboards.",
    desc:"We turn scattered numbers into real-time dashboards and reports that let you make faster, smarter business decisions. Data pipelines, BI tools, and custom analytics platforms.",
    tags:["Tableau","Power BI","Snowflake","Python"],
    features:["Custom dashboard development","Data pipeline architecture","ETL / ELT automation","Business intelligence setup","Predictive analytics models","Data governance & quality"],
    color:"#7c3aed", results:"Average 60% faster decision cycles",
    caseStudy:{client:"GreenMetrics", result:"ESG reporting in 10 mins vs weeks", desc:"Enterprise ESG analytics platform"}
  },
  {
    num:"08", icon:Palette, title:"Graphic & UI/UX Design",
    short:"Brands and interfaces that people remember — and love to use.",
    desc:"Brand identities, UI/UX, and visuals that make lasting impressions. We design for the full journey — from first impression to delighted repeat user.",
    tags:["Figma","Framer","Branding","Motion"],
    features:["Brand identity & logo design","UI/UX design systems","Interactive prototyping","User research & testing","Motion & micro-interaction design","Design handoff & spec documentation"],
    color:"#a855f7", results:"Average 40% improvement in user satisfaction",
    caseStudy:{client:"CartPilot", result:"4.8★ user rating post-redesign", desc:"Full e-commerce UX overhaul"}
  },
];

const PROCESS = [
  { 
    step: "01",
    icon: Search, 
    title: "Discovery", 
    desc: "We study your business, users, and goals before writing a single line of code. We ask the hard questions.",
    color: "#7c3aed", // violet-600
    bg: "#f5f3ff",    // violet-50
    bullets: ["Stakeholder interviews", "Competitor analysis", "Technical scoping"]
  },
  { 
    step: "02",
    icon: PenTool, 
    title: "Design & Plan", 
    desc: "You see exactly what we're building — real designs, real architecture — before we start. No surprises.",
    color: "#c026d3", // fuchsia-600
    bg: "#fdf4ff",    // fuchsia-50
    bullets: ["High-fidelity UI/UX", "System architecture", "Sprint roadmapping"]
  },
  { 
    step: "03",
    icon: Code2, 
    title: "Build & Ship", 
    desc: "Two-week sprints. Live staging. Weekly demos. You're in full control at every step of the build.",
    color: "#4c1d95", // violet-900
    bg: "#ede9fe",    // violet-100
    bullets: ["Agile development", "Automated QA testing", "Continuous deployment"]
  },
  { 
    step: "04",
    icon: Rocket, 
    title: "Launch & Grow", 
    desc: "We go live with you and stay for 90 days. If anything breaks, we fix it — immediately, no extra charge.",
    color: "#a855f7", // purple-500
    bg: "#faf5ff",    // purple-50
    bullets: ["Zero-downtime launch", "Performance monitoring", "90-day bug warranty"]
  },
];

const NAV = [
  { label:"Services", href:"/services" },
  { label:"Our Work", href:"/projects" },
  { label:"Training", href:"/training" },
  { label:"Careers", href:"/careers" },
  { label:"Contact", href:"/contact" },
];

export default function ServicesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif" }} className="bg-white text-gray-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,600;1,9..144,800&display=swap');
        .serif{font-family:'Fraunces',Georgia,serif}.sans{font-family:'DM Sans',system-ui,sans-serif}
        html{scroll-behavior:smooth}::selection{background:#ddd6fe;color:#4c1d95}
        .grad{background:linear-gradient(120deg,#6d28d9,#c026d3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}.float-icon{animation:float 3.5s ease-in-out infinite}
        .svc-card{transition:all .35s cubic-bezier(.22,1,.36,1)}
        .ticker{display:flex;gap:5rem;width:max-content;animation:tick 28s linear infinite}
        .ticker:hover{animation-play-state:paused}@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:4px}
        @keyframes shimmer{from{left:-80%}to{left:120%}}
      `}</style>

     

      {/* RESTORED PREMIUM HERO (Original Colors) */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#fdfdff] py-20">
        
        {/* ENHANCED BACKGROUND: Subtle grid pattern alongside the blur circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-violet-200/40 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-fuchsia-200/40 blur-[120px]" />
        </div>
        
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 relative z-10 flex flex-col items-center text-center">
          
          <motion.div initial="hidden" animate="visible" variants={{hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:0.15}}}} className="flex flex-col items-center text-center">
            
          {/* Added justify-center and a second line on the right side for perfect symmetry */}
                     <motion.div variants={{hidden:{opacity:0,y:14},visible:{opacity:1,y:0}}} className="flex items-center justify-center gap-3 mb-7">
                       <div className="h-px w-10 bg-violet-500" />
                       <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">What We Build</span>
                       <div className="h-px w-10 bg-violet-500" /> {/* Added right line */}
                     </motion.div>
            
            {/* RESTORED HEADING: Using your original .grad class instead of the custom Tailwind one */}
            <motion.h1 variants={{hidden:{opacity:0,y:20},visible:{opacity:1,y:0}}} className="serif font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-8 mx-auto drop-shadow-sm" style={{fontSize:"clamp(3.5rem,7vw,5.5rem)"}}>
              Eight Ways We Help<br />
              <span className="grad italic pr-2">
                Businesses Grow.
              </span>
            </motion.h1>
            
            {/* RESTORED PARAGRAPH: Back to text-slate-800 for the strong tag */}
            <motion.p variants={{hidden:{opacity:0,y:20},visible:{opacity:1,y:0}}} className="sans text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mb-10 mx-auto font-medium">
              From MVP to enterprise scale. Every capability you need to <strong className="text-slate-800">build, market, and grow</strong> your digital product — under one roof.
            </motion.p>
            
            {/* UPGRADED BUTTONS: Fully rounded (pill), added hover lift */}
            <motion.div variants={{hidden:{opacity:0,y:20},visible:{opacity:1,y:0}}} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
              <a href="#services" className="sans flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-semibold text-base rounded-full hover:bg-slate-800 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.3)] hover:-translate-y-1 active:translate-y-0 group">
                Explore Services 
                <span className="group-hover:translate-x-1 transition-transform duration-300"><ArrowRight size={18}/></span>
              </a>
              <a href="/contact" className="sans flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-white text-slate-800 font-semibold text-base rounded-full border border-slate-200 hover:border-violet-200 hover:bg-violet-50/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 shadow-sm">
                Book Free Consultation
              </a>
            </motion.div>
            
          </motion.div>
        </div>
      </section>

      {/* TICKER */}
      <section className="py-8 bg-white border-t border-b border-black overflow-hidden">
        <div className="ticker">
          {["WEB DEVELOPMENT","MOBILE APPS","AI & AUTOMATION","CLOUD INFRA","DIGITAL MARKETING","DATA ANALYTICS","UI/UX DESIGN","SECURITY & COMPLIANCE",
            "WEB DEVELOPMENT","MOBILE APPS","AI & AUTOMATION","CLOUD INFRA","DIGITAL MARKETING","DATA ANALYTICS","UI/UX DESIGN","SECURITY & COMPLIANCE"].map((c,i)=>(
            <span key={i} className="serif text-base font-bold tracking-widest select-none whitespace-nowrap text-black">{c}</span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 sm:py-32 bg-[#fdfdff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-violet-100/50 blur-[120px] pointer-events-none opacity-60" />
        <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-fuchsia-100/40 blur-[120px] pointer-events-none opacity-60" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <Reveal className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-violet-500" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">Our Capabilities</span>
            </div>
            <h2 className="serif font-bold text-slate-900 tracking-tight leading-[1.07]" style={{fontSize:"clamp(2.4rem,5vw,4rem)"}}>
              Pushing the Boundaries<br /><span className="grad italic">of Digital Engineering.</span>
            </h2>
          </Reveal>

          <div className="space-y-5">
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              const isOpen = activeService === i;
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="group relative">
                    <div className="absolute -inset-[1px] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" style={{background:"linear-gradient(135deg,#7c3aed,#c026d3)"}} />
                    <div className={`relative rounded-[2rem] bg-white border border-black group-hover:border-transparent transition-all duration-500 overflow-hidden ${isOpen?"shadow-[0_32px_64px_rgba(124,58,237,.14)]":""}`}>
                      {/* Shimmer */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 overflow-hidden rounded-[2rem]"
                        style={{background:"linear-gradient(105deg,transparent 40%,rgba(255,255,255,.5) 50%,transparent 60%)",animation:"shimmer 1.5s ease forwards"}} />

                      <button className="w-full flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8 px-7 sm:px-10 py-8 sm:py-10 text-left"
                        onClick={() => setActiveService(isOpen ? null : i)}>
                        <span className="serif text-4xl font-bold text-black group-hover:text-violet-500 transition-colors flex-shrink-0 w-10">{svc.num}</span>
                        <div className="hidden lg:flex w-16 h-16 rounded-[1.2rem] bg-violet-50 border border-violet-100 items-center justify-center group-hover:bg-violet-900 transition-all duration-400 float-icon flex-shrink-0">
                          <Icon size={26} className="text-violet-600 group-hover:text-white transition-colors" strokeWidth={1.8}/>
                        </div>
                        <div className="lg:w-64 flex-shrink-0">
                          <h3 className="serif text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-violet-800 transition-colors mb-2">{svc.title}</h3>
                          <p className="sans text-sm text-slate-400">{svc.short}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 flex-1">
                          {svc.tags.map(t => (
                            <span key={t} className="sans text-[10px] font-bold text-violet-700 uppercase tracking-wider px-2.5 py-1 bg-violet-50 rounded-lg group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">{t}</span>
                          ))}
                        </div>
                        <motion.div animate={{rotate:isOpen?180:0}} transition={{duration:.22}} className="flex-shrink-0 hidden lg:block">
                          <ChevronDown size={20} className="text-slate-400" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
                            transition={{duration:.35,ease:[.22,1,.36,1]}} style={{overflow:"hidden"}}>
                            <div className="px-7 sm:px-10 pb-10 border-t border-violet-50">
                              <div className="grid lg:grid-cols-3 gap-8 pt-8">
                                <div className="lg:col-span-2">
                                  <p className="sans text-base text-slate-500 leading-relaxed mb-6">{svc.desc}</p>
                                  <div className="grid sm:grid-cols-2 gap-2">
                                    {svc.features.map((f,fi) => (
                                      <div key={fi} className="flex items-start gap-3">
                                        <CheckCircle2 size={15} className="text-violet-600 mt-0.5 flex-shrink-0" />
                                        <span className="sans text-sm text-slate-600">{f}</span>
                                      </div>
                                    ))}
                                  </div>
                                  <a href="/contact" className="sans mt-6 inline-flex items-center gap-2 px-6 py-3 bg-violet-900 text-white text-sm font-semibold rounded-xl hover:bg-fuchsia-700 transition-all hover:scale-105">
                                    Get Started <ArrowRight size={14} />
                                  </a>
                                </div>
                                <div>
                                  <div className="p-6 rounded-2xl border-2 border-violet-100 bg-violet-50/50">
                                    <p className="sans text-[10px] font-black uppercase tracking-widest text-violet-400 mb-1">Case Study</p>
                                    <p className="serif text-lg font-bold text-violet-900 mb-1">{svc.caseStudy.client}</p>
                                    <p className="sans text-sm font-bold text-slate-700 mb-2">{svc.caseStudy.result}</p>
                                    <p className="sans text-xs text-slate-400 leading-relaxed">{svc.caseStudy.desc}</p>
                                  </div>
                                  <div className="mt-4 p-4 rounded-2xl border border-black bg-white">
                                    <p className="sans text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Typical Outcome</p>
                                    <p className="serif text-sm font-bold text-slate-800">{svc.results}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

     {/* ════════ PROCESS ════════ */}
           <section id="process" className="py-20 sm:py-28 bg-[#fdfdff] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-100/40 blur-[120px] pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-100/30 blur-[120px] pointer-events-none" />
     
             <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
     
               {/* Centered heading */}
               <Reveal className="mb-16 sm:mb-20">
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
                   <p className="sans text-slate-500 mt-5 max-w-2xl text-base sm:text-lg leading-relaxed">
                     A battle-tested playbook across 200+ products. No confusion — you always know exactly what's happening and what comes next.
                   </p>
                 </div>
               </Reveal>
     
               {/* Process Cards — 4 columns, proper cards */}
               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {PROCESS.map((p, i) => {
                   const Icon = p.icon;
                   return (
                     <Reveal key={i} delay={i * 0.1}>
                       <div className="process-card relative flex flex-col h-full rounded-[2rem] bg-white border border-black p-7 sm:p-8 overflow-hidden">
                         {/* Top accent */}
                         <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem]"
                           style={{ background:`linear-gradient(90deg,${p.color},#c026d3)` }} />
     
                         {/* Step + icon row */}
                         <div className="flex items-center justify-between mb-7">
                           <span className="sans text-[13px] font-black uppercase tracking-[0.25em] text-black">Step {p.step}</span>
                           <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                             style={{ backgroundColor:p.bg, border:`1.5px solid ${p.color}30` }}>
                             <Icon size={22} style={{ color:p.color }} strokeWidth={2} />
                           </div>
                         </div>
     
                         {/* Title */}
                         <h3 className="serif text-2xl font-bold text-slate-900 mb-3 leading-snug">{p.title}</h3>
     
                         {/* Description */}
                         <p className="sans text-base text-black leading-relaxed mb-7">{p.desc}</p>
     
                         {/* Checkpoints */}
                         <ul className="mt-auto space-y-2.5">
                           {p.bullets.map((b, j) => (
                             <li key={j} className="flex items-start gap-2.5">
                               <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color:p.color }} strokeWidth={2.5} />
                               <span className="sans text-sm font-medium text-slate-600">{b}</span>
                             </li>
                           ))}
                         </ul>
     
                         {/* Connector arrow — desktop only */}
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

      {/* CTA */}
      <section className="py-16 px-4 sm:px-8">
        <Reveal>
          <div className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden relative" style={{background:"linear-gradient(135deg,#3b0764 0%,#6d28d9 55%,#c026d3 100%)"}}>
            <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)",backgroundSize:"28px 28px"}} />
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-fuchsia-400/20 blur-3xl" />
            <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-24 text-center">
              <h2 className="serif font-bold text-white tracking-tight leading-[1.05] mb-7" style={{fontSize:"clamp(2.4rem,6vw,5rem)"}}>
                Not Sure Which Service<br /><span className="italic text-fuchsia-200">You Need?</span>
              </h2>
              <p className="sans text-violet-200 text-base sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                Book a free 30-minute strategy call. We'll help you figure out exactly what to build and how.
              </p>
              <a href="/contact" className="sans inline-flex items-center gap-2.5 px-10 py-5 bg-white text-violet-900 rounded-2xl font-bold text-base hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
                Book Free Strategy Call <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      
    </div>
  );
}