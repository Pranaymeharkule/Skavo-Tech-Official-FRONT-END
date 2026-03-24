import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-[#070707] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-black/60 backdrop-blur-xl border-r border-white/10 p-8 flex flex-col justify-between">

        <div>
          <h2 className="text-2xl font-bold mb-12">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              SkavoTech
            </span>
          </h2>

          <nav className="space-y-5">
            <LinkItem to="/admin/dashboard" label="Dashboard" />
            <LinkItem to="/admin/leads" label="Leads" />
            <LinkItem to="/admin/applications" label="Applications" />
            <LinkItem to="/admin/vacancies" label="Vacancies" />
            <LinkItem to="/admin/projects" label="Projects" />
            <LinkItem to="/admin/enrollments" label="Enrollments" />
          </nav>
        </div>

        <button
          onClick={logout}
          className="py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-12">
        <Outlet />
      </main>
    </div>
  );
}

function LinkItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-xl transition ${
          isActive
            ? "bg-white/10 border border-purple-500/40"
            : "hover:bg-white/5"
        }`
      }
    >
      {label}
    </NavLink>
  );
}