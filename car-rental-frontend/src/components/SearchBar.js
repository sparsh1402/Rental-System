import React from "react";

const SearchBar = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex gap-4 w-3/4 mx-auto -mt-10">
      <select className="p-2 border rounded w-full">
        <option>Select Location</option>
      </select>
      <select className="p-2 border rounded w-full">
        <option>Pick-Up Location</option>
      </select>
      <input type="date" className="p-2 border rounded w-full" />
      <button className="bg-black text-white px-6 py-2">Search Now</button>
    </div>
  );
};

export default SearchBar;
