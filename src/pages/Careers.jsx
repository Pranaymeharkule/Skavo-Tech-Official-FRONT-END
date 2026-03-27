import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import {
  MapPin, Clock, ArrowRight, Search, Briefcase, Code2, Smartphone,
  Bot, BarChart3, Palette, Users, Globe2, Zap, Heart, Coffee,
  ChevronDown, Star, CheckCircle2, TrendingUp, Shield, Upload
} from "lucide-react";

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

const getJobUI = (dept) => {
  const d = dept?.toLowerCase() || "";
  if (d.includes("mobile"))                  return { icon: Smartphone,  color: "#7c3aed", bg: "#ede9fe", tags: ["React Native","iOS","Android"] };
  if (d.includes("ai") || d.includes("data")) return { icon: Bot,         color: "#a855f7", bg: "#fdf4ff", tags: ["Python","LLMs","TensorFlow"] };
  if (d.includes("design"))                  return { icon: Palette,      color: "#c026d3", bg: "#fdf4ff", tags: ["Figma","Framer","Research"] };
  if (d.includes("market"))                  return { icon: TrendingUp,   color: "#4c1d95", bg: "#f5f3ff", tags: ["SEO","Meta Ads","Analytics"] };
  if (d.includes("sale") || d.includes("business")) return { icon: Briefcase, color: "#6d28d9", bg: "#f5f3ff", tags: ["B2B","SaaS","CRM"] };
  if (d.includes("infra") || d.includes("devops"))  return { icon: Shield,    color: "#7c3aed", bg: "#ede9fe", tags: ["Docker","K8s","CI/CD"] };
  return { icon: Code2, color: "#6d28d9", bg: "#f5f3ff", tags: ["React","Node.js","AWS"] };
};

const DEPTS = ["All","Engineering","Mobile","AI & Data","Design","Marketing","Sales","Infrastructure"];

const PERKS = [
  { icon: Globe2,     title:"Remote-First Culture",   desc:"Work from anywhere. Flexibility is a right, not a reward.",                   color:"#6d28d9", bg:"#f5f3ff" },
  { icon: TrendingUp, title:"Steep Learning Curve",   desc:"Fast-growing projects. Real ownership. Skills that compound.",                 color:"#7c3aed", bg:"#ede9fe" },
  { icon: Heart,      title:"Health Coverage",         desc:"Comprehensive health insurance for you and your family.",                     color:"#9333ea", bg:"#faf5ff" },
  { icon: Coffee,     title:"Learning Budget",         desc:"₹30,000/year for courses, books, and conferences of your choice.",            color:"#a855f7", bg:"#fdf4ff" },
  { icon: Zap,        title:"Fast Promotions",         desc:"Performance-first culture. No waiting in line for a title change.",           color:"#c026d3", bg:"#fdf4ff" },
  { icon: Users,      title:"Mentorship",              desc:"Paired with senior engineers and leaders from day one.",                      color:"#6d28d9", bg:"#f5f3ff" },
];

const REVIEWS = [
  { quote:"Joining Skavo was the best career move I made. I shipped a production AI feature in my second month.", name:"Arjun Kale",  role:"ML Engineer, 2 years",        initials:"AK" },
  { quote:"The culture is unlike any agency I've worked at. Real ownership, real impact, real feedback.",         name:"Neha Patil", role:"Full Stack Dev, 3 years",      initials:"NP" },
  { quote:"Best part? Every project is genuinely different. I've worked across fintech, healthcare, and e-commerce.", name:"Rohan Desai", role:"Mobile Dev, 1.5 years", initials:"RD" },
];

