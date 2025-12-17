import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AllUsers = () => {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get("http://localhost:5000/fetch-users", config);
      setUsers(response.data);
    } catch (err) {
      console.log(err.response?.data?.msg || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold text-gray-900">All Users</h3>
          <p className="text-sm text-gray-500">{users.length} total users</p>
        </div>

        {/* Users List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >

              <div className="space-y-4">

                <div>
                  <b className="text-gray-700 text-sm block">User Id</b>
                  <p className="text-gray-900 text-sm break-all">{user._id}</p>
                </div>

                <div>
                  <b className="text-gray-700 text-sm block">Username</b>
                  <p className="text-gray-900 text-sm">{user.username}</p>
                </div>

                <div>
                  <b className="text-gray-700 text-sm block">Email</b>
                  <p className="text-gray-800 text-sm break-all">{user.email}</p>
                </div>

                <div>
                  <b className="text-gray-700 text-sm block">User Role</b>
                  <span
                    className={`inline-block px-3 py-1 mt-1 text-xs font-semibold rounded-full
                      ${user.usertype === 'admin' ? 'bg-red-100 text-red-700' : ''}
                      ${user.usertype === 'client' ? 'bg-blue-100 text-blue-700' : ''}
                      ${user.usertype === 'freelancer' ? 'bg-green-100 text-green-700' : ''}
                    `}
                  >
                    {user.usertype}
                  </span>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default AllUsers;
