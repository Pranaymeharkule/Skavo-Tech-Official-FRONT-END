import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, Users, FolderKanban,
  Target, Zap, ChevronRight, ArrowUpRight,
  Activity, BarChart3, Clock
} from "lucide-react";
import { Reveal, StatusBadge, Avatar, ProgressBar, StatCard } from "./adminUI";

/* ── Mock data (replace with API calls) ── */
const STATS = [
  { label: "Total Revenue",   value: "$1.24M", sub: "+18.4% this month", icon: TrendingUp,   color: "#7c3aed", up: true  },
  { label: "Active Projects", value: "12",     sub: "+3 new this month",  icon: FolderKanban, color: "#6d28d9", up: true  },
  { label: "Open Leads",      value: "38",     sub: "+12.1% vs last wk",  icon: Users,        color: "#a855f7", up: true  },
  { label: "Avg. Deal Size",  value: "$54.2k", sub: "−2.3% vs last mo",   icon: Target,       color: "#c026d3", up: false },
];

const RECENT_LEADS = [
  { name: "Sarah Johnson",  company: "TechCorp Inc.",  service: "Web Dev",      value: "$24k",  status: "hot"  },
  { name: "Marcus Williams",company: "FinStack",       service: "AI Integration",value: "$85k", status: "warm" },
  { name: "Priya Nair",     company: "Pulse Health",   service: "Mobile App",   value: "$47k",  status: "cold" },
  { name: "James Okafor",   company: "FleetOps",       service: "Cloud Infra",  value: "$33k",  status: "hot"  },
];

const RECENT_PROJECTS = [
  { name: "MBA SaaS Platform",  client: "MBA SaaS",  progress: 87, status: "on-track", due: "Apr 20"  },
  { name: "CartPilot Rebuild",  client: "CartPilot", progress: 62, status: "on-track", due: "May 10"  },
  { name: "FleetOps Tracker",   client: "FleetOps",  progress: 95, status: "finishing",due: "Mar 25"  },
  { name: "Pulse Health AI",    client: "Pulse",     progress: 38, status: "delayed",  due: "Jun 01"  },
];

const ACTIVITY = [
  { text: "New lead: CartPilot ($120k)",                   time: "2m ago",  type: "lead"    },
  { text: "FleetOps tracker hit 95% milestone",            time: "14m ago", type: "project" },
  { text: "Application received — Nina Volkova (AI/ML)",   time: "1h ago",  type: "app"     },
  { text: "Enrollment confirmed — Jordan Kim",             time: "2h ago",  type: "enroll"  },
  { text: "Vacancy posted: Senior React Developer",        time: "3h ago",  type: "vacancy" },
  { text: "Deal closed — FinStack $47k",                   time: "5h ago",  type: "deal"    },
  { text: "Project kickoff — Pulse Health AI",             time: "6h ago",  type: "project" },
];

const TYPE_DOT = {
  lead:    "#7c3aed",
  project: "#2563eb",
  app:     "#d97706",
  enroll:  "#16a34a",
  vacancy: "#c026d3",
  deal:    "#059669",
};

