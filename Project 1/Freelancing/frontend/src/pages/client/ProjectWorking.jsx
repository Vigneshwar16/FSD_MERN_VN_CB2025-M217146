import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../../context/GeneralContext';

const ProjectWorking = () => {

  const {socket} = useContext(GeneralContext);


  const params = useParams();

  console.log(params['id']);

  const [project, setProject] = useState();
  const [clientId, setClientId] = useState(localStorage.getItem('userId'));
  const [projectId, setProjectId] = useState(params['id']);

  useEffect(()=>{
    fetchProject(params['id']);

    joinSocketRoom();

  },[])


  
  const joinSocketRoom = async() =>{
     
    await socket.emit("join-chat-room", {projectId: params['id'], freelancerId: ""});
  }


  // useEffect(()=>{
  //   socket.on("user-joined-room", ()=>{
  //     console.log("roo", socket.rooms)
  //   })
  // },[socket])

  useEffect(()=>{
    fetchProject(params['id']);
  },[])

const fetchProject = async(id) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(`http://localhost:5000/fetch-project/${id}`, config);
    setProject(response.data);
    setProjectId(response.data._id);
    setClientId(response.data.clientId);
  } catch(err) {
    console.log(err);
  }
};


const handleApproveSubmission = async() => {
  try {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(`http://localhost:5000/approve-submission/${params['id']}`, config);
    fetchProject(params['id']);
    alert("Submission approved!!");
  } catch(err) {
    console.log(err);
  }
}

  const handleRejectSubmission = async() =>{
    await axios.get(`http://localhost:5000/reject-submission/${params['id']}`).then(
      (response)=>{
        fetchProject(params['id']);
        alert("Submission rejected!!");
      }
    ).catch((err)=>{
      console.log(err);
    })
  }


  
  const [message, setMessage] = useState('');

  const handleMessageSend = async() =>{
    socket.emit("new-message", {projectId: params['id'], senderId: localStorage.getItem("userId"), message, time: new Date()})
    setMessage("");
    fetchChats();
  }



  useEffect(()=>{
    fetchChats();
  },[])

  const [chats, setChats] = useState();
const fetchChats = async() => {
  try {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(`http://localhost:5000/fetch-chats/${params['id']}`, config);
    setChats(response.data);
  } catch(err) {
    console.log(err);
  }
};

  useEffect(()=>{
    socket.on("message-from-user", ()=>{
      fetchChats();
    })
  },[socket])

  return (

    <>
    {project ? 
    
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Project Details (left/primary) */}
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
                {Array.isArray(project.skills) && project.skills.map((skill)=>(
                  <span key={skill} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200">{skill}</span>
                ))}
              </div>
            </div>

            {/* Submission panel */}
            {project.freelancerId && project.freelancerId !== "" ?
              <div className="mt-8 bg-gray-50 border border-gray-100 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Submission</h4>

                <div className="space-y-3">
                  {project.submission ? 
                    <div className="space-y-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <h5 className="text-sm font-medium text-gray-700">Project Link</h5>
                          <a href={project.projectLink} target='_blank' rel="noreferrer" className="text-sm text-blue-600 ">{project.projectLink}</a>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700">Manual Link</h5>
                          <a href={project.manulaLink} target='_blank' rel="noreferrer" className="text-sm text-blue-600 ">{project.manulaLink}</a>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-gray-700">Description for work</h5>
                        <p className="text-sm text-gray-600 mt-1">{project.submissionDescription}</p>
                      </div>

                      {project.submissionAccepted ?
                        <h5 className="text-sm font-semibold text-green-600">Project completed!!</h5>
                        :
                        <div className="flex flex-wrap gap-3 mt-2">
                          <button className='px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition' onClick={handleApproveSubmission} >Approve</button>
                          <button className='px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition' onClick={handleRejectSubmission} >Reject</button>
                        </div>
                      }
                    </div>
                  :
                    <p className="text-sm text-gray-500">No submissions yet!!</p>
                  }
                </div>
              </div>
            : ""}

          </div>

          {/* Chat Panel (right) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Chat with the Freelancer</h4>
            <hr className="mb-4" />

            {project.freelancerId ?
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto pb-4">
                  {chats ?
                    <div className="space-y-3">
                      {Array.isArray(chats.messages) && chats.messages.map((message)=>(
                        <div key={message.id} className={message.senderId === localStorage.getItem("userId") ? "flex justify-end" : "flex justify-start"}>
                          <div className={message.senderId === localStorage.getItem("userId") ? "bg-gray-900 text-white rounded-xl px-4 py-2 max-w-xs" : "bg-gray-100 text-gray-800 rounded-xl px-4 py-2 max-w-xs "}>
                            {/* optional label: remove/commented out in original */}
                            <p className="text-sm">{message.text}</p>
                            <h6 className="text-xs text-gray-400 mt-1 text-right">{message.time?.slice(5,10)} - {message.time?.slice(11,19)}</h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  : <p className="text-sm text-gray-500">No messages yet.</p>}
                </div>

                <div className="mt-4">
                  <hr className="mb-3" />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder='Enter something...'
                      value={message}
                      onChange={(e)=> setMessage(e.target.value)}
                    />
                    <button
                      onClick={handleMessageSend}
                      className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:opacity-95 transition"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            :
              <i style={{color: '#938f8f'}}>Chat will be enabled if the project is assigned to you!!</i>
            }
          </div>

        </div>
      </div>
    :""}
    </>
  )
}

export default ProjectWorking