export default function CareersPage() {
  const [activeDept, setActiveDept]   = useState("All");
  const [searchQ, setSearchQ]         = useState("");
  const [openJob, setOpenJob]         = useState(null);
  const [activeReview, setActiveReview] = useState(0);
  const [jobsData, setJobsData]       = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyPosition, setApplyPosition]   = useState("");
  const [isSubmitting, setIsSubmitting]     = useState(false);
  const [formSuccess, setFormSuccess]       = useState(false);
  const [formData, setFormData] = useState({ name:"", email:"", type:"fulltime", college:"", course:"", resume:null });

  useEffect(() => {
    const t = setInterval(() => setActiveReview(p => (p + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = applyModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [applyModalOpen]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        setJobsData(response.data.filter(job => job.status === "active"));
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  const filtered = jobsData.filter(j => {
    const deptMatch  = activeDept === "All" || j.dept === activeDept;
    const searchMatch = !searchQ || j.title.toLowerCase().includes(searchQ.toLowerCase()) || j.dept.toLowerCase().includes(searchQ.toLowerCase());
    return deptMatch && searchMatch;
  });

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!formData.resume) { alert("Please upload your resume."); return; }
    setIsSubmitting(true);
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("type", formData.type);
    submitData.append("college", formData.college);
    submitData.append("course", formData.course);
    submitData.append("position", applyPosition);
    submitData.append("resume", formData.resume);
    try {
      const response = await api.post('/careers', submitData, { headers:{"Content-Type":"multipart/form-data"} });
      if (response.status === 201 || response.status === 200) setFormSuccess(true);
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
      setFormData({ name:"", email:"", type:"fulltime", college:"", course:"", resume:null });
    }, 300);
  };

  const triggerApply = (positionTitle) => {
    setApplyPosition(positionTitle);
    setApplyModalOpen(true);
  };

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif" }} className="bg-white text-gray-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,9..40,600&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,600;1,9..144,800&display=swap');
        .serif{font-family:'Fraunces',Georgia,serif} .sans{font-family:'DM Sans',system-ui,sans-serif}
        html{scroll-behavior:smooth} ::selection{background:#ddd6fe;color:#4c1d95}
        .grad{background:linear-gradient(120deg,#6d28d9,#c026d3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .float-icon{animation:float 3.5s ease-in-out infinite}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .ticker{display:flex;gap:5rem;width:max-content;animation:tick 28s linear infinite}
        .ticker:hover{animation-play-state:paused} @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(10px);z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem}
        .dept-btn{transition:all .2s;border:2px solid #e8e8e8;cursor:pointer;font-family:'DM Sans',system-ui,sans-serif;background:white}
        .dept-btn.active{border-color:#7c3aed;background:#ede9fe;color:#4c1d95;font-weight:700}
        .dept-btn:not(.active):hover{border-color:#c4b5fd;background:#faf5ff}
        .job-card{transition:all .35s cubic-bezier(.22,1,.36,1)}
        .job-card:hover{transform:translateY(-4px);box-shadow:0 20px 48px rgba(124,58,237,.12)}
        .perk-card{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease}
        .perk-card:hover{transform:translateY(-5px);box-shadow:0 20px 40px rgba(109,40,217,.12)}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:4px}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#fdfdff] py-16 sm:py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-[-8%] left-[-4%] w-[55%] h-[55%] rounded-full bg-violet-100/60 blur-[110px]" />
          <div className="absolute bottom-[5%] right-[-4%] w-[45%] h-[50%] rounded-full bg-fuchsia-100/50 blur-[110px]" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible"
            variants={{hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.09}}}}
            className="flex flex-col items-center text-center mx-auto w-full max-w-3xl">

            <motion.div variants={{hidden:{opacity:0,y:14},visible:{opacity:1,y:0}}}
              className="flex items-center justify-center gap-3 mb-7">
              <div className="h-px w-10 bg-violet-500" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">Join Our Team</span>
              <div className="h-px w-10 bg-violet-500" />
            </motion.div>

            <motion.h1 variants={{hidden:{opacity:0,y:20},visible:{opacity:1,y:0}}}
              className="serif font-bold text-slate-900 leading-[1.05] tracking-tight mb-7"
              style={{fontSize:"clamp(3rem,6vw,5.2rem)"}}>
              Build the Future.<br /><span className="grad italic">Grow Faster.</span>
            </motion.h1>

            <motion.p variants={{hidden:{opacity:0,y:18},visible:{opacity:1,y:0}}}
              className="sans text-lg text-slate-500 leading-relaxed mb-10 max-w-xl">
              We're a team of{" "}
              <strong className="text-slate-800 font-semibold">60+ engineers, designers, and strategists</strong>{" "}
              building industry-defining products. Join us if you're driven by ownership, impact, and relentless curiosity.
            </motion.p>

            <motion.div variants={{hidden:{opacity:0,y:16},visible:{opacity:1,y:0}}}
              className="flex flex-wrap justify-center gap-4 mb-12">
              <a href="#openings"
                className="sans flex items-center gap-2.5 px-8 py-4 bg-slate-900 text-white font-semibold text-sm rounded-2xl hover:bg-violet-800 transition-all shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 group">
                View Open Roles <span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={16}/></span>
              </a>
              <a href="#perks"
                className="sans flex items-center gap-2.5 px-8 py-4 bg-white text-slate-800 font-semibold text-sm rounded-2xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all">
                Why Skavo?
              </a>
            </motion.div>

           
          </motion.div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <section className="py-8 bg-white border-t border-b border-black overflow-hidden">
        <div className="ticker">
          {["REMOTE FRIENDLY","FAST GROWTH","REAL OWNERSHIP","HEALTH COVERAGE","LEARNING BUDGET","MENTORSHIP","PERFORMANCE FIRST","EXCITING PROJECTS",
            "REMOTE FRIENDLY","FAST GROWTH","REAL OWNERSHIP","HEALTH COVERAGE","LEARNING BUDGET","MENTORSHIP","PERFORMANCE FIRST","EXCITING PROJECTS"].map((c,i)=>(
            <span key={i} className="serif text-base font-bold tracking-widest select-none whitespace-nowrap text-black">{c}</span>
          ))}
        </div>
      </section>

      {/* ── PERKS ── */}
      <section id="perks" className="py-24 sm:py-28 bg-[#fdfdff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-violet-100/50 blur-[120px] pointer-events-none opacity-60" />
        <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-fuchsia-100/30 blur-[120px] pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <Reveal className="mb-16">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <div className="h-px w-10 bg-violet-500" />
                <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">Why Join Us</span>
                <div className="h-px w-10 bg-violet-500" />
              </div>
              <h2 className="serif font-bold text-slate-900 tracking-tight leading-[1.07]"
                style={{fontSize:"clamp(2.4rem,5vw,4rem)"}}>
                Perks That Actually<br /><span className="grad italic">Matter to Engineers.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={i} delay={i*0.07}>
                  <div className="perk-card group relative h-full rounded-[2rem] bg-white border border-black overflow-hidden cursor-default">
                    <div className="absolute top-0 left-0 right-0 h-[3px]"
                      style={{background:`linear-gradient(90deg,${p.color},#c026d3)`}} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{background:`linear-gradient(135deg,${p.bg} 0%, white 80%)`}} />
                    <div className="relative z-10 p-8">
                      <div className="w-14 h-14 rounded-[1.2rem] flex items-center justify-center mb-5 float-icon group-hover:scale-110 transition-transform duration-400"
                        style={{background:p.bg, border:`1.5px solid ${p.color}20`}}>
                        <Icon size={24} style={{color:p.color}} strokeWidth={1.8} />
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

      {/* ── OPEN ROLES ── */}
      <section id="openings" className="py-20 sm:py-7 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-violet-100/30 blur-[120px] pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <Reveal className="mb-12">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <div className="h-px w-10 bg-fuchsia-500" />
                <span className="sans text-fuchsia-600 font-black uppercase tracking-[0.35em] text-[25px]">Open Positions</span>
                <div className="h-px w-10 bg-fuchsia-500" />
              </div>
              <h2 className="serif font-bold text-slate-900 tracking-tight leading-[1.07]"
                style={{fontSize:"clamp(2.4rem,4.8vw,4rem)"}}>
                Find Your<br /><span className="grad italic">Perfect Role.</span>
              </h2>
            </div>

            {/* Search + filters */}
            <div className="flex flex-col items-center gap-5">
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
                  placeholder="Search roles, skills..."
                  className="sans pl-10 pr-5 py-3 border-2 border-black rounded-2xl text-sm focus:outline-none focus:border-violet-400 w-72 transition-all bg-white" />
              </div>
              {/* Dept filters */}
              <div className="flex flex-wrap justify-center gap-2">
                {DEPTS.map(d => (
                  <button key={d} onClick={() => setActiveDept(d)}
                    className={`dept-btn sans text-sm font-semibold px-5 py-2 rounded-full ${activeDept===d?"active":""}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {loadingJobs ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full border-2 border-violet-200 border-t-violet-600 animate-spin mx-auto mb-4" />
              <p className="sans font-bold text-slate-400">Loading open roles...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              <AnimatePresence>
                {filtered.map((job, i) => {
                  const ui = getJobUI(job.dept);
                  const Icon = ui.icon;
                  return (
                    <motion.div key={job._id}
                      initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
                      transition={{duration:.4,delay:i*0.05,ease:[.22,1,.36,1]}}>
                      <div className="job-card group relative rounded-[2rem] border border-black bg-white p-7 cursor-pointer overflow-hidden"
                        onClick={() => setOpenJob(openJob===job._id ? null : job._id)}>
                        {/* Gradient top bar */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{background:`linear-gradient(90deg,${ui.color},#c026d3)`}} />
                        {/* Hover bg */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                          style={{background:`radial-gradient(ellipse at top left, ${ui.bg} 0%, transparent 60%)`}} />

                        <div className="relative z-10">
                          <div className="flex items-start justify-between gap-4 mb-5">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center float-icon"
                              style={{background:ui.bg, border:`2px solid ${ui.color}25`}}>
                              <Icon size={22} style={{color:ui.color}} strokeWidth={1.8} />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="sans text-xs font-bold px-3 py-1 rounded-full"
                                style={{background:`${ui.color}12`,color:ui.color,border:`1px solid ${ui.color}20`}}>
                                {job.type}
                              </span>
                              <motion.div animate={{rotate:openJob===job._id?180:0}} transition={{duration:.22}}>
                                <ChevronDown size={16} className="text-slate-400" />
                              </motion.div>
                            </div>
                          </div>

                          <h3 className="serif text-xl font-bold text-slate-900 mb-1.5 group-hover:text-violet-800 transition-colors">{job.title}</h3>
                          <p className="sans text-xs font-bold uppercase tracking-widest mb-4" style={{color:ui.color}}>{job.dept}</p>

                          <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4">
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50">
                              <MapPin size={11}/>{job.location}
                            </span>
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50">
                              <Clock size={11}/>Flexible
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {ui.tags.map(t => (
                              <span key={t} className="sans text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider"
                                style={{background:ui.bg, color:ui.color}}>
                                {t}
                              </span>
                            ))}
                          </div>

                          <AnimatePresence>
                            {openJob === job._id && (
                              <motion.div
                                initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
                                transition={{duration:.32,ease:[.22,1,.36,1]}} style={{overflow:"hidden"}}>
                                <div className="mt-6 pt-6 border-t border-violet-100">
                                  <p className="sans text-sm text-slate-500 leading-relaxed mb-5 whitespace-pre-wrap">{job.description}</p>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); triggerApply(job.title); }}
                                    className="sans inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-bold rounded-xl hover:scale-[1.03] active:scale-[.98] transition-all shadow-md"
                                    style={{background:`linear-gradient(135deg,${ui.color},#c026d3)`}}>
                                    Apply Now <ArrowRight size={14} />
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {!loadingJobs && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="serif text-2xl font-bold text-slate-300 mb-2">No roles found</p>
              <p className="sans text-slate-400 text-sm">Try a different search or department filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-20 bg-[#fdfdff] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10 bg-violet-400" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">Life at Skavo</span>
              <div className="h-px w-10 bg-violet-400" />
            </div>
            <h2 className="serif font-bold text-slate-900 tracking-tight"
              style={{fontSize:"clamp(2.2rem,4.8vw,4rem)"}}>
              Heard From <span className="grad italic">Our Team.</span>
            </h2>
          </Reveal>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait">
                {REVIEWS.map((r,i) => i===activeReview ? (
                  <motion.div key={i}
                    initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}
                    transition={{duration:.5,ease:[.22,1,.36,1]}}
                    className="absolute inset-0">
                    <div className="bg-white rounded-3xl p-9 sm:p-12 shadow-2xl shadow-violet-100/60 border border-black h-full flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[3px]"
                        style={{background:"linear-gradient(90deg,#6d28d9,#c026d3)"}} />
                      <div>
                        <div className="serif text-7xl text-violet-200 leading-none mb-4 font-extrabold select-none">"</div>
                        <p className="sans text-xl sm:text-2xl text-slate-700 leading-relaxed font-light">{r.quote}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                          style={{background:"linear-gradient(135deg,#4c1d95,#a855f7)"}}>
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
                <button key={i} onClick={()=>setActiveReview(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i===activeReview?"bg-violet-900 w-10":"bg-violet-200 w-2.5"}`} />
              ))}
            </div>
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
                <span className="sans text-xs font-bold text-white/80 uppercase tracking-widest">Always hiring exceptional talent</span>
              </div>
              <h2 className="serif font-bold text-white tracking-tight leading-[1.05] mb-7"
                style={{fontSize:"clamp(2.4rem,6vw,5rem)"}}>
                Don't See the Right Role?<br /><span className="italic text-fuchsia-200">We're Always Looking.</span>
              </h2>
              <p className="sans text-violet-200 text-base sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                Send us your resume anyway. If you're exceptional, we'll find a way to make it work.
              </p>
              <button onClick={() => triggerApply("Open Application")}
                className="sans inline-flex items-center gap-2.5 px-10 py-5 bg-white text-violet-900 rounded-2xl font-bold text-base hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
                Send Open Application <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── APPLICATION MODAL (API intact) ── */}
      <AnimatePresence>
        {applyModalOpen && (
          <motion.div className="modal-backdrop"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={closeApplyModal}>
            <motion.div
              initial={{opacity:0,scale:0.95,y:20}} animate={{opacity:1,scale:1,y:0}}
              className="bg-white rounded-[2.5rem] max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={e => e.stopPropagation()}>
              <div className="h-[3px] w-full" style={{background:"linear-gradient(90deg,#6d28d9,#c026d3)"}} />
              <div className="p-8 sm:p-10">
                <button onClick={closeApplyModal}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-violet-600 hover:border-violet-300 transition-all text-sm">
                  ✕
                </button>

                <AnimatePresence mode="wait">
                  {formSuccess ? (
                    <motion.div key="success"
                      initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
                      className="text-center py-10">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                        style={{background:"linear-gradient(135deg,#f0fdf4,#dcfce7)",border:"2px solid #bbf7d0"}}>
                        <CheckCircle2 size={36} className="text-green-500" />
                      </div>
                      <h2 className="serif text-3xl font-bold text-slate-900 mb-3">Application Sent!</h2>
                      <p className="sans text-slate-500 mb-8">Our recruiting team will review your profile and reach out shortly.</p>
                      <button onClick={closeApplyModal}
                        className="sans px-8 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-slate-700">
                        Done
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form"
                      initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
                        style={{background:"rgba(109,40,217,0.08)",border:"1px solid rgba(109,40,217,0.15)"}}>
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                        <span className="sans text-xs font-bold text-violet-700 uppercase tracking-widest">Application Form</span>
                      </div>
                      <h2 className="serif text-2xl font-bold text-slate-900 mb-6">{applyPosition}</h2>

                      <form onSubmit={handleApplySubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input required type="text" placeholder="Full Name"
                            className="col-span-2 w-full p-4 border-2 border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-violet-400 outline-none transition-all sans text-sm"
                            value={formData.name} onChange={e => setFormData({...formData, name:e.target.value})} />
                          <input required type="email" placeholder="Email Address"
                            className="col-span-2 w-full p-4 border-2 border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-violet-400 outline-none transition-all sans text-sm"
                            value={formData.email} onChange={e => setFormData({...formData, email:e.target.value})} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <select className="w-full p-4 border-2 border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-violet-400 outline-none transition-all text-slate-600 sans text-sm"
                            value={formData.type} onChange={e => setFormData({...formData, type:e.target.value})}>
                            <option value="fulltime">Full-Time</option>
                            <option value="internship">Internship</option>
                          </select>
                          <input required type="text" placeholder="College / University"
                            className="w-full p-4 border-2 border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-violet-400 outline-none transition-all sans text-sm"
                            value={formData.college} onChange={e => setFormData({...formData, college:e.target.value})} />
                        </div>

                        <input required type="text" placeholder="Degree / Course (e.g. B.Tech CS)"
                          className="w-full p-4 border-2 border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-violet-400 outline-none transition-all sans text-sm"
                          value={formData.course} onChange={e => setFormData({...formData, course:e.target.value})} />

                        {/* Upload zone */}
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all"
                          style={{borderColor:formData.resume?"#7c3aed":"#e2e8f0",background:formData.resume?"#f5f3ff":"#f8fafc"}}>
                          <div className="flex flex-col items-center justify-center py-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                              style={{background:formData.resume?"#ede9fe":"#f1f5f9"}}>
                              <Upload size={18} style={{color:formData.resume?"#7c3aed":"#94a3b8"}} />
                            </div>
                            <p className="sans text-sm font-semibold" style={{color:formData.resume?"#7c3aed":"#94a3b8"}}>
                              {formData.resume ? formData.resume.name : "Click to upload Resume (PDF/Doc)"}
                            </p>
                          </div>
                          <input type="file" required accept=".pdf,.doc,.docx" className="hidden"
                            onChange={e => setFormData({...formData, resume:e.target.files[0]})} />
                        </label>

                        <button disabled={isSubmitting}
                          className="sans w-full mt-2 py-4 text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-[.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                          style={{background:"linear-gradient(135deg,#4c1d95,#7c3aed,#c026d3)"}}>
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