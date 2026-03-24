import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Download, X, Mail, Phone,
  BookOpen, Award, TrendingUp, DollarSign,
  CheckCircle, Clock, AlertTriangle, GraduationCap
} from "lucide-react";
import {
  Reveal, StatusBadge, Avatar, ProgressBar, SearchBar,
  PageHeader, PrimaryBtn, GhostBtn, PillFilter, RowActions, Table
} from "./adminUI";

/* ── Mock / API placeholder ── */
const MOCK_ENROLLMENTS = [
  { id: 1, student: "Jordan Kim",       course: "Full-Stack Bootcamp",     email: "jordan@gmail.com",  phone: "+1 555-0111", enrolled: "2025-03-01", progress: 68,  payment: "paid",        amount: 2400, status: "active",   cohort: "Mar 2025" },
  { id: 2, student: "Fatima Al-Hassan", course: "AI & ML Fundamentals",    email: "fatima@outlook.com",phone: "+20 100 123", enrolled: "2025-03-05", progress: 45,  payment: "installment", amount: 1800, status: "active",   cohort: "Mar 2025" },
  { id: 3, student: "Carlos Rivera",    course: "UI/UX Design Pro",        email: "carlos@gmail.com",  phone: "+34 600 123", enrolled: "2025-02-20", progress: 92,  payment: "paid",        amount: 1500, status: "active",   cohort: "Feb 2025" },
  { id: 4, student: "Mei Tanaka",       course: "Cloud & DevOps",          email: "mei@yahoo.com",     phone: "+81 90 1234", enrolled: "2025-03-10", progress: 22,  payment: "pending",     amount: 2100, status: "pending",  cohort: "Mar 2025" },
  { id: 5, student: "Oluwaseun Adeyemi",course: "Full-Stack Bootcamp",     email: "seun@proton.me",    phone: "+234 80 123", enrolled: "2025-02-15", progress: 100, payment: "paid",        amount: 2400, status: "complete", cohort: "Feb 2025" },
  { id: 6, student: "Emma Fischer",     course: "Mobile App Dev",          email: "emma@gmail.com",    phone: "+49 176 123", enrolled: "2025-03-08", progress: 31,  payment: "paid",        amount: 1900, status: "active",   cohort: "Mar 2025" },
  { id: 7, student: "Liam O'Brien",     course: "AI & ML Fundamentals",    email: "liam@icloud.com",   phone: "+353 87 123", enrolled: "2025-02-28", progress: 58,  payment: "paid",        amount: 1800, status: "active",   cohort: "Feb 2025" },
  { id: 8, student: "Priya Sharma",     course: "UI/UX Design Pro",        email: "priya@gmail.com",   phone: "+91 98001 1", enrolled: "2025-03-12", progress: 14,  payment: "installment", amount: 1500, status: "active",   cohort: "Mar 2025" },
  { id: 9, student: "Kwame Boateng",    course: "Cloud & DevOps",          email: "kwame@outlook.com", phone: "+233 54 123", enrolled: "2025-01-20", progress: 100, payment: "paid",        amount: 2100, status: "complete", cohort: "Jan 2025" },
  { id: 10,student: "Sofia Andersson",  course: "Mobile App Dev",          email: "sofia@gmail.com",   phone: "+46 70 123",  enrolled: "2025-03-14", progress: 8,   payment: "pending",     amount: 1900, status: "pending",  cohort: "Mar 2025" },
];

const COURSES = [
  { name: "Full-Stack Bootcamp",  color: "#7c3aed", students: 0 },
  { name: "AI & ML Fundamentals", color: "#2563eb", students: 0 },
  { name: "UI/UX Design Pro",     color: "#c026d3", students: 0 },
  { name: "Cloud & DevOps",       color: "#059669", students: 0 },
  { name: "Mobile App Dev",       color: "#d97706", students: 0 },
];

const PAYMENT_STYLE = {
  paid:        { bg: "#f0fdf4", text: "#16a34a", label: "Paid"        },
  installment: { bg: "#fffbeb", text: "#d97706", label: "Installment" },
  pending:     { bg: "#fef2f2", text: "#dc2626", label: "Pending"     },
};

