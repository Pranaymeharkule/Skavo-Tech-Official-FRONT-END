import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import { X, Mail, Briefcase, Star, Trash2, ExternalLink, Clock } from "lucide-react";
import {
  Reveal, StatusBadge, Avatar, ProgressBar, SearchBar,
  PageHeader, PrimaryBtn, PillFilter, Table, Pagination,
  EmptyState, TableSkeleton, ConfirmDialog, Toast, InfoRow, MessageBox
} from "./adminUI";

const STAGES = ["Applied","Reviewing","Interviewing","Hired","Rejected"];
const PER_PAGE = 8;

/* ── Candidate Modal ── */
function CandidateModal({ candidate, onClose, onUpdateStatus, onDelete }) {
  const fmt = d => new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{opacity:0,scale:.96,y:12}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96,y:12}}
        transition={{duration:.22}} onClick={e=>e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 overflow-y-auto max-h-[90vh]">

        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <Avatar name={candidate.name} size="lg"/>
            <div>
              <p className="font-bold text-gray-900 text-base leading-tight">{candidate.name}</p>
              <p className="text-xs text-violet-600 font-semibold">{candidate.position}
                <span className="text-gray-400 font-normal ml-1">({candidate.type})</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors flex-shrink-0">
            <X size={14}/>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Status */}
          <div className="flex items-center gap-2">
            <StatusBadge status={candidate.status||"Applied"}/>
            <span className="text-xs text-gray-400">{fmt(candidate.createdAt)}</span>
          </div>

          {/* Info */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2.5">
            <InfoRow icon={Mail}      label="Email"   value={candidate.email}/>
            <InfoRow icon={Briefcase} label="College" value={candidate.college||"N/A"}/>
            <InfoRow icon={Star}      label="Course"  value={candidate.course||"N/A"}/>
            <InfoRow icon={Clock}     label="Applied" value={fmt(candidate.createdAt)}/>
          </div>

          {/* Resume */}
          {candidate.resume && (
            <a href={candidate.resume} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-violet-700 text-white text-sm font-bold rounded-xl hover:bg-violet-800 transition-colors">
              View Resume <ExternalLink size={14}/>
            </a>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <select value={candidate.status||"Applied"} onChange={e=>onUpdateStatus(candidate._id,e.target.value)}
              className="flex-1 p-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none hover:border-violet-300 focus:border-violet-500 cursor-pointer transition-colors">
              {STAGES.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={()=>onDelete(candidate._id)}
              className="px-4 flex items-center gap-2 text-red-500 rounded-xl border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors text-sm font-semibold">
              <Trash2 size={14}/> Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Kanban Card ── */
function KanbanCard({ c, onClick }) {
  const fmt = d => new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short"});
  return (
    <motion.div layout initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
      onClick={()=>onClick(c)}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:-translate-y-0.5 hover:shadow-md hover:border-violet-200 transition-all cursor-pointer">
      <div className="flex items-center gap-2.5 mb-3">
        <Avatar name={c.name} size="sm"/>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm truncate">{c.name}</p>
          <p className="text-[10px] text-violet-600 font-bold uppercase tracking-wider truncate">{c.type}</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 font-medium mb-3 truncate">{c.position}</p>
      <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-50 pt-2">
        <span className="truncate max-w-[120px]">{c.college||"No college"}</span>
        <span className="flex items-center gap-1 flex-shrink-0"><Clock size={9}/>{fmt(c.createdAt)}</span>
      </div>
    </motion.div>
  );
}

/* ── Kanban Column ── */
function KanbanCol({ stage, candidates, onClick }) {
  const LANE = {
    Applied:"bg-gray-50 border-gray-200", Reviewing:"bg-blue-50/50 border-blue-100",
    Interviewing:"bg-amber-50/50 border-amber-100", Hired:"bg-green-50/50 border-green-100",
    Rejected:"bg-red-50/50 border-red-100",
  };
  const COUNT_BG = {
    Applied:"bg-gray-200 text-gray-700", Reviewing:"bg-blue-200 text-blue-800",
    Interviewing:"bg-amber-200 text-amber-800", Hired:"bg-green-200 text-green-800",
    Rejected:"bg-red-200 text-red-800",
  };
  return (
    <div className={`flex-shrink-0 w-[272px] p-3 rounded-2xl border ${LANE[stage]}`}>
      <div className="flex items-center justify-between mb-3 px-1">
        <h4 className="font-bold text-sm text-gray-700">{stage}</h4>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${COUNT_BG[stage]}`}>{candidates.length}</span>
      </div>
      <div className="space-y-2.5">
        {candidates.map(c=><KanbanCard key={c._id} c={c} onClick={onClick}/>)}
        {candidates.length===0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white/60 p-5 text-center text-gray-400 text-xs font-medium">
            No candidates
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function AdminApplications() {
  const [apps,     setApps]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [view,     setView]     = useState("kanban");
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState(null);
  const [delId,    setDelId]    = useState(null);
  const [toast,    setToast]    = useState(null);
  const [page,     setPage]     = useState(1);

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const fetchApps = async () => {
    try {
      const r = await api.get("/careers");
      setApps(r.data.map(a=>({...a, status:a.status||"Applied"})));
    } catch(e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchApps(); },[]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/careers/${id}`, { status });
      setApps(p=>p.map(a=>a._id===id?{...a,status}:a));
      if (selected?._id===id) setSelected(s=>({...s,status}));
      showToast("Status updated");
    } catch { showToast("Failed to update","error"); }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/careers/${delId}`);
      setApps(p=>p.filter(a=>a._id!==delId));
      if (selected?._id===delId) setSelected(null);
      setDelId(null); showToast("Application deleted");
    } catch { showToast("Failed to delete","error"); }
  };

  const filtered = apps.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    (a.position||"").toLowerCase().includes(search.toLowerCase())
  );

  // Table pagination
  const totalPages = Math.ceil(filtered.length/PER_PAGE);
  const pageSlice  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const byStage = s => filtered.filter(a=>a.status===s);

  const FMT = d => new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});

  const SUMMARY = [
    { label:"Total",       value:apps.length,                                    color:"#7c3aed" },
    { label:"Applied",     value:apps.filter(a=>a.status==="Applied").length,    color:"#64748b" },
    { label:"Reviewing",   value:apps.filter(a=>a.status==="Reviewing").length,  color:"#2563eb" },
    { label:"Interviewing",value:apps.filter(a=>a.status==="Interviewing").length,color:"#d97706"},
    { label:"Hired",       value:apps.filter(a=>a.status==="Hired").length,      color:"#16a34a" },
    { label:"Rejected",    value:apps.filter(a=>a.status==="Rejected").length,   color:"#dc2626" },
  ];

  return (
    <div className="space-y-5">
      <style>{`.kanban-scroll::-webkit-scrollbar{height:6px}.kanban-scroll::-webkit-scrollbar-track{background:#f1f5f9;border-radius:8px}.kanban-scroll::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:8px}`}</style>

      <PageHeader title="Job Applications" subtitle={`${apps.length} candidates in the hiring pipeline`}>
        <SearchBar placeholder="Search candidates or roles…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}/>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {SUMMARY.map((s,i) => (
          <Reveal key={i} delay={i*.04}>
            <div className="bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm text-center">
              <p className="font-bold text-xl" style={{fontFamily:"'Fraunces',serif",color:s.color}}>{s.value}</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1.5 bg-gray-100 p-1 rounded-xl">
          {["kanban","table"].map(v => (
            <button key={v} onClick={()=>setView(v)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${view===v?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>
              {v==="kanban"?"🗂 Kanban":"📋 Table"}
            </button>
          ))}
        </div>
        {view==="table" && <p className="text-xs text-gray-400">{filtered.length} results</p>}
      </div>

      {loading && <TableSkeleton rows={5}/>}

      {/* Kanban */}
      {!loading && view==="kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-4 kanban-scroll items-start">
          {STAGES.map(s=><KanbanCol key={s} stage={s} candidates={byStage(s)} onClick={setSelected}/>)}
        </div>
      )}

      {/* Table */}
      {!loading && view==="table" && (
        <Reveal>
          <Table headers={["Candidate","Role","Type","Status","Applied","Resume"]}>
            {pageSlice.map((app,i) => (
              <motion.tr key={app._id} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*.03}}
                className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={()=>setSelected(app)}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar name={app.name} size="sm"/>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{app.name}</p>
                      <p className="text-[10px] text-gray-400">{app.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">{app.position}</td>
                <td className="px-5 py-3.5">
                  <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg uppercase tracking-wider">{app.type}</span>
                </td>
                <td className="px-5 py-3.5"><StatusBadge status={app.status}/></td>
                <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap">{FMT(app.createdAt)}</td>
                <td className="px-5 py-3.5" onClick={e=>e.stopPropagation()}>
                  {app.resume && (
                    <a href={app.resume} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:text-violet-800 bg-violet-50 px-3 py-1.5 rounded-lg border border-violet-100 transition-colors">
                      View <ExternalLink size={11}/>
                    </a>
                  )}
                </td>
              </motion.tr>
            ))}
          </Table>

          {filtered.length===0 && <EmptyState icon="📭" title="No applications found" desc="Try adjusting your search."/>}

          <Pagination page={page} totalPages={totalPages} total={filtered.length} perPage={PER_PAGE}
            onPrev={()=>setPage(p=>p-1)} onNext={()=>setPage(p=>p+1)}/>
        </Reveal>
      )}

      {/* Modals */}
      <AnimatePresence>
        {selected && <CandidateModal candidate={selected} onClose={()=>setSelected(null)} onUpdateStatus={handleUpdateStatus} onDelete={id=>{setDelId(id);setSelected(null);}}/>}
        {delId    && <ConfirmDialog message="This will permanently delete the application. This cannot be undone." onConfirm={confirmDelete} onCancel={()=>setDelId(null)}/>}
        {toast    && <Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      </AnimatePresence>
    </div>
  );
}