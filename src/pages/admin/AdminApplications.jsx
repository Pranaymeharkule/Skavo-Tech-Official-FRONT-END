import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Download, X, Mail, Briefcase,
  Clock, Star, ChevronRight, Check, XCircle, MessageSquare
} from "lucide-react";
import {
  Reveal, StatusBadge, Avatar, ProgressBar, SearchBar,
  PageHeader, PrimaryBtn, GhostBtn, PillFilter, RowActions, StatCard, Table
} from "./adminUI";

/* ── Mock / API placeholder ── */
const MOCK_APPLICATIONS = [
  { id: 1, name: "Alex Turner",     role: "Senior React Developer",  email: "alex@gmail.com",       experience: "6 yrs", status: "interview", applied: "2025-03-14", score: 92, phone: "+1 555-0191", portfolio: "alexturner.dev",    notes: "Strong system design. Cleared technical round." },
  { id: 2, name: "Zoe Martinez",    role: "UI/UX Designer",          email: "zoe@outlook.com",      experience: "4 yrs", status: "review",    applied: "2025-03-13", score: 87, phone: "+1 555-0182", portfolio: "zoecreates.io",     notes: "Impressive Figma portfolio. Design challenge pending." },
  { id: 3, name: "Kwame Asante",    role: "DevOps Engineer",         email: "kwame@proton.me",      experience: "5 yrs", status: "rejected",  applied: "2025-03-10", score: 61, phone: "+233 50 123 4567", portfolio: "github.com/kwame", notes: "Lacks Kubernetes experience required for this role." },
  { id: 4, name: "Nina Volkova",    role: "AI/ML Engineer",          email: "nina@gmail.com",       experience: "7 yrs", status: "offer",     applied: "2025-03-09", score: 97, phone: "+7 999 123 4567",  portfolio: "ninavolkova.ai",    notes: "Outstanding. Offer letter sent. Awaiting response." },
  { id: 5, name: "Tyler Brooks",    role: "Backend Engineer",        email: "tyler@yahoo.com",      experience: "3 yrs", status: "review",    applied: "2025-03-12", score: 74, phone: "+1 555-0173", portfolio: "github.com/tylerb",  notes: "Solid Node.js skills. Needs second look at system design." },
  { id: 6, name: "Amara Diallo",    role: "Project Manager",         email: "amara@gmail.com",      experience: "8 yrs", status: "interview", applied: "2025-03-11", score: 89, phone: "+221 77 123 4567", portfolio: "linkedin.com/amara", notes: "PMP certified. Strong SaaS delivery background." },
  { id: 7, name: "Ji-woo Park",     role: "Senior React Developer",  email: "jiwoo@kakao.com",      experience: "5 yrs", status: "review",    applied: "2025-03-15", score: 81, phone: "+82 10 1234 5678",  portfolio: "jiwoopark.kr",      notes: "Excellent Next.js knowledge. Culture fit interview scheduled." },
  { id: 8, name: "Fatima Al-Rashid",role: "Product Designer",        email: "fatima@design.ae",     experience: "6 yrs", status: "interview", applied: "2025-03-13", score: 93, phone: "+971 55 123 4567",  portfolio: "fatima.design",     notes: "Top candidate. Design system experience is rare." },
];

const PIPELINE_STAGES = ["review", "interview", "offer", "rejected"];

const SCORE_COLOR = (s) =>
  s >= 90 ? "#16a34a" : s >= 75 ? "#d97706" : s >= 60 ? "#ea580c" : "#dc2626";

