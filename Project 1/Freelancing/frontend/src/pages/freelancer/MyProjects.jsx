import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const MyProjects = () => {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, [])

  const fetchProjects = async () => {
    await axios.get('http://localhost:5000/fetch-projects').then(
      (response) => {
        const pros = response.data.filter(pro => pro.freelancerId === localStorage.getItem('userId'));
        setProjects(pros);
        setDisplayProjects(pros.reverse());
      }
    ).catch((err) => {
      console.log(err);
      fetchProjects();
    })
  }



  const handleFilterChange = (data) => {
    if (data === "") {
      setDisplayProjects(projects.reverse());
    } else if (data === "In Progress") {
      setDisplayProjects(projects.filter((project) => project.status === "Assigned").reverse());
    } else if (data === "Completed") {
      setDisplayProjects(projects.filter((project) => project.status === "Completed").reverse());
    }
  }



  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">My Projects</h3>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700 hidden md:block">Filter status:</label>
            <select
              className="border border-gray-300 bg-white px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="">Choose project status</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <hr className="mb-6 border-gray-200" />

        {/* Projects list */}
        <div className="space-y-6">
          {displayProjects.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center text-gray-500">
              No projects found.
            </div>
          )}

          {displayProjects.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate(`/project/${project._id}`)}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{String(project.postedDate).slice(0, 24)}</p>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-600">Budget</div>
                  <div className="text-lg font-bold text-gray-900">₹ {project.budget}</div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-3 line-clamp-3">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {Array.isArray(project.skills) && project.skills.map((skill) => (
                  <span key={skill} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200">{skill}</span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <p>{project.bids?.length ?? 0} bids</p>
                <h6>
                  ₹ {project.bids && project.bidAmounts && project.bids.length > 0 ? project.bidAmounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0) : 0} <span className="text-xs text-gray-400"> (avg bid)</span>
                </h6>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className={`inline-block text-xs font-semibold px-3 py-1 rounded-full
                  ${project.status === 'Assigned' ? 'bg-blue-100 text-blue-700' : ''}
                  ${project.status === 'Completed' ? 'bg-green-100 text-green-700' : ''}
                  ${project.status === 'Available' ? 'bg-yellow-100 text-yellow-800' : ''}
                `}>
                  {project.status}
                </div>

                <div className="text-xs text-gray-500">Click to view details</div>
              </div>

              <hr className="mt-4 border-gray-100" />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default MyProjects
