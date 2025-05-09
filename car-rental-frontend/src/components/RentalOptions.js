import React from "react";

const RentalOptions = () => {
    return (
      <div className="mt-16 w-3/4 mx-auto">
        <div className="flex items-center gap-6">
          <div className="w-1/2">
            <h2 className="text-4xl font-bold">Rent A Car</h2>
            <div className="mt-2 flex gap-2">
              <span className="bg-gray-200 px-4 py-1 rounded">Luxury</span>
              <span className="bg-gray-200 px-4 py-1 rounded">Comfort</span>
              <span className="bg-gray-200 px-4 py-1 rounded">Prestige</span>
            </div>
            <p className="mt-4 text-lg">
              Booking a self-driving car with us is simple and easy. You can browse our selection of vehicles online,
              choose the car that best fits your needs, and book it for the duration of your choice. Our user-friendly
              platform allows you to manage your bookings and view your trip history with ease.
            </p>
            <button className="mt-4 bg-black text-white px-6 py-2">Rent Car</button>
          </div>
          <img src="/homePage/manSiitingInACar.jpg" alt="Rent a Car" className="w-1/2 h-80 rounded-lg shadow-lg object-cover"/>
        </div>
        <div className="flex items-center gap-6 mt-16">
          <img src="/homePage/manSittingOnABike.jpg" alt="Rent a Bike" className="w-1/2 h-80 rounded-lg shadow-lg object-cover"/>
          <div className="w-1/2">
            <h2 className="text-4xl font-bold">Rent A Bike</h2>
            <div className="mt-2 flex gap-2">
              <span className="bg-gray-200 px-4 py-1 rounded">Luxury</span>
              <span className="bg-gray-200 px-4 py-1 rounded">Comfort</span>
              <span className="bg-gray-200 px-4 py-1 rounded">Prestige</span>
            </div>
            <p className="mt-4 text-lg">
              Booking a self-driving bike with us is simple and easy. You can browse our selection of bikes online,
              choose the bike that best fits your needs, and book it for the duration of your choice. Our user-friendly
              platform allows you to manage your bookings and view your trip history with ease.
            </p>
            <button className="mt-4 bg-black text-white px-6 py-2">Rent Bike</button>
          </div>
        </div>
      </div>
    );
};
export default RentalOptions;