import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import VehicleSharingSection from "../components/VehicleSharingSection";
import RentalOptions from "../components/RentalOptions";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import LocalService from "../components/LocalService";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null); 
  const {setIsLogged} = useContext(AuthContext);
  const navigate = useNavigate();
  // Handle successful registration or login
  const handleRegisterSuccess = (userData) => {
    console.log("User Registered:", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user in local storage
    localStorage.setItem("userId", userData.id); // Store userId separately
    setShowSignUp(false);
    setShowSignIn(false);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear user data
    setShowSignIn(false);

    setIsLogged(false);
    navigate("/"); // Redirect to Home after logout

  };

  return (
    <div>
      <Navbar onSignUpClick={() => setShowSignUp(true)} onSignInClick={() => setShowSignIn(true)} onLogout={handleLogout} />
      
      {showSignUp && (
        <SignUp 
          onClose={() => setShowSignUp(false)} 
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToSignIn={() => { setShowSignUp(false); setShowSignIn(true); }}  
        />
      )}
      {showSignIn && <SignIn onClose={() => setShowSignIn(false)} onLoginSuccess={handleRegisterSuccess}  onSwitchToSignUp={() => { setShowSignIn(false); setShowSignUp(true); }} />}

      <HeroSection />
      <div className="flex justify-center mt-10">
        <SearchBar />
      </div>
      <RentalOptions />
      <VehicleSharingSection />
      <WhyChooseUs />
      <Testimonials />
      <LocalService />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
