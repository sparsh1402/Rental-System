import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { AuthContext } from "../context/AuthContext";
const UserPanel = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [selectedTab, setSelectedTab] = useState("dashboard");
    const {isLogged,user,logout} = useContext(AuthContext);
    const navigate = useNavigate();
    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear user data
        setShowSignIn(false);
        logout();
        navigate("/"); // Redirect to Home after logout

    };
    const navbarBg = ''
    console.log("user");
    console.log(user);
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Navbar onSignUpClick={() => setShowSignUp(true)} onSignInClick={() => setShowSignIn(true)} onLogout={handleLogout} />
        <div className="container mx-auto flex gap-6">
        <div className="bg-white shadow p-6 rounded-lg w-1/4 min-h-[600px]">
            <img src="/homePage/manSiitingInACar.jpg" alt="User" className="w-24 h-24 rounded-full mx-auto" />
            <h2 className="text-center text-xl font-semibold mt-2">{user.name}</h2>
            <p className="text-center text-gray-600">{user.email}</p>
            <div className="mt-4 space-y-2">
              <button className={`w-full py-2 rounded ${selectedTab === "dashboard" ? "bg-black text-white" : "bg-gray-200"}`} onClick={() => setSelectedTab("dashboard")}>Dashboard</button>
              <button className={`w-full py-2 rounded ${selectedTab === "profile" ? "bg-black text-white" : "bg-gray-200"}`} onClick={() => setSelectedTab("profile")}>My Profile</button>
              <button className={`w-full py-2 rounded ${selectedTab === "orders" ? "bg-black text-white" : "bg-gray-200"}`} onClick={() => setSelectedTab("orders")}>My Orders</button>
              <button className={`w-full py-2 rounded ${selectedTab === "insurance" ? "bg-black text-white" : "bg-gray-200"}`} onClick={() => setSelectedTab("insurance")}>Insurance & Policy</button>
              <button className="w-full bg-red-500 text-white py-2 rounded" onClick={() => {
                localStorage.removeItem("userId");
                window.location.href = "/";
              }}>Sign Out</button>
            </div>
          </div>
          
            {selectedTab === "dashboard" && <div><Dashboard/></div>}
            {selectedTab === "profile" && <Profile/>}
            {selectedTab === "orders" && <div>My Orders Component</div>}
            {selectedTab === "insurance" && <div>Insurance & Policy Component</div>}
            
          
        </div>
      </div>
    );
  };

export default UserPanel;
