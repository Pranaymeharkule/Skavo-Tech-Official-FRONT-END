import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import { Plus, Briefcase, Users, DollarSign, MapPin, Clock, Trash2, ToggleLeft, ToggleRight, X } from "lucide-react";
import {
  Reveal, StatusBadge, SearchBar, PageHeader, PrimaryBtn, PillFilter,
  Pagination, EmptyState, CardSkeleton, ConfirmDialog, Toast
} from "./adminUI";

const DEPTS = ["Engineering","Design","Infrastructure","AI","Sales","Delivery"];
const DEPT_STYLE = {
  Engineering:{"bg":"#eff6ff","text":"#2563eb"}, Design:{"bg":"#fdf4ff","text":"#a21caf"},
  Infrastructure:{"bg":"#f0fdf4","text":"#16a34a"}, AI:{"bg":"#f5f3ff","text":"#7c3aed"},
  Sales:{"bg":"#fff7ed","text":"#ea580c"}, Delivery:{"bg":"#ecfdf5","text":"#059669"},
};
const PER_PAGE = 9;

/* ── Post Job Modal ── */
function PostJobModal({ onClose, fetchJobs }) {
  const [form, setForm] = useState({title:"",dept:"Engineering",type:"Full-time",location:"Remote",salary:"",deadline:"",description:""});
  const [busy, setBusy] = useState(false);

  const handleSubmit = async () => {
    if (!form.title || !form.deadline) return alert("Title and deadline are required.");
    setBusy(true);
    try { await api.post("/jobs",form); fetchJobs(); onClose(); }
    catch { alert("Failed to post job"); } finally { setBusy(false); }
  };

  const inp = "w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-50 outline-none transition-all";

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{opacity:0,scale:.96,y:12}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96}}
        transition={{duration:.22}} onClick={e=>e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-y-auto max-h-[90vh]">

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h3 className="font-bold text-gray-900 text-base" style={{fontFamily:"'Fraunces',serif"}}>Post New Vacancy</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"><X size={14}/></button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Job Title *</label>
            <input type="text" placeholder="Senior Backend Engineer" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className={inp}/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Department</label>
              <select value={form.dept} onChange={e=>setForm({...form,dept:e.target.value})} className={inp}>
                {DEPTS.map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Type</label>
              <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className={inp}>
                {["Full-time","Part-time","Contract","Internship"].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Location</label>
              <select value={form.location} onChange={e=>setForm({...form,location:e.target.value})} className={inp}>
                {["Remote","Hybrid","On-site","Nagpur","Navi Mumbai"].map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Salary Range</label>
              <input type="text" placeholder="e.g. ₹8L–₹14L" value={form.salary} onChange={e=>setForm({...form,salary:e.target.value})} className={inp}/>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Application Deadline *</label>
            <input type="date" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})} className={inp}/>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Job Description</label>
            <textarea rows={4} placeholder="Describe the role, responsibilities, and requirements…" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className={`${inp} resize-none`}/>
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={busy} className="flex-1 py-2.5 rounded-xl bg-violet-700 text-white text-sm font-semibold hover:bg-violet-800 transition-colors disabled:opacity-50">
            {busy?"Posting…":"Post Vacancy"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Vacancy Card ── */
function VacancyCard({ vac, i, onToggle, onDelete }) {
  const ds   = DEPT_STYLE[vac.dept] ?? {bg:"#f8fafc",text:"#64748b"};
  const days = Math.ceil((new Date(vac.deadline)-new Date())/864e5);
  const FMT  = d => new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short"});
  return (
    <Reveal delay={i*.04}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-violet-200 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:ds.bg}}>
            <Briefcase size={18} style={{color:ds.text}} strokeWidth={1.8}/>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={vac.status}/>
            <button onClick={()=>onToggle(vac._id,vac.status)} title={vac.status==="active"?"Pause":"Activate"}
              className="text-gray-400 hover:text-violet-600 transition-colors">
              {vac.status==="active" ? <ToggleRight size={20} className="text-violet-500"/> : <ToggleLeft size={20}/>}
            </button>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 text-base mb-2 leading-tight line-clamp-2">{vac.title}</h3>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[10px] font-bold px-2 py-1 rounded-lg" style={{background:ds.bg,color:ds.text}}>{vac.dept}</span>
          <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-gray-100 text-gray-600">{vac.type}</span>
        </div>

        {vac.description && (
          <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">{vac.description}</p>
        )}

        <div className="space-y-1.5 text-[11px] text-gray-500 mb-4">
          <div className="flex items-center gap-2"><MapPin size={11} className="text-gray-400 flex-shrink-0"/>{vac.location}</div>
          <div className="flex items-center gap-2"><Users size={11} className="text-gray-400 flex-shrink-0"/>{vac.applicants||0} applicants</div>
          {vac.salary && <div className="flex items-center gap-2"><DollarSign size={11} className="text-gray-400 flex-shrink-0"/>{vac.salary}</div>}
          <div className="flex items-center gap-2">
            <Clock size={11} className="text-gray-400 flex-shrink-0"/>
            <span className={days<0?"text-red-500 font-semibold":days<7?"text-amber-600 font-semibold":""}>
              {days>0?`${days}d left`:"Expired"} · Closes {FMT(vac.deadline)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-[10px] text-gray-400">Posted {FMT(vac.createdAt)}</span>
          <button onClick={()=>onDelete(vac._id)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={14}/></button>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Main ── */
export default function AdminVacancies() {
  const [vacs,      setVacs]      = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState("all");
  const [search,    setSearch]    = useState("");
  const [showModal, setShowModal] = useState(false);
  const [delId,     setDelId]     = useState(null);
  const [toast,     setToast]     = useState(null);
  const [page,      setPage]      = useState(1);

  const showToast = (msg,type="success")=>{ setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const fetchJobs = async () => {
    try { const r = await api.get("/jobs"); setVacs(r.data); }
    catch(e){ console.error(e); } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchJobs(); },[]);

  const toggleStatus = async (id, cur) => {
    try {
      const ns = cur==="active"?"paused":"active";
      await api.put(`/jobs/${id}`,{status:ns}); fetchJobs(); showToast(`Job ${ns==="active"?"activated":"paused"}`);
    } catch { showToast("Failed to update","error"); }
  };

  const confirmDelete = async () => {
    try { await api.delete(`/jobs/${delId}`); fetchJobs(); setDelId(null); showToast("Vacancy deleted"); }
    catch { showToast("Failed to delete","error"); }
  };

  const filtered = vacs.filter(v=>{
    const mStatus = filter==="all"||v.status===filter;
    const mSearch = v.title.toLowerCase().includes(search.toLowerCase())||v.dept.toLowerCase().includes(search.toLowerCase());
    return mStatus && mSearch;
  });

  const totalPages = Math.ceil(filtered.length/PER_PAGE);
  const pageSlice  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const KPI = [
    { label:"Active",     value:vacs.filter(v=>v.status==="active").length,   color:"#16a34a" },
    { label:"Paused",     value:vacs.filter(v=>v.status==="paused").length,   color:"#d97706" },
    { label:"Closed",     value:vacs.filter(v=>v.status==="closed").length,   color:"#6b7280" },
    { label:"Applicants", value:vacs.reduce((s,v)=>s+(v.applicants||0),0),   color:"#7c3aed" },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Vacancies" subtitle={`${vacs.filter(v=>v.status==="active").length} active positions open`}>
        <SearchBar placeholder="Search title, department…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}/>
        <PrimaryBtn icon={Plus} onClick={()=>setShowModal(true)}>Post Job</PrimaryBtn>
      </PageHeader>

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {KPI.map((s,i)=>(
          <Reveal key={i} delay={i*.05}>
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center hover:border-violet-200 transition-all">
              <p className="font-bold text-2xl" style={{fontFamily:"'Fraunces',serif",color:s.color}}>{s.value}</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {[["all","All Jobs"],["active","Active"],["paused","Paused"],["closed","Closed"]].map(([v,l])=>(
          <PillFilter key={v} label={l} active={filter===v} onClick={()=>{setFilter(v);setPage(1);}}/>
        ))}
      </div>

      {/* Cards */}
      {loading ? <CardSkeleton count={6}/> : (
        <>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {pageSlice.map((vac,i)=><VacancyCard key={vac._id} vac={vac} i={i} onToggle={toggleStatus} onDelete={id=>setDelId(id)}/>)}
          </div>
          {filtered.length===0 && <EmptyState icon="💼" title="No vacancies found" desc="Post a new role or change the filter."/>}
          <Pagination page={page} totalPages={totalPages} total={filtered.length} perPage={PER_PAGE} onPrev={()=>setPage(p=>p-1)} onNext={()=>setPage(p=>p+1)}/>
        </>
      )}

      <AnimatePresence>
        {showModal && <PostJobModal onClose={()=>setShowModal(false)} fetchJobs={fetchJobs}/>}
        {delId     && <ConfirmDialog message="Permanently delete this job posting?" onConfirm={confirmDelete} onCancel={()=>setDelId(null)}/>}
        {toast     && <Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      </AnimatePresence>
    </div>
  );
}