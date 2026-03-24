import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Download, Mail, Phone, Globe,
  Layers, Calendar, SlidersHorizontal, X, ChevronDown
} from "lucide-react";
import {
  Reveal, StatusBadge, Avatar, SearchBar,
  PageHeader, PrimaryBtn, GhostBtn, PillFilter, RowActions
} from "./adminUI";

/* ── Mock / API placeholder ── */
const MOCK_LEADS = [
  { id: 1,  name: "Sarah Johnson",   email: "sarah@techcorp.com",      phone: "+1 555-0123",       company: "TechCorp Inc.",  service: "Web Development",   value: 24000,  status: "hot",  date: "2025-03-12", source: "Website"    },
  { id: 2,  name: "Marcus Williams", email: "m.williams@finstack.io",   phone: "+1 555-0456",       company: "FinStack",       service: "AI Integration",    value: 85000,  status: "warm", date: "2025-03-10", source: "Referral"   },
  { id: 3,  name: "Priya Nair",      email: "priya@pulsehealth.com",    phone: "+44 20 7123 4567",  company: "Pulse Health",   service: "Mobile App",        value: 47000,  status: "cold", date: "2025-03-08", source: "LinkedIn"   },
  { id: 4,  name: "James Okafor",    email: "james@fleetops.ng",        phone: "+234 800 123 4567", company: "FleetOps",       service: "Cloud Infrastructure",value:33000, status: "hot",  date: "2025-03-15", source: "Cold Email" },
  { id: 5,  name: "Lisa Chen",       email: "lisa@cartpilot.com",       phone: "+1 555-0789",       company: "CartPilot",      service: "Full Stack",        value: 120000, status: "warm", date: "2025-03-14", source: "Website"    },
  { id: 6,  name: "Raj Patel",       email: "raj@mbasaas.com",          phone: "+91 98765 43210",   company: "MBA SaaS",       service: "Data Analytics",    value: 19000,  status: "cold", date: "2025-03-07", source: "Twitter"    },
  { id: 7,  name: "Amara Diallo",    email: "amara@nextech.sn",         phone: "+221 77 123 4567",  company: "NexTech",        service: "Security Audit",    value: 31000,  status: "hot",  date: "2025-03-16", source: "Referral"   },
  { id: 8,  name: "Tyler Brooks",    email: "tyler@streamline.co",      phone: "+1 555-0321",       company: "Streamline Co.", service: "Web Development",   value: 15000,  status: "cold", date: "2025-03-06", source: "LinkedIn"   },
];

const SOURCES = ["All Sources", "Website", "Referral", "LinkedIn", "Cold Email", "Twitter"];

