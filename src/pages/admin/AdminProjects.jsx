import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Download, X, Users, DollarSign,
  Calendar, Tag, BarChart3, Clock,
  TrendingUp, AlertCircle, CheckCircle, Layers
} from "lucide-react";
import {
  Reveal, StatusBadge, Avatar, ProgressBar, SearchBar,
  PageHeader, PrimaryBtn, GhostBtn, PillFilter, RowActions, StatCard
} from "./adminUI";

/* ── Mock / API placeholder ── */
const MOCK_PROJECTS = [
  {
    id: 1, name: "MBA SaaS Platform",   client: "MBA SaaS",    progress: 87, team: 6,  budgetTotal: 85000,  budgetSpent: 74000,
    status: "on-track", due: "2025-04-20", started: "2025-01-10",
    stack: ["React","Node.js","PostgreSQL","AWS"],
    pm: "Amara Diallo",
    milestones: [
      { label: "Discovery & Wireframes", done: true  },
      { label: "Backend API",            done: true  },
      { label: "Frontend Build",         done: true  },
      { label: "QA & Testing",           done: false },
      { label: "Go Live",                done: false },
    ],
    desc: "Full SaaS platform for MBA students — course management, assessments, analytics, and AI-assisted study tools.",
  },
  {
    id: 2, name: "CartPilot Rebuild",    client: "CartPilot",   progress: 62, team: 8,  budgetTotal: 120000, budgetSpent: 76000,
    status: "on-track", due: "2025-05-10", started: "2025-01-20",
    stack: ["Next.js","TypeScript","Stripe","Redis"],
    pm: "Tyler Brooks",
    milestones: [
      { label: "Audit & Discovery",      done: true  },
      { label: "New Architecture",       done: true  },
      { label: "Core Commerce Engine",   done: false },
      { label: "Performance Optimise",   done: false },
      { label: "Launch & Handover",      done: false },
    ],
    desc: "Complete rebuild of a $40M ARR e-commerce storefront. Target: sub-0.8s page loads on mobile.",
  },
  {
    id: 3, name: "FleetOps Tracker",     client: "FleetOps",    progress: 95, team: 5,  budgetTotal: 33000,  budgetSpent: 31000,
    status: "finishing", due: "2025-03-25", started: "2024-12-01",
    stack: ["React Native","GCP","WebSockets","Firebase"],
    pm: "Ji-woo Park",
    milestones: [
      { label: "Real-time Map Module",   done: true  },
      { label: "Driver App (iOS/Android)",done: true },
      { label: "Dispatch Dashboard",     done: true  },
      { label: "Final QA",               done: false },
    ],
    desc: "Real-time tracking platform for 12,000 delivery trucks across 6 countries. 99.97% uptime SLA.",
  },
  {
    id: 4, name: "Pulse Health AI",      client: "Pulse Health", progress: 38, team: 9, budgetTotal: 200000, budgetSpent: 78000,
    status: "delayed", due: "2025-06-01", started: "2025-01-15",
    stack: ["Python","TensorFlow","AWS SageMaker","FastAPI","React"],
    pm: "Fatima Al-Rashid",
    milestones: [
      { label: "Data Pipeline Setup",    done: true  },
      { label: "Model Training v1",      done: false },
      { label: "Clinical Validation",    done: false },
      { label: "Integration Tests",      done: false },
      { label: "Regulatory Sign-off",    done: false },
    ],
    desc: "AI triage engine for clinical diagnosis support — processing 50,000 patient records daily.",
  },
  {
    id: 5, name: "FinStack Dashboard",   client: "FinStack",    progress: 100, team: 4, budgetTotal: 47000,  budgetSpent: 45000,
    status: "complete", due: "2025-03-01", started: "2024-11-15",
    stack: ["Vue.js","FastAPI","PostgreSQL","Chart.js"],
    pm: "Alex Turner",
    milestones: [
      { label: "Design System",          done: true  },
      { label: "Data Integrations",      done: true  },
      { label: "Dashboard Build",        done: true  },
      { label: "Client Handover",        done: true  },
    ],
    desc: "Executive financial dashboard with real-time P&L, cash flow forecasting, and board reporting tools.",
  },
];

