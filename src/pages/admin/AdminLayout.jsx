import React, { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, FileText, Briefcase,
  FolderKanban, GraduationCap, Bell, Menu, X,
  ChevronRight, Settings, LogOut, ChevronDown
} from "lucide-react";

const NAV = [
  { to: "dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { to: "leads",        label: "Leads",        icon: Users },
  { to: "applications", label: "Applications", icon: FileText },
  { to: "vacancies",    label: "Vacancies",    icon: Briefcase },
  { to: "projects",     label: "Projects",     icon: FolderKanban },
  { to: "enrollments",  label: "Enrollments",  icon: GraduationCap },
];

export default function AdminLayout() {
  const [sideOpen, setSideOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();

  const currentPage = NAV.find(n => location.pathname.includes(n.to));

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}
      className="min-h-screen bg-[#f8f7ff] flex"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,600;1,9..144,800&display=swap');
        .sk-serif { font-family: 'Fraunces', Georgia, serif !important; }
        .sk-grad  { background: linear-gradient(120deg,#6d28d9,#c026d3); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 4px; }
        .sk-nav-active  { background: #0f0f0f !important; color: #fff !important; }
        .sk-nav-active svg { color: #fff !important; }
        .sk-nav-item:hover:not(.sk-nav-active) { background: #f0eeff; color: #6d28d9; }
      `}</style>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {sideOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSideOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── SIDEBAR ── */}
      <aside className={`
        fixed lg:static top-0 left-0 h-full z-50 w-64 bg-white border-r-2 border-black
        flex flex-col transition-transform duration-300 ease-out
        ${sideOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="px-6 py-5 border-b-2 border-black flex items-center justify-between">
          <div>
            <p className="sk-serif font-bold text-[1.35rem] text-slate-900 leading-none">
              Skavo <span className="sk-grad">Admin</span>
            </p>
            <p className="text-[9px] text-gray-400 font-bold tracking-[0.25em] uppercase mt-1">
              Control Panel
            </p>
          </div>
          <button
            onClick={() => setSideOpen(false)}
            className="lg:hidden w-8 h-8 rounded-lg border border-black flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em] px-3 pb-2 pt-1">
            Main Menu
          </p>
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSideOpen(false)}
              className={({ isActive }) =>
                `sk-nav-item w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-gray-600 ${isActive ? "sk-nav-active" : ""}`
              }
            >
              <Icon size={16} strokeWidth={1.8} />
              {label}
              <ChevronRight size={13} className="ml-auto opacity-40" />
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t-2 border-black space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
            <Settings size={15} strokeWidth={1.8} />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-50 transition-colors">
            <LogOut size={15} strokeWidth={1.8} />
            Sign Out
          </button>

          {/* User card */}
          <div className="mt-3 flex items-center gap-3 p-3 rounded-xl border border-black bg-[#fdfdff] hover:border-violet-400 transition-colors cursor-pointer">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#4c1d95,#c026d3)" }}
            >
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">Super Admin</p>
              <p className="text-[10px] text-gray-400 truncate">admin@skavo.tech</p>
            </div>
            <ChevronDown size={12} className="text-gray-400 flex-shrink-0" />
          </div>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b-2 border-black px-5 sm:px-8 py-3.5 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSideOpen(true)}
            className="lg:hidden w-9 h-9 rounded-xl border border-black flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <Menu size={17} />
          </button>

          <div className="flex-1">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
              Skavo Tech
            </p>
            <h1 className="sk-serif font-bold text-slate-900 text-lg leading-tight">
              {currentPage?.label ?? "Admin"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Notif */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(p => !p)}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-black hover:bg-violet-50 transition-colors"
              >
                <Bell size={16} className="text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-fuchsia-500 rounded-full" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-72 bg-white border-2 border-black rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-black">
                      <p className="sk-serif font-bold text-slate-900">Notifications</p>
                    </div>
                    {[
                      { text: "New lead from CartPilot", time: "2m ago", dot: "#7c3aed" },
                      { text: "FleetOps hit 95% milestone", time: "14m ago", dot: "#16a34a" },
                      { text: "Nina Volkova: offer stage", time: "1h ago", dot: "#d97706" },
                    ].map((n, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-violet-50 transition-colors border-b border-gray-50">
                        <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.dot }} />
                        <div>
                          <p className="text-sm font-medium text-slate-800">{n.text}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))}
                    <div className="px-4 py-2.5 text-center">
                      <button className="text-xs font-bold text-violet-600 hover:text-violet-800">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}