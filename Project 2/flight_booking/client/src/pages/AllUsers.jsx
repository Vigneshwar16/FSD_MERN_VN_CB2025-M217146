import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/allUsers.css'
import axios from 'axios';

const AllUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers = async () =>{
    await axios.get('http://localhost:6001/fetch-users').then(
      (response) =>{
        setUsers(response.data);
      }
    )
  }

  return (
    <>
      <Navbar />

      <div class="all-users-page">
        <h2>All Users</h2>
        <div class="all-users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.filter(user=> user.usertype === 'customer').map((user)=>{
                  return(
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                    </tr>
                  )
              })}
            </tbody>
          </table>
        </div>


        <h2>Flight Operators</h2>
        <div class="all-users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Operator ID</th>
                <th>Flight Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.filter(user=> user.usertype === 'flight-operator').map((user)=>{
                  return(
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                    </tr>
                  )
              })}
            </tbody>
          </table>
        </div>  

    </div>
    </>
  )
}

export default AllUsers
