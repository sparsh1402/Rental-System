import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const SignUp = ({ onClose, onRegisterSuccess,onSwitchToSignIn }) => {
  const {login} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json();
        login(userData);
        if (onRegisterSuccess) {
          onRegisterSuccess(userData); // Pass user data to parent component
        }
        if (onClose) {
          onClose(); // Close the signup modal
        }
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
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
          <h2 className="text-2xl font-bold mb-4 text-center">Create An Account</h2>
          
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="w-full p-2 border mb-2" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full p-2 border mb-2" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" className="w-full p-2 border mb-2" />
          
          <div className="flex items-center mb-4">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms">I agree to the Terms and Privacy Policy</label>
          </div>

          <button onClick={handleSignUp} className="bg-black text-white w-full py-2">Sign Up</button>

          {/* OR Divider */}
          <div className="flex items-center my-2">
            <div className="border-t flex-grow"></div>
            <span className="mx-2 text-gray-500">OR</span>
            <div className="border-t flex-grow"></div>
          </div>

          {/* Social Login Buttons */}
          <button className="w-full py-2 border border-gray-400 flex items-center justify-center gap-2 mb-2">
            <img src="/homePage/gogleLogo.jpg" alt="Google" className="w-5" />
            Continue with Google
          </button>

          <button className="w-full py-2 border border-gray-400 flex items-center justify-center gap-2">
            <img src="/homePage/FbLogo.png" alt="Facebook" className="w-5" />
            Continue with Facebook
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => { 
              onClose(); 
              onSwitchToSignIn(); 
            }}>
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
