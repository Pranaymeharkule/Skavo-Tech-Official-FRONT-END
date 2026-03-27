import React, { useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, FileText, Briefcase,
  FolderKanban, GraduationCap, Bell, Menu, X,
  ChevronRight, Settings, LogOut, ChevronDown
} from "lucide-react";

const NAV = [
  { to:"dashboard",    label:"Dashboard",         icon:LayoutDashboard, badge:null },
  { to:"leads",        label:"Project Leads",     icon:GraduationCap,   badge:null },
  { to:"applications", label:"Job Applications",   icon:FileText,        badge:null },
  { to:"vacancies",    label:"Vacancies",          icon:Briefcase,       badge:null },
  { to:"projects",     label:"Projects",           icon:FolderKanban,    badge:null },
  { to:"enrollments",  label:"Enrollment Inquiries",  icon:Users,           badge:null },
];

const NOTIFICATIONS = [
  { text:"New job application received",     time:"2 min ago",  dot:"#7c3aed" },
  { text:"FleetOps milestone reached 95%",   time:"14 min ago", dot:"#16a34a" },
  { text:"New training inquiry from Pune",   time:"1 hr ago",   dot:"#d97706" },
];

export default function AdminLayout() {
  const [sideOpen,   setSideOpen]   = useState(false);
  const [notifOpen,  setNotifOpen]  = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  const currentPage = NAV.find(n => location.pathname.includes(n.to));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div style={{fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif"}} className="min-h-screen bg-gray-50 flex">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,700&display=swap');
        .sk-serif{font-family:'Fraunces',Georgia,serif}
        .sk-grad{background:linear-gradient(120deg,#6d28d9,#c026d3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#e9d5ff;border-radius:4px}
        .nav-item{display:flex;align-items:center;gap:.6rem;padding:.6rem .85rem;border-radius:.75rem;font-size:.82rem;font-weight:600;color:#6b7280;transition:all .15s;text-decoration:none;width:100%}
        .nav-item:hover:not(.nav-active){background:#f5f3ff;color:#6d28d9}
        .nav-active{background:#1e1b4b !important;color:white !important}
        .nav-active .nav-chevron{opacity:.4}
      `}</style>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sideOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={()=>setSideOpen(false)}/>
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside className={`fixed lg:static top-0 left-0 h-full z-50 w-60 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-out ${sideOpen?"translate-x-0":"-translate-x-full lg:translate-x-0"}`}>

        {/* Logo */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="sk-serif font-bold text-[1.15rem] text-gray-900 leading-none">Skavo <span className="sk-grad">Admin</span></p>
            <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">Control Panel</p>
          </div>
          <button onClick={()=>setSideOpen(false)} className="lg:hidden w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
            <X size={14}/>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 py-2 mt-1">Navigation</p>
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={()=>setSideOpen(false)}
              className={({ isActive }) => `nav-item ${isActive?"nav-active":""}`}>
              <Icon size={15} strokeWidth={1.8}/>
              <span className="flex-1 truncate">{label}</span>
              <ChevronRight size={11} className="nav-chevron opacity-20"/>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-gray-100 space-y-0.5">
          <button className="nav-item"><Settings size={15} strokeWidth={1.8}/> Settings</button>
          <button onClick={handleLogout} className="nav-item !text-red-500 hover:!bg-red-50 hover:!text-red-600">
            <LogOut size={15} strokeWidth={1.8}/> Sign Out
          </button>
          {/* User */}
          <div className="mt-2 flex items-center gap-2.5 p-3 rounded-xl border border-gray-100 bg-gray-50 cursor-pointer hover:border-violet-200 transition-colors">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{background:"linear-gradient(135deg,#4c1d95,#c026d3)"}}>SA</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-900">Super Admin</p>
              <p className="text-[10px] text-gray-400 truncate">admin@skavo.tech</p>
            </div>
            <ChevronDown size={11} className="text-gray-400"/>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-5 sm:px-7 py-3.5 flex items-center gap-3 sticky top-0 z-30">
          <button onClick={()=>setSideOpen(true)} className="lg:hidden w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <Menu size={16}/>
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Skavo Tech</p>
            <h1 className="sk-serif font-bold text-gray-900 text-base leading-tight truncate">{currentPage?.label ?? "Admin Panel"}</h1>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button onClick={()=>setNotifOpen(p=>!p)}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-violet-50 hover:border-violet-200 transition-all">
              <Bell size={15} className="text-gray-500"/>
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-fuchsia-500 rounded-full animate-pulse"/>
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div initial={{opacity:0,y:8,scale:.97}} animate={{opacity:1,y:0,scale:1}}
                  exit={{opacity:0,y:6,scale:.97}} transition={{duration:.18}}
                  className="absolute right-0 top-12 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <p className="sk-serif font-bold text-gray-900 text-sm">Notifications</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">{NOTIFICATIONS.length} new</span>
                      <button onClick={()=>setNotifOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={13}/></button>
                    </div>
                  </div>
                  {NOTIFICATIONS.map((n,i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer">
                      <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{background:n.dot}}/>
                      <div>
                        <p className="text-xs font-medium text-gray-700 leading-snug">{n.text}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-2.5 bg-gray-50 text-center">
                    <button className="text-xs font-bold text-violet-600 hover:text-violet-800 transition-colors">Mark all as read</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-7">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname}
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}}
              transition={{duration:.22,ease:[.22,1,.36,1]}}>
              <Outlet/>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}