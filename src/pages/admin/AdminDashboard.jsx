import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  const { stats, recentLeads, recentApplications } = data;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-16">
        <Card title="Total Leads" value={stats.totalLeads} />
        <Card title="Applications" value={stats.totalApplications} />
        <Card title="Projects" value={stats.totalProjects} />
      </div>

      {/* Recent Leads */}
      <h2 className="text-2xl font-semibold mb-6">Recent Leads</h2>
      {recentLeads.map(lead => (
        <div key={lead._id} className="bg-white/5 p-4 rounded-xl mb-3">
          <h3>{lead.name}</h3>
          <p>{lead.email}</p>
          <p>Status: {lead.status}</p>
        </div>
      ))}

      {/* Recent Applications */}
      <h2 className="text-2xl font-semibold mt-12 mb-6">Recent Applications</h2>
      {recentApplications.map(app => (
        <div key={app._id} className="bg-white/5 p-4 rounded-xl mb-3">
          <h3>{app.name}</h3>
          <p>{app.email}</p>
          <a
            href={app.resume}
            target="_blank"
            className="text-blue-400"
          >
            View Resume
          </a>
        </div>
      ))}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
      <h2 className="text-gray-400">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}