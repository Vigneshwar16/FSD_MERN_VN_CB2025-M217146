import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ProjectApplications = () => {

  const [applications, setApplications] = useState([]);
  const [displayApplications, setDisplayApplications] = useState([]);

  const [projectTitles, setProjectTitles] = useState([]);

  useEffect(()=>{
    fetchApplications();
  },[])

  const fetchApplications = async() =>{
    await axios.get("http://localhost:5000/fetch-applications").then(
      (response)=>{
        setApplications(response.data.filter((application)=> application.clientId === localStorage.getItem('userId')));
        setDisplayApplications(response.data.filter((application)=> application.clientId === localStorage.getItem('userId')).reverse());

      }
    ).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    if(applications.length > 0){
      applications.map((application)=> {projectTitles.includes(application.title) ? setProjectTitles([...projectTitles]) :setProjectTitles([...projectTitles, application.title])});
    }
  },[applications])

  useEffect(()=>{
    if(projectTitles.length > 0){
      projectTitles.filter((title)=> !projectTitles.includes(title));
    }
  },[projectTitles])

const handleApprove = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.get(`http://localhost:5000/approve-application/${id}`, config);
    alert("Application approved");
    fetchApplications();
  } catch (err) {
    alert("Operation failed!!");
  }
};

const handleReject = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.get(`http://localhost:5000/reject-application/${id}`, config);
    alert("Application rejected!!");
    fetchApplications();
  } catch (err) {
    alert("Operation failed!!");
  }
};

  const [projectFilter, setProjectFilter] = useState('');


  const handleFilterChange = (value) =>{
    if(value === ''){
        setDisplayApplications(applications.reverse());
    }else{
      setDisplayApplications(applications.filter((application)=>application.title === value).reverse())
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Header + Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Applications</h3>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700 hidden md:block">Filter by project:</label>
            <select
              className="border border-gray-300 bg-white px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
              onChange={(e)=> handleFilterChange(e.target.value)}
            >
              <option value="">All Projects</option>
              {projectTitles.map((title)=>( <option key={title} value={title}>{title}</option> ))}
            </select>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {displayApplications.map((application)=>(
            <div key={application._id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{application.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{application.description}</p>
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      <div className="font-medium">Posted</div>
                      <div className="mt-1">{String(application.postedDate ?? '').slice(0,25)}</div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Skills required</h5>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(application.requiredSkills) && application.requiredSkills.map((skill)=>(
                        <span key={skill} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h6 className="text-sm text-gray-600">Budget</h6>
                    <div className="text-md font-semibold text-gray-900">₹ {application.budget}</div>
                  </div>
                </div>

                {/* Vertical divider on md+ */}
                <div className="hidden md:block border-l border-gray-100 mx-2" />

                {/* Right Column */}
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Proposal</h5>
                    <p className="text-sm text-gray-600">{application.proposal}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Freelancer skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(application.freelancerSkills) && application.freelancerSkills.map((skill)=>(
                        <span key={skill} className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h6 className="text-sm text-gray-600">Proposed Budget</h6>
                    <div className="text-md font-semibold text-gray-900">₹ {application.bidAmount}</div>
                  </div>

                  <div className="mt-2">
                    {application.status === 'Pending' ?
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={()=> handleApprove(application._id)}
                          className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={()=> handleReject(application._id)}
                          className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                        >
                          Decline
                        </button>
                      </div>
                    :
                      <div className="text-sm text-gray-700">
                        Status: <span className="font-semibold">{application.status}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div className="px-6 md:px-8 pb-4">
                <hr className="border-gray-100" />
              </div>
            </div>
          ))}
        </div>

        {/* empty state */}
        {displayApplications.length === 0 && (
          <div className="mt-8 text-center text-gray-500">
            No applications found.
          </div>
        )}

      </div>
    </div>
  )
}

export default ProjectApplications
