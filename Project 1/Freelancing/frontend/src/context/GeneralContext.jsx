import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socketIoClient from 'socket.io-client';

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {

  const WS = 'http://localhost:5000';

  const socket = socketIoClient(WS);


  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
 
  
  
  
const login = async () => {
  try {
    const loginInputs = { email, password };
    const res = await axios.post('http://localhost:5000/login', loginInputs);

    localStorage.setItem('token', res.data.token); // store JWT
    localStorage.setItem('userId', res.data.user._id);
    localStorage.setItem('usertype', res.data.user.usertype);
    localStorage.setItem('username', res.data.user.username);
    localStorage.setItem('email', res.data.user.email);

    if(res.data.user.usertype === 'freelancer') navigate('/freelancer');
    else if(res.data.user.usertype === 'client') navigate('/client');
    else if(res.data.user.usertype === 'admin') navigate('/admin');
  } catch (err) {
    console.log(err.response?.data?.msg || err.message);
    alert(err.response?.data?.msg || "Login failed!!");
  }
};

      
  const inputs = {username, email, usertype, password};

const register = async () => {
  if (!username || !email || !password || !usertype) {
    alert("All fields are required!");
    return;
  }

  try {
    const res = await axios.post('http://localhost:5000/register', { username, email, password, usertype });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userId', res.data.user._id);
    localStorage.setItem('usertype', res.data.user.usertype);
    localStorage.setItem('username', res.data.user.username);
    localStorage.setItem('email', res.data.user.email);

    if(res.data.user.usertype === 'freelancer') navigate('/freelancer');
    else if(res.data.user.usertype === 'client') navigate('/client');
    else if(res.data.user.usertype === 'admin') navigate('/admin');
  } catch (err) {
    alert(err.response?.data?.msg || "Registration failed!");
    console.log(err.response?.data || err.message);
  }
};


  const logout = async () =>{
    
    localStorage.clear();
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
    
    navigate('/');
  }


  return (
    <GeneralContext.Provider value={{socket, login, register, logout, username, setUsername, email, setEmail, password, setPassword, usertype, setUsertype}} >{children}</GeneralContext.Provider>
  )
}

export default GeneralContextProvider