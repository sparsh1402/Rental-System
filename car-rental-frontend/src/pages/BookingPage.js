import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const carId = searchParams.get("carId");
  const userId = 1; // Replace with dynamic userId from authentication (if applicable)

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  
  useEffect(() => {
    if (!carId) {
      setError("Car ID is missing from the URL");
      setLoading(false);
      return;
    }
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/vehicles/${carId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }
        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [carId]);

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      alert("Please select start and end dates.");
      return;
    }

    const bookingUrl = `http://localhost:8080/api/reservations/book?userId=${userId}&vehicleId=${carId}&startDate=${startDate}&endDate=${endDate}`;

    try {
      const response = await fetch(bookingUrl, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Booking failed. Please try again.");
      }

      // Show dummy payment popup
      setShowPaymentPopup(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePayment = () => {
    alert("Payment successful! Your booking is confirmed.");
    setShowPaymentPopup(false);
  };

  if (loading) return <p className="text-center mt-10">Loading car details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Car Booking</h1>
        {car && (
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
            <img src={car.imageUrl} alt={car.name} className="w-full md:w-1/2 rounded-lg" />
            <div className="md:ml-6 flex flex-col justify-between w-full md:w-1/2">
              <div>
                <h2 className="text-2xl font-bold mb-4">{car.companyName}</h2>
                <p className="text-gray-700 mb-2">Model: {car.modelName}</p>
                <p className="text-gray-900 font-semibold text-xl">Price: ${car.dailyRentalCost}/day</p>
                <p className="text-gray-900 font-semibold text-xl">Price: ${car.hourlyRentalCost}/hr</p>

                {/* Date-Time Inputs */}
                <label className="block text-gray-700 mt-4">Start Date & Time:</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />

                <label className="block text-gray-700 mt-2">End Date & Time:</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>

              {/* Book Now Button */}
              <button
                className="mt-6 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                onClick={handleBooking}
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* Dummy Payment Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Enter Payment Details</h2>
            <input
              type="text"
              placeholder="Card Number"
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="CVV"
              className="border px-3 py-2 rounded w-full mb-4"
            />
            <button
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
