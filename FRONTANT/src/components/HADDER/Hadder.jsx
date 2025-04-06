import { BiSolidLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    alert("User Logged Out.");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex-shrink-0 text-2xl font-bold text-gray-800">
            My<span className="text-blue-600">App</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
            {user ? (
              <>
                <NavLink to="/" className="font-bold text-blue-600 hover:text-blue-800 no-underline transition">
                  Home
                </NavLink>
                <NavLink to="/products" className="font-bold text-blue-600 hover:text-blue-800 no-underline transition">
                  Products
                </NavLink>
                <NavLink to="/addproduct" className="font-bold text-blue-600 hover:text-blue-800 no-underline transition">
                  Add Product
                </NavLink>
                <NavLink to="/profile" className="font-bold text-blue-600 hover:text-blue-800 no-underline transition flex items-center gap-1">
                  <CgProfile /> Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="font-bold text-red-600 hover:text-red-800 no-underline flex items-center gap-1 transition"
                >
                  <BiSolidLogIn />
                  Logout ({user.name})
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="font-bold text-blue-600 hover:text-blue-800 no-underline transition flex items-center gap-1">
                  <BiSolidLogIn /> Login
                </NavLink>
                <NavLink to="/signup" className="font-bold text-blue-600 hover:text-blue-800 no-underline transition flex items-center gap-1">
                  <BiSolidLogIn /> Signup
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="px-4 py-4 space-y-2 font-medium text-gray-700">
            {user ? (
              <>
                <NavLink to="/" className="block font-bold text-blue-600 hover:text-blue-800 no-underline">
                  Home
                </NavLink>
                <NavLink to="/products" className="block font-bold text-blue-600 hover:text-blue-800 no-underline">
                  Products
                </NavLink>
                <NavLink to="/addproduct" className="block font-bold text-blue-600 hover:text-blue-800 no-underline">
                  Add Product
                </NavLink>
                <NavLink to="/profile" className="block font-bold text-blue-600 hover:text-blue-800 no-underline flex items-center gap-1">
                  <CgProfile /> Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left font-bold text-red-600 hover:text-red-800 no-underline flex items-center gap-1 transition"
                >
                  <BiSolidLogIn /> Logout ({user.name})
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="block font-bold text-blue-600 hover:text-blue-800 no-underline flex items-center gap-1">
                  <BiSolidLogIn /> Login
                </NavLink>
                <NavLink to="/signup" className="block font-bold text-blue-600 hover:text-blue-800 no-underline flex items-center gap-1">
                  <BiSolidLogIn /> Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
