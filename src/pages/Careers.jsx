import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import api from "../api/axios"; // Uses your axios instance
import {
  MapPin, Clock, ArrowRight, Search, Briefcase, Code2, Smartphone,
  Bot, BarChart3, Palette, Users, Globe2, Zap, Heart, Coffee,
  ChevronDown, Star, CheckCircle2, TrendingUp, Shield, Upload
} from "lucide-react";

// --- Icons & Reveal Component ---
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

// --- Data Arrays ---
const JOBS = [
  { id:1, title:"Senior Full Stack Developer", dept:"Engineering", location:"Nagpur / Remote", type:"Full-time", exp:"3-6 years", tags:["React","Node.js","AWS"], icon:Code2, color:"#6d28d9" },
  { id:2, title:"React Native Developer", dept:"Mobile", location:"Navi Mumbai / Remote", type:"Full-time", exp:"2-4 years", tags:["React Native","iOS","Android"], icon:Smartphone, color:"#7c3aed" },
  { id:3, title:"AI/ML Engineer", dept:"AI & Data", location:"Remote", type:"Full-time", exp:"3-5 years", tags:["Python","LLMs","TensorFlow"], icon:Bot, color:"#a855f7" },
  { id:4, title:"UI/UX Designer", dept:"Design", location:"Nagpur", type:"Full-time", exp:"2-4 years", tags:["Figma","Framer","Research"], icon:Palette, color:"#c026d3" },
  { id:5, title:"Digital Marketing Specialist", dept:"Marketing", location:"Remote", type:"Full-time", exp:"2-3 years", tags:["SEO","Meta Ads","Analytics"], icon:TrendingUp, color:"#4c1d95" },
  { id:6, title:"Business Development Executive", dept:"Sales", location:"Navi Mumbai", type:"Full-time", exp:"1-3 years", tags:["B2B","SaaS","CRM"], icon:Briefcase, color:"#6d28d9" },
  { id:7, title:"DevOps Engineer", dept:"Infrastructure", location:"Remote", type:"Full-time", exp:"3-5 years", tags:["Docker","K8s","CI/CD"], icon:Shield, color:"#7c3aed" },
  { id:8, title:"Python Backend Developer", dept:"Engineering", location:"Nagpur / Remote", type:"Full-time", exp:"2-4 years", tags:["Python","FastAPI","PostgreSQL"], icon:Code2, color:"#a855f7" },
];

const DEPTS = ["All", "Engineering", "Mobile", "AI & Data", "Design", "Marketing", "Sales", "Infrastructure"];

const PERKS = [
  { icon: Globe2, title:"Remote-First Culture", desc:"Work from anywhere. Flexibility is a right, not a reward." },
  { icon: TrendingUp, title:"Steep Learning Curve", desc:"Fast-growing projects. Real ownership. Skills that compound." },
  { icon: Heart, title:"Health Coverage", desc:"Comprehensive health insurance for you and your family." },
  { icon: Coffee, title:"Learning Budget", desc:"₹30,000/year for courses, books, and conferences of your choice." },
  { icon: Zap, title:"Fast Promotions", desc:"Performance-first culture. No waiting in line for a title change." },
  { icon: Users, title:"Mentorship", desc:"Paired with senior engineers and leaders from day one." },
];

const REVIEWS = [
  { quote:"Joining Skavo was the best career move I made. I shipped a production AI feature in my second month.", name:"Arjun Kale", role:"ML Engineer, 2 years", initials:"AK" },
  { quote:"The culture is unlike any agency I've worked at. Real ownership, real impact, real feedback.", name:"Neha Patil", role:"Full Stack Dev, 3 years", initials:"NP" },
  { quote:"Best part? Every project is genuinely different. I've worked across fintech, healthcare, and e-commerce.", name:"Rohan Desai", role:"Mobile Dev, 1.5 years", initials:"RD" },
];

const NAV = [
  { label:"Services", href:"/services" },
  { label:"Our Work", href:"/projects" },
  { label:"Training", href:"/training" },
  { label:"Careers", href:"/careers" },
  { label:"Contact", href:"/contact" },
];