const MINI_CHART = [40, 65, 50, 80, 70, 90, 75, 95, 85, 110, 100, 124];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function AdminDashboard() {
  const [chartHover, setChartHover] = useState(null);
  const maxVal = Math.max(...MINI_CHART);

  return (
    <div className="space-y-7">

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <StatCard key={i} delay={i * 0.07} {...s} />
        ))}
      </div>

      {/* ── Revenue Chart + Activity ── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* Chart */}
        <Reveal className="lg:col-span-2">
          <div className="bg-white rounded-2xl border-2 border-black p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-900 text-lg" style={{ fontFamily: "'Fraunces',serif" }}>
                  Revenue Growth
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">FY 2024 — monthly breakdown</p>
              </div>
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-600 rounded-full px-3 py-1">
                <TrendingUp size={12} />
                <span className="text-xs font-bold">+18.4%</span>
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-2 h-36">
              {MINI_CHART.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1 group cursor-pointer"
                  onMouseEnter={() => setChartHover(i)}
                  onMouseLeave={() => setChartHover(null)}
                >
                  <motion.div
                    className="w-full rounded-t-lg relative overflow-hidden"
                    style={{
                      height: `${(v / maxVal) * 100}%`,
                      background: chartHover === i
                        ? "linear-gradient(180deg,#7c3aed,#c026d3)"
                        : i === MINI_CHART.length - 1
                        ? "linear-gradient(180deg,#6d28d9,#a855f7)"
                        : "#ede9fe",
                      minHeight: 8,
                      transition: "background 0.2s"
                    }}
                    initial={{ scaleY: 0, originY: 1 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.04, ease: "easeOut" }}
                  >
                    {chartHover === i && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded-md whitespace-nowrap">
                        ${v}k
                      </div>
                    )}
                  </motion.div>
                  <span className="text-[8px] text-gray-400 font-medium">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Activity Feed */}
        <Reveal delay={0.1}>
          <div className="bg-white rounded-2xl border-2 border-black overflow-hidden h-full flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b-2 border-black">
              <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Fraunces',serif" }}>
                Live Activity
              </h3>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live
              </span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {ACTIVITY.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-3 px-5 py-3 hover:bg-violet-50/40 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: TYPE_DOT[a.type] ?? "#7c3aed" }} />
                  <div>
                    <p className="text-xs font-medium text-slate-700 leading-snug">{a.text}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                      <Clock size={9} /> {a.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Leads + Projects ── */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* Recent Leads */}
        <Reveal>
          <div className="bg-white rounded-2xl border-2 border-black overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-black">
              <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Fraunces',serif" }}>Recent Leads</h3>
              <a href="/admin/leads" className="flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-900 transition-colors">
                View all <ChevronRight size={13} />
              </a>
            </div>
            <div className="divide-y divide-gray-50">
              {RECENT_LEADS.map((lead, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-violet-50/40 transition-colors group"
                >
                  <Avatar name={lead.name} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">{lead.name}</p>
                    <p className="text-xs text-gray-400 truncate">{lead.company} · {lead.service}</p>
                  </div>
                  <div className="flex-shrink-0 text-right space-y-1">
                    <p className="font-bold text-slate-900 text-sm" style={{ fontFamily: "'Fraunces',serif" }}>
                      {lead.value}
                    </p>
                    <StatusBadge status={lead.status} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Projects Progress */}
        <Reveal delay={0.1}>
          <div className="bg-white rounded-2xl border-2 border-black overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-black">
              <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Fraunces',serif" }}>Projects Progress</h3>
              <a href="/admin/projects" className="flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-900 transition-colors">
                View all <ChevronRight size={13} />
              </a>
            </div>
            <div className="px-6 py-2 divide-y divide-gray-50">
              {RECENT_PROJECTS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="py-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{p.name}</p>
                      <p className="text-[10px] text-gray-400">{p.client} · Due {p.due}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{p.progress}%</span>
                      <StatusBadge status={p.status} />
                    </div>
                  </div>
                  <ProgressBar
                    value={p.progress}
                    color={p.status === "delayed" ? "#dc2626" : p.status === "finishing" ? "#a855f7" : "#7c3aed"}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Quick Numbers ── */}
      <Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Courses Running",  value: "6",    color: "#7c3aed" },
            { label: "Enrolled Students",value: "184",  color: "#a855f7" },
            { label: "Open Vacancies",   value: "4",    color: "#6d28d9" },
            { label: "Pending Reviews",  value: "11",   color: "#c026d3" },
          ].map((q, i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-black p-5 text-center hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-100 transition-all duration-200">
              <p className="font-bold text-3xl mb-1" style={{ fontFamily: "'Fraunces',serif", color: q.color }}>
                {q.value}
              </p>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{q.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}