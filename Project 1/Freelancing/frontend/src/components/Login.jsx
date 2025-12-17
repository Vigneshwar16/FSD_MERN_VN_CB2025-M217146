import React, { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext';
import { HiMail, HiKey, HiArrowRight, HiLockClosed } from 'react-icons/hi';

const Login = ({ setAuthType }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login();
  }

  return (
    <div className="min-h-screen bg-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiLockClosed className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-gray-950 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2">
            <HiArrowRight className="w-5 h-5" />
            Sign In
          </button>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthType('register')}
                className="font-semibold text-gray-950 hover:text-gray-800 transition-colors duration-200"
              >
                Create account
              </button>
            </p>
          </div>
        </form>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Secure login with encrypted credentials
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login