import React, { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setAuthType }) => {
  const { setUsername, setEmail, setPassword, setUsertype, register } = useContext(GeneralContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    await register();
  }

  return (
    <div className="min-h-screen bg-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Join our community today</p>
        </div>

        <form className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {/* Username Field */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* User Type Select */}
          <div className="mb-6">
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
              I want to join as
            </label>
            <select
              id="userType"
              className="w-full px-4 py-3 border rounded-xl text-gray-900 "
              onChange={(e) => setUsertype(e.target.value)}
            >
              <option value="">Select your role</option>
              <option value="freelancer">Freelancer</option>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full bg-gray-950 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Create Account
          </button>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthType('login')}
                className="font-semibold text-gray-950 hover:text-gray-700 transition-colors duration-200"
              >
                Sign in here
              </button>
            </p>
          </div>
        </form>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register