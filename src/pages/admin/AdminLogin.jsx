import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import Container from "../../components/layout/Container";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);

      navigate("/admin/dashboard");

    } catch (err) {
  console.log("FULL ERROR:", err);
  console.log("BACKEND RESPONSE:", err.response?.data);
  setError(err.response?.data?.message || "Login failed");
}

    setLoading(false);
  };

  return (
    <section className="relative min-h-screen bg-[#070707] text-white overflow-hidden">

      {/* Glow Background */}
      <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-purple-600/20 blur-[180px] rounded-full" />
      <div className="absolute -bottom-40 right-1/3 w-[600px] h-[600px] bg-blue-600/20 blur-[180px] rounded-full" />

      <Container>

        <div className="pt-40 pb-24 max-w-md mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10"
          >

            <h1 className="text-4xl font-bold mb-6 text-center">
              Admin{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Login
              </span>
            </h1>

            <form onSubmit={submit} className="space-y-6">

              <input
                required
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                required
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
              />

              <button
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {error && (
                <p className="text-red-400 text-center">
                  {error}
                </p>
              )}

            </form>

          </motion.div>

        </div>

      </Container>
    </section>
  );
}