/* ── Student detail modal ── */
function StudentModal({ student, onClose }) {
  const payStyle = PAYMENT_STYLE[student.payment];
  const course = COURSES.find(c => c.name === student.course);

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
        className="bg-white rounded-3xl border-2 border-black w-full max-w-md p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-xl border border-black flex items-center justify-center text-gray-400 hover:bg-gray-50">
          <X size={14} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <Avatar name={student.student} size="lg" />
          <div>
            <h3 className="font-bold text-slate-900 text-lg" style={{ fontFamily: "'Fraunces',serif" }}>{student.student}</h3>
            <p className="text-sm text-gray-500">{student.email}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <StatusBadge status={student.status} />
            </div>
          </div>
        </div>

        {/* Course + progress */}
        <div className="p-4 rounded-2xl border-2 border-black mb-4" style={{ background: `${course?.color ?? "#7c3aed"}08` }}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={14} style={{ color: course?.color ?? "#7c3aed" }} />
            <p className="font-bold text-slate-900 text-sm">{student.course}</p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Progress</p>
            <span className="font-bold text-sm" style={{ fontFamily: "'Fraunces',serif", color: course?.color ?? "#7c3aed" }}>
              {student.progress}%
            </span>
          </div>
          <ProgressBar value={student.progress} color={course?.color ?? "#7c3aed"} />
          <p className="text-[10px] text-gray-400 mt-2">Cohort: {student.cohort}</p>
        </div>

        {/* Payment */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-xl border-2 border-black text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Amount</p>
            <p className="font-bold text-slate-900 text-lg" style={{ fontFamily: "'Fraunces',serif" }}>
              ${student.amount.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-xl border-2 border-black text-center" style={{ background: payStyle.bg }}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment</p>
            <p className="font-bold text-sm" style={{ color: payStyle.text }}>{payStyle.label}</p>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-2 mb-6">
          {[
            { icon: Mail,     val: student.email    },
            { icon: Phone,    val: student.phone    },
            { icon: Clock,    val: `Enrolled ${student.enrolled}` },
          ].map(({ icon: Icon, val }) => (
            <div key={val} className="flex items-center gap-3 text-sm p-2.5 rounded-xl border border-gray-100 bg-gray-50">
              <Icon size={13} className="text-violet-500 flex-shrink-0" />
              <span className="text-slate-700 font-medium">{val}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-violet-800 transition-colors">
            Send Message
          </button>
          <button className="flex-1 py-3 rounded-xl border-2 border-black text-sm font-bold text-slate-700 hover:bg-gray-50 transition-colors">
            View Progress
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Payment Badge ── */
function PaymentBadge({ payment }) {
  const s = PAYMENT_STYLE[payment] ?? PAYMENT_STYLE.pending;
  return (
    <span
      style={{ background: s.bg, color: s.text }}
      className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
    >
      {s.label}
    </span>
  );
}

/* ── Main Page ── */
export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => { setEnrollments(MOCK_ENROLLMENTS); setLoading(false); }, 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = enrollments.filter(e => {
    const matchStatus = filter === "all" || e.status === filter;
    const matchCourse = courseFilter === "all" || e.course === courseFilter;
    const matchSearch = e.student.toLowerCase().includes(search.toLowerCase()) ||
                        e.course.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchCourse && matchSearch;
  });

  const totalRevenue = enrollments.filter(e => e.payment === "paid").reduce((s, e) => s + e.amount, 0);
  const avgProgress  = enrollments.length
    ? Math.round(enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length)
    : 0;

  // Course breakdown
  const courseBreakdown = COURSES.map(c => ({
    ...c,
    students: enrollments.filter(e => e.course === c.name).length,
    revenue:  enrollments.filter(e => e.course === c.name && e.payment === "paid").reduce((s, e) => s + e.amount, 0),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enrollments"
        subtitle={`${enrollments.length} students · $${(totalRevenue/1000).toFixed(1)}k revenue collected`}
      >
        <SearchBar placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} />
        <GhostBtn icon={Download}>Export CSV</GhostBtn>
        <PrimaryBtn icon={Plus}>Enroll Student</PrimaryBtn>
      </PageHeader>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Students",   value: enrollments.length,                                          color: "#7c3aed", bg: "#f5f3ff", icon: GraduationCap },
          { label: "Active",           value: enrollments.filter(e => e.status === "active").length,        color: "#2563eb", bg: "#eff6ff", icon: BookOpen      },
          { label: "Completed",        value: enrollments.filter(e => e.status === "complete").length,      color: "#16a34a", bg: "#f0fdf4", icon: Award         },
          { label: "Revenue Collected",value: `$${(totalRevenue/1000).toFixed(1)}k`,                        color: "#d97706", bg: "#fffbeb", icon: DollarSign    },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={i} delay={i * 0.06}>
              <div className="rounded-2xl border-2 border-black p-5 flex items-center gap-4" style={{ background: s.bg }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center border-2 border-black flex-shrink-0"
                  style={{ background: `${s.color}18` }}>
                  <Icon size={18} style={{ color: s.color }} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-bold text-xl" style={{ fontFamily: "'Fraunces',serif", color: s.color }}>{s.value}</p>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{s.label}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Course breakdown */}
      <Reveal>
        <div className="bg-white rounded-2xl border-2 border-black p-6">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Course Breakdown</p>
          <div className="space-y-4">
            {courseBreakdown.filter(c => c.students > 0).map((c) => (
              <div key={c.name} className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                <p className="text-sm font-medium text-slate-700 w-48 flex-shrink-0 truncate">{c.name}</p>
                <div className="flex-1">
                  <ProgressBar value={(c.students / enrollments.length) * 100} color={c.color} />
                </div>
                <span className="text-xs font-bold text-slate-900 w-16 text-right">{c.students} students</span>
                <span className="text-xs text-gray-400 w-16 text-right font-medium">${(c.revenue/1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          {["all","active","pending","complete"].map(f => (
            <PillFilter key={f} label={f === "all" ? "All" : f} active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={courseFilter}
            onChange={e => setCourseFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-xs font-bold border-2 border-black rounded-xl bg-white text-slate-700 focus:outline-none focus:border-violet-500 cursor-pointer"
          >
            <option value="all">All Courses</option>
            {COURSES.map(c => <option key={c.name}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border-2 border-black p-6 space-y-4">
          {Array(5).fill(0).map((_,i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                <div className="h-2 bg-gray-100 rounded-full w-1/4" />
              </div>
              <div className="w-24 h-2 bg-gray-100 rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <Reveal>
          <Table headers={["Student","Course","Enrolled","Progress","Payment","Amount","Status","Actions"]}>
            {filtered.map((en, i) => {
              const course = COURSES.find(c => c.name === en.course);
              return (
                <motion.tr
                  key={en.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-violet-50/40 transition-colors cursor-pointer"
                  onClick={() => setSelected(en)}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={en.student} size="sm" />
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{en.student}</p>
                        <p className="text-[10px] text-gray-400">{en.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: course?.color ?? "#7c3aed" }} />
                      <span className="text-sm text-slate-700 font-medium max-w-[130px] truncate">{en.course}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-400">{en.enrolled}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20">
                        <ProgressBar value={en.progress} color={en.progress === 100 ? "#16a34a" : course?.color ?? "#7c3aed"} />
                      </div>
                      <span className="text-xs font-bold text-gray-600">{en.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><PaymentBadge payment={en.payment} /></td>
                  <td className="px-5 py-4 font-bold text-slate-900 text-sm" style={{ fontFamily: "'Fraunces',serif" }}>
                    ${en.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={en.status} /></td>
                  <td className="px-5 py-4" onClick={e => e.stopPropagation()}><RowActions /></td>
                </motion.tr>
              );
            })}
          </Table>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">🎓</p>
              <p className="font-bold text-slate-700 text-lg">No enrollments found</p>
              <p className="text-sm mt-1">Try adjusting filters or enrolling a new student.</p>
            </div>
          )}
        </Reveal>
      )}

      {/* Avg Progress bar */}
      {!loading && enrollments.length > 0 && (
        <Reveal>
          <div className="bg-white rounded-2xl border-2 border-black p-5 flex items-center gap-6">
            <div className="flex-shrink-0">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Average Student Progress</p>
              <p className="font-bold text-2xl mt-1" style={{ fontFamily: "'Fraunces',serif", color: "#7c3aed" }}>
                {avgProgress}%
              </p>
            </div>
            <div className="flex-1">
              <ProgressBar value={avgProgress} color="#7c3aed" />
            </div>
          </div>
        </Reveal>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selected && <StudentModal student={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}