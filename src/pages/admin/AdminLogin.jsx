import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif" }}
      className="min-h-screen bg-[#f8f7ff] flex items-center justify-center p-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,700&display=swap');
        .sk-serif{font-family:'Fraunces',Georgia,serif}
        .input-field{width:100%;padding:.75rem 1rem .75rem 2.75rem;border:1.5px solid #e5e7eb;border-radius:.875rem;font-size:.875rem;color:#1e293b;background:white;outline:none;transition:border-color .2s,box-shadow .2s;font-family:'DM Sans',system-ui,sans-serif}
        .input-field:focus{border-color:#7c3aed;box-shadow:0 0 0 3px rgba(124,58,237,.08)}
        .input-field::placeholder{color:#9ca3af}
      `}</style>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-100/60 blur-3xl"/>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-fuchsia-100/40 blur-3xl"/>
      </div>

      <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:.5, ease:[.22,1,.36,1] }}
        className="relative w-full max-w-sm">

        {/* Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-violet-100/30 p-8">

          {/* Logo */}
          <div className="text-center mb-8">
            <p className="sk-serif text-3xl font-bold text-violet-950 mb-1">
              Skavo<span style={{background:"linear-gradient(120deg,#6d28d9,#c026d3)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}} className="italic">.</span>
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Admin Control Panel</p>
          </div>

          <h1 className="sk-serif text-xl font-bold text-slate-900 mb-6 text-center">Welcome back</h1>

          <form onSubmit={submit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                <input required type="email" placeholder="admin@skavo.tech"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="input-field"/>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                <input required type={showPwd ? "text" : "password"} placeholder="••••••••"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  className="input-field pr-10"/>
                <button type="button" onClick={() => setShowPwd(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPwd ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200">
                <AlertCircle size={15} className="text-red-500 flex-shrink-0"/>
                <p className="text-xs font-medium text-red-700">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[.98] disabled:opacity-60 mt-2"
              style={{ background:"linear-gradient(135deg,#6d28d9,#c026d3)" }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          © {new Date().getFullYear()} Skavo Technologies Pvt. Ltd.
        </p>
      </motion.div>
    </div>
  );
}