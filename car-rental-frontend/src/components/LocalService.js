import React from "react";

const LocalService = () => {
    return (
      <div className="text-center py-16">
        <h2 className="text-4xl font-bold">Local Service We Provide</h2>
        <div className="mt-8 flex justify-center gap-6">
          {['Gazipur', 'Mohammad Pur', 'Gulshan', 'Dhanmondi', 'Mohakhali'].map((location) => (
            <div key={location} className="p-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto"></div>
              <p className="mt-2">{location}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default LocalService;