import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BookOpen, Clock, Users, Award, CheckCircle2,
  Code2, Smartphone, Bot, BarChart3, Palette, TrendingUp,
  Calendar, Star, Zap, Globe2
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

const COURSES = [
  {
    id:1, icon:Code2, title:"Full Stack Web Development", level:"Beginner to Advanced", duration:"16 Weeks",
    students:"1,200+", rating:4.9, price:"₹29,999", originalPrice:"₹49,999",
    color:"#6d28d9", bg:"#f5f3ff",
    tags:["React","Node.js","MongoDB","AWS","TypeScript"],
    highlights:["Real project portfolio","1:1 mentorship sessions","Job placement support","Certificate of completion","Lifetime access to materials","Weekly live sessions"],
    desc:"Master full-stack development from scratch. Build 5 real-world projects, get mentored by working engineers, and graduate with a job-ready portfolio.",
    nextBatch:"April 7, 2026",
  },
  {
    id:2, icon:Smartphone, title:"React Native Mobile Development", level:"Intermediate", duration:"10 Weeks",
    students:"600+", rating:4.8, price:"₹19,999", originalPrice:"₹34,999",
    color:"#7c3aed", bg:"#ede9fe",
    tags:["React Native","iOS","Android","Expo","Firebase"],
    highlights:["Publish real apps to stores","Cross-platform development","Native device features","Performance optimization","Code review sessions","Industry certificate"],
    desc:"Build and publish production-quality iOS and Android apps. You'll ship two real apps to the App Store and Play Store by the end of the program.",
    nextBatch:"April 14, 2026",
  },
  {
    id:3, icon:Bot, title:"AI & Machine Learning Fundamentals", level:"Beginner to Intermediate", duration:"12 Weeks",
    students:"800+", rating:4.9, price:"₹24,999", originalPrice:"₹44,999",
    color:"#a855f7", bg:"#fdf4ff",
    tags:["Python","TensorFlow","OpenAI API","LangChain","Scikit-learn"],
    highlights:["Build AI-powered applications","Work with real datasets","LLM fine-tuning & RAG","Hands-on projects","Expert mentors","Industry-recognized certificate"],
    desc:"From Python basics to deploying AI models in production. Build 4 AI-powered projects including a custom chatbot, image classifier, and predictive model.",
    nextBatch:"April 21, 2026",
  },
  {
    id:4, icon:TrendingUp, title:"Digital Marketing Mastery", level:"Beginner", duration:"8 Weeks",
    students:"900+", rating:4.7, price:"₹14,999", originalPrice:"₹24,999",
    color:"#c026d3", bg:"#fdf4ff",
    tags:["SEO","Meta Ads","Google Ads","Analytics","Content"],
    highlights:["Manage real ad budgets","Google & Meta certifications","SEO audit projects","Analytics dashboard setup","Live campaign walkthroughs","Freelancing guidance"],
    desc:"Learn to run profitable digital campaigns from day one. Manage real ad budgets, build a portfolio of campaigns, and earn Google & Meta certifications.",
    nextBatch:"March 31, 2026",
  },
  {
    id:5, icon:BarChart3, title:"Data Analytics with Python", level:"Beginner to Intermediate", duration:"10 Weeks",
    students:"500+", rating:4.8, price:"₹19,999", originalPrice:"₹34,999",
    color:"#4c1d95", bg:"#f5f3ff",
    tags:["Python","Pandas","Tableau","SQL","Power BI"],
    highlights:["Build 3 real dashboards","SQL & NoSQL databases","Data visualization","Statistical analysis","Business case studies","Job-ready certificate"],
    desc:"Turn raw data into business insights. Learn Python for data analysis, SQL, and industry-standard BI tools — with real datasets from actual businesses.",
    nextBatch:"April 7, 2026",
  },
  {
    id:6, icon:Palette, title:"UI/UX Design Bootcamp", level:"Beginner", duration:"8 Weeks",
    students:"700+", rating:4.9, price:"₹16,999", originalPrice:"₹29,999",
    color:"#7c3aed", bg:"#ede9fe",
    tags:["Figma","User Research","Prototyping","Framer","Design Systems"],
    highlights:["Build a full design system","User research & testing","Interactive prototypes","Portfolio of 4 case studies","Figma advanced techniques","Freelancing starter kit"],
    desc:"Design interfaces people love. Master Figma, user research, and prototyping. Graduate with a professional portfolio of real design case studies.",
    nextBatch:"April 14, 2026",
  },
];

