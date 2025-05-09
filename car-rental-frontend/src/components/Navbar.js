import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ onSignUpClick, onSignInClick, onLogout }) => {
  const {isLogged,user,logout} = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Change navbar background based on current route
  const navbarBg = location.pathname === "/user-panel" ||  location.pathname === "/car-rental" ? "bg- text-black" : "bg-black text-white";

  return (
    <nav className={`flex justify-between items-center p-4 ${navbarBg} transition-all duration-300`}>
      <h1 className="text-xl font-bold">Drivee</h1>
      <div className="relative">
        {isLogged ? (
          <div>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center">
              <div className="bg-gray-300 text-black rounded-full w-8 h-8 flex items-center justify-center">
                {user.name[0].toUpperCase()}
              </div>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                <p className="p-2 border-b">{user.name}</p>
                <p className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/")}>
                  Home
                </p>
                <p className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/user-panel")}>
                  View Profile
                </p>
                <p className="p-2 hover:bg-gray-200 cursor-pointer" onClick={onLogout}>
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <button onClick={onSignInClick} className="border px-4 py-2">Sign In</button>
            <button onClick={onSignUpClick} className="bg-black text-white px-4 py-2">Sign Up</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
