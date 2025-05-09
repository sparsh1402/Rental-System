import React from "react";

const VehicleSharingSection = () => {
    return (
      <div className="flex items-center justify-center mt-16">
        <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 flex">
          <div className="w-1/2 p-6">
            <h2 className="text-3xl font-bold">Do You Want To Share Your Vehicle?</h2>
            <p className="mt-4 text-lg">
              We'll use your car's location to calculate your onboard bonus. Each ZIP code will belong to one of five zones.
              Zones are based on guest demand for cars—more guest demand means a higher zone, and bigger bonuses for cars.
              Zone 1 gets the highest bonus, while Zones 4 and 5 aren't eligible for the onboard bonus.
            </p>
            <button className="mt-4 bg-black text-white px-6 py-2">Learn More</button>
          </div>
          <div className="w-1/2">
            <img src="/mnt/data/image.png" alt="Vehicle Sharing" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    );
  };

  export default VehicleSharingSection;