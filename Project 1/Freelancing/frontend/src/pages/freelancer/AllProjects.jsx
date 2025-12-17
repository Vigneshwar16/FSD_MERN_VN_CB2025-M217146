import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AllProjects = () => {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [displayprojects, setDisplayProjects] = useState([]);

  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, [])

  const token = localStorage.getItem('token');

  const fetchProjects = async () => {
    await axios.get('http://localhost:5000/fetch-projects', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(
      (response) => {
        setProjects(response.data);
        setDisplayProjects(response.data.reverse());

        response.data.map((project) => {
          project.skills.map((skill) => {
            if (!allSkills.includes(skill)) {
              allSkills.push(skill);
            }
          })
        })
      }
    ).catch((err) => {
      console.log(err);
      fetchProjects();
    })
  }


  const [categoryFilter, setCategoryFilter] = useState([]);

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategoryFilter([...categoryFilter, value]);
    } else {
      setCategoryFilter(categoryFilter.filter(size => size !== value));
    }
  }

  useEffect(() => {


    if (categoryFilter.length > 0) {
      setDisplayProjects(projects.filter(project => categoryFilter.every(skill => project.skills.includes(skill))).reverse());
    } else {
      setDisplayProjects(projects.reverse());
    }


  }, [categoryFilter])


  return (

    <>
      {projects ?

        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar Filters */}
            <aside className="lg:col-span-1 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm sticky top-6 h-fit">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Filters</h3>
              <hr className="mb-4 border-gray-200" />

              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Skills</h5>

                  {allSkills.length > 0 ?
                    <div className="grid grid-cols-1 gap-2 max-h-64 overflow-auto pr-1">
                      {allSkills.map((skill) => (
                        <label key={skill} className="inline-flex items-center gap-2 text-sm text-gray-700">
                          <input
                            className="form-check-input h-4 w-4 border-gray-300 rounded"
                            type="checkbox"
                            value={skill}
                            onChange={handleCategoryCheckBox}
                          />
                          <span>{skill}</span>
                        </label>
                      ))}
                    </div>
                    : <p className="text-xs text-gray-400">No skills found yet.</p>}
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <button
                    onClick={() => setCategoryFilter([])}
                    className="text-sm text-gray-700 hover:text-black"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            </aside>

            {/* Projects List */}
            <main className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">All projects</h3>
                <div className="text-sm text-gray-500">{displayprojects.length} results</div>
              </div>

              <div className="space-y-6">
                {displayprojects.map((project) => (
                  <div
                    key={project._id}
                    onClick={() => navigate(`/project/${project._id}`)}
                    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{String(project.postedDate).slice(0, 24)}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Budget</div>
                        <div className="text-lg font-bold text-gray-900 mt-1">₹ {project.budget}</div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-3 line-clamp-3">{project.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span key={skill} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200">{skill}</span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                      <p>{project.bids.length} bids</p>
                      <h6>
                        ₹ {project.bids.length > 0 ? project.bidAmounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0) : 0} <span className="text-xs text-gray-400">(avg bid)</span>
                      </h6>
                    </div>

                    <hr className="mt-4 border-gray-100" />
                  </div>
                ))}
              </div>

              {displayprojects.length === 0 && (
                <div className="mt-8 text-center text-gray-500">
                  No projects found.
                </div>
              )}
            </main>

          </div>
        </div>
        : ""}
    </>
  )
}

export default AllProjects
