import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = () => {
    api.get("/leads")
      .then(res => setLeads(res.data));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = async (id) => {
    await api.delete(`/leads/${id}`);
    fetchLeads();
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/leads/${id}`, { status });
    fetchLeads();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Client Leads</h1>

      {leads.map(lead => (
        <div key={lead._id} className="bg-white/5 p-6 rounded-xl mb-4">

          <h3 className="text-xl">{lead.name}</h3>
          <p>{lead.email}</p>
          <p>{lead.message}</p>

          <select
            value={lead.status}
            onChange={(e) => updateStatus(lead._id, e.target.value)}
            className="mt-3 bg-black border border-white/20 p-2 rounded"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>

          <button
            onClick={() => deleteLead(lead._id)}
            className="ml-4 bg-red-600 px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}