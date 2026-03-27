import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import { Plus, X, Mail, Phone, Clock, MessageSquare, Briefcase, Trash2 } from "lucide-react";
import {
  Reveal, StatusBadge, Avatar, ProgressBar, SearchBar,
  PageHeader, PrimaryBtn, PillFilter, Table, Pagination,
  EmptyState, TableSkeleton, ConfirmDialog, Toast, InfoRow, MessageBox
} from "./adminUI";

const TYPES = [
  { id:"project",  label:"Start a Project",    color:"#7c3aed" },
  { id:"training", label:"Corporate Training",  color:"#2563eb" },
  { id:"careers",  label:"Careers",             color:"#c026d3" },
  { id:"general",  label:"General Inquiry",     color:"#059669" },
];
const STATUS_OPTS = ["New","In Progress","Closed"];
const PER_PAGE    = 10;

function typeColor(t) {
  return TYPES.find(x=>x.id.toLowerCase()===(t||"general").toLowerCase())?.color ?? "#6b7280";
}

/* ── Lead Modal ── */
function LeadModal({ lead, onClose, onUpdateStatus }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{opacity:0,scale:.96,y:12}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96}}
        transition={{duration:.22}} onClick={e=>e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <Avatar name={lead.name} size="lg"/>
            <div>
              <p className="font-bold text-gray-900 text-base">{lead.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{background:typeColor(lead.inquiryType)}}/>
                <p className="text-xs text-gray-500 capitalize">{lead.inquiryType||"General"} inquiry</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors flex-shrink-0">
            <X size={14}/>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Status + date */}
          <div className="flex items-center justify-between">
            <StatusBadge status={lead.status||"New"}/>
            <span className="text-xs text-gray-400">{lead.date}</span>
          </div>

          {/* Contact info */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2.5">
            <InfoRow icon={Mail}      label="Email"   value={lead.email}/>
            <InfoRow icon={Phone}     label="Phone"   value={lead.phone||"Not provided"}/>
            <InfoRow icon={Briefcase} label="Budget"  value={lead.budget||"Not stated"}/>
          </div>

          {/* Full message */}
          <MessageBox text={lead.message} label="Their Message"/>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pipeline Progress</p>
              <span className="text-xs font-bold" style={{color:typeColor(lead.inquiryType)}}>{lead.progress}%</span>
            </div>
            <ProgressBar value={lead.progress} color={typeColor(lead.inquiryType)}/>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-1">
            <select value={lead.status||"New"} onChange={e=>onUpdateStatus(lead.id,e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 outline-none hover:border-violet-300 focus:border-violet-500 cursor-pointer transition-colors">
              {STATUS_OPTS.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <a href={`mailto:${lead.email}`}
              className="w-full flex justify-center gap-2 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-violet-800 transition-colors">
              <Mail size={14}/> Reply via Email
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main ── */
export default function AdminLeads() {
  const [leads,      setLeads]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [filter,     setFilter]     = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search,     setSearch]     = useState("");
  const [selected,   setSelected]   = useState(null);
  const [delId,      setDelId]      = useState(null);
  const [toast,      setToast]      = useState(null);
  const [page,       setPage]       = useState(1);

  const showToast = (msg,type="success")=>{ setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const fetchLeads = async () => {
    try {
      const r = await api.get("/contacts");
      setLeads(r.data.map(l=>({
        id:l._id, name:l.name, email:l.email, phone:l.phone,
        inquiryType:l.inquiryType||"General", message:l.message,
        budget:l.budget||"N/A",
        date:new Date(l.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}),
        status:l.status||"New",
        progress:l.status==="Closed"?100:l.status==="In Progress"?50:25,
      })));
    } catch(e){ console.error(e); } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchLeads(); },[]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/contacts/${id}`,{ status });
      fetchLeads();
      if (selected?.id===id) setSelected(s=>({...s,status,progress:status==="Closed"?100:status==="In Progress"?50:25}));
      showToast("Status updated");
    } catch { showToast("Failed to update","error"); }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/contacts/${delId}`);
      setLeads(p=>p.filter(l=>l.id!==delId));
      if (selected?.id===delId) setSelected(null);
      setDelId(null); showToast("Lead deleted");
    } catch { showToast("Failed to delete","error"); }
  };

  const filtered = leads.filter(l => {
    const mStatus = filter==="all" || l.status.toLowerCase()===filter.toLowerCase();
    const mType   = typeFilter==="all" || (l.inquiryType||"general").toLowerCase()===typeFilter.toLowerCase();
    const mSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
    return mStatus && mType && mSearch;
  });

  const totalPages = Math.ceil(filtered.length/PER_PAGE);
  const pageSlice  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const KPI = [
    { label:"Total Leads",  value:leads.length,                                      color:"#7c3aed" },
    { label:"New",          value:leads.filter(l=>l.status==="New").length,           color:"#dc2626" },
    { label:"In Progress",  value:leads.filter(l=>l.status==="In Progress").length,   color:"#d97706" },
    { label:"Closed",       value:leads.filter(l=>l.status==="Closed").length,        color:"#16a34a" },
  ];

  // Breakdown
  const breakdown = TYPES.map(t=>({
    ...t, count:leads.filter(l=>(l.inquiryType||"general").toLowerCase()===t.id.toLowerCase()).length
  })).filter(t=>t.count>0);

  return (
    <div className="space-y-5">
      <PageHeader title="Project Leads" subtitle={`${leads.length} total inquiries from the website`}>
        <SearchBar placeholder="Search name or email…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}/>
        <PrimaryBtn icon={Plus} onClick={()=>{}}>Add Lead</PrimaryBtn>
      </PageHeader>

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {KPI.map((s,i)=>(
          <Reveal key={i} delay={i*.05}>
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center hover:border-violet-200 transition-all">
              <p className="font-bold text-2xl" style={{fontFamily:"'Fraunces',serif",color:s.color}}>{s.value}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Inquiry Breakdown */}
      {breakdown.length>0 && (
        <Reveal>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Inquiry Type Breakdown</p>
            <div className="space-y-3">
              {breakdown.map(t=>(
                <div key={t.id} className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:t.color}}/>
                  <p className="text-sm font-medium text-gray-700 w-32 flex-shrink-0 capitalize">{t.label}</p>
                  <div className="flex-1"><ProgressBar value={(t.count/leads.length)*100} color={t.color}/></div>
                  <span className="text-xs font-bold text-gray-600 w-12 text-right">{t.count}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          {["all","New","In Progress","Closed"].map(f=>(
            <PillFilter key={f} label={f==="all"?"All Leads":f} active={filter.toLowerCase()===f.toLowerCase()} onClick={()=>{setFilter(f);setPage(1);}}/>
          ))}
        </div>
        <select value={typeFilter} onChange={e=>{setTypeFilter(e.target.value);setPage(1);}}
          className="text-xs font-semibold px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 outline-none focus:border-violet-400 cursor-pointer">
          <option value="all">All Types</option>
          {TYPES.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading ? <TableSkeleton rows={6}/> : (
        <Reveal>
          <Table headers={["Client","Type","Budget","Snippet","Status","Date","Actions"]}>
            {pageSlice.map((lead,i)=>(
              <motion.tr key={lead.id} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*.03}}
                className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={()=>setSelected(lead)}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar name={lead.name} size="sm"/>
                    <div><p className="font-semibold text-gray-900 text-sm">{lead.name}</p><p className="text-[10px] text-gray-400">{lead.email}</p></div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:typeColor(lead.inquiryType)}}/>
                    <span className="text-sm text-gray-600 font-medium capitalize">{lead.inquiryType}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg">{lead.budget}</span>
                </td>
                <td className="px-5 py-3.5 max-w-[200px]">
                  <p className="text-xs text-gray-500 truncate" title={lead.message}>{lead.message}</p>
                </td>
                <td className="px-5 py-3.5" onClick={e=>e.stopPropagation()}>
                  <select value={lead.status||"New"} onChange={e=>handleUpdateStatus(lead.id,e.target.value)}
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg outline-none cursor-pointer border"
                    style={{
                      background:lead.status==="Closed"?"#f0fdf4":lead.status==="In Progress"?"#fffbeb":"#fef2f2",
                      color:lead.status==="Closed"?"#16a34a":lead.status==="In Progress"?"#d97706":"#dc2626",
                      borderColor:lead.status==="Closed"?"#bbf7d0":lead.status==="In Progress"?"#fde68a":"#fecaca",
                    }}>
                    {STATUS_OPTS.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap">{lead.date}</td>
                <td className="px-5 py-3.5" onClick={e=>e.stopPropagation()}>
                  <button onClick={()=>setDelId(lead.id)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={14}/>
                  </button>
                </td>
              </motion.tr>
            ))}
          </Table>

          {filtered.length===0 && <EmptyState icon="✉️" title="No leads found" desc="Try adjusting your filters or search."/>}

          <Pagination page={page} totalPages={totalPages} total={filtered.length} perPage={PER_PAGE}
            onPrev={()=>setPage(p=>p-1)} onNext={()=>setPage(p=>p+1)}/>
        </Reveal>
      )}

      {/* Modals */}
      <AnimatePresence>
        {selected && <LeadModal lead={selected} onClose={()=>setSelected(null)} onUpdateStatus={handleUpdateStatus}/>}
        {delId    && <ConfirmDialog message="Permanently delete this inquiry?" onConfirm={confirmDelete} onCancel={()=>setDelId(null)}/>}
        {toast    && <Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      </AnimatePresence>
    </div>
  );
}