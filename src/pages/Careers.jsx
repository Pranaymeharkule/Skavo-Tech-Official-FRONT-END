import { useState } from "react";
import api from "../api/axios";
import Container from "../components/layout/Container";
import { motion } from "framer-motion";

export default function Careers() {

  const [activeTab, setActiveTab] = useState("internship");

  return (
<section className="relative min-h-screen bg-[#070707] text-white overflow-hidden">
      {/* Glow Background */}
      <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-purple-600/20 blur-[180px] rounded-full" />
      <div className="absolute -bottom-40 right-1/3 w-[600px] h-[600px] bg-blue-600/20 blur-[180px] rounded-full" />

      <Container>

        {/* HERO */}
        <div className="pt-40 pb-24 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold mb-6"
          >
            Join{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              SkavoTech
            </span>
          </motion.h1>

          <p className="text-gray-400">
            Whether you're a student starting your journey or a professional
            seeking full-time growth, we have opportunities for you.
          </p>
        </div>

        {/* HALF-HALF OPTIONS */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">

          {/* Internship */}
          <div
            onClick={() => setActiveTab("internship")}
            className={`cursor-pointer rounded-3xl p-12 border transition ${
              activeTab === "internship"
                ? "border-purple-500 bg-white/5"
                : "border-white/10 bg-white/5 hover:border-purple-500/40"
            }`}
          >
            <h2 className="text-3xl font-semibold mb-4">
              Internship Program
            </h2>
            <p className="text-gray-400 mb-6">
              Hands-on industry training with real-world projects and certification.
            </p>
            <p className="text-purple-400 font-medium">
              Apply for Internship →
            </p>
          </div>

          {/* Full Time */}
          <div
            onClick={() => setActiveTab("fulltime")}
            className={`cursor-pointer rounded-3xl p-12 border transition ${
              activeTab === "fulltime"
                ? "border-purple-500 bg-white/5"
                : "border-white/10 bg-white/5 hover:border-purple-500/40"
            }`}
          >
            <h2 className="text-3xl font-semibold mb-4">
              Full-Time Opportunities
            </h2>
            <p className="text-gray-400 mb-6">
              Join our team of developers, marketers, and innovators.
            </p>
            <p className="text-purple-400 font-medium">
              Apply for Full-Time →
            </p>
          </div>

        </div>

        {/* FORM SECTION */}
        <div className="max-w-2xl mx-auto pb-32">

          {activeTab === "internship" && <InternshipForm />}
          {activeTab === "fulltime" && <FullTimeForm />}

        </div>

      </Container>
    </section>
  );
}

/* ============================= */
/* INTERNSHIP FORM */
/* ============================= */

function InternshipForm() {

  const [form, setForm] = useState({
    name: "",
    college: "",
    course: "",
    resume: null
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("type", "internship");
    fd.append("name", form.name);
    fd.append("college", form.college);
    fd.append("course", form.course);
    fd.append("resume", form.resume);

    try {
      await api.post("/careers", fd);
      setSuccess(true);
      setForm({ name: "", college: "", course: "", resume: null });
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 space-y-6"
    >
      <h3 className="text-2xl font-semibold mb-4">
        Internship Application
      </h3>

      <input
        required
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
      />

      <input
        required
        placeholder="College / University"
        value={form.college}
        onChange={e => setForm({ ...form, college: e.target.value })}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
      />

      <select
        required
        value={form.course}
        onChange={e => setForm({ ...form, course: e.target.value })}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-300"
      >
        <option value="">Select Course</option>
        <option>Python</option>
        <option>Java</option>
        <option>AI / ML</option>
        <option>Cyber Security</option>
      </select>

      <input
        type="file"
        required
        onChange={e => setForm({ ...form, resume: e.target.files[0] })}
        className="text-gray-400"
      />

      <button
        disabled={loading}
        className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
      >
        {loading ? "Submitting..." : "Submit Internship Application"}
      </button>

      {success && (
        <p className="text-green-400 text-center">
          Internship application submitted successfully!
        </p>
      )}
    </form>
  );
}

/* ============================= */
/* FULL TIME FORM */
/* ============================= */

function FullTimeForm() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    resume: null
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("type", "fulltime");
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("position", form.position);
    fd.append("resume", form.resume);

    try {
      await api.post("/careers", fd);
      setSuccess(true);
      setForm({ name: "", email: "", position: "", resume: null });
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 space-y-6"
    >
      <h3 className="text-2xl font-semibold mb-4">
        Full-Time Application
      </h3>

      <input
        required
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
      />

      <input
        required
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
      />

      <select
        required
        value={form.position}
        onChange={e => setForm({ ...form, position: e.target.value })}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-300"
      >
        <option value="">Select Position</option>
        <option>Frontend Developer</option>
        <option>Backend Developer</option>
        <option>Digital Marketing Specialist</option>
      </select>

      <input
        type="file"
        required
        onChange={e => setForm({ ...form, resume: e.target.files[0] })}
        className="text-gray-400"
      />

      <button
        disabled={loading}
        className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
      >
        {loading ? "Submitting..." : "Submit Job Application"}
      </button>

      {success && (
        <p className="text-green-400 text-center">
          Job application submitted successfully!
        </p>
      )}
    </form>
  );
}