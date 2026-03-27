// ─── Shared Admin UI Kit ─────────────────────────────────────────────────────
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, Edit, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";

/* ── Scroll Reveal ── */
export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ── Status Badge ── */
const STATUS_MAP = {
  hot: ["#fef2f2","#dc2626"], warm: ["#fffbeb","#d97706"], cold: ["#eff6ff","#2563eb"],
  interview: ["#f5f3ff","#7c3aed"], reviewing: ["#fffbeb","#d97706"],
  rejected: ["#fef2f2","#dc2626"], offer: ["#f0fdf4","#16a34a"], hired: ["#f0fdf4","#16a34a"],
  active: ["#f0fdf4","#16a34a"], paused: ["#fffbeb","#d97706"], closed: ["#f9fafb","#6b7280"],
  "on-track": ["#f0fdf4","#16a34a"], finishing: ["#f5f3ff","#7c3aed"],
  delayed: ["#fef2f2","#dc2626"], complete: ["#f0fdf4","#059669"],
  pending: ["#fffbeb","#d97706"], applied: ["#f8fafc","#475569"],
  interviewing: ["#fdf4ff","#a21caf"], new: ["#eff6ff","#2563eb"],
  "in progress": ["#fffbeb","#d97706"], enrolled: ["#f0fdf4","#16a34a"],
  contacted: ["#f5f3ff","#7c3aed"],
};
export function StatusBadge({ status }) {
  const [bg, text] = STATUS_MAP[(status||"").toLowerCase()] ?? ["#eff6ff","#2563eb"];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
      style={{ background: bg, color: text, border: `1px solid ${text}20` }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: text }} />
      {status}
    </span>
  );
}

/* ── Avatar ── */
const AV = ["#4c1d95","#6d28d9","#7c3aed","#a855f7","#c026d3","#0f766e","#b45309","#0369a1"];
export function Avatar({ name = "?", size = "md" }) {
  const i = (name||"?").split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
  const c = AV[(name||"").charCodeAt(0) % AV.length];
  const cls = size==="sm" ? "w-8 h-8 text-[10px] rounded-lg" : size==="lg" ? "w-12 h-12 text-sm rounded-xl" : "w-9 h-9 text-xs rounded-xl";
  return <div className={`${cls} flex items-center justify-center text-white font-bold flex-shrink-0`} style={{background:`linear-gradient(135deg,${c},#c026d3)`}}>{i}</div>;
}

/* ── Progress Bar ── */
export function ProgressBar({ value, color = "#7c3aed" }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
      <motion.div className="h-1.5 rounded-full" style={{background:`linear-gradient(90deg,${color},#c026d3)`}}
        initial={{width:0}} animate={{width:`${Math.min(value,100)}%`}} transition={{duration:0.8,ease:"easeOut",delay:0.1}} />
    </div>
  );
}

/* ── Search Bar ── */
export function SearchBar({ placeholder="Search...", value, onChange }) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
      <input placeholder={placeholder} value={value} onChange={onChange}
        className="pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 w-52 font-medium text-gray-700 placeholder:text-gray-400 transition-all"/>
    </div>
  );
}

/* ── Row Actions ── */
export function RowActions({ onView, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-0.5">
      {onView   && <button onClick={onView}   title="View"   className="p-2 rounded-lg hover:bg-violet-50 text-gray-300 hover:text-violet-600 transition-colors"><Eye   size={14}/></button>}
      {onEdit   && <button onClick={onEdit}   title="Edit"   className="p-2 rounded-lg hover:bg-violet-50 text-gray-300 hover:text-violet-600 transition-colors"><Edit  size={14}/></button>}
      {onDelete && <button onClick={onDelete} title="Delete" className="p-2 rounded-lg hover:bg-red-50   text-gray-300 hover:text-red-500   transition-colors"><Trash2 size={14}/></button>}
    </div>
  );
}

/* ── Page Header ── */
export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div>
        <h2 className="font-bold text-gray-900 text-xl leading-tight" style={{fontFamily:"'Fraunces',Georgia,serif"}}>{title}</h2>
        {subtitle && <p className="text-gray-400 text-sm mt-0.5">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2 flex-wrap">{children}</div>}
    </div>
  );
}

