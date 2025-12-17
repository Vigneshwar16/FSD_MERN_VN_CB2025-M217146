import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Freelancer = () => {

  const [isDataUpdateOpen, setIsDataUpdateOpen] = useState(false);

  const navigate = useNavigate();

  const [freelancerData, setFreelancerData] = useState();

  const [skills, setSkills] = useState([]);

  const [description, setDescription] = useState('');

  const [freelancerId, setFreelancerId] = useState('');

  const [updateSkills, setUpdateSkills] = useState('');

  const [updateDescription, setUpdateDescription] = useState('');

  useEffect(() => {
    // prefer explicit id from localStorage
    const uid = localStorage.getItem('userId');
    if (uid) fetchUserData(uid);
  }, [])

  const fetchUserData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const uid = id || localStorage.getItem('userId');
      if (!uid) return;

      const response = await axios.get(`http://localhost:5000/fetch-freelancer/${uid}`, config);
      const data = response.data;
      setFreelancerData(data);

      if (data) {
        setFreelancerId(data._id || uid);
        setSkills(Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'string' && data.skills.length ? data.skills.split(',').map(s => s.trim()) : []));
        setDescription(data.description || '');
        // convert skills array -> comma string so input shows nicely
        setUpdateSkills(Array.isArray(data.skills) ? data.skills.join(', ') : (data.skills || ''));
        setUpdateDescription(data.description || '');
      }
    } catch (err) {
      console.error('fetchUserData error:', err.response?.data || err.message || err);
    }
  }

  const updateUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      // send updateSkills as string (your backend expects updateSkills)
      await axios.post(`http://localhost:5000/update-freelancer`, {
        freelancerId,
        updateSkills: updateSkills,
        description: updateDescription
      }, config);

      // re-fetch user data (pass id explicitly)
      fetchUserData(freelancerId || localStorage.getItem('userId'));
      alert("User data updated");
      setIsDataUpdateOpen(false);
    } catch (err) {
      console.error('updateUserData error:', err.response?.data || err.message || err);
      alert("Failed to update user data");
    }
  }


  const [applicationsCount, setApplicationsCount] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, [])

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const response = await axios.get("http://localhost:5000/fetch-applications", config);
      const apps = response.data.filter(app => app.freelancerId === localStorage.getItem("userId"));
      setApplicationsCount(apps);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      {freelancerData ?

        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Top cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-sm text-gray-500">Current projects</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{(freelancerData.currentProjects || []).length}</p>
                </div>
                <button onClick={() => navigate('/my-projects')} className="mt-4 self-start text-sm text-gray-700 hover:text-black">View projects</button>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-sm text-gray-500">Completed projects</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{(freelancerData.completedProjects || []).length}</p>
                </div>
                <button onClick={() => navigate('/my-projects')} className="mt-4 self-start text-sm text-gray-700 hover:text-black">View projects</button>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-sm text-gray-500">Applications</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{applicationsCount.length}</p>
                </div>
                <button onClick={() => navigate('/myApplications')} className="mt-4 self-start text-sm text-gray-700 hover:text-black">View Applications</button>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-sm text-gray-500">Funds</h4>
                  <p className="text-lg font-semibold text-gray-900 mt-2">Available: <span className="font-bold">₹ {freelancerData.funds ?? 0}</span></p>
                </div>
              </div>
            </div>

            {/* Details area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left: details card */}
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                {!isDataUpdateOpen ?
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">My Skills</h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {skills && skills.length > 0 ? skills.map((skill) => (
                          <span key={skill} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200">{skill}</span>
                        )) : <p className="text-sm text-gray-500">No skills available</p>}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Description</h4>
                      <p className="mt-2 text-sm text-gray-700">{description || <span className="text-sm text-gray-500">please add your description</span>}</p>
                    </div>

                    <div>
                      <button
                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-800 hover:bg-gray-100"
                        onClick={() => setIsDataUpdateOpen(true)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  :
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="mySkills" className="text-sm font-medium text-gray-700">My Skills</label>
                      <input
                        type="text"
                        id="mySkills"
                        className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        placeholder="Enter skills (comma separated)"
                        value={updateSkills}
                        onChange={(e) => setUpdateSkills(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="description-textarea" className="text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        id="description-textarea"
                        rows={6}
                        className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        placeholder="Enter your description"
                        value={updateDescription}
                        onChange={(e) => setUpdateDescription(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:opacity-95"
                        onClick={updateUserData}
                      >
                        Update
                      </button>
                      <button
                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDataUpdateOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                }
              </div>

              {/* Right: quick info card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Profile Summary</h4>
                <div className="text-sm text-gray-600 space-y-3">
                  <div>
                    <div className="text-xs text-gray-500">Name</div>
                    <div className="font-medium text-gray-900">
                      {freelancerData.username || freelancerData.name || localStorage.getItem('username') || '—'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="font-medium text-gray-900">
                      {freelancerData.email || localStorage.getItem('email') || '—'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Joined</div>
                    <div className="font-medium text-gray-900">{String(freelancerData.createdAt || '').slice(0, 10)}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        : ""}
    </>
  )
}

export default Freelancer