function fmtValue(v) {
  return v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`;
}

/* ── Lead Card ── */
function LeadCard({ lead, i }) {
  return (
    <Reveal delay={i * 0.05}>
      <motion.div
        layout
        className="group bg-white rounded-2xl border-2 border-black p-5 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(109,40,217,0.13)] transition-all duration-300 flex flex-col gap-4"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={lead.name} />
            <div>
              <p className="font-bold text-slate-900 text-sm leading-tight">{lead.name}</p>
              <p className="text-[11px] text-gray-400 font-medium">{lead.company}</p>
            </div>
          </div>
          <StatusBadge status={lead.status} />
        </div>

        {/* Meta */}
        <div className="space-y-1.5">
          {[
            { icon: Mail,     val: lead.email   },
            { icon: Phone,    val: lead.phone   },
            { icon: Layers,   val: lead.service },
            { icon: Globe,    val: `via ${lead.source}` },
            { icon: Calendar, val: lead.date    },
          ].map(({ icon: Icon, val }, j) => (
            <div key={j} className="flex items-center gap-2 text-[11px] text-gray-500">
              <Icon size={11} className="text-violet-400 flex-shrink-0" />
              <span className="truncate">{val}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span
            className="font-bold text-violet-900 text-xl"
            style={{ fontFamily: "'Fraunces',serif" }}
          >
            {fmtValue(lead.value)}
          </span>
          <RowActions />
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ── Pipeline Summary ── */
function PipelineSummary({ leads }) {
  const hot  = leads.filter(l => l.status === "hot");
  const warm = leads.filter(l => l.status === "warm");
  const cold = leads.filter(l => l.status === "cold");
  const total = leads.reduce((s, l) => s + l.value, 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: "Total Pipeline", value: `$${(total / 1000).toFixed(0)}k`, color: "#7c3aed", bg: "#f5f3ff" },
        { label: "Hot Leads",      value: hot.length,                        color: "#dc2626", bg: "#fef2f2" },
        { label: "Warm Leads",     value: warm.length,                       color: "#d97706", bg: "#fffbeb" },
        { label: "Cold Leads",     value: cold.length,                       color: "#2563eb", bg: "#eff6ff" },
      ].map((s, i) => (
        <Reveal key={i} delay={i * 0.06}>
          <div
            className="rounded-2xl border-2 border-black p-4 text-center"
            style={{ background: s.bg }}
          >
            <p className="font-bold text-2xl" style={{ fontFamily: "'Fraunces',serif", color: s.color }}>
              {s.value}
            </p>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">{s.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Main Page ── */
export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [source, setSource] = useState("All Sources");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid"); // grid | table

  // Simulate API fetch
  useEffect(() => {
    const t = setTimeout(() => { setLeads(MOCK_LEADS); setLoading(false); }, 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = leads.filter(l => {
    const matchStatus = filter === "all" || l.status === filter;
    const matchSource = source === "All Sources" || l.source === source;
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
                        l.company.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSource && matchSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        subtitle={`${leads.length} total leads · $${(leads.reduce((s,l)=>s+l.value,0)/1000).toFixed(0)}k pipeline`}
      >
        <SearchBar placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} />
        <GhostBtn icon={Download}>Export</GhostBtn>
        <PrimaryBtn icon={Plus}>Add Lead</PrimaryBtn>
      </PageHeader>

      {/* Pipeline totals */}
      <PipelineSummary leads={leads} />

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex gap-2 flex-wrap">
          {["all","hot","warm","cold"].map(f => (
            <PillFilter key={f} label={f === "all" ? "All" : f} active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Source filter */}
          <div className="relative">
            <select
              value={source}
              onChange={e => setSource(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-xs font-bold border-2 border-black rounded-xl bg-white text-slate-700 focus:outline-none focus:border-violet-500 cursor-pointer"
            >
              {SOURCES.map(s => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* View toggle */}
          {["grid","table"].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                view === v ? "bg-slate-900 text-white border-slate-900" : "border-black text-gray-500 hover:border-violet-500"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_,i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-black p-5 animate-pulse h-56">
              <div className="flex gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gray-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-2 bg-gray-100 rounded-full w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                {[1,2,3].map(j => <div key={j} className="h-2 bg-gray-100 rounded-full" />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid view */}
      {!loading && view === "grid" && (
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((lead, i) => (
              <LeadCard key={lead.id} lead={lead} i={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Table view */}
      {!loading && view === "table" && (
        <Reveal>
          <div className="bg-white rounded-2xl border-2 border-black overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-black bg-[#fdfdff]">
                    {["Lead","Company","Service","Value","Source","Status","Actions"].map(h => (
                      <th key={h} className="text-left px-5 py-3.5 text-[10px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((lead, i) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="hover:bg-violet-50/40 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={lead.name} size="sm" />
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{lead.name}</p>
                            <p className="text-[10px] text-gray-400">{lead.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-700 font-medium">{lead.company}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">{lead.service}</td>
                      <td className="px-5 py-4 font-bold text-slate-900" style={{ fontFamily: "'Fraunces',serif" }}>
                        {fmtValue(lead.value)}
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-500">{lead.source}</td>
                      <td className="px-5 py-4"><StatusBadge status={lead.status} /></td>
                      <td className="px-5 py-4"><RowActions /></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-bold text-slate-700 text-lg">No leads found</p>
          <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}