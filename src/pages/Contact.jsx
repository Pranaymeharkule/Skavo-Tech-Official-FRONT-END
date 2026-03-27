import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import {
  ArrowRight, Mail, Phone, MapPin, Clock, CheckCircle2,
  Send, Calendar, MessageSquare, Briefcase, Users, BookOpen
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

const INQUIRY_TYPES = [
  { id:"project",  icon:Briefcase,      label:"Start a Project",   desc:"I want to build something",  color:"#6d28d9", bg:"#f5f3ff" },
  { id:"training", icon:BookOpen,       label:"Training Inquiry",   desc:"I want to learn or upskill", color:"#7c3aed", bg:"#ede9fe" },
  { id:"careers",  icon:Users,          label:"Join the Team",      desc:"I want to work at Skavo",    color:"#9333ea", bg:"#faf5ff" },
  { id:"other",    icon:MessageSquare,  label:"General Inquiry",    desc:"Something else",             color:"#a855f7", bg:"#fdf4ff" },
];

const BUDGETS = ["Under ₹1L","₹1L – ₹5L","₹5L – ₹20L","₹20L – ₹50L","₹50L+","Let's Discuss"];

const CONTACT_INFO = [
  { icon:Mail,    label:"Email Us",         value:"hello@skavo.tech",       sub:"We reply within 2 hours",  href:"mailto:hello@skavo.tech", color:"#6d28d9" },
  { icon:Phone,   label:"Call Us",          value:"+91 98765 43210",        sub:"Mon–Sat, 9AM–7PM IST",     href:"tel:+919876543210",       color:"#7c3aed" },
  { icon:MapPin,  label:"Headquarters",     value:"Nagpur, Maharashtra",    sub:"India",                    href:"#",                       color:"#9333ea" },
  { icon:MapPin,  label:"Development Hub",  value:"Navi Mumbai, Maharashtra", sub:"India",                  href:"#",                       color:"#a855f7" },
];

const FAQS = [
  { q:"How quickly can we get started?",           a:"Within 48 hours of signing. You'll have your first deliverable in hand within 10 days." },
  { q:"Do we own all the code?",                   a:"100%. Every line of code is yours from day one. No lock-in, ever." },
  { q:"What if something breaks after launch?",    a:"We support you for 90 days post-launch. Anything that breaks, we fix fast — no extra charge." },
  { q:"Do you work with startups or enterprises?", a:"Both. Early-stage founders get the same focus and quality as enterprise product teams." },
];

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState("project");
  const [budget, setBudget]           = useState("");
  const [openFaq, setOpenFaq]         = useState(null);
  const [submitted, setSubmitted]     = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", company:"", phone:"", message:"" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = { ...form, inquiryType, budget: inquiryType==="project" ? budget : undefined };
    try {
      const response = await api.post("/contacts", payload);
      if (response.status === 201 || response.status === 200) setSubmitted(true);
    } catch (error) {
      console.error("Failed:", error);
      alert(error.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif" }} className="bg-white text-gray-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,600;1,9..144,800&display=swap');
        .serif{font-family:'Fraunces',Georgia,serif} .sans{font-family:'DM Sans',system-ui,sans-serif}
        html{scroll-behavior:smooth} ::selection{background:#ddd6fe;color:#4c1d95}
        .grad{background:linear-gradient(120deg,#6d28d9,#c026d3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .input-field{
          width:100%;padding:.9rem 1.1rem;border:2px solid #e8e8e8;border-radius:1rem;
          font-family:'DM Sans',system-ui,sans-serif;font-size:.9rem;color:#1e293b;
          background:white;outline:none;transition:all .25s;
        }
        .input-field:focus{border-color:#7c3aed;box-shadow:0 0 0 4px rgba(124,58,237,.08);background:#fefeff}
        .input-field::placeholder{color:#94a3b8}
        textarea.input-field{resize:vertical;min-height:120px}
        .inq-btn{cursor:pointer;transition:all .25s;border:2px solid #e8e8e8;background:white}
        .inq-btn.active{border-color:#7c3aed;background:#ede9fe}
        .inq-btn:not(.active):hover{border-color:#c4b5fd;background:#faf5ff}
        .budget-btn{cursor:pointer;transition:all .2s;border:2px solid #e8e8e8;background:white;font-family:'DM Sans',system-ui,sans-serif}
        .budget-btn.active{border-color:#7c3aed;background:#ede9fe;color:#4c1d95;font-weight:700}
        .budget-btn:not(.active):hover{border-color:#c4b5fd;background:#faf5ff}
        .contact-info-card{transition:all .3s cubic-bezier(.22,1,.36,1)}
        .contact-info-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(109,40,217,.1)}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}} .float-icon{animation:float 3.5s ease-in-out infinite}
        @keyframes checkIn{from{scale:0;opacity:0}to{scale:1;opacity:1}} .check-anim{animation:checkIn .4s cubic-bezier(.22,1,.36,1) forwards}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:4px}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-12 overflow-hidden bg-[#fdfdff]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-[-8%] left-[-4%] w-[55%] h-[55%] rounded-full bg-violet-100/60 blur-[110px]" />
          <div className="absolute bottom-[5%] right-[-4%] w-[45%] h-[50%] rounded-full bg-fuchsia-100/50 blur-[110px]" />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible"
            variants={{hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.09}}}}>

            <motion.div variants={{hidden:{opacity:0,y:14},visible:{opacity:1,y:0}}}
              className="flex items-center gap-3 mb-7">
              <div className="h-px w-10 bg-violet-500" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">Get in Touch</span>
            </motion.div>

            <motion.h1 variants={{hidden:{opacity:0,y:20},visible:{opacity:1,y:0}}}
              className="serif font-bold text-slate-900 leading-[1.05] tracking-tight mb-5"
              style={{fontSize:"clamp(3rem,6vw,5.2rem)"}}>
              Let's Build Something<br /><span className="grad italic">Extraordinary.</span>
            </motion.h1>

            <motion.p variants={{hidden:{opacity:0,y:18},visible:{opacity:1,y:0}}}
              className="sans text-lg text-slate-500 leading-relaxed max-w-xl">
              Free 30-minute strategy call. No fluff. We'll tell you{" "}
              <strong className="text-slate-800">exactly what to build and how</strong>{" "}
              — even if you end up not working with us.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-16 sm:py-20 bg-[#fdfdff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-violet-100/40 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 xl:gap-16">

            {/* ── FORM — 3 cols ── */}
            <Reveal className="lg:col-span-3">
              <div className="bg-white rounded-[2.5rem] border border-black p-8 sm:p-12 shadow-[0_20px_60px_rgba(124,58,237,.07)] relative overflow-hidden">
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{background:"linear-gradient(90deg,#6d28d9,#c026d3)"}} />

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="success"
                      initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}}
                      transition={{duration:.4,ease:[.22,1,.36,1]}}
                      className="flex flex-col items-center justify-center text-center py-12">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 check-anim"
                        style={{background:"linear-gradient(135deg,#ede9fe,#faf5ff)",border:"2px solid #c4b5fd"}}>
                        <CheckCircle2 size={40} className="text-violet-600" />
                      </div>
                      <h3 className="serif text-3xl font-bold text-slate-900 mb-3">Message Sent!</h3>
                      <p className="sans text-slate-500 leading-relaxed max-w-sm mb-8">
                        We've received your message and will reply within 2 hours. You'll hear from a real human, not a bot.
                      </p>
                      <button
                        onClick={() => { setSubmitted(false); setForm({name:"",email:"",company:"",phone:"",message:""}); }}
                        className="sans px-6 py-3 border-2 border-violet-200 text-violet-800 rounded-xl font-semibold text-sm hover:bg-violet-50 transition-all">
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} initial={{opacity:0}} animate={{opacity:1}}>
                      <h2 className="serif text-2xl font-bold text-slate-900 mb-8">Tell Us About Your Project</h2>

                      {/* Inquiry type */}
                      <div className="mb-8">
                        <label className="sans text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 block">What brings you here?</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {INQUIRY_TYPES.map(type => {
                            const Icon = type.icon;
                            const isActive = inquiryType === type.id;
                            return (
                              <button key={type.id} type="button" onClick={() => setInquiryType(type.id)}
                                className={`inq-btn rounded-2xl p-3 text-left relative overflow-hidden ${isActive?"active":""}`}>
                                {isActive && (
                                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                                    style={{background:`linear-gradient(90deg,${type.color},#c026d3)`}} />
                                )}
                                <Icon size={16} className={`mb-2 ${isActive?"text-violet-700":"text-slate-400"}`} />
                                <p className={`sans text-xs font-bold leading-tight mb-0.5 ${isActive?"text-violet-900":"text-slate-700"}`}>{type.label}</p>
                                <p className="sans text-[10px] text-slate-400 leading-tight">{type.desc}</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Name + Email */}
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="sans text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Your Name *</label>
                          <input name="name" value={form.name} onChange={handleChange} required placeholder="Rahul Sharma" className="input-field" />
                        </div>
                        <div>
                          <label className="sans text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Email Address *</label>
                          <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="rahul@company.com" className="input-field" />
                        </div>
                      </div>

                      {/* Company + Phone */}
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="sans text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Company / Startup</label>
                          <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp (optional)" className="input-field" />
                        </div>
                        <div>
                          <label className="sans text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Phone Number</label>
                          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="input-field" />
                        </div>
                      </div>

                      {/* Budget */}
                      {inquiryType === "project" && (
                        <div className="mb-4">
                          <label className="sans text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 block">Estimated Budget</label>
                          <div className="flex flex-wrap gap-2">
                            {BUDGETS.map(b => (
                              <button key={b} type="button" onClick={() => setBudget(b)}
                                className={`budget-btn sans text-xs font-semibold px-4 py-2 rounded-full ${budget===b?"active":""}`}>
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Message */}
                      <div className="mb-7">
                        <label className="sans text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                          {inquiryType==="project" ? "Tell Us About Your Project *" : inquiryType==="training" ? "What Would You Like to Learn? *" : inquiryType==="careers" ? "Why Skavo? *" : "Your Message *"}
                        </label>
                        <textarea name="message" value={form.message} onChange={handleChange} required
                          placeholder={
                            inquiryType==="project" ? "I'm building a SaaS platform for... I need help with... My timeline is..." :
                            inquiryType==="training" ? "I want to learn... My current skill level is... My goal is..." :
                            inquiryType==="careers" ? "I'm a [role] with [X] years experience. I'm excited about Skavo because..." :
                            "What can we help you with?"
                          }
                          className="input-field" />
                      </div>

                      <button type="submit" disabled={isSubmitting}
                        className="sans w-full flex items-center justify-center gap-2.5 px-8 py-4 text-white font-bold text-base rounded-2xl hover:scale-[1.02] active:scale-[.98] transition-all shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                        style={{background:"linear-gradient(135deg,#4c1d95,#7c3aed,#c026d3)"}}>
                        {isSubmitting ? "Sending..." : "Send Message"} <Send size={16} />
                      </button>

                      <p className="sans text-xs text-slate-400 text-center mt-4">
                        We reply within 2 hours during business hours. No spam, ever.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* ── SIDEBAR — 2 cols ── */}
            <div className="lg:col-span-2 space-y-5">

              {/* Live badge */}
              <Reveal>
                <div className="flex items-center gap-3 p-4 rounded-2xl border relative overflow-hidden"
                  style={{background:"linear-gradient(135deg,#f0fdf4,#dcfce7)",borderColor:"#bbf7d0"}}>
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{background:"linear-gradient(90deg,#16a34a,#22c55e)"}} />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  <div>
                    <p className="sans text-sm font-bold text-green-800">Currently Accepting Projects</p>
                    <p className="sans text-xs text-green-600">Slots available for April 2026</p>
                  </div>
                </div>
              </Reveal>

              {/* Contact info cards */}
              <Reveal delay={0.05}>
                <div className="space-y-3">
                  {CONTACT_INFO.map((c, i) => {
                    const Icon = c.icon;
                    return (
                      <a key={i} href={c.href}
                        className="contact-info-card group flex items-start gap-4 p-5 rounded-2xl border border-black bg-white transition-all relative overflow-hidden block">
                        <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{background:`linear-gradient(90deg,${c.color},#c026d3)`}} />
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 float-icon group-hover:scale-110 transition-transform duration-300"
                          style={{background:`${c.color}12`,border:`1.5px solid ${c.color}20`}}>
                          <Icon size={16} style={{color:c.color}} />
                        </div>
                        <div>
                          <p className="sans text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{c.label}</p>
                          <p className="sans text-sm font-bold text-slate-800 group-hover:text-violet-800 transition-colors">{c.value}</p>
                          <p className="sans text-xs text-slate-400">{c.sub}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </Reveal>

              {/* What happens next */}
              <Reveal delay={0.1}>
                <div className="p-7 rounded-2xl border border-black bg-white relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{background:"linear-gradient(90deg,#6d28d9,#c026d3)"}} />
                  <h3 className="serif text-lg font-bold text-slate-900 mb-5">What Happens Next?</h3>
                  <div className="space-y-4">
                    {[
                      {step:"01", text:"We reply within 2 hours (business days)", color:"#6d28d9"},
                      {step:"02", text:"Book a free 30-min discovery call",        color:"#7c3aed"},
                      {step:"03", text:"Receive a detailed proposal within 48 hrs", color:"#9333ea"},
                      {step:"04", text:"Onboard & start building within 5 days",   color:"#a855f7"},
                    ].map(({step,text,color},i)=>(
                      <div key={i} className="flex items-start gap-3">
                        <span className="serif text-sm font-bold flex-shrink-0 w-7" style={{color}}>{step}</span>
                        <span className="sans text-sm text-slate-600 leading-snug">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Social proof */}
              <Reveal delay={0.15}>
                <div className="p-6 rounded-2xl relative overflow-hidden"
                  style={{background:"linear-gradient(135deg,#3b0764,#6d28d9)"}}>
                  <div className="absolute inset-0 opacity-[0.04]"
                    style={{backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)",backgroundSize:"20px 20px"}} />
                  <div className="relative z-10">
                    <div className="flex -space-x-3 mb-4">
                      {["SC","MW","PN","JL","AR"].map((a,i)=>(
                        <div key={i} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                          style={{background:`hsl(${270+i*12},60%,${36+i*6}%)`,zIndex:5-i}}>
                          {a}
                        </div>
                      ))}
                    </div>
                    <p className="sans text-white/90 text-sm leading-relaxed font-medium italic">
                      "Skavo replied in 90 minutes and had a proposal ready by next morning."
                    </p>
                    <p className="sans text-white/50 text-xs mt-2">— Marcus W., CEO at Pulse Health</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-7 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10 bg-violet-400" />
              <span className="sans text-violet-600 font-black uppercase tracking-[0.35em] text-[25px]">FAQ</span>
              <div className="h-px w-10 bg-violet-400" />
            </div>
            <h2 className="serif font-bold text-slate-900 tracking-tight"
              style={{fontSize:"clamp(2rem,4vw,3.2rem)"}}>
              Common Questions
            </h2>
          </Reveal>

          <div className="space-y-3">
            {FAQS.map((f,i)=>(
              <Reveal key={i} delay={i*.05}>
                <div className={`rounded-2xl border overflow-hidden transition-all ${openFaq===i?"border-violet-300 bg-white shadow-lg shadow-violet-100":"border-black bg-white hover:border-violet-200"}`}>
                  <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                    className="w-full flex items-center justify-between px-7 py-5 sm:py-6 text-left gap-6">
                    <span className="serif font-bold text-slate-900 text-base sm:text-lg">{f.q}</span>
                    <motion.span animate={{rotate:openFaq===i?45:0}} transition={{duration:.22}}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl transition-colors ${openFaq===i?"bg-fuchsia-500 text-white":"bg-violet-100 text-violet-800"}`}>
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq===i && (
                      <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
                        transition={{duration:.32,ease:[.22,1,.36,1]}} style={{overflow:"hidden"}}>
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

      {/* ── MAP ── */}
      <section className="py-8 bg-[#fdfdff]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="rounded-[2.5rem] overflow-hidden border border-black relative"
              style={{height:"320px",background:"linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div className="absolute inset-0 opacity-[0.04]"
                style={{backgroundImage:"radial-gradient(circle at 2px 2px,#6d28d9 1px,transparent 0)",backgroundSize:"28px 28px"}} />
              <div className="text-center relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{background:"linear-gradient(135deg,#ede9fe,#faf5ff)",border:"1.5px solid #c4b5fd"}}>
                  <MapPin size={26} className="text-violet-600" />
                </div>
                <p className="serif text-2xl font-bold text-violet-900 mb-2">Nagpur & Navi Mumbai</p>
                <p className="sans text-slate-500 text-sm mb-6">Maharashtra, India · Remote Worldwide</p>
                <div className="flex gap-4 justify-center">
                  {[
                    {emoji:"🏢",label:"Headquarters",sub:"Nagpur, MH"},
                    {emoji:"💻",label:"Dev Hub",sub:"Navi Mumbai, MH"}
                  ].map((o,i)=>(
                    <div key={i} className="px-5 py-3 rounded-2xl bg-white border border-violet-200 shadow-sm">
                      <p className="sans text-xs font-bold text-violet-800">{o.emoji} {o.label}</p>
                      <p className="sans text-xs text-slate-500">{o.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}