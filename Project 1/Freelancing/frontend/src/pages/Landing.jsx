import React, { useEffect } from 'react'
import { PiStudent, PiRocketLaunch, PiUsersThree, PiTrendUp } from 'react-icons/pi'
import { FaHandHoldingWater, FaRegStar, FaCheckCircle } from 'react-icons/fa'
import { MdHealthAndSafety, MdWork, MdSecurity } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const usertype = localStorage.getItem("usertype");
    if (usertype === 'freelancer') {
      navigate("/freelancer")
    } else if (usertype === 'client') {
      navigate("/client")
    } else if (usertype === 'admin') {
      navigate("/admin")
    }
  }, [navigate])

  const features = [
    {
      icon: PiRocketLaunch,
      title: "Launch Your Career",
      description: "Start your freelancing journey with zero commission on your first project"
    },
    {
      icon: PiUsersThree,
      title: "Global Community",
      description: "Connect with clients and freelancers from around the world"
    },
    {
      icon: PiTrendUp,
      title: "Grow Your Business",
      description: "Scale your freelance business with our powerful tools and resources"
    },
    {
      icon: MdSecurity,
      title: "Secure Payments",
      description: "Get paid securely with our protected payment system"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Freelancers" },
    { number: "25K+", label: "Happy Clients" },
    { number: "100K+", label: "Projects Completed" },
    { number: "98%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen ">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 p-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-950 cursor-pointer rounded-xl flex items-center justify-center">
                <MdWork className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gray-950 bg-clip-text text-transparent cursor-pointer">
                AJ Works
              </h1>
            </div>

            {/* Sign In Button */}
            <button
              onClick={() => navigate('/authenticate')}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background image (uses your uploaded file path) */}
        <img
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=2000&q=80"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-75"
        />

        {/* Gradient overlay: left is light (so black text works), right is dark (so white text works) */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.35) 25%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.6) 100%)' }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            {/* Main Heading - left-friendly black text with a white-on-dark highlight */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="block text-black">Empower Your Journey:</span>
              <span className="block mt-2 text-black">
                <span className="inline-block bg-black/85 text-white px-3 py-1 rounded-lg shadow-sm">Elevate Your Craft</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg md:text-xl text-white">
              Dive into a realm of endless possibilities with AJ Works. Unleash your creativity, skills, and passion as you embark on a freelancing journey like never before.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/authenticate')}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-black text-white font-semibold shadow-lg hover:scale-[1.03] transition transform">
                {/* icon kept same as original */}
                <PiRocketLaunch className="w-5 h-5" />
                Start Your Journey
              </button>

              <button
                onClick={() => navigate('/authenticate')}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-300 bg-white text-black font-semibold shadow-sm hover:scale-[1.03] transition transform" >
                <PiUsersThree className="w-5 h-5" />
                Join as Client
              </button>
            </div>

            {/* Stats (keeps your stats map) */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-black">{stat.number}</div>
                  <div className="text-sm text-white">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="mt-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AJ Works?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is a thriving marketplace where innovation meets opportunity, connecting talented freelancers with businesses seeking excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white to-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-14 h-14 bg-gray-900 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-25">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful freelancers and clients who are already building their dreams with AJ Works.
          </p>
          <button
            onClick={() => navigate('/authenticate')}
            className="bg-white text-gray-950 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto">
            <FaCheckCircle className="w-6 h-6" />
            Get Started Today - It's Free!
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gray-950 rounded-xl flex items-center justify-center">
              <MdWork className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">AJ Works</h3>
          </div>
          <p className="text-white max-w-2xl mx-auto">
            Connecting talent with opportunity. Build your future with AJ Works - where dreams meet reality.
          </p>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-white">
              © 2024 AJ Works. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing