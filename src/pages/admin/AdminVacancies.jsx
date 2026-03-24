import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Download, Briefcase, Users, Calendar,
  MapPin, Clock, DollarSign, X, Tag,
  ToggleLeft, ToggleRight, ChevronDown
} from "lucide-react";
import {
  Reveal, StatusBadge, SearchBar, PageHeader,
  PrimaryBtn, GhostBtn, PillFilter, RowActions
} from "./adminUI";

/* ── Mock / API placeholder ── */
const MOCK_VACANCIES = [
  { id: 1, title: "Senior React Developer",         dept: "Engineering",    type: "Full-time", location: "Remote",    applicants: 34, deadline: "2025-04-01", status: "active",  salary: "$95k–$130k",  posted: "2025-03-01", description: "We need a seasoned React dev to lead our frontend guild. Must have 5+ years and strong TypeScript skills." },
  { id: 2, title: "UI/UX Designer",                  dept: "Design",         type: "Full-time", location: "Hybrid",    applicants: 21, deadline: "2025-04-10", status: "active",  salary: "$70k–$95k",   posted: "2025-03-05", description: "Looking for a product designer who can own entire design systems end-to-end. Figma expert required." },
  { id: 3, title: "DevOps Engineer",                 dept: "Infrastructure", type: "Full-time", location: "Remote",    applicants: 15, deadline: "2025-03-28", status: "paused",  salary: "$90k–$120k",  posted: "2025-02-28", description: "We're scaling our infrastructure rapidly. Kubernetes and Terraform experience essential." },
  { id: 4, title: "AI / ML Engineer",                dept: "AI",             type: "Full-time", location: "On-site",   applicants: 48, deadline: "2025-04-15", status: "active",  salary: "$110k–$155k", posted: "2025-03-08", description: "Help us embed AI into every product we build. LLM fine-tuning, RAG pipelines, Python mastery." },
  { id: 5, title: "Business Development Rep",        dept: "Sales",          type: "Full-time", location: "Remote",    applicants: 62, deadline: "2025-03-30", status: "closed",  salary: "$55k–$75k",   posted: "2025-02-15", description: "Drive outbound pipeline for our agency services. SaaS or agency background preferred." },
  { id: 6, title: "Technical Project Manager",       dept: "Delivery",       type: "Full-time", location: "Hybrid",    applicants: 18, deadline: "2025-04-20", status: "active",  salary: "$80k–$110k",  posted: "2025-03-10", description: "Own delivery across multiple client accounts. Agile certified, engineering background a big plus." },
];

const DEPT_COLORS = {
  Engineering:    { bg: "#eff6ff", text: "#2563eb" },
  Design:         { bg: "#fdf4ff", text: "#a21caf" },
  Infrastructure: { bg: "#f0fdf4", text: "#16a34a" },
  AI:             { bg: "#f5f3ff", text: "#7c3aed" },
  Sales:          { bg: "#fff7ed", text: "#ea580c" },
  Delivery:       { bg: "#ecfdf5", text: "#059669" },
};

/* ── Post Job Modal ── */
function PostJobModal({ onClose }) {
  const [form, setForm] = useState({ title: "", dept: "", type: "Full-time", location: "Remote", salary: "", deadline: "" });
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-3xl border-2 border-black w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-xl border border-black flex items-center justify-center text-gray-400 hover:bg-gray-50">
          <X size={14} />
        </button>
        <h3 className="font-bold text-xl text-slate-900 mb-6" style={{ fontFamily: "'Fraunces',serif" }}>
          Post New Vacancy
        </h3>

        <div className="space-y-4">
          {[
            { label: "Job Title", key: "title", placeholder: "e.g. Senior Backend Engineer" },
            { label: "Department", key: "dept", placeholder: "e.g. Engineering" },
            { label: "Salary Range", key: "salary", placeholder: "e.g. $80k–$110k" },
            { label: "Application Deadline", key: "deadline", type: "date" },
          ].map(({ label, key, placeholder, type = "text" }) => (
            <div key={key}>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={e => up(key, e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-black focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:outline-none font-medium text-slate-800 placeholder:text-gray-400"
              />
            </div>
          ))}

          {/* Type & Location */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Type",     key: "type",     opts: ["Full-time","Part-time","Contract","Freelance"] },
              { label: "Location", key: "location", opts: ["Remote","Hybrid","On-site"] },
            ].map(({ label, key, opts }) => (
              <div key={key}>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>
                <div className="relative">
                  <select
                    value={form[key]}
                    onChange={e => up(key, e.target.value)}
                    className="w-full appearance-none pl-3 pr-8 py-2.5 text-sm rounded-xl border-2 border-black focus:border-violet-500 focus:outline-none font-medium text-slate-800 bg-white"
                  >
                    {opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Job Description</label>
            <textarea
              rows={4}
              placeholder="Describe the role, requirements, and what success looks like..."
              className="w-full px-4 py-3 text-sm rounded-xl border-2 border-black focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:outline-none font-medium text-slate-800 placeholder:text-gray-400 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-black text-sm font-bold text-slate-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-violet-800 transition-colors"
          >
            Post Vacancy
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Vacancy Card ── */
function VacancyCard({ vac, i, onToggle }) {
  const deptStyle = DEPT_COLORS[vac.dept] ?? { bg: "#f9fafb", text: "#6b7280" };
  const daysLeft = Math.ceil((new Date(vac.deadline) - new Date()) / 864e5);

  return (
    <Reveal delay={i * 0.06}>
      <motion.div
        layout
        className="group bg-white rounded-2xl border-2 border-black p-6 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(109,40,217,0.13)] transition-all duration-300 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-black group-hover:border-violet-400 transition-colors"
            style={{ background: deptStyle.bg }}
          >
            <Briefcase size={20} style={{ color: deptStyle.text }} strokeWidth={1.8} />
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={vac.status} />
            <button
              onClick={() => onToggle(vac.id)}
              className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-400 hover:text-violet-600"
            >
              {vac.status === "active"
                ? <ToggleRight size={18} className="text-green-500" />
                : <ToggleLeft size={18} />
              }
            </button>
          </div>
        </div>

        <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-violet-800 transition-colors" style={{ fontFamily: "'Fraunces',serif" }}>
          {vac.title}
        </h3>

        {/* Dept + type tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span
            className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border"
            style={{ background: deptStyle.bg, color: deptStyle.text, borderColor: deptStyle.text + "44" }}
          >
            {vac.dept}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-gray-200 bg-gray-50 text-gray-600">
            {vac.type}
          </span>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{vac.description}</p>

        {/* Meta */}
        <div className="space-y-2 mb-4">
          {[
            { icon: MapPin,    val: vac.location                           },
            { icon: Users,     val: `${vac.applicants} applicants`         },
            { icon: DollarSign,val: vac.salary                             },
            { icon: Clock,     val: `${daysLeft > 0 ? `${daysLeft}d left` : "Expired"} · Closes ${vac.deadline}` },
          ].map(({ icon: Icon, val }) => (
            <div key={val} className="flex items-center gap-2 text-[11px] text-gray-500">
              <Icon size={11} className="text-violet-400 flex-shrink-0" />
              <span>{val}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="font-bold text-violet-900 text-sm" style={{ fontFamily: "'Fraunces',serif" }}>
            Posted {vac.posted}
          </span>
          <RowActions />
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ── Main Page ── */
export default function AdminVacancies() {
  const [vacs, setVacs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { setVacs(MOCK_VACANCIES); setLoading(false); }, 600);
    return () => clearTimeout(t);
  }, []);

  const toggleStatus = (id) => {
    setVacs(v => v.map(vac =>
      vac.id === id
        ? { ...vac, status: vac.status === "active" ? "paused" : "active" }
        : vac
    ));
  };

  const filtered = vacs.filter(v => {
    const matchStatus = filter === "all" || v.status === filter;
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
                        v.dept.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalApplicants = vacs.reduce((s, v) => s + v.applicants, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vacancies"
        subtitle={`${vacs.filter(v => v.status === "active").length} active positions · ${totalApplicants} total applicants`}
      >
        <SearchBar placeholder="Search vacancies..." value={search} onChange={e => setSearch(e.target.value)} />
        <GhostBtn icon={Download}>Export</GhostBtn>
        <PrimaryBtn icon={Plus} onClick={() => setShowModal(true)}>Post Job</PrimaryBtn>
      </PageHeader>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active",    value: vacs.filter(v => v.status === "active").length,  color: "#16a34a", bg: "#f0fdf4" },
          { label: "Paused",    value: vacs.filter(v => v.status === "paused").length,  color: "#d97706", bg: "#fffbeb" },
          { label: "Closed",    value: vacs.filter(v => v.status === "closed").length,  color: "#6b7280", bg: "#f9fafb" },
          { label: "Applicants",value: totalApplicants,                                  color: "#7c3aed", bg: "#f5f3ff" },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="rounded-2xl border-2 border-black p-4 text-center" style={{ background: s.bg }}>
              <p className="font-bold text-2xl" style={{ fontFamily: "'Fraunces',serif", color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all","active","paused","closed"].map(f => (
          <PillFilter key={f} label={f === "all" ? "All" : f} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>

      {/* Cards */}
      {loading ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-black p-6 animate-pulse h-64">
              <div className="flex justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100" />
                <div className="w-16 h-6 rounded-full bg-gray-100" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                <div className="h-3 bg-gray-100 rounded-full w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((vac, i) => (
            <VacancyCard key={vac.id} vac={vac} i={i} onToggle={toggleStatus} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">📋</p>
              <p className="font-bold text-slate-700 text-lg">No vacancies found</p>
              <p className="text-sm mt-1">Try changing your filter or post a new role.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && <PostJobModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  );
}