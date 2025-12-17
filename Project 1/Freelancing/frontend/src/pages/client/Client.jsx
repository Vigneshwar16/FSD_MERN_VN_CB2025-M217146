import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Client = () => {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, [])

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get("http://localhost:5000/fetch-projects", config);

      let pros = response.data.filter(
        pro => pro.clientId === localStorage.getItem('userId')
      );
      setProjects(pros);
      setDisplayProjects(pros.reverse());
    } catch (err) {
      console.log(err.response?.data?.msg || err.message);
    }
  };

  const [filterProject, setFilterProject] = useState('');

  const handleFilterChange = (data) => {
    if (data === "") {
      setDisplayProjects(projects);
    } else if (data === "Un Assigned") {
      setDisplayProjects(projects.filter(project => project.status === "Available").reverse());
    } else if (data === "In Progress") {
      setDisplayProjects(projects.filter(project => project.status === "Assigned").reverse());
    } else if (data === "Completed") {
      setDisplayProjects(projects.filter(project => project.status === "Completed").reverse());
    }
  };


  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 md:px-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 tracking-wide">
          My Projects
        </h3>

        <select
          className="mt-3 md:mt-0 border border-gray-300 bg-white px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:outline-none cursor-pointer"
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="">Choose project status</option>
          <option value="Un Assigned">Un Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <hr className="mb-6 border-gray-300" />

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayProjects.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/client-project/${project._id}`)}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {project.title}
              </h3>

              <p className="text-xs text-gray-500">
                {String(project.postedDate).slice(0, 25)}
              </p>
            </div>

            <h5 className="text-sm font-medium text-gray-700 mb-2">
              Budget: <span className="text-black font-bold">₹ {project.budget}</span>
            </h5>

            <p className="text-sm text-gray-600 mb-4">
              {project.description}
            </p>

            <div className="flex justify-between items-center">
              <h6 className="text-sm font-semibold">
                Status: 
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs 
                  ${project.status === "Available" && "bg-yellow-100 text-yellow-700"}
                  ${project.status === "Assigned" && "bg-blue-100 text-blue-700"}
                  ${project.status === "Completed" && "bg-green-100 text-green-700"}
                `}
                >
                  {project.status}
                </span>
              </h6>
            </div>

            <hr className="mt-4 border-gray-200" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Client
