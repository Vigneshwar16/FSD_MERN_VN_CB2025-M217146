import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GeneralContext } from '../context/GeneralContext';
import { HiHome, HiUsers, HiBriefcase, HiDocumentText, HiLogout, HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const userId = localStorage.getItem('userId');
  const usertype = localStorage.getItem('usertype');
  const navigate = useNavigate();
  const { logout } = useContext(GeneralContext);

  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when navigating
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Don't render navbar if no usertype
  if (!usertype) return null;

  // Navbar configuration for different user types
  const navConfig = {
    freelancer: {
      title: "V Works",
      color: "bg-white", // we will use subtle white background like the image
      items: [
        { path: '/freelancer', label: 'Home', icon: HiHome },
        { path: '/all-projects', label: 'Collection', icon: HiBriefcase },
        { path: '/my-projects', label: 'About', icon: HiDocumentText },
        { path: '/myApplications', label: 'Contact', icon: HiUsers }
      ]
    },
    client: {
      title: "V Works",
      color: "bg-white",
      items: [
        { path: '/client', label: 'Home', icon: HiHome },
        { path: '/new-project', label: 'Collection', icon: HiBriefcase },
        { path: '/project-applications', label: 'Applications', icon: HiUsers }
      ]
    },
    admin: {
      title: "V Works (Admin)",
      color: "bg-white",
      items: [
        { path: '/admin', label: 'Home', icon: HiHome },
        { path: '/all-users', label: 'Users', icon: HiUsers },
        { path: '/admin-projects', label: 'Products', icon: HiBriefcase },
        { path: '/admin-applications', label: 'Orders', icon: HiDocumentText }
      ]
    }
  };

  const config = navConfig[usertype];

  return (
    <div className={`navbar-container relative ${config.color} border-b border-gray-200 p-3`}>
      {/* Centered layout container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center">
          {/* LEFT: small logo / brand (absolute so center nav stays centered) */}
          <div
            className="absolute left-0 inset-y-0 flex items-center pl-2 cursor-pointer"
            onClick={() => handleNavigation(config.items[0].path)}
          >
            {/* Minimal logo style like the image (black text + small dot) */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                <span className="font-extrabold text-xl text-[#111827]">A</span>
              </div>
              <h1 className="text-2xl uppercase font-extrabold tracking-tight text-gray-800">{config.title}</h1>
              <span className=" rounded-full  inline-block" />
            </div>
          </div>

          {/* CENTER: navigation links (keeps centered across screen) */}
          <nav className="mx-auto flex items-center space-x-6">
            {/* hide on small screens */}
            <div className="hidden md:flex items-center space-x-6 ">
              {config.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className="text-sm uppercase tracking-wider text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 "
                    aria-label={item.label}>
                    <span className="leading-none">{item.label}</span>
                    {/* subtle underline that appears on hover (like the image's active underline) */}
                    <span className="block h-2px w-0 bg-black mt-2 transition-all duration-200 group-hover:w-full" />
                  </button>
                );
              })}
            </div>
          </nav>

          {/* RIGHT: logout + mobile button  */}
          <div className="absolute right-0 inset-y-0 flex items-center pr-2 space-x-2">
            {/* Desktop logout button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={handleLogout}
                className="hidden md:inline-block px-3 py-2 border rounded text-sm bg-gray-50 hover:bg-gray-100 uppercase" >
                Logout
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <HiX className="w-6 h-6 text-gray-800" />
                ) : (
                  <HiMenu className="w-6 h-6 text-gray-800" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-2">
            {config.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-800 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Mobile Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-medium border-t border-gray-200 mt-2">
              <HiLogout className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
