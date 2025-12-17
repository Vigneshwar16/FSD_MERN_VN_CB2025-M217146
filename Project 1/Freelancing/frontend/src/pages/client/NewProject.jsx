import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const NewProject = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState(0);
    const [skills, setSkills] = useState('');

    const navigate = useNavigate();

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const response = await axios.post(
      "http://localhost:5000/new-project",
      {
        title,
        description,
        budget,
        skills,
        clientId: localStorage.getItem("userId"),
        clientName: localStorage.getItem("username"),
        clientEmail: localStorage.getItem("email"),
      },
      config
    );

    alert("New project added!!");
    setTitle("");
    setDescription("");
    setBudget(0);
    setSkills("");
    navigate("/client");
  } catch (err) {
    console.log(err.response?.data?.msg || err.message);
    alert("Operation failed!!");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">Post new project</h3>
            <p className="text-sm text-gray-500">Share your requirements to find the right freelancer</p>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Project title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Enter project title"
                onChange={(e)=>setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Describe the project, deliverables and timeline"
                onChange={(e)=>setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Budget (in &#8377;)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                  placeholder="e.g., 15000"
                  onChange={(e)=>setBudget(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Required skills (separate each with ,)</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                  placeholder="react, node, mongo"
                  onChange={(e)=>setSkills(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                onClick={() => {
                  // preserve navigation behavior: simply go back to client page
                  navigate('/client');
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:opacity-95 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* small footnote */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Tip: Add clear requirements and an estimated budget to attract better proposals.
        </p>
      </div>
    </div>
  )
}

export default NewProject
