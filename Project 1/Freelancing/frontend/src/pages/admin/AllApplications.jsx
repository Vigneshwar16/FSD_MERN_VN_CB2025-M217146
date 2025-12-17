import React, { useEffect, useState } from 'react'
import axios from 'axios'

{/* <h5><b>Freelancer Id: </b> {application.budget}</h5> */ }

const AllApplications = () => {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, [])

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token"); // get token
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get("http://localhost:5000/fetch-applications", config);
      setApplications(response.data.reverse());
      console.log(response.data);

    } catch (err) {
      console.log(err.response?.data?.msg || err.message);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">All Applications</h3>
          <div className="text-sm text-gray-500">{applications.length} total</div>
        </div>

        <div className="space-y-6">
          {applications.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center text-gray-500">
              No applications found.
            </div>
          )}

          {applications.map((application) => (
            <div key={application._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="mt-2 text-sm">
                    <div><b>Client:</b> <span className="text-gray-800">{application.clientName}</span></div>
                    <div className="text-xs text-gray-500">Client Id: {application.clientId}</div>
                    <div className="text-xs text-gray-500">Client email: {application.clientEmail}</div>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Proposal</h5>
                    <p className="text-sm text-gray-600">{application.proposal}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Freelancer skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(application.freelancerSkills) && application.freelancerSkills.map((skill) => (
                        <span key={skill} className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-1 text-sm">
                    <div><b>Freelancer:</b> <span className="text-gray-800">{application.freelancerName}</span></div>
                    <div className="text-xs text-gray-500">Freelancer Id: {application.freelancerId}</div>
                    <div className="text-xs text-gray-500">Freelancer email: {application.freelancerEmail}</div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-gray-600">Proposed Budget</div>
                    <div className={`inline-block text-xs font-semibold px-3 py-1 rounded-full
                      ${application.status === "Accepted" ? "bg-green-100 text-green-800" : ""}
                      ${application.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                      ${application.status === "Rejected" ? "bg-red-100 text-red-800" : ""}
                    `}>
                      {application.status}
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-700">
                    <div>Proposed: <span className="font-semibold">₹ {application.bidAmount}</span></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-500">
                <div>Submitted: {String(application.postedDate ?? '').slice(0, 25)}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default AllApplications
