import React, { useState , useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import context
const SignIn = ({ onClose, onLoginSuccess, onSwitchToSignUp }) => {
    const { login } = useContext(AuthContext); // Use login function
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json();
        const {token,user} = userData;
        onLoginSuccess(userData);
        login(user,token);
        onClose();
      } else {
        console.error("Login failed. Invalid credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Video Section */}
      <div className="w-1/2 bg-black flex justify-center items-center">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/homePage/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-gray-100">
        <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border mb-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border mb-2"
          />

          <button onClick={handleSignIn} className="bg-black text-white w-full py-2">
            Sign In
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => { 
              onClose(); 
              onSwitchToSignUp(); 
            }}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
