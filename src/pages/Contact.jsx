import { useState } from "react";
import api from "../api/axios";
import Container from "../components/layout/Container";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/leads", form);
  };

  return (
    <section className="relative min-h-screen bg-[#070707] text-white py-40">

      <Container>
        <div className="max-w-3xl mx-auto">

          <h1 className="text-5xl font-bold mb-6 text-center">
            Let’s Build Something Great
          </h1>

          <p className="text-gray-400 text-center mb-16">
            Tell us about your vision and select the services you're interested in.
          </p>

          <form onSubmit={submit} className="space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">

            {/* Basic Info */}
            <input
              placeholder="Full Name"
              required
              onChange={e => setForm({...form, name:e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              onChange={e => setForm({...form, email:e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
            />

            <input
              placeholder="Company Name (Optional)"
              onChange={e => setForm({...form, company:e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
            />

            {/* Service Selection */}
            <select
              required
              onChange={e => setForm({...form, service:e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-300"
            >
              <option value="">Select Service</option>
              <option>Web Development</option>
              <option>Custom Software</option>
              <option>IT Consulting</option>
              <option>Digital Marketing</option>
              <option>Other</option>
            </select>

            {/* Budget */}
            <select
              onChange={e => setForm({...form, budget:e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-300"
            >
              <option value="">Project Budget</option>
              <option>₹50k – ₹1L</option>
              <option>₹1L – ₹5L</option>
              <option>₹5L+</option>
              <option>Not Sure</option>
            </select>

            {/* Timeline */}
            <select
              onChange={e => setForm({...form, timeline:e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-300"
            >
              <option value="">Project Timeline</option>
              <option>Immediately</option>
              <option>1–2 Months</option>
              <option>3–6 Months</option>
              <option>Just Exploring</option>
            </select>

            {/* Message */}
            <textarea
              rows="4"
              placeholder="Describe your project"
              required
              onChange={e => setForm({...form, message:e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
            />

            <button className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
              Send Inquiry
            </button>

          </form>

        </div>
      </Container>
    </section>
  );
}