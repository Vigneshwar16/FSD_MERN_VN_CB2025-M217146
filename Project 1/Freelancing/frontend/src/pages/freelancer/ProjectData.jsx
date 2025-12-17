import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../../context/GeneralContext';


const ProjectData = () => {

  const { socket } = useContext(GeneralContext);

  const params = useParams();

  console.log(params['id']);

  const [project, setProject] = useState()

  useEffect(() => {
    fetchProject(params['id']);

    joinSocketRoom();

  }, [])



  const joinSocketRoom = async () => {

    await socket.emit("join-chat-room", { projectId: params['id'], freelancerId: localStorage.getItem("userId") });
  }


  // useEffect(()=>{
  //   socket.on("user-joined-room", ()=>{
  //   })
  // },[socket])

  const token = localStorage.getItem("token");
  const fetchProject = async (id) => {
    await axios.get(`http://localhost:5000/fetch-project/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(
      (response) => {
        setProject(response.data);
        setProjectId(response.data._id);
        setClientId(response.data.clientId);
        console.log(response.data);
      }
    ).catch((err) => {
      console.log(err);
    })
  }



  const [clientId, setClientId] = useState('');
  const [freelancerId, setFreelancerId] = useState(localStorage.getItem('userId'));
  const [projectId, setProjectId] = useState(params['id']);
  const [proposal, setProposal] = useState('');
  const [bidAmount, setBidAmount] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState('');

  const handleBidding = async () => {
    try {
      const token = localStorage.getItem("token"); // get JWT from localStorage

      await axios.post(
        "http://localhost:5000/make-bid",
        { clientId, freelancerId, projectId, proposal, bidAmount, estimatedTime },
        { headers: { Authorization: `Bearer ${token}` } } // <-- send token
      );

      setProposal('');
      setBidAmount(0);
      setEstimatedTime(0);
      alert("Bidding successful!!");
    } catch (err) {
      console.log(err.response?.data?.msg || err.message);
      alert("Bidding failed!! Try again!");
    }
  };




  const [projectLink, setProjectLink] = useState('');
  const [manualLink, setManualLink] = useState('');
  const [submissionDescription, setSubmissionDescription] = useState('');


  const handleProjectSubmission = async () => {

    await axios.post("http://localhost:5000/submit-project", { clientId, freelancerId, projectId, projectLink, manualLink, submissionDescription }, { headers: { Authorization: `Bearer ${token}` } }).then(
      (response) => {
        setProjectLink('');
        setManualLink('');
        setSubmissionDescription('');
        alert("submission successful!!");
      }
    ).catch((err) => {
      alert("submission failed!! Try again!");
    })

  }



  const [message, setMessage] = useState('');

  const handleMessageSend = async () => {
    socket.emit("new-message", { projectId: params['id'], senderId: localStorage.getItem("userId"), message, time: new Date() });
    fetchChats();
    setMessage("");
  }


  useEffect(() => {
    fetchChats();
  }, [])

  const [chats, setChats] = useState();

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("token"); // get token
      const response = await axios.get(`http://localhost:5000/fetch-chats/${params['id']}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChats(response.data);
    } catch (err) {
      console.log(err.response?.data?.msg || err.message);
    }
  };

  useEffect(() => {
    socket.on("message-from-user", () => {
      fetchChats();
    });

    // Cleanup listener on unmount
    return () => {
      socket.off("message-from-user");
    };
  }, [socket]);



  return (

    <>
      {project ?

        <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left / Main */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500">Budget</div>
                  <div className="text-lg font-bold text-gray-900 mt-1">₹ {project.budget}</div>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Required skills</h5>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(project.skills) && project.skills.map((skill) => (
                    <span key={skill} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Proposal form (if available) */}
              {project.status === "Available" && (
                <div className="mt-8 bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Send proposal</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-700">Budget</label>
                      <input
                        type="number"
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-700">Estimated time (days)</label>
                      <input
                        type="number"
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        value={estimatedTime}
                        onChange={(e) => setEstimatedTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm text-gray-700">Describe your proposal</label>
                    <textarea
                      className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-gray-800"
                      value={proposal}
                      onChange={(e) => setProposal(e.target.value)}
                    />
                  </div>

                  <div className="mt-4 flex gap-3">
                    {!project.bids.includes(localStorage.getItem('userId')) ? (
                      <button className='px-4 py-2 rounded-lg bg-green-600 text-white text-sm' onClick={handleBidding}>Post Bid</button>
                    ) : (
                      <button className='px-4 py-2 rounded-lg bg-blue-500 text-white text-sm' disabled>Already bidded</button>
                    )}
                  </div>
                </div>
              )}

              {/* Submission form (if assigned to freelancer) */}
              {project.freelancerId === localStorage.getItem('userId') && (
                <div className="mt-8 bg-white border border-gray-100 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Submit the project</h4>

                  {project.submissionAccepted ? (
                    <p className="text-sm text-green-600">Project completed</p>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-700">Project link</label>
                          <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} />
                        </div>

                        <div>
                          <label className="text-sm text-gray-700">Manual link</label>
                          <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800" value={manualLink} onChange={(e) => setManualLink(e.target.value)} />
                        </div>

                        <div>
                          <label className="text-sm text-gray-700">Describe your work</label>
                          <textarea className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-gray-800" value={submissionDescription} onChange={(e) => setSubmissionDescription(e.target.value)} />
                        </div>
                      </div>

                      <div className="mt-4">
                        {project.submission ? (
                          <button className="px-4 py-2 rounded-lg bg-gray-400 text-white" disabled>Already submitted</button>
                        ) : (
                          <button className="px-4 py-2 rounded-lg bg-green-600 text-white" onClick={handleProjectSubmission}>Submit project</button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

            </div>

            {/* Right / Chat */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Chat with the client</h4>
              <hr className="mb-4" />

              {project.freelancerId === localStorage.getItem('userId') ? (

                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto pb-4 space-y-3">
                    {chats && Array.isArray(chats.messages) && chats.messages.length > 0 ? (
                      chats.messages.map((message) => (
                        <div key={message.id} className={message.senderId === localStorage.getItem("userId") ? "flex justify-end" : "flex justify-start"}>
                          <div className={message.senderId === localStorage.getItem("userId") ? "bg-gray-900 text-white rounded-xl px-4 py-2 max-w-xs " : "bg-gray-100 text-gray-800 rounded-xl px-4 py-2 max-w-xs"}>
                            <p className="text-sm">{message.text}</p>
                            <h6 className="text-xs text-gray-400 mt-1 text-right">{message.time?.slice(5, 10)} - {message.time?.slice(11, 19)}</h6>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No messages yet.</p>
                    )}
                  </div>

                  <div className="mt-4">
                    <hr className="mb-3" />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        placeholder='Enter something...'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button onClick={handleMessageSend} className="px-4 py-2 rounded-lg bg-gray-900 text-white">Send</button>
                    </div>
                  </div>
                </div>

              ) : (
                <i style={{ color: '#938f8f' }}>Chat will be enabled if the project is assigned to you!!</i>
              )}
            </div>

          </div>
        </div>
        : ""}
    </>
  )
}

export default ProjectData