// --- MAIN COMPONENT ---
export default function CareersPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDept, setActiveDept] = useState("All");
  const [searchQ, setSearchQ] = useState("");
  const [openJob, setOpenJob] = useState(null);
  const [activeReview, setActiveReview] = useState(0);

  // --- NEW: FORM & MODAL STATES ---
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyPosition, setApplyPosition] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", type: "fulltime", college: "", course: "", resume: null
  });

  // --- LIFECYCLE HOOKS ---
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveReview(p => (p + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = applyModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [applyModalOpen]);

  // --- LOGIC ---
  const filtered = JOBS.filter(j => {
    const deptMatch = activeDept === "All" || j.dept === activeDept;
    const searchMatch = !searchQ || j.title.toLowerCase().includes(searchQ.toLowerCase()) || j.tags.some(t => t.toLowerCase().includes(searchQ.toLowerCase()));
    return deptMatch && searchMatch;
  });

  // Handle File Submission correctly using FormData
  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!formData.resume) {
      alert("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("type", formData.type);
    submitData.append("college", formData.college);
    submitData.append("course", formData.course);
    submitData.append("position", applyPosition);
    submitData.append("resume", formData.resume); // Connects to multer

    try {
      const response = await api.post('/careers', submitData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (response.status === 201 || response.status === 200) {
        setFormSuccess(true);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to submit application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeApplyModal = () => {
    setApplyModalOpen(false);
    setTimeout(() => {
      setFormSuccess(false);
      setFormData({ name: "", email: "", type: "fulltime", college: "", course: "", resume: null });
    }, 300); // Clears form after close animation
  };

  const triggerApply = (positionTitle) => {
    setApplyPosition(positionTitle);
    setApplyModalOpen(true);
  };
  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif" }} className="bg-white text-gray-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,9..40,600&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,600;1,9..144,800&display=swap');
        .serif{font-family:'Fraunces',Georgia,serif}.sans{font-family:'DM Sans',system-ui,sans-serif}
        html{scroll-behavior:smooth}::selection{background:#ddd6fe;color:#4c1d95}
        .grad{background:linear-gradient(120deg,#6d28d9,#c026d3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .float-icon{animation:float 3.5s ease-in-out infinite}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .ticker{display:flex;gap:5rem;width:max-content;animation:tick 28s linear infinite}
        .ticker:hover{animation-play-state:paused}@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem}
        .dept-btn{transition:all .2s;border:2px solid #e8e8e8;cursor:pointer}
        .dept-btn.active{border-color:#7c3aed;background:#ede9fe;color:#4c1d95}
        .dept-btn:not(.active):hover{border-color:#c4b5fd}
        .job-card{transition:all .35s cubic-bezier(.22,1,.36,1)}
        .job-card:hover{transform:translateY(-3px);box-shadow:0 20px 48px rgba(124,58,237,.12)}
        .input-field{width:100%;padding:1rem;border:1px solid #e2e8f0;border-radius:0.75rem;background:#f8fafc;outline:none;transition:all 0.2s;}
        .input-field:focus{border-color:#a855f7;background:#fff;}
      `}</style>

      
{/* CAREERS HERO */}
      <section className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden bg-[#fdfdff] py-20">
        
        {/* ENHANCED BACKGROUND: Matching premium grid and your original blurs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-[-8%] left-[-4%] w-[55%] h-[55%] rounded-full bg-violet-100/60 blur-[110px]" />
          <div className="absolute bottom-[5%] right-[-4%] w-[45%] h-[50%] rounded-full bg-fuchsia-100/50 blur-[110px]" />
        </div>
        
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          
          {/* Centered flex column wrapper */}
          <motion.div initial="hidden" animate="visible" variants={{hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.09}}}} className="flex flex-col items-center text-center mx-auto w-full max-w-3xl">
            
            {/* Symmetrical Eyebrow */}
            <motion.div variants={{hidden:{opacity:0,y:14},visible:{opacity:1,y:0}}} className="flex items-center justify-center gap-3 mb-7">
              <div className="h-px w-10 bg-violet-500" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[15px]">Join Our Team</span>
              <div className="h-px w-10 bg-violet-500" />
            </motion.div>
            
            {/* Centered Heading */}
            <motion.h1 variants={{hidden:{opacity:0,y:20},visible:{opacity:1,y:0}}} className="serif font-bold text-slate-900 leading-[1.05] tracking-tight mb-7 mx-auto" style={{fontSize:"clamp(3rem,6vw,5.2rem)"}}>
              Build the Future.<br /><span className="grad italic">Grow Faster.</span>
            </motion.h1>
            
            {/* Centered Paragraph */}
            <motion.p variants={{hidden:{opacity:0,y:18},visible:{opacity:1,y:0}}} className="sans text-lg text-slate-500 leading-relaxed mb-10 max-w-xl mx-auto">
              We're a team of <strong className="text-slate-800 font-semibold">60+ engineers, designers, and strategists</strong> building industry-defining products. Join us if you're driven by ownership, impact, and relentless curiosity.
            </motion.p>
            
            {/* Centered Premium Buttons */}
            <motion.div variants={{hidden:{opacity:0,y:20},visible:{opacity:1,y:0}}} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full mb-14">
              <a href="#openings" className="sans flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-semibold text-base rounded-full hover:bg-slate-800 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 active:translate-y-0 group">
                View Open Roles <span className="group-hover:translate-x-1 transition-transform duration-300"><ArrowRight size={18}/></span>
              </a>
              <a href="#perks" className="sans flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-white text-slate-800 font-semibold text-base rounded-full border border-slate-200 hover:border-violet-200 hover:bg-violet-50/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 shadow-sm">
                Why Skavo?
              </a>
            </motion.div>
            
            {/* Centered Stats Block with slightly enhanced typography */}
            <motion.div variants={{hidden:{opacity:0,y:20},visible:{opacity:1,y:0}}} className="flex flex-wrap justify-center gap-8 sm:gap-16 pt-8 border-t border-slate-200/60 w-full max-w-2xl mx-auto">
              {[{n:"60+",l:"Team Members"},{n:"8 yrs",l:"In Business"},{n:"14",l:"Countries"},{n:"4.9★",l:"Glassdoor Rating"}].map((s,i)=>(
                <div key={i} className="text-center">
                  <p className="serif font-bold text-violet-900 text-3xl sm:text-4xl">{s.n}</p>
                  <p className="sans text-xs sm:text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </motion.div>
            
          </motion.div>
        </div>
      </section>

      {/* TICKER */}
      <section className="py-8 bg-white border-t border-b border-black overflow-hidden">
        <div className="ticker">
          {["REMOTE FRIENDLY","FAST GROWTH","REAL OWNERSHIP","HEALTH COVERAGE","LEARNING BUDGET","MENTORSHIP","PERFORMANCE FIRST","EXCITING PROJECTS",
            "REMOTE FRIENDLY","FAST GROWTH","REAL OWNERSHIP","HEALTH COVERAGE","LEARNING BUDGET","MENTORSHIP","PERFORMANCE FIRST","EXCITING PROJECTS"].map((c,i)=>(
            <span key={i} className="serif text-base font-bold tracking-widest select-none whitespace-nowrap text-black">{c}</span>
          ))}
        </div>
      </section>

      {/* PERKS */}
      <section id="perks" className="py-24 sm:py-32 bg-[#fdfdff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-violet-100/50 blur-[120px] pointer-events-none opacity-60" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <Reveal className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-violet-500" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-2xl">Why Join Us</span>
            </div>
            <h2 className="serif font-bold text-slate-900 tracking-tight leading-[1.07]" style={{fontSize:"clamp(2.4rem,5vw,4rem)"}}>
              Perks That Actually<br /><span className="grad italic">Matter to Engineers.</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={i} delay={i*0.07}>
                  <div className="group relative h-full">
                    <div className="absolute -inset-[1px] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" style={{background:"linear-gradient(135deg,#7c3aed,#c026d3)"}} />
                    <div className="relative p-8 rounded-[2rem] bg-white border border-black h-full group-hover:border-transparent group-hover:shadow-[0_24px_56px_rgba(124,58,237,.12)] group-hover:-translate-y-1.5 transition-all duration-400">
                      <div className="w-14 h-14 rounded-[1.2rem] bg-violet-50 border border-violet-100 flex items-center justify-center mb-5 group-hover:bg-violet-900 transition-all duration-400 float-icon">
                        <Icon size={24} className="text-violet-600 group-hover:text-white transition-colors duration-400" strokeWidth={1.8} />
                      </div>
                      <h3 className="serif text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-800 transition-colors">{p.title}</h3>
                      <p className="sans text-sm text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">{p.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section id="openings" className="py-20 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-fuchsia-500" />
                <span className="sans text-fuchsia-600 font-black uppercase tracking-[0.35em] text-2xl">Open Positions</span>
              </div>
              <h2 className="serif font-bold text-slate-900 tracking-tight leading-[1.07]" style={{fontSize:"clamp(2.4rem,4.8vw,4rem)"}}>
                Find Your<br /><span className="grad italic">Perfect Role.</span>
              </h2>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
                placeholder="Search roles, skills..."
                className="sans pl-10 pr-5 py-3 border-2 border-black rounded-2xl text-sm focus:outline-none focus:border-violet-400 w-64 transition-all" />
            </div>
          </Reveal>

          {/* Dept filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {DEPTS.map(d => (
              <button key={d} onClick={() => setActiveDept(d)}
                className={`dept-btn sans text-sm font-semibold px-5 py-2 rounded-full ${activeDept===d?"active":""}`}>
                {d}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <AnimatePresence>
              {filtered.map((job, i) => {
                const Icon = job.icon;
                return (
                  <motion.div key={job.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
                    transition={{duration:.4,delay:i*0.05,ease:[.22,1,.36,1]}}>
                    <div className="job-card group relative rounded-[2rem] border border-black bg-white p-7 cursor-pointer"
                      onClick={() => setOpenJob(openJob===job.id ? null : job.id)}>
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center float-icon" style={{background:`${job.color}15`,border:`2px solid ${job.color}30`}}>
                          <Icon size={22} style={{color:job.color}} strokeWidth={1.8} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="sans text-xs font-bold px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100">{job.type}</span>
                          <motion.div animate={{rotate: openJob===job.id ? 180 : 0}} transition={{duration:.22}}>
                            <ChevronDown size={16} className="text-slate-400" />
                          </motion.div>
                        </div>
                      </div>
                      <h3 className="serif text-xl font-bold text-slate-900 mb-2 group-hover:text-violet-800 transition-colors">{job.title}</h3>
                      <p className="sans text-xs text-violet-600 font-bold uppercase tracking-widest mb-4">{job.dept}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4">
                        <span className="flex items-center gap-1"><MapPin size={12}/>{job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={12}/>{job.exp}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map(t => (
                          <span key={t} className="sans text-[10px] font-bold px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 uppercase tracking-wider">{t}</span>
                        ))}
                      </div>

                      <AnimatePresence>
                        {openJob === job.id && (
                          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
                            transition={{duration:.32,ease:[.22,1,.36,1]}} style={{overflow:"hidden"}}>
                            <div className="mt-6 pt-6 border-t border-violet-100">
                              <p className="sans text-sm text-slate-500 leading-relaxed mb-4">
                                We're looking for a passionate {job.title} to join our {job.dept} team. You'll work on real-world products used by thousands of users across multiple industries.
                              </p>
                              <button onClick={(e) => { e.stopPropagation(); triggerApply(job.title); }}
                               className="sans inline-flex items-center gap-2 px-6 py-3 bg-violet-900 text-white text-sm font-semibold rounded-xl hover:bg-fuchsia-700 transition-all hover:scale-105">
                               Apply Now <ArrowRight size={14} />
                               </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="serif text-2xl font-bold text-slate-300 mb-2">No roles found</p>
              <p className="sans text-slate-400 text-sm">Try a different search or department filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* EMPLOYEE STORIES */}
      <section className="py-20 sm:py-28 bg-[#fdfdff]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-fuchsia-400" />
              <span className="sans text-fuchsia-600 font-black uppercase tracking-[0.35em] text-2xl">Team Stories</span>
              <div className="h-px w-10 bg-fuchsia-400" />
            </div>
            <h2 className="serif font-bold text-slate-900 tracking-tight" style={{fontSize:"clamp(2.4rem,4.8vw,4rem)"}}>
              Heard From Our<br /><span className="grad italic">Own Team.</span>
            </h2>
          </Reveal>
          <div className="relative max-w-4xl mx-auto">
            <div className="relative min-h-[260px] sm:min-h-[220px]">
              <AnimatePresence mode="wait">
                {REVIEWS.map((r, i) => i === activeReview ? (
                  <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}
                    transition={{duration:.5,ease:[.22,1,.36,1]}} className="absolute inset-0">
                    <div className="bg-white rounded-3xl p-9 sm:p-14 shadow-2xl shadow-violet-100/60 border border-black h-full flex flex-col justify-between">
                      <div>
                        <div className="serif text-7xl text-violet-900 leading-none mb-5 font-extrabold select-none">"</div>
                        <p className="sans text-xl sm:text-2xl text-black leading-relaxed italic font-light">{r.quote}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-black">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm text-white" style={{background:"linear-gradient(135deg,#4c1d95,#a855f7)"}}>
                          {r.initials}
                        </div>
                        <div>
                          <p className="serif font-bold text-violet-900">{r.name}</p>
                          <p className="sans text-sm text-slate-400">{r.role}</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">{[0,1,2,3,4].map(s=><StarIcon key={s}/>)}</div>
                      </div>
                    </div>
                  </motion.div>
                ) : null)}
              </AnimatePresence>
            </div>
            <div className="flex justify-center gap-3 mt-8">
              {REVIEWS.map((_,i)=>(
                <button key={i} onClick={()=>setActiveReview(i)} className={`h-2 rounded-full transition-all duration-300 ${i===activeReview?"bg-violet-900 w-10":"bg-violet-200 w-2.5"}`} />
              ))}
            </div>
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
                Don't See the Right Role?<br /><span className="italic text-fuchsia-200">We're Always Looking.</span>
              </h2>
              <p className="sans text-violet-200 text-base sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                Send us your resume anyway. If you're exceptional, we'll find a way to make it work.
              </p>
             <button onClick={() => triggerApply("Open Application")} className="sans inline-flex items-center gap-2.5 px-10 py-5 bg-white text-violet-900 rounded-2xl font-bold text-base hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
                Send Open Application <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* --- ADD APPLICATION MODAL HERE --- */}
      <AnimatePresence>
        {applyModalOpen && (
          <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={closeApplyModal}>
            <motion.div initial={{opacity:0, scale:0.95, y:20}} animate={{opacity:1, scale:1, y:0}} className="bg-white rounded-[2.5rem] max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <div className="h-2 w-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
              <div className="p-8 sm:p-10">
                <button onClick={closeApplyModal} className="absolute top-6 right-6 text-slate-400 hover:text-black transition-colors">✕</button>

                <AnimatePresence mode="wait">
                  {formSuccess ? (
                    <motion.div key="success" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="text-center py-10">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} /></div>
                      <h2 className="serif text-3xl font-bold mb-3">Application Sent!</h2>
                      <p className="sans text-slate-500 mb-8">Thanks for applying. Our recruiting team will review your profile and reach out shortly.</p>
                      <button onClick={closeApplyModal} className="sans px-8 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold">Done</button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                      <span className="sans text-[10px] font-black uppercase tracking-widest text-violet-600 mb-1 block">Application Form</span>
                      <h2 className="serif text-2xl font-bold text-slate-900 mb-6">{applyPosition}</h2>
                      
                      <form onSubmit={handleApplySubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input required type="text" placeholder="Full Name" className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-violet-400 outline-none transition-all col-span-2"
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                          <input required type="email" placeholder="Email Address" className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-violet-400 outline-none transition-all col-span-2"
                            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <select className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-violet-400 outline-none transition-all text-slate-600" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                            <option value="fulltime">Full-Time</option>
                            <option value="internship">Internship</option>
                          </select>
                          <input required type="text" placeholder="College / University" className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-violet-400 outline-none transition-all"
                            value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} />
                        </div>

                        <input required type="text" placeholder="Degree / Course (e.g. B.Tech CS)" className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-violet-400 outline-none transition-all"
                          value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} />

                        <div className="relative flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-3 text-slate-400" />
                              <p className="mb-2 text-sm text-slate-500 font-semibold">{formData.resume ? formData.resume.name : "Click to upload Resume (PDF/Doc)"}</p>
                            </div>
                            <input type="file" required accept=".pdf,.doc,.docx" className="hidden" onChange={e => setFormData({...formData, resume: e.target.files[0]})} />
                          </label>
                        </div>

                        <button disabled={isSubmitting} className="sans w-full mt-2 py-4 bg-violet-900 text-white font-bold rounded-xl hover:bg-fuchsia-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                          {isSubmitting ? "Uploading..." : "Submit Application"} <ArrowRight size={18} />
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
}