const STATS = [
  { n:"4,700+", l:"Students Trained", icon:Users },
  { n:"94%", l:"Job Placement Rate", icon:Award },
  { n:"4.85★", l:"Average Course Rating", icon:Star },
  { n:"12", l:"Industry Certificates", icon:BookOpen },
];

const REVIEWS = [
  { quote:"I went from zero coding knowledge to landing a ₹8 LPA job in 5 months. The mentorship at Skavo is unlike anything else.", name:"Anjali Sharma", role:"Full Stack Dev at FinTech startup", initials:"AS" },
  { quote:"The AI course helped me build a product that I'm now selling as a SaaS. Real skills, real outcomes.", name:"Vikram Nair", role:"AI Founder, BootAI", initials:"VN" },
  { quote:"Best investment I made in my career. The instructors are working professionals, not just theorists.", name:"Riya Deshmukh", role:"UX Designer at MNC", initials:"RD" },
];

const NAV = [
  { label:"Services", href:"/services" },
  { label:"Our Work", href:"/projects" },
  { label:"Training", href:"/training" },
  { label:"Careers", href:"/careers" },
  { label:"Contact", href:"/contact" },
];

export default function TrainingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setActiveReview(p => (p+1)%REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const handleEnroll = async (course) => {
  const name = prompt("Enter your Full Name:");
  const email = prompt("Enter your Email:");
  const phone = prompt("Enter your Phone Number:");

  if (!name || !email) return;

  try {
    const response = await fetch('http://localhost:5000/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone,
        courseTitle: course.title,
        courseId: course.id
      }),
    });

    if (response.ok) {
      alert("Application received! Our team will contact you shortly.");
      setSelected(null); // Closes the modal
    } else {
      alert("Submission failed. Check your server.");
    }
  } catch (error) {
    console.error("Enrollment failed", error);
    alert("Backend is not reachable. Is it running on port 5000?");
  }
};

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif" }} className="bg-white text-gray-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,600;1,9..144,800&display=swap');
        .serif{font-family:'Fraunces',Georgia,serif}.sans{font-family:'DM Sans',system-ui,sans-serif}
        html{scroll-behavior:smooth}::selection{background:#ddd6fe;color:#4c1d95}
        .grad{background:linear-gradient(120deg,#6d28d9,#c026d3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .course-card{transition:all .35s cubic-bezier(.22,1,.36,1);cursor:pointer}
        .course-card:hover{transform:translateY(-6px);box-shadow:0 28px 56px rgba(109,40,217,.13)}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}.float-icon{animation:float 3.5s ease-in-out infinite}
        .ticker{display:flex;gap:5rem;width:max-content;animation:tick 28s linear infinite}
        .ticker:hover{animation-play-state:paused}@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:4px}
        .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem}
        .price-strike{text-decoration:line-through;color:#94a3b8}
      `}</style>

      

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center pt-28 pb-20 overflow-hidden bg-[#fdfdff]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-8%] left-[-4%] w-[55%] h-[55%] rounded-full bg-violet-100/60 blur-[110px]" />
          <div className="absolute bottom-[5%] right-[-4%] w-[45%] h-[50%] rounded-full bg-fuchsia-100/50 blur-[110px]" />
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial="hidden" animate="visible" variants={{hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.09}}}}>
              <motion.div variants={{hidden:{opacity:0,y:14},visible:{opacity:1,y:0}}} className="flex items-center gap-3 mb-7">
                <div className="h-px w-10 bg-violet-500" />
                <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">Skavo Academy</span>
              </motion.div>
              <motion.h1 variants={{hidden:{opacity:0,y:20},visible:{opacity:1,y:0}}} className="serif font-bold text-slate-900 leading-[1.05] tracking-tight mb-7" style={{fontSize:"clamp(3rem,6vw,5.2rem)"}}>
                Learn From People<br /><span className="grad italic">Who Ship Real Products.</span>
              </motion.h1>
              <motion.p variants={{hidden:{opacity:0,y:18},visible:{opacity:1,y:0}}} className="sans text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
                Not theory. Not YouTube tutorials. <strong className="text-slate-800">Real engineers, real projects, real results.</strong> Our instructors build the same products you'll be learning to create.
              </motion.p>
              <motion.div variants={{hidden:{opacity:0},visible:{opacity:1}}} className="flex flex-wrap gap-4">
                <a href="#courses" className="sans flex items-center gap-2.5 px-8 py-4 bg-slate-900 text-white font-semibold text-sm rounded-2xl hover:bg-violet-800 transition-all shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 group">
                  Browse Courses <span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={16}/></span>
                </a>
                <a href="#reviews" className="sans flex items-center gap-2.5 px-8 py-4 bg-white text-slate-800 font-semibold text-sm rounded-2xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all">
                  Student Stories
                </a>
              </motion.div>
            </motion.div>

            {/* Stats grid */}
            <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{duration:.8,delay:.2}} className="grid grid-cols-2 gap-4">
              {STATS.map(({n,l,icon:Icon},i)=>(
                <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.3+i*.08,duration:.5,ease:[.22,1,.36,1]}}
                  className="p-7 rounded-3xl border border-black hover:shadow-xl hover:shadow-violet-100/50 transition-all" style={{backgroundColor:["#f5f3ff","#ede9fe","#f5f3ff","#fdf4ff"][i]}}>
                  <Icon size={16} className="text-violet-500 mb-2" />
                  <p className="serif font-bold leading-none mb-1.5 text-violet-900" style={{fontSize:"clamp(1.8rem,3vw,2.4rem)"}}>{n}</p>
                  <p className="sans text-black text-xs leading-snug font-medium">{l}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <section className="py-8 bg-white border-t border-b border-black overflow-hidden">
        <div className="ticker">
          {["FULL STACK DEVELOPMENT","REACT NATIVE","AI & ML","DIGITAL MARKETING","DATA ANALYTICS","UI/UX DESIGN","94% PLACEMENT RATE","4,700+ STUDENTS",
            "FULL STACK DEVELOPMENT","REACT NATIVE","AI & ML","DIGITAL MARKETING","DATA ANALYTICS","UI/UX DESIGN","94% PLACEMENT RATE","4,700+ STUDENTS"].map((c,i)=>(
            <span key={i} className="serif text-base font-bold tracking-widest select-none whitespace-nowrap text-black">{c}</span>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="py-24 sm:py-32 bg-[#fdfdff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-violet-100/50 blur-[120px] pointer-events-none opacity-60" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <Reveal className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-violet-500" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">Our Courses</span>
            </div>
            <h2 className="serif font-bold text-slate-900 tracking-tight leading-[1.07]" style={{fontSize:"clamp(2.4rem,5vw,4rem)"}}>
              Six Programs That<br /><span className="grad italic">Transform Careers.</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course, i) => {
              const Icon = course.icon;
              return (
                <Reveal key={i} delay={i*0.07}>
                  <div className="course-card group relative h-full flex flex-col rounded-[2.5rem] border border-black bg-white overflow-hidden"
                    onClick={() => setSelected(course)}>
                    <div className="h-2 w-full" style={{background:`linear-gradient(90deg,${course.color},#c026d3)`}} />
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-5">
                        <div className="w-12 h-12 rounded-[1rem] flex items-center justify-center float-icon" style={{background:`${course.color}15`,border:`2px solid ${course.color}30`}}>
                          <Icon size={22} style={{color:course.color}} strokeWidth={1.8} />
                        </div>
                        <div className="text-right">
                          <div className="flex gap-0.5 justify-end mb-1">{[0,1,2,3,4].map(s=><StarIcon key={s}/>)}</div>
                          <span className="sans text-xs text-slate-400 font-medium">{course.rating} · {course.students} students</span>
                        </div>
                      </div>

                      <span className="sans text-[10px] font-black uppercase tracking-widest text-violet-500 mb-2 block">{course.level}</span>
                      <h3 className="serif text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-800 transition-colors">{course.title}</h3>
                      <p className="sans text-sm text-slate-500 leading-relaxed mb-4 flex-1">{course.desc}</p>

                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-5">
                        <span className="flex items-center gap-1.5"><Clock size={12}/>{course.duration}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={12}/>Next: {course.nextBatch}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {course.tags.slice(0,3).map(t=><span key={t} className="sans text-[10px] font-bold px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 uppercase tracking-wider">{t}</span>)}
                        {course.tags.length>3&&<span className="sans text-[10px] font-bold px-2.5 py-1 rounded-lg bg-violet-50 text-violet-400">+{course.tags.length-3}</span>}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-violet-50">
                        <div>
                          <span className="sans text-[11px] price-strike mr-2">{course.originalPrice}</span>
                          <span className="serif text-2xl font-bold text-violet-900">{course.price}</span>
                        </div>
                        <span className="sans text-xs font-bold text-white px-3 py-1.5 rounded-full" style={{background:course.color}}>Enroll Now</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* STUDENT REVIEWS */}
      <section id="reviews" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-fuchsia-400" />
              <span className="sans text-fuchsia-600 font-black uppercase tracking-[0.35em] text-sm">Student Stories</span>
              <div className="h-px w-10 bg-fuchsia-400" />
            </div>
            <h2 className="serif font-bold text-slate-900 tracking-tight" style={{fontSize:"clamp(2.4rem,4.8vw,4rem)"}}>
              Real Results.<br /><span className="grad italic">Real Careers.</span>
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
              {REVIEWS.map((_,i)=><button key={i} onClick={()=>setActiveReview(i)} className={`h-2 rounded-full transition-all duration-300 ${i===activeReview?"bg-violet-900 w-10":"bg-violet-200 w-2.5"}`} />)}
            </div>
          </div>
        </div>
      </section>

      {/* COURSE MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelected(null)}>
            <motion.div initial={{opacity:0,scale:.95,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.95,y:20}}
              transition={{duration:.35,ease:[.22,1,.36,1]}}
              className="bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={e=>e.stopPropagation()}>
              <div className="h-3 w-full rounded-t-[2.5rem]" style={{background:`linear-gradient(90deg,${selected.color},#c026d3)`}} />
              <div className="p-8 sm:p-12">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="sans text-xs font-black uppercase tracking-widest text-violet-600 mb-1 block">{selected.level} · {selected.duration}</span>
                    <h2 className="serif text-3xl font-bold text-slate-900">{selected.title}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-violet-300 transition-colors text-slate-400 hover:text-violet-600 flex-shrink-0">✕</button>
                </div>
                <p className="sans text-base text-slate-500 leading-relaxed mb-6">{selected.desc}</p>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="p-4 rounded-2xl border border-black text-center">
                    <Users size={16} className="text-violet-600 mx-auto mb-1" />
                    <p className="serif font-bold text-slate-900 text-lg">{selected.students}</p>
                    <p className="sans text-[10px] text-slate-400 uppercase tracking-wider">Students</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-black text-center">
                    <Clock size={16} className="text-violet-600 mx-auto mb-1" />
                    <p className="serif font-bold text-slate-900 text-lg">{selected.duration}</p>
                    <p className="sans text-[10px] text-slate-400 uppercase tracking-wider">Duration</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-black text-center">
                    <Award size={16} className="text-violet-600 mx-auto mb-1" />
                    <p className="serif font-bold text-slate-900 text-lg">{selected.rating}★</p>
                    <p className="sans text-[10px] text-slate-400 uppercase tracking-wider">Rating</p>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="sans text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">What You'll Get</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selected.highlights.map((h,i)=>(
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-violet-50 border border-violet-100">
                        <CheckCircle2 size={14} className="text-violet-600 mt-0.5 flex-shrink-0" />
                        <span className="sans text-sm text-violet-800 font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 mb-6">
                  <Calendar size={16} className="text-amber-600 flex-shrink-0" />
                  <span className="sans text-sm font-semibold text-amber-800">Next Batch: {selected.nextBatch} — Limited seats available</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="sans text-sm price-strike mr-2">{selected.originalPrice}</span>
                    <span className="serif text-3xl font-bold text-violet-900">{selected.price}</span>
                    <span className="sans text-sm text-slate-400 ml-2">/ full course</span>
                  </div>
                </div>

               {/* Replace the old <a> tag with this button */}
<button 
  onClick={() => handleEnroll(selected)}
  className="sans flex items-center justify-center gap-2.5 w-full px-8 py-4 bg-violet-900 text-white font-bold text-sm rounded-2xl hover:bg-fuchsia-700 transition-all hover:scale-[1.02] active:scale-[.98]"
>
  Enroll Now — Secure Your Seat <ArrowRight size={16} />
</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-8">
        <Reveal>
          <div className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden relative" style={{background:"linear-gradient(135deg,#3b0764 0%,#6d28d9 55%,#c026d3 100%)"}}>
            <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)",backgroundSize:"28px 28px"}} />
            <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-24 text-center">
              <h2 className="serif font-bold text-white tracking-tight leading-[1.05] mb-7" style={{fontSize:"clamp(2.4rem,6vw,5rem)"}}>
                Corporate Training<br /><span className="italic text-fuchsia-200">for Your Team?</span>
              </h2>
              <p className="sans text-violet-200 text-base sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                We run customized training programs for enterprise teams. Upskill your developers, designers, and marketing teams with industry experts.
              </p>
              <a href="/contact" className="sans inline-flex items-center gap-2.5 px-10 py-5 bg-white text-violet-900 rounded-2xl font-bold text-base hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
                Request Corporate Training <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      
    </div>
  );
}