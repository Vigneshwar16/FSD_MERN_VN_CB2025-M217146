import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Admin = () => {

  const navigate = useNavigate();

  const [projectsCount, setProjectsCount] = useState(0);
  const [completedProsCount, setCompletedProsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);


  useEffect(() => {
    fetchProjects();
    fetchApplications();
    fetchUsers();
  }, [])

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("http://localhost:5000/fetch-projects", config);

      setProjectsCount(response.data.length);
      const comPros = response.data.filter((pro) => pro.status === "Completed");
      setCompletedProsCount(comPros.length);
    } catch (err) {
      console.log(err.response?.data?.msg || err.message);
    }
  };

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("http://localhost:5000/fetch-applications", config);

      setApplicationsCount(response.data.length);
    } catch (err) {
      console.log(err.response?.data?.msg || err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("http://localhost:5000/fetch-users", config);

      setUsersCount(response.data.length);
    } catch (err) {
      console.log(err.response?.data?.msg || err.message);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">Overview of platform activity</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-sm text-gray-500">All Projects</h4>
              <p className="text-3xl font-bold text-gray-900 mt-3">{projectsCount}</p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate('/admin-projects')}
                className="w-full text-sm px-4 py-2 rounded-lg bg-gray-900 text-white hover:opacity-95 transition"
              >
                View projects
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-sm text-gray-500">Completed projects</h4>
              <p className="text-3xl font-bold text-gray-900 mt-3">{completedProsCount}</p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate('/admin-projects')}
                className="w-full text-sm px-4 py-2 rounded-lg bg-gray-900 text-white hover:opacity-95 transition"
              >
                View projects
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-sm text-gray-500">Applications</h4>
              <p className="text-3xl font-bold text-gray-900 mt-3">{applicationsCount}</p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate('/admin-applications')}
                className="w-full text-sm px-4 py-2 rounded-lg bg-gray-900 text-white hover:opacity-95 transition"
              >
                View Applications
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-sm text-gray-500">Users</h4>
              <p className="text-3xl font-bold text-gray-900 mt-3">{usersCount}</p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate('/all-users')}
                className="w-full text-sm px-4 py-2 rounded-lg bg-gray-900 text-white hover:opacity-95 transition"
              >
                View Users
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Admin
