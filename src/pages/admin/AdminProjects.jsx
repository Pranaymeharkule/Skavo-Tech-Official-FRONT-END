import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Download, X, CheckCircle, AlertCircle, Clock, Users } from "lucide-react";
import {
  Reveal, StatusBadge, Avatar, ProgressBar, SearchBar,
  PageHeader, PrimaryBtn, GhostBtn, PillFilter, Pagination,
  EmptyState, ConfirmDialog, Toast
} from "./adminUI";

const MOCK_PROJECTS = [
  { id:1, name:"MBA SaaS Platform",   client:"MBA SaaS",     progress:87, team:6,  budgetTotal:85000,  budgetSpent:74000,  status:"on-track",  due:"2025-04-20", started:"2025-01-10", stack:["React","Node.js","PostgreSQL","AWS"],         pm:"Amara Diallo",      milestones:[{label:"Discovery",done:true},{label:"Backend API",done:true},{label:"Frontend",done:true},{label:"QA & Testing",done:false},{label:"Go Live",done:false}],         desc:"Full SaaS platform for MBA students — course management, assessments, analytics, and AI-assisted study tools." },
  { id:2, name:"CartPilot Rebuild",    client:"CartPilot",    progress:62, team:8,  budgetTotal:120000, budgetSpent:76000,  status:"on-track",  due:"2025-05-10", started:"2025-01-20", stack:["Next.js","TypeScript","Stripe","Redis"],        pm:"Tyler Brooks",      milestones:[{label:"Audit",done:true},{label:"Architecture",done:true},{label:"Core Engine",done:false},{label:"Performance",done:false},{label:"Launch",done:false}],          desc:"Complete rebuild of a $40M ARR e-commerce storefront. Target: sub-0.8s page loads on mobile." },
  { id:3, name:"FleetOps Tracker",     client:"FleetOps",     progress:95, team:5,  budgetTotal:33000,  budgetSpent:31000,  status:"finishing", due:"2025-03-25", started:"2024-12-01", stack:["React Native","GCP","WebSockets","Firebase"],   pm:"Ji-woo Park",       milestones:[{label:"Map Module",done:true},{label:"Driver App",done:true},{label:"Dashboard",done:true},{label:"Final QA",done:false}],                                           desc:"Real-time tracking for 12,000 delivery trucks across 6 countries. 99.97% uptime SLA." },
  { id:4, name:"Pulse Health AI",      client:"Pulse Health", progress:38, team:9,  budgetTotal:200000, budgetSpent:78000,  status:"delayed",   due:"2025-06-01", started:"2025-01-15", stack:["Python","TensorFlow","AWS SageMaker","FastAPI"], pm:"Fatima Al-Rashid",  milestones:[{label:"Data Pipeline",done:true},{label:"Model Training",done:false},{label:"Validation",done:false},{label:"Integration",done:false},{label:"Sign-off",done:false}], desc:"AI triage engine for clinical diagnosis — processing 50,000 patient records daily." },
  { id:5, name:"FinStack Dashboard",   client:"FinStack",     progress:100,team:4,  budgetTotal:47000,  budgetSpent:45000,  status:"complete",  due:"2025-03-01", started:"2024-11-15", stack:["Vue.js","FastAPI","PostgreSQL","Chart.js"],     pm:"Alex Turner",       milestones:[{label:"Design System",done:true},{label:"Data Integrations",done:true},{label:"Dashboard",done:true},{label:"Handover",done:true}],                                  desc:"Executive financial dashboard with real-time P&L, cash flow forecasting, and board reporting." },
];

const STATUS_COLOR = { "on-track":"#16a34a", finishing:"#7c3aed", delayed:"#dc2626", complete:"#059669" };
const STATUS_ICON  = { "on-track":<CheckCircle size={13} className="text-green-500"/>, finishing:<Clock size={13} className="text-violet-500"/>, delayed:<AlertCircle size={13} className="text-red-500"/>, complete:<CheckCircle size={13} className="text-emerald-600"/> };
const PER_PAGE     = 5;

/* ── Detail Drawer ── */
function ProjectDrawer({ project, onClose }) {
  const budgPct = Math.round((project.budgetSpent/project.budgetTotal)*100);
  const over    = budgPct > 90;
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={onClose}>
      <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{duration:.28,ease:[.22,1,.36,1]}}
        className="bg-white w-full max-w-md h-full overflow-y-auto border-l border-gray-100 shadow-2xl" onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{project.client}</p>
            <h3 className="font-bold text-gray-900 text-lg leading-tight" style={{fontFamily:"'Fraunces',serif"}}>{project.name}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors flex-shrink-0"><X size={14}/></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Status + PM */}
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={project.status}/>
            <span className="text-xs text-gray-400">PM: <strong className="text-gray-700">{project.pm}</strong></span>
            <span className="text-xs text-gray-400 flex items-center gap-1"><Users size={11}/>{project.team} engineers</span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">{project.desc}</p>

          {/* Progress */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Overall Progress</p>
              <span className="font-bold text-lg" style={{fontFamily:"'Fraunces',serif",color:STATUS_COLOR[project.status]}}>{project.progress}%</span>
            </div>
            <ProgressBar value={project.progress} color={STATUS_COLOR[project.status]??"#7c3aed"}/>
          </div>

          {/* Budget */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Budget Tracker</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Spent</span>
              <span className="font-bold text-gray-900 text-sm" style={{fontFamily:"'Fraunces',serif"}}>${(project.budgetSpent/1000).toFixed(0)}k of ${(project.budgetTotal/1000).toFixed(0)}k</span>
            </div>
            <ProgressBar value={budgPct} color={over?"#dc2626":"#16a34a"}/>
            <p className={`text-[10px] mt-2 font-bold ${over?"text-red-500":"text-green-600"}`}>
              {over?`⚠ ${budgPct}% of budget used`:`✓ ${100-budgPct}% remaining`}
            </p>
          </div>

          {/* Timeline grid */}
          <div className="grid grid-cols-2 gap-3">
            {[{l:"Started",v:project.started},{l:"Due",v:project.due},{l:"Team",v:`${project.team} engineers`},{l:"Client",v:project.client}].map(({l,v})=>(
              <div key={l} className="p-3 rounded-xl border border-gray-100 bg-white text-center">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{l}</p>
                <p className="text-sm font-bold text-gray-900">{v}</p>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Milestones</p>
            <div className="space-y-2">
              {project.milestones.map((m,i)=>(
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${m.done?"border-green-100 bg-green-50/50":"border-gray-100 bg-gray-50"}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${m.done?"bg-green-500":"border-2 border-gray-200"}`}>
                    {m.done && <CheckCircle size={12} className="text-white"/>}
                  </div>
                  <p className={`text-sm font-medium ${m.done?"text-green-700 line-through opacity-60":"text-gray-900"}`}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(t=>(
                <span key={t} className="text-[10px] font-bold text-violet-700 uppercase tracking-wider px-3 py-1.5 bg-violet-50 border border-violet-100 rounded-xl">{t}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-violet-800 transition-colors">Edit Project</button>
            <button className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">Add Update</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Project Row ── */
function ProjectRow({ project, i, onClick }) {
  const budgPct = Math.round((project.budgetSpent/project.budgetTotal)*100);
  return (
    <Reveal delay={i*.05}>
      <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-violet-200 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
        onClick={()=>onClick(project)}>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Name */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {STATUS_ICON[project.status]}
              <h3 className="font-bold text-gray-900 text-base group-hover:text-violet-800 transition-colors truncate" style={{fontFamily:"'Fraunces',serif"}}>{project.name}</h3>
              <StatusBadge status={project.status}/>
            </div>
            <p className="text-xs text-gray-400 mb-2">{project.client} · PM: {project.pm} · {project.team} engineers</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0,3).map(t=>(
                <span key={t} className="text-[10px] font-bold text-violet-700 uppercase tracking-wider px-2 py-1 bg-violet-50 border border-violet-100 rounded-lg">{t}</span>
              ))}
              {project.stack.length>3 && <span className="text-[10px] font-bold text-gray-400 px-2 py-1 bg-gray-50 border border-gray-100 rounded-lg">+{project.stack.length-3}</span>}
            </div>
          </div>

          {/* Progress */}
          <div className="lg:w-44 flex-shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Progress</p>
              <span className="text-xs font-bold text-gray-900">{project.progress}%</span>
            </div>
            <ProgressBar value={project.progress} color={STATUS_COLOR[project.status]??"#7c3aed"}/>
          </div>

          {/* Budget */}
          <div className="lg:w-36 flex-shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Budget</p>
              <span className={`text-[10px] font-bold ${budgPct>90?"text-red-500":"text-green-600"}`}>{budgPct}%</span>
            </div>
            <ProgressBar value={budgPct} color={budgPct>90?"#dc2626":"#16a34a"}/>
            <p className="text-[9px] text-gray-400 mt-1">${(project.budgetSpent/1000).toFixed(0)}k / ${(project.budgetTotal/1000).toFixed(0)}k</p>
          </div>

          {/* Due */}
          <div className="flex-shrink-0 text-right">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Due</p>
            <p className="text-sm font-bold text-gray-900">{project.due}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Main ── */
export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("all");
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState(null);
  const [page,     setPage]     = useState(1);

  useEffect(()=>{ setTimeout(()=>{ setProjects(MOCK_PROJECTS); setLoading(false); },500); },[]);

  const filtered = projects.filter(p=>{
    const mStatus = filter==="all"||p.status===filter;
    const mSearch = p.name.toLowerCase().includes(search.toLowerCase())||p.client.toLowerCase().includes(search.toLowerCase());
    return mStatus && mSearch;
  });

  const totalPages    = Math.ceil(filtered.length/PER_PAGE);
  const pageSlice     = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);
  const totalBudget   = projects.reduce((s,p)=>s+p.budgetTotal,0);
  const totalSpent    = projects.reduce((s,p)=>s+p.budgetSpent,0);

  const KPI = [
    { label:"On Track",  value:projects.filter(p=>p.status==="on-track").length,  color:"#16a34a" },
    { label:"Finishing", value:projects.filter(p=>p.status==="finishing").length,  color:"#7c3aed" },
    { label:"Delayed",   value:projects.filter(p=>p.status==="delayed").length,    color:"#dc2626" },
    { label:"Complete",  value:projects.filter(p=>p.status==="complete").length,   color:"#059669" },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Projects" subtitle={`${projects.filter(p=>p.status!=="complete").length} active · $${(totalBudget/1000).toFixed(0)}k total budget`}>
        <SearchBar placeholder="Search projects…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}/>
        <GhostBtn icon={Download} onClick={()=>{}}>Export</GhostBtn>
        <PrimaryBtn icon={Plus} onClick={()=>{}}>New Project</PrimaryBtn>
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

      {/* Budget bar */}
      {projects.length>0 && (
        <Reveal>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Budget Utilisation</p>
                <p className="font-bold text-gray-900 text-lg mt-0.5" style={{fontFamily:"'Fraunces',serif"}}>${(totalSpent/1000).toFixed(0)}k of ${(totalBudget/1000).toFixed(0)}k spent</p>
              </div>
              <span className="font-bold text-2xl text-violet-700" style={{fontFamily:"'Fraunces',serif"}}>{Math.round((totalSpent/totalBudget)*100)}%</span>
            </div>
            <ProgressBar value={Math.round((totalSpent/totalBudget)*100)} color="#7c3aed"/>
          </div>
        </Reveal>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[["all","All"],["on-track","On Track"],["finishing","Finishing"],["delayed","Delayed"],["complete","Complete"]].map(([v,l])=>(
          <PillFilter key={v} label={l} active={filter===v} onClick={()=>{setFilter(v);setPage(1);}}/>
        ))}
      </div>

      {/* Rows */}
      {loading ? (
        <div className="space-y-3">
          {Array(3).fill(0).map((_,i)=>(
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse h-24">
              <div className="flex gap-4"><div className="flex-1 space-y-2"><div className="h-4 bg-gray-100 rounded w-1/3"/><div className="h-3 bg-gray-100 rounded w-1/4"/></div><div className="w-32 h-8 bg-gray-100 rounded-xl"/></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {pageSlice.map((p,i)=><ProjectRow key={p.id} project={p} i={i} onClick={setSelected}/>)}
          </div>
          {filtered.length===0 && <EmptyState icon="🗂" title="No projects found" desc="Try a different filter or search."/>}
          <Pagination page={page} totalPages={totalPages} total={filtered.length} perPage={PER_PAGE} onPrev={()=>setPage(p=>p-1)} onNext={()=>setPage(p=>p+1)}/>
        </>
      )}

      {/* Drawer */}
      <AnimatePresence>
        {selected && <ProjectDrawer project={selected} onClose={()=>setSelected(null)}/>}
      </AnimatePresence>
    </div>
  );
}