const STATUS_ICON = {
  "on-track": <CheckCircle size={14} className="text-green-500" />,
  "finishing": <Clock size={14} className="text-violet-500" />,
  "delayed":   <AlertCircle size={14} className="text-red-500" />,
  "complete":  <CheckCircle size={14} className="text-green-600" />,
};

/* ── Project Detail Drawer ── */
function ProjectDrawer({ project, onClose }) {
  const budgetPct = Math.round((project.budgetSpent / project.budgetTotal) * 100);
  const over = budgetPct > 90;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white w-full max-w-md h-full overflow-y-auto border-l-2 border-black"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-black px-6 py-4 flex items-center justify-between z-10">
          <h3 className="font-bold text-slate-900 text-lg" style={{ fontFamily: "'Fraunces',serif" }}>
            {project.name}
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl border border-black flex items-center justify-center text-gray-400 hover:bg-gray-50">
            <X size={14} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status + PM */}
          <div className="flex items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="text-xs text-gray-400">PM: <strong className="text-slate-700">{project.pm}</strong></span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">{project.desc}</p>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Overall Progress</p>
              <span className="font-bold text-lg" style={{ fontFamily: "'Fraunces',serif", color: "#7c3aed" }}>
                {project.progress}%
              </span>
            </div>
            <ProgressBar value={project.progress}
              color={project.status === "delayed" ? "#dc2626" : project.status === "complete" ? "#16a34a" : "#7c3aed"} />
          </div>

          {/* Budget */}
          <div className="p-4 rounded-2xl border-2 border-black bg-[#fdfdff]">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Budget Tracker</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Spent</span>
              <span className="font-bold text-slate-900" style={{ fontFamily: "'Fraunces',serif" }}>
                ${(project.budgetSpent / 1000).toFixed(0)}k of ${(project.budgetTotal / 1000).toFixed(0)}k
              </span>
            </div>
            <ProgressBar value={budgetPct} color={over ? "#dc2626" : "#16a34a"} />
            <p className={`text-[10px] mt-2 font-bold ${over ? "text-red-500" : "text-green-600"}`}>
              {over ? `⚠ ${budgetPct}% of budget used` : `✓ ${100 - budgetPct}% budget remaining`}
            </p>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Started",  val: project.started },
              { label: "Due",      val: project.due     },
              { label: "Team",     val: `${project.team} engineers` },
              { label: "Client",   val: project.client  },
            ].map(({ label, val }) => (
              <div key={label} className="p-3 rounded-xl border-2 border-black text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-sm font-bold text-slate-900">{val}</p>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Milestones</p>
            <div className="space-y-2">
              {project.milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    m.done ? "bg-green-500" : "border-2 border-gray-300"
                  }`}>
                    {m.done && <CheckCircle size={12} className="text-white" />}
                  </div>
                  <p className={`text-sm font-medium ${m.done ? "text-slate-700 line-through opacity-60" : "text-slate-900"}`}>
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(t => (
                <span key={t} className="text-[10px] font-black text-violet-700 uppercase tracking-wider px-3 py-1.5 bg-violet-50 border border-violet-200 rounded-xl">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-violet-800 transition-colors">
              Edit Project
            </button>
            <button className="flex-1 py-3 rounded-xl border-2 border-black text-sm font-bold text-slate-700 hover:bg-gray-50 transition-colors">
              Add Update
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Project Row ── */
function ProjectRow({ project, i, onClick }) {
  const budgetPct = Math.round((project.budgetSpent / project.budgetTotal) * 100);

  return (
    <Reveal delay={i * 0.06}>
      <div
        className="group bg-white rounded-2xl border-2 border-black p-6 hover:shadow-[0_16px_40px_rgba(109,40,217,0.1)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        onClick={() => onClick(project)}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-5">

          {/* Name + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1.5">
              {STATUS_ICON[project.status]}
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-violet-800 transition-colors" style={{ fontFamily: "'Fraunces',serif" }}>
                {project.name}
              </h3>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-xs text-gray-400 mb-3">{project.client} · PM: {project.pm} · Team of {project.team}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map(t => (
                <span key={t} className="text-[10px] font-black text-violet-700 uppercase tracking-wider px-2.5 py-1 bg-violet-50 border border-violet-100 rounded-lg">
                  {t}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg">
                  +{project.stack.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="lg:w-48 flex-shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Progress</p>
              <span className="font-bold text-sm text-slate-900">{project.progress}%</span>
            </div>
            <ProgressBar value={project.progress}
              color={project.status === "delayed" ? "#dc2626" : project.status === "complete" ? "#16a34a" : "#7c3aed"} />
          </div>

          {/* Budget */}
          <div className="lg:w-40 flex-shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Budget</p>
              <span className={`text-[10px] font-bold ${budgetPct > 90 ? "text-red-500" : "text-green-600"}`}>{budgetPct}%</span>
            </div>
            <ProgressBar value={budgetPct} color={budgetPct > 90 ? "#dc2626" : "#16a34a"} />
            <p className="text-[10px] text-gray-400 mt-1">
              ${(project.budgetSpent/1000).toFixed(0)}k / ${(project.budgetTotal/1000).toFixed(0)}k
            </p>
          </div>

          {/* Due */}
          <div className="flex-shrink-0 text-right min-w-[80px]">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Due</p>
            <p className="text-sm font-bold text-slate-900">{project.due}</p>
          </div>

          {/* Actions */}
          <div className="flex-shrink-0" onClick={e => e.stopPropagation()}>
            <RowActions />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Main Page ── */
export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => { setProjects(MOCK_PROJECTS); setLoading(false); }, 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = projects.filter(p => {
    const matchStatus = filter === "all" || p.status === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.client.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalBudget = projects.reduce((s, p) => s + p.budgetTotal, 0);
  const totalSpent  = projects.reduce((s, p) => s + p.budgetSpent, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        subtitle={`${projects.filter(p => p.status !== "complete").length} active · $${(totalBudget/1000).toFixed(0)}k total budget`}
      >
        <SearchBar placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} />
        <GhostBtn icon={Download}>Export</GhostBtn>
        <PrimaryBtn icon={Plus}>New Project</PrimaryBtn>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "On Track",  value: projects.filter(p => p.status === "on-track").length,  color: "#16a34a", bg: "#f0fdf4" },
          { label: "Finishing", value: projects.filter(p => p.status === "finishing").length,  color: "#7c3aed", bg: "#f5f3ff" },
          { label: "Delayed",   value: projects.filter(p => p.status === "delayed").length,    color: "#dc2626", bg: "#fef2f2" },
          { label: "Complete",  value: projects.filter(p => p.status === "complete").length,   color: "#059669", bg: "#ecfdf5" },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="rounded-2xl border-2 border-black p-4 text-center" style={{ background: s.bg }}>
              <p className="font-bold text-2xl" style={{ fontFamily: "'Fraunces',serif", color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Budget bar */}
      <Reveal>
        <div className="bg-white rounded-2xl border-2 border-black p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Budget Utilisation</p>
              <p className="font-bold text-slate-900 text-lg mt-0.5" style={{ fontFamily: "'Fraunces',serif" }}>
                ${(totalSpent/1000).toFixed(0)}k spent of ${(totalBudget/1000).toFixed(0)}k
              </p>
            </div>
            <span className="font-bold text-2xl text-violet-700" style={{ fontFamily: "'Fraunces',serif" }}>
              {Math.round((totalSpent/totalBudget)*100)}%
            </span>
          </div>
          <ProgressBar value={Math.round((totalSpent/totalBudget)*100)} color="#7c3aed" />
        </div>
      </Reveal>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all","on-track","finishing","delayed","complete"].map(f => (
          <PillFilter key={f} label={f === "all" ? "All" : f} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>

      {/* Rows */}
      {loading ? (
        <div className="space-y-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-black p-6 animate-pulse h-28">
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded-full w-1/3" />
                  <div className="h-3 bg-gray-100 rounded-full w-1/4" />
                  <div className="h-2 bg-gray-100 rounded-full w-1/2 mt-3" />
                </div>
                <div className="w-40 space-y-2">
                  <div className="h-2 bg-gray-100 rounded-full" />
                  <div className="h-3 bg-gray-100 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((proj, i) => (
            <ProjectRow key={proj.id} project={proj} i={i} onClick={setSelected} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">🗂</p>
              <p className="font-bold text-slate-700 text-lg">No projects found</p>
            </div>
          )}
        </div>
      )}

      {/* Detail Drawer */}
      <AnimatePresence>
        {selected && <ProjectDrawer project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}