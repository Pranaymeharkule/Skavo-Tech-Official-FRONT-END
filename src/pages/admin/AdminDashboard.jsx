import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import {
  TrendingUp, Users, FolderKanban, Target, Activity,
  Clock, ChevronRight, CheckCircle2
} from "lucide-react";
import { Reveal, StatusBadge, Avatar, ProgressBar, StatCard } from "./adminUI";

const MINI_CHART = [40,65,50,80,70,90,75,95,85,110,100,124];
const MONTHS     = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const RECENT_PROJECTS = [
  { name:"MBA SaaS Platform",   client:"MBA SaaS",  progress:87, status:"on-track",  due:"Apr 20" },
  { name:"CartPilot Rebuild",   client:"CartPilot", progress:62, status:"on-track",  due:"May 10" },
  { name:"FleetOps Tracker",    client:"FleetOps",  progress:95, status:"finishing", due:"Mar 25" },
  { name:"Pulse Health AI",     client:"Pulse",     progress:38, status:"delayed",   due:"Jun 01" },
];

const STATUS_COLOR = { "on-track":"#16a34a", finishing:"#7c3aed", delayed:"#dc2626" };
const TYPE_DOT     = { lead:"#7c3aed", app:"#d97706", enroll:"#16a34a" };

export default function AdminDashboard() {
  const [chartHover, setChartHover] = useState(null);
  const [data, setData]             = useState(null);
  const maxVal = Math.max(...MINI_CHART);

  useEffect(() => {
    api.get("/dashboard")
      .then(r => setData(r.data))
      .catch(e => console.error("Dashboard fetch failed:", e));
  }, []);

  if (!data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Activity className="animate-spin text-violet-600" size={28}/>
          <p className="text-sm text-gray-400 font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const { stats, recentLeads, recentApplications } = data;

  const KPI_STATS = [
    { label:"Total Leads",       value:stats.totalLeads.toString(),         sub:"Training & project inquiries", icon:Users,        color:"#7c3aed", bg:"#f5f3ff" },
    { label:"Job Applications",  value:stats.totalApplications.toString(),  sub:"Full pipeline",                icon:FolderKanban, color:"#6d28d9", bg:"#ede9fe" },
    { label:"Full-time Roles",   value:(stats.fulltimeCount||0).toString(), sub:"Direct placements",            icon:Target,       color:"#a855f7", bg:"#f5f3ff" },
    { label:"Active Projects",   value:stats.totalProjects.toString(),      sub:"Ongoing client work",          icon:Activity,     color:"#c026d3", bg:"#fdf4ff" },
  ];

  // Build activity feed from live data
  const feed = [
    ...recentLeads.map(l => ({ text:`New training lead: ${l.name} — ${l.courseTitle||"General"}`, time:new Date(l.createdAt).toLocaleDateString(), type:"lead" })),
    ...recentApplications.map(a => ({ text:`New application: ${a.name} — ${a.position}`, time:new Date(a.createdAt).toLocaleDateString(), type:"app" })),
  ].sort((a,b) => new Date(b.rawTime) - new Date(a.rawTime)).slice(0,8);

  return (
    <div className="space-y-6">

      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI_STATS.map((s,i) => <StatCard key={i} delay={i*0.06} {...s}/>)}
      </div>

      {/* Chart + Activity */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* Revenue chart (static visual — replace with real data when available) */}
        <Reveal className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-gray-900 text-base" style={{fontFamily:"'Fraunces',serif"}}>Revenue Growth</h3>
                <p className="text-xs text-gray-400 mt-0.5">FY 2024 — monthly overview</p>
              </div>
              <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 rounded-full px-3 py-1">
                <TrendingUp size={11}/>
                <span className="text-xs font-bold">+18.4%</span>
              </div>
            </div>

            <div className="flex items-end gap-1.5 h-32">
              {MINI_CHART.map((v,i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer relative"
                  onMouseEnter={()=>setChartHover(i)} onMouseLeave={()=>setChartHover(null)}>
                  {chartHover===i && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-bold px-2 py-1 rounded-lg whitespace-nowrap z-10">
                      ${v}k
                    </div>
                  )}
                  <motion.div className="w-full rounded-t-lg"
                    style={{
                      height:`${(v/maxVal)*100}%`,
                      background: chartHover===i ? "linear-gradient(180deg,#7c3aed,#c026d3)" : i===MINI_CHART.length-1 ? "linear-gradient(180deg,#6d28d9,#a855f7)" : "#ede9fe",
                      minHeight:6, transition:"background .15s"
                    }}
                    initial={{scaleY:0,originY:1}} animate={{scaleY:1}} transition={{duration:.55,delay:i*.03,ease:"easeOut"}}/>
                  <span className="text-[8px] text-gray-400 font-medium">{MONTHS[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Live Activity Feed */}
        <Reveal delay={0.1}>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm" style={{fontFamily:"'Fraunces',serif"}}>Live Activity</h3>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>Live
              </span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {feed.length === 0 ? (
                <p className="p-6 text-center text-sm text-gray-400">No recent activity</p>
              ) : feed.map((a,i) => (
                <motion.div key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*.05}}
                  className="flex gap-3 px-5 py-3 hover:bg-violet-50/40 transition-colors">
                  <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{background:TYPE_DOT[a.type]??"#7c3aed"}}/>
                  <div>
                    <p className="text-xs font-medium text-gray-700 leading-snug">{a.text}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1"><Clock size={9}/>{a.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Recent Leads + Projects */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* Recent Leads */}
        <Reveal>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm" style={{fontFamily:"'Fraunces',serif"}}>Recent Inquiries</h3>
              <a href="/admin/leads" className="flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-900 transition-colors">
                View all <ChevronRight size={12}/>
              </a>
            </div>
            <div className="divide-y divide-gray-50">
              {recentLeads.length === 0 ? (
                <p className="p-5 text-center text-sm text-gray-400">No recent inquiries</p>
              ) : recentLeads.slice(0,4).map((lead,i) => (
                <motion.div key={lead._id} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*.05}}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-violet-50/40 transition-colors">
                  <Avatar name={lead.name}/>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{lead.name}</p>
                    <p className="text-xs text-gray-400 truncate">{lead.email}</p>
                  </div>
                  <StatusBadge status={lead.status==="Pending"?"warm":"hot"}/>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Projects Progress */}
        <Reveal delay={0.08}>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm" style={{fontFamily:"'Fraunces',serif"}}>Projects Progress</h3>
              <a href="/admin/projects" className="flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-900 transition-colors">
                View all <ChevronRight size={12}/>
              </a>
            </div>
            <div className="px-5 py-2 divide-y divide-gray-50">
              {RECENT_PROJECTS.map((p,i) => (
                <motion.div key={i} initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} transition={{delay:i*.05}} className="py-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                      <p className="text-[10px] text-gray-400">{p.client} · Due {p.due}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{p.progress}%</span>
                      <StatusBadge status={p.status}/>
                    </div>
                  </div>
                  <ProgressBar value={p.progress} color={STATUS_COLOR[p.status]??"#7c3aed"}/>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

    
    </div>
  );
}