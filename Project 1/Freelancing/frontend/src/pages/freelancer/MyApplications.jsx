import React, { useEffect, useState } from 'react'
import axios from 'axios'


const MyApplications = () => {

  const [applications, setApplications] = useState([]);

  useEffect(()=>{
    fetchApplications();
  },[])

  const fetchApplications = async() =>{
    const token = localStorage.getItem('token'); // get JWT
    try{
      const response = await axios.get("http://localhost:5000/fetch-applications", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setApplications(response.data.reverse());
      console.log(response.data);
    } catch(err) {
      console.log(err);
      alert(err.response?.data?.msg || "Failed to fetch applications");
    }
  }

  const userId = localStorage.getItem('userId');

  const myApps = applications.filter((application)=> application.freelancerId === userId);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 ">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">My Applications</h3>
          <div className="text-sm text-gray-500">{myApps.length} result{myApps.length !== 1 ? 's' : ''}</div>
        </div>

        <div className="space-y-6">
          {myApps.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center text-gray-500">
              You have not applied to any projects yet.
            </div>
          )}

          {myApps.map((application) => (
            <div key={application._id} className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left column */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{application.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{application.description}</p>
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      <div className="font-medium">Budget</div>
                      <div className="text-gray-900 font-semibold mt-1">₹ {application.budget}</div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Skills required</h5>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(application.requiredSkills) && application.requiredSkills.map((skill) => (
                        <span key={skill} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Proposal</h5>
                    <p className="text-sm text-gray-600">{application.proposal}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Your skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(application.freelancerSkills) && application.freelancerSkills.map((skill) => (
                        <span key={skill} className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h6 className="text-sm text-gray-600">Proposed Budget</h6>
                      <div className="text-gray-900 font-semibold">₹ {application.bidAmount}</div>
                    </div>

                    <div className="text-sm">
                      <div className="text-gray-500">Status</div>
                      <div className={`mt-1 inline-block text-xs font-semibold px-3 py-1 rounded-full
                        ${application.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${application.status === 'Approved' ? 'bg-green-100 text-green-800' : ''}
                        ${application.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {application.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-500">
                <div>Applied on: {String(application.postedDate ?? '').slice(0, 25)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyApplications
