import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminProjects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects")
      .then(res => setProjects(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Projects</h1>

      {projects.map(project => (
        <div key={project._id} className="bg-white/5 p-5 rounded-xl mb-4">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}