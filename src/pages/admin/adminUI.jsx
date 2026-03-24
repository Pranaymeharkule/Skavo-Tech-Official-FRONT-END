// ─── Shared Admin UI Kit ────────────────────────────────────────
// Import from this file across all admin pages for consistency.

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, Edit, Trash2, Search } from "lucide-react";

/* ── Scroll Reveal ── */
export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Status Badge ── */
const STATUS_STYLES = {
  hot:        { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
  warm:       { bg: "#fffbeb", text: "#d97706", border: "#fde68a" },
  cold:       { bg: "#eff6ff", text: "#2563eb", border: "#bfdbfe" },
  interview:  { bg: "#f5f3ff", text: "#7c3aed", border: "#ddd6fe" },
  review:     { bg: "#fffbeb", text: "#d97706", border: "#fde68a" },
  rejected:   { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
  offer:      { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0" },
  active:     { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0" },
  paused:     { bg: "#fffbeb", text: "#d97706", border: "#fde68a" },
  closed:     { bg: "#f9fafb", text: "#6b7280", border: "#e5e7eb" },
  "on-track": { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0" },
  finishing:  { bg: "#f5f3ff", text: "#7c3aed", border: "#ddd6fe" },
  delayed:    { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
  complete:   { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0" },
  pending:    { bg: "#fffbeb", text: "#d97706", border: "#fde68a" },
};

export function StatusBadge({ status }) {
  const c = STATUS_STYLES[status] ?? STATUS_STYLES.cold;
  return (
    <span
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.text }} />
      {status}
    </span>
  );
}

/* ── Avatar ── */
const AVATAR_COLORS = ["#4c1d95", "#6d28d9", "#7c3aed", "#a855f7", "#c026d3", "#0f766e", "#b45309"];
export function Avatar({ name, size = "md" }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  const sizeClass = size === "sm" ? "w-8 h-8 text-[10px] rounded-lg" : size === "lg" ? "w-12 h-12 text-sm rounded-xl" : "w-9 h-9 text-xs rounded-xl";
  return (
    <div
      className={`${sizeClass} flex items-center justify-center text-white font-bold flex-shrink-0`}
      style={{ background: `linear-gradient(135deg,${color},#c026d3)` }}
    >
      {initials}
    </div>
  );
}

/* ── Progress Bar ── */
export function ProgressBar({ value, color = "#7c3aed" }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
      <motion.div
        className="h-1.5 rounded-full"
        style={{ background: `linear-gradient(90deg,${color},#c026d3)` }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
      />
    </div>
  );
}

/* ── Search Bar ── */
export function SearchBar({ placeholder = "Search...", value, onChange }) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10 pr-4 py-2.5 text-sm rounded-xl border-2 border-black bg-white focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 w-60 font-medium text-gray-700 placeholder:text-gray-400 transition-all"
      />
    </div>
  );
}

/* ── Row Actions ── */
export function RowActions({ onView, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-1">
      <button onClick={onView} className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-600 transition-colors"><Eye size={14} /></button>
      <button onClick={onEdit} className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-600 transition-colors"><Edit size={14} /></button>
      <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
    </div>
  );
}

/* ── Page Header ── */
export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-7">
      <div>
        <h2 className="font-bold text-slate-900 text-2xl leading-tight" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
          {title}
        </h2>
        {subtitle && <p className="text-gray-400 text-sm mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 flex-wrap">{children}</div>
    </div>
  );
}

/* ── Stat Card ── */
export function StatCard({ label, value, sub, icon: Icon, color = "#7c3aed", delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="group bg-white rounded-2xl border-2 border-black p-6 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(124,58,237,0.13)] transition-all duration-300 overflow-hidden relative">
        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-[0.06]" style={{ background: color }} />
        <div
          className="w-11 h-11 rounded-xl border-2 border-black flex items-center justify-center mb-4 group-hover:border-violet-400 transition-colors"
          style={{ background: `${color}14` }}
        >
          <Icon size={19} style={{ color }} strokeWidth={1.8} />
        </div>
        <p className="font-bold text-slate-900 text-2xl leading-none mb-1" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
          {value}
        </p>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</p>
        {sub && (
          <p className="text-[11px] text-gray-400 mt-2 font-medium">{sub}</p>
        )}
      </div>
    </Reveal>
  );
}

/* ── Table Shell ── */
export function Table({ headers, children }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-black overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-black bg-[#fdfdff]">
              {headers.map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Pill Button ── */
export function PillFilter({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 transition-all duration-200 ${
        active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-gray-500 border-black hover:border-violet-500 hover:text-violet-600"
      }`}
    >
      {label}
    </button>
  );
}

/* ── Primary Button ── */
export function PrimaryBtn({ children, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-violet-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}

/* ── Ghost Button ── */
export function GhostBtn({ children, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-black text-slate-700 rounded-xl text-sm font-bold hover:border-violet-500 hover:text-violet-700 transition-all active:scale-95"
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}