/* ── Stat Card ── */
export function StatCard({ label, value, sub, icon: Icon, color="#7c3aed", bg="#f5f3ff", delay=0 }) {
  return (
    <Reveal delay={delay}>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-violet-200 hover:shadow-sm transition-all">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{background:bg}}>
          <Icon size={16} style={{color}} strokeWidth={1.8}/>
        </div>
        <p className="font-bold text-gray-900 text-2xl leading-none mb-1" style={{fontFamily:"'Fraunces',Georgia,serif"}}>{value}</p>
        <p className="text-xs font-semibold text-gray-500">{label}</p>
        {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </Reveal>
  );
}

/* ── Table Shell ── */
export function Table({ headers, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {headers.map(h => <th key={h} className="text-left px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Pill Filter ── */
export function PillFilter({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${active?"bg-gray-900 text-white shadow-sm":"bg-white text-gray-500 border border-gray-200 hover:border-violet-300 hover:text-violet-600"}`}>
      {label}
    </button>
  );
}

/* ── Primary Button ── */
export function PrimaryBtn({ children, onClick, icon: Icon, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="flex items-center gap-2 px-4 py-2.5 bg-violet-700 text-white rounded-xl text-sm font-semibold hover:bg-violet-800 active:scale-95 disabled:opacity-50 transition-all">
      {Icon && <Icon size={14}/>}{children}
    </button>
  );
}

/* ── Ghost Button ── */
export function GhostBtn({ children, onClick, icon: Icon }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 active:scale-95 transition-all">
      {Icon && <Icon size={14}/>}{children}
    </button>
  );
}

/* ── Pagination ── */
export function Pagination({ page, totalPages, total, perPage, onPrev, onNext }) {
  if (totalPages <= 1) return null;
  const from = (page-1)*perPage+1, to = Math.min(page*perPage, total);
  return (
    <div className="flex items-center justify-between px-1 pt-2">
      <p className="text-xs text-gray-400">Showing <strong className="text-gray-600">{from}–{to}</strong> of <strong className="text-gray-600">{total}</strong></p>
      <div className="flex gap-1.5">
        <button onClick={onPrev} disabled={page===1} className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:border-violet-300 hover:text-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
          <ChevronLeft size={13}/> Prev
        </button>
        <span className="flex items-center px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl">{page}/{totalPages}</span>
        <button onClick={onNext} disabled={page===totalPages} className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:border-violet-300 hover:text-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
          Next <ChevronRight size={13}/>
        </button>
      </div>
    </div>
  );
}

/* ── Empty State ── */
export function EmptyState({ icon="📭", title, desc }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-dashed border-gray-200">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="font-semibold text-gray-700 text-base">{title}</p>
      {desc && <p className="text-sm text-gray-400 mt-1 max-w-xs">{desc}</p>}
    </div>
  );
}

/* ── Table Skeleton ── */
export function TableSkeleton({ rows=5 }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50 flex gap-6">
        {[36,24,20,16].map((w,i)=><div key={i} className="h-3 bg-gray-200 rounded animate-pulse" style={{width:`${w*4}px`}}/>)}
      </div>
      {Array(rows).fill(0).map((_,i)=>(
        <div key={i} className="px-5 py-4 border-b border-gray-50 flex items-center gap-4">
          <div className="w-8 h-8 rounded-xl bg-gray-100 animate-pulse flex-shrink-0"/>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-100 rounded w-1/3 animate-pulse"/>
            <div className="h-2 bg-gray-100 rounded w-1/4 animate-pulse"/>
          </div>
          <div className="w-16 h-6 bg-gray-100 rounded-lg animate-pulse"/>
        </div>
      ))}
    </div>
  );
}

/* ── Card Skeleton ── */
export function CardSkeleton({ count=6 }) {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array(count).fill(0).map((_,i)=>(
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gray-100"/>
            <div className="flex-1 space-y-2"><div className="h-3 bg-gray-100 rounded w-1/2"/><div className="h-2 bg-gray-100 rounded w-1/3"/></div>
          </div>
          <div className="space-y-2 mt-4"><div className="h-2 bg-gray-100 rounded"/><div className="h-2 bg-gray-100 rounded w-3/4"/></div>
        </div>
      ))}
    </div>
  );
}

/* ── Info Row for modals ── */
export function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 text-sm">
      <Icon size={14} className="text-gray-400 mt-0.5 flex-shrink-0"/>
      <div className="flex gap-2 items-baseline min-w-0">
        <span className="text-[11px] text-gray-400 w-14 flex-shrink-0">{label}</span>
        <span className="text-gray-800 font-medium break-all">{value}</span>
      </div>
    </div>
  );
}

/* ── Message Box ── */
export function MessageBox({ text, label="Message" }) {
  if (!text) return null;
  return (
    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{text}</p>
    </div>
  );
}

/* ── Confirm Dialog ── */
export function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onCancel}>
      <motion.div initial={{scale:.95,y:8}} animate={{scale:1,y:0}}
        className="bg-white rounded-2xl border border-gray-100 shadow-2xl p-6 max-w-sm w-full" onClick={e=>e.stopPropagation()}>
        <p className="text-4xl mb-3 text-center">🗑️</p>
        <h3 className="font-bold text-gray-900 text-base text-center mb-2">Confirm Delete</h3>
        <p className="text-sm text-gray-500 text-center mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700">Delete</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Toast ── */
export function Toast({ message, type="success", onClose }) {
  return (
    <motion.div initial={{opacity:0,y:16,x:16}} animate={{opacity:1,y:0,x:0}} exit={{opacity:0,y:16}}
      className={`fixed bottom-5 right-5 z-[70] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-semibold ${type==="success"?"bg-green-600":"bg-red-600"} text-white`}>
      <span>{type==="success"?"✓":"✕"}</span>{message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 text-lg leading-none">×</button>
    </motion.div>
  );
}

/* ── Section Divider ── */
export function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px bg-gray-100"/>
      {label && <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>}
      <div className="flex-1 h-px bg-gray-100"/>
    </div>
  );
}