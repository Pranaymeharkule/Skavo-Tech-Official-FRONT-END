import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminApplications() {

  const [apps, setApps] = useState([]);

const fetchApps = () => {
  console.log("Fetching applications...");

  api.get("/careers")
    .then(res => {
      console.log("API Response:", res.data);
      setApps(res.data);
    })
    .catch(err => {
      console.log("API Error:", err);
    });
};

  useEffect(() => {
    fetchApps();
  }, []);

  const deleteApp = async (id) => {
    await api.delete(`/careers/${id}`);
    fetchApps();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Applications</h1>

      {apps.length === 0 && (
        <p className="text-gray-400">No applications yet.</p>
      )}

      {apps.map(app => (
        <div key={app._id} className="bg-white/5 p-6 rounded-xl mb-4">

          <h3 className="text-xl font-semibold">{app.name}</h3>

          {app.email && (
            <p className="text-gray-300">{app.email}</p>
          )}

          {/* Show Role Type */}
          <p className="text-purple-400 mt-1">
            Applied for: {app.type}
          </p>

          {/* Internship Info */}
          {app.type === "internship" && (
            <>
              <p className="text-gray-300">College: {app.college}</p>
              <p className="text-gray-300">Course: {app.course}</p>
            </>
          )}

          {/* Full Time Info */}
          {app.type === "fulltime" && (
            <p className="text-gray-300">
              Position: {app.position}
            </p>
          )}

          <a
            href={app.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 block mt-2"
          >
            View Resume
          </a>

          <button
            onClick={() => deleteApp(app._id)}
            className="mt-3 bg-red-600 px-4 py-2 rounded"
          >
            Delete
          </button>

        </div>
      ))}
    </div>
  );
}