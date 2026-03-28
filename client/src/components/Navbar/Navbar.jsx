import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { handleLogout } from "../../utils/handleLogout";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { isAuthenticated, userData } = useSelector((state) => state.user);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="bg-white/70 backdrop-blur-xl shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* 🔷 LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent hover:scale-110 transition duration-300"
        >
          Carevia
        </Link>

        {/* 💻 DESKTOP NAV */}
        <div className="hidden min-[458px]:flex items-center gap-8">

          {/* Nav Link */}
          <Link
            to="/services"
            className="relative text-gray-700 font-medium group"
          >
            Services
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/appointments"
                className="relative text-gray-700 font-medium group"
              >
                My Appointments
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/book-appointment"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium shadow-lg hover:shadow-indigo-300 hover:scale-105 transition duration-300"
              >
                Book Now
              </Link>

              {/* 👤 PROFILE */}
              <div className="relative">
                <img
                  src={
                    userData?.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="profile"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-indigo-500 hover:scale-110 transition duration-300"
                  onClick={() => setProfileOpen(!profileOpen)}
                />

                {/* Dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border backdrop-blur-md overflow-hidden"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* 🔐 AUTH */}
          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 hover:scale-105 transition duration-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl shadow-md hover:shadow-pink-300 hover:scale-105 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* 📱 MOBILE BUTTON */}
        <button
          className="min-[458px]:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📱 MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="min-[458px]:hidden bg-white border-t px-4 py-4 space-y-4 shadow-md"
          >
            <Link className="block hover:text-indigo-600 transition" to="/services">
              Services
            </Link>

            {isAuthenticated ? (
              <>
                <Link className="block" to="/appointments">
                  My Appointments
                </Link>

                <Link
                  to="/book-appointment"
                  className="block bg-indigo-600 text-white px-3 py-2 rounded-lg text-center"
                >
                  Book Now
                </Link>

                <Link className="block" to="/profile">
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="block text-indigo-600" to="/login">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="block bg-pink-500 text-white px-3 py-2 rounded-lg text-center"
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;