/* ── Candidate Detail Modal ── */
function CandidateModal({ candidate, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-3xl border-2 border-black w-full max-w-md p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-xl border border-black flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
          <X size={14} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <Avatar name={candidate.name} size="lg" />
          <div>
            <h3 className="font-bold text-slate-900 text-lg" style={{ fontFamily: "'Fraunces',serif" }}>
              {candidate.name}
            </h3>
            <p className="text-sm text-gray-500">{candidate.role}</p>
            <div className="mt-1.5"><StatusBadge status={candidate.status} /></div>
          </div>
        </div>

        {/* Score */}
        <div className="mb-5 p-4 rounded-2xl border-2 border-black bg-[#fdfdff]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Match Score</p>
            <span className="font-bold text-2xl" style={{ fontFamily: "'Fraunces',serif", color: SCORE_COLOR(candidate.score) }}>
              {candidate.score}/100
            </span>
          </div>
          <ProgressBar value={candidate.score} color={SCORE_COLOR(candidate.score)} />
        </div>

        {/* Contact */}
        <div className="space-y-2 mb-5">
          {[
            { icon: Mail,      label: "Email",     val: candidate.email     },
            { icon: Briefcase, label: "Portfolio", val: candidate.portfolio },
            { icon: Clock,     label: "Applied",   val: candidate.applied   },
            { icon: Star,      label: "Experience",val: candidate.experience},
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                <Icon size={13} className="text-violet-600" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide leading-none mb-0.5">{label}</p>
                <p className="text-slate-800 font-medium text-sm">{val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100 mb-6">
          <p className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
            <MessageSquare size={10} /> Recruiter Notes
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">{candidate.notes}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-violet-800 transition-colors">
            <Check size={14} /> Move to Offer
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white text-red-500 text-sm font-bold rounded-xl border-2 border-black hover:bg-red-50 transition-colors">
            <XCircle size={14} /> Reject
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Stage Column (Kanban) ── */
function StageColumn({ stage, candidates }) {
  const stageLabel = { review: "In Review", interview: "Interview", offer: "Offer", rejected: "Rejected" };
  const stageBg    = { review: "#fffbeb", interview: "#f5f3ff", offer: "#f0fdf4", rejected: "#fef2f2" };

  return (
    <div className="flex-1 min-w-[220px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-black text-[10px] uppercase tracking-widest text-gray-500">{stageLabel[stage]}</span>
          <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{candidates.length}</span>
        </div>
      </div>
      <div className="space-y-3">
        {candidates.map((c, i) => (
          <motion.div
            key={c.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border-2 border-black p-4 hover:-translate-y-0.5 hover:shadow-md hover:shadow-violet-100 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-3">
              <Avatar name={c.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 text-xs truncate">{c.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{c.role}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-500 mb-2">
              <span>{c.experience}</span>
              <span>{c.applied}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-2">
                <ProgressBar value={c.score} color={SCORE_COLOR(c.score)} />
              </div>
              <span className="font-bold text-xs" style={{ color: SCORE_COLOR(c.score) }}>{c.score}</span>
            </div>
          </motion.div>
        ))}
        {candidates.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 p-6 text-center text-gray-300 text-xs font-medium">
            No candidates
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("kanban");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => { setApps(MOCK_APPLICATIONS); setLoading(false); }, 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = apps.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.role.toLowerCase().includes(search.toLowerCase())
  );

  const byStage = (stage) => filtered.filter(a => a.status === stage);

  const summaryStats = [
    { label: "Total",     value: apps.length,                                            color: "#7c3aed" },
    { label: "In Review", value: apps.filter(a => a.status === "review").length,         color: "#d97706" },
    { label: "Interview", value: apps.filter(a => a.status === "interview").length,      color: "#7c3aed" },
    { label: "Offers",    value: apps.filter(a => a.status === "offer").length,          color: "#16a34a" },
    { label: "Rejected",  value: apps.filter(a => a.status === "rejected").length,       color: "#dc2626" },
    { label: "Avg Score", value: apps.length ? Math.round(apps.reduce((s,a)=>s+a.score,0)/apps.length) : 0, color: "#a855f7" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Applications" subtitle={`${apps.length} candidates across all positions`}>
        <SearchBar placeholder="Search candidates..." value={search} onChange={e => setSearch(e.target.value)} />
        <GhostBtn icon={Download}>Export CSV</GhostBtn>
        <PrimaryBtn icon={Plus}>Post Job</PrimaryBtn>
      </PageHeader>

      {/* Stats row */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {summaryStats.map((s, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="bg-white rounded-2xl border-2 border-black p-4 text-center hover:-translate-y-0.5 hover:shadow-md hover:shadow-violet-100 transition-all">
              <p className="font-bold text-2xl" style={{ fontFamily: "'Fraunces',serif", color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        {["kanban", "table"].map(v => (
          <PillFilter key={v} label={v} active={view === v} onClick={() => setView(v)} />
        ))}
      </div>

      {/* Kanban */}
      {!loading && view === "kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {PIPELINE_STAGES.map(stage => (
            <StageColumn key={stage} stage={stage} candidates={byStage(stage)} />
          ))}
        </div>
      )}

      {/* Table */}
      {!loading && view === "table" && (
        <Reveal>
          <Table headers={["Candidate","Role","Experience","Score","Status","Applied","Actions"]}>
            {filtered.map((app, i) => (
              <motion.tr
                key={app.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="hover:bg-violet-50/40 transition-colors cursor-pointer"
                onClick={() => setSelected(app)}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={app.name} size="sm" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{app.name}</p>
                      <p className="text-[10px] text-gray-400">{app.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-700 font-medium">{app.role}</td>
                <td className="px-5 py-4 text-sm text-gray-500">{app.experience}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm" style={{ color: SCORE_COLOR(app.score) }}>{app.score}</span>
                    <div className="w-20">
                      <ProgressBar value={app.score} color={SCORE_COLOR(app.score)} />
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4"><StatusBadge status={app.status} /></td>
                <td className="px-5 py-4 text-xs text-gray-400">{app.applied}</td>
                <td className="px-5 py-4" onClick={e => e.stopPropagation()}><RowActions /></td>
              </motion.tr>
            ))}
          </Table>
        </Reveal>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selected && <CandidateModal candidate={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}