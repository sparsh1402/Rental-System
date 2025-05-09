import React from "react";
import { useNavigate } from "react-router-dom";

const CarRental = ({ car }) => {
const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md p-4 rounded-lg text-center">
      <img src={car.imageUrl} alt={car.name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-xl font-bold mt-2">{car.companyName}</h3>
      {/* <p className="text-gray-500">Seats: {car.seats} | HP: {car.horsepower}</p>
      <p className="text-gray-500">Engine: {car.engine} | Drive: {car.drive}</p> */}
      
      <p className="text-lg font-semibold mt-2">{car.modelName}</p>
      <p className="text-lg font-semibold mt-2">₹{car.hourlyRentalCost} / hr</p>
      <p className="text-lg font-semibold mt-2">₹{car.dailyRentalCost} / day</p>
      <button className="mt-3 bg-black text-white px-4 py-2 rounded"  onClick={() => navigate(`/car-rental/${encodeURIComponent(car.companyName)}?carId=${car.id}`)}>Rent Car</button>
    </div>
  );
};

export default CarRental;