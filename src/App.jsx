import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Training from "./pages/Training";
import AdminLogin from "./pages/admin/AdminLogin";

import ProtectedRoute from "./routes/ProtectedRoute";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminVacancies from "./pages/admin/AdminVacancies";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminEnrollments from "./pages/admin/AdminEnrollments";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>

      <Routes>
        {/* ================= PUBLIC WEBSITE ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/training" element={<Training />} />

        {/* ================= ADMIN LOGIN ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ================= ADMIN PANEL ================= */}
        <Route path="/admin" element={
  <ProtectedRoute>
    <AdminLayout />
  </ProtectedRoute>
}>
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="leads" element={<AdminLeads />} />
  <Route path="applications" element={<AdminApplications />} />
  <Route path="vacancies" element={<AdminVacancies />} />
  <Route path="projects" element={<AdminProjects />} />
  <Route path="enrollments" element={<AdminEnrollments />} />
</Route>
      </Routes>

    </>
  );
}