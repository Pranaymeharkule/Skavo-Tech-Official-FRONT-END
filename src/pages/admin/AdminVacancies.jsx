import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminVacancies() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        setError("Failed to load job vacancies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading vacancies...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">Job Vacancies</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-400">No vacancies available</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl mb-4 hover:border-indigo-500 transition"
          >
            <h3 className="text-xl font-semibold">{job.title}</h3>

            <p className="text-gray-400 mt-2">
              {job.description}
            </p>
          </div>
        ))
      )}
    </div>
  );
}