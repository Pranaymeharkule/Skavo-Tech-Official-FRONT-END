import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import { Mail, Phone, BookOpen, Calendar, Trash2, X } from "lucide-react";
import {
  Reveal, StatusBadge, Avatar, SearchBar,
  PageHeader, PillFilter, Table, Pagination,
  EmptyState, TableSkeleton, CardSkeleton, ConfirmDialog, Toast, InfoRow, MessageBox
} from "./adminUI";

const STATUS_OPTS = ["Pending","Contacted","Enrolled","Closed"];
const PER_PAGE    = 9;

/* ── Card (Grid view) ── */
function LeadCard({ lead, i, onUpdateStatus, onDelete }) {
  const FMT = d => new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
  return (
    <Reveal delay={i*.04}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-violet-200 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar name={lead.name}/>
            <div>
              <p className="font-bold text-gray-900 text-sm">{lead.name}</p>
              <StatusBadge status={lead.status||"Pending"}/>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5 flex-1 text-[11px]">
          <div className="flex items-center gap-2 text-gray-500"><Mail size={11} className="text-violet-400 flex-shrink-0"/><span className="truncate">{lead.email}</span></div>
          <div className="flex items-center gap-2 text-gray-500"><Phone size={11} className="text-violet-400 flex-shrink-0"/><span>{lead.phone||"No phone"}</span></div>
          <div className="flex items-center gap-2 text-gray-500"><BookOpen size={11} className="text-violet-400 flex-shrink-0"/><span className="truncate font-medium text-gray-700">{lead.course}</span></div>
          <div className="flex items-center gap-2 text-gray-500"><Calendar size={11} className="text-violet-400 flex-shrink-0"/><span>{FMT(lead.createdAt)}</span></div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
          <select value={lead.status||"Pending"} onChange={e=>onUpdateStatus(lead._id,e.target.value)}
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg outline-none border cursor-pointer"
            style={{
              background:lead.status==="Enrolled"?"#f0fdf4":lead.status==="Contacted"?"#fffbeb":lead.status==="Closed"?"#f9fafb":"#fef2f2",
              color:lead.status==="Enrolled"?"#16a34a":lead.status==="Contacted"?"#d97706":lead.status==="Closed"?"#6b7280":"#dc2626",
              borderColor:"transparent",
            }}>
            {STATUS_OPTS.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={()=>onDelete(lead._id)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
            <Trash2 size={14}/>
          </button>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Main ── */
export default function AdminTrainingLeads() {
  const [leads,    setLeads]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("All");
  const [search,   setSearch]   = useState("");
  const [view,     setView]     = useState("grid");
  const [delId,    setDelId]    = useState(null);
  const [toast,    setToast]    = useState(null);
  const [page,     setPage]     = useState(1);

  const showToast = (msg,type="success")=>{ setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const fetchLeads = async () => {
    try {
      const r = await api.get("/training-enrollments");
      setLeads(r.data);
    } catch(e){ console.error(e); } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchLeads(); },[]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/training-enrollments/${id}`,{ status });
      fetchLeads(); showToast("Status updated");
    } catch { showToast("Failed to update","error"); }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/training-enrollments/${delId}`);
      fetchLeads(); setDelId(null); showToast("Lead deleted");
    } catch { showToast("Failed to delete","error"); }
  };

  const FMT = d => new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});

  const filtered = leads.filter(l=>{
    const mStatus = filter==="All" || l.status===filter || (!l.status&&filter==="Pending");
    const mSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
                    (l.course||"").toLowerCase().includes(search.toLowerCase()) ||
                    l.email.toLowerCase().includes(search.toLowerCase());
    return mStatus && mSearch;
  });

  const totalPages = Math.ceil(filtered.length/PER_PAGE);
  const pageSlice  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const KPI = [
    { label:"Total",     value:leads.length,                                    color:"#7c3aed" },
    { label:"Pending",   value:leads.filter(l=>!l.status||l.status==="Pending").length, color:"#dc2626" },
    { label:"Contacted", value:leads.filter(l=>l.status==="Contacted").length,  color:"#d97706" },
    { label:"Enrolled",  value:leads.filter(l=>l.status==="Enrolled").length,   color:"#16a34a" },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Training Leads" subtitle={`${leads.length} students interested in courses`}>
        <SearchBar placeholder="Search student, course…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}/>
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

      {/* Filters + View Toggle */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          {["All","Pending","Contacted","Enrolled","Closed"].map(f=>(
            <PillFilter key={f} label={f} active={filter===f} onClick={()=>{setFilter(f);setPage(1);}}/>
          ))}
        </div>
        <div className="flex gap-1.5 bg-gray-100 p-1 rounded-xl">
          {[["grid","Grid"],["table","Table"]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${view===v?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {!loading && view==="grid" && (
        <>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {pageSlice.map((lead,i)=><LeadCard key={lead._id} lead={lead} i={i} onUpdateStatus={handleUpdateStatus} onDelete={id=>setDelId(id)}/>)}
          </div>
          {filtered.length===0 && <EmptyState icon="🎓" title="No training leads found" desc="Try a different filter."/>}
          <Pagination page={page} totalPages={totalPages} total={filtered.length} perPage={PER_PAGE} onPrev={()=>setPage(p=>p-1)} onNext={()=>setPage(p=>p+1)}/>
        </>
      )}

      {/* Table */}
      {!loading && view==="table" && (
        <Reveal>
          <Table headers={["Student","Course","Contact","Status","Date","Action"]}>
            {pageSlice.map((lead,i)=>(
              <motion.tr key={lead._id} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*.03}}
                className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar name={lead.name} size="sm"/>
                    <p className="font-semibold text-gray-900 text-sm">{lead.name}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm font-semibold text-gray-700">{lead.course}</td>
                <td className="px-5 py-3.5">
                  <p className="text-xs text-gray-600">{lead.email}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{lead.phone||"N/A"}</p>
                </td>
                <td className="px-5 py-3.5">
                  <select value={lead.status||"Pending"} onChange={e=>handleUpdateStatus(lead._id,e.target.value)}
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg outline-none border cursor-pointer"
                    style={{background:lead.status==="Enrolled"?"#f0fdf4":lead.status==="Contacted"?"#fffbeb":"#fef2f2",color:lead.status==="Enrolled"?"#16a34a":lead.status==="Contacted"?"#d97706":"#dc2626",borderColor:"transparent"}}>
                    {STATUS_OPTS.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap">{FMT(lead.createdAt)}</td>
                <td className="px-5 py-3.5">
                  <button onClick={()=>setDelId(lead._id)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14}/></button>
                </td>
              </motion.tr>
            ))}
          </Table>
          {filtered.length===0 && <EmptyState icon="🎓" title="No leads found" desc="Adjust your search or filter."/>}
          <Pagination page={page} totalPages={totalPages} total={filtered.length} perPage={PER_PAGE} onPrev={()=>setPage(p=>p-1)} onNext={()=>setPage(p=>p+1)}/>
        </Reveal>
      )}

      {loading && (view==="grid" ? <CardSkeleton count={6}/> : <TableSkeleton rows={6}/>)}

      <AnimatePresence>
        {delId  && <ConfirmDialog message="Permanently delete this training lead?" onConfirm={confirmDelete} onCancel={()=>setDelId(null)}/>}
        {toast  && <Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      </AnimatePresence>
    </div>
  );
}