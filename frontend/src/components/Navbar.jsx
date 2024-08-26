import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  // const [user, setUser] = useState(false);
  
const {user,isUser,setIsUser,logoutUser}=useAuth();
  const handleClick = () => {};
  
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <div className="text-xl font-semibold">Task Manager</div>
      </div>

      {/* Navigation Links */}
      <div>
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/" className="hover:text-violet-300 transition-colors">
              Home
            </Link>
          </li>
          {user===null ? (
            <>
              <li>
                <Link
                  to="/signup"
                  onClick={() => setIsUser((prev) => !prev)}
                  className="hover:text-violet-300 transition-colors"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  onClick={() => setIsUser((prev) => !prev)}
                  className="hover:text-violet-300 transition-colors"
                >
                  SignIn
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/mytask"
                  className="hover:text-violet-300 transition-colors"
                >
                  My Task
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={() => setIsUser((prev) => !prev)}
                  className="hover:text-violet-300 transition-colors"
                >
                  {user.name}
                </button>
                {isUser && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
                    <li>
                      <Link
                        to="/logout"
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <button onClick={()=>logoutUser()}>Logout</button>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Search and Submit Section */}
      <div className="flex items-center space-x-2">
        <input
          type="search"
          placeholder="Search Task"
          className="bg-gray-200 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300"
        />
        <button
          onClick={handleClick}
          className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
        >
          Submit
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
