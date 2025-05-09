import React from "react";

const Testimonials = () => {
    return (
      <div className="text-center py-16">
        <h2 className="text-4xl font-bold">What Our Customers Are Saying...</h2>
        <div className="mt-8 flex justify-center gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-100 p-6 rounded-lg shadow-lg w-1/3">
              <p className="italic">Excellent Service! Car Rent Service is the best choice I've made.</p>
              <h3 className="font-bold mt-4">Customer {item}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default Testimonials;