import React from "react";

import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-black text-white p-10 text-center bg-cover bg-center min-h-screen flex flex-col justify-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <h2 className="text-4xl font-bold">Unlock Endless Driving With Drivee</h2>
      <p className="mt-4 text-lg">
        To contribute to positive change and achieve our sustainability goals with many extraordinary
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <button className="bg-white text-black px-6 py-2" onClick={() => navigate("/car-rental")}>Rent Car</button>
        <button className="border border-white px-6 py-2">Rent Bike</button>
      </div>
    </div>
  );
};

export default HeroSection;
