import { useEffect, useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
  
    const userId = localStorage.getItem("userId");
    const { token } = useContext(AuthContext);
    useEffect(() => {
      const fetchReservations = async () => {
        if (!userId) return;
  
        try {
          const response = await fetch(`http://localhost:8080/api/reservations/user/${userId}`,{
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setReservations(data);
        } catch (err) {
          setError("Failed to load reservations. Please try again later.");
        }
      };
  
      fetchReservations();
    }, [userId]);
  
    return (
        <div className="flex flex-col items-center">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6">My Dashboard</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-blue-500 text-white shadow-md p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold">{reservations.length}</h3>
              <p>Total Orders</p>
            </div>
            <div className="bg-green-500 text-white shadow-md p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold">12</h3>
              <p>Coupons</p>
            </div>
            <div className="bg-red-500 text-white shadow-md p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold">24</h3>
              <p>Cancel Order</p>
            </div>
          </div>
  
          <div className="bg-white shadow-md p-6 rounded-lg mt-6">
            <h3 className="text-xl font-bold mb-4">My Recent Orders</h3>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Booking No</th>
                    <th className="border p-2">Vehicle</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Return Date</th>
                    <th className="border p-2">Payment</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.length > 0 ? (
                    reservations.map((res, index) => (
                      <tr key={index} className="border-b">
                        <td className="border p-2">#{res.id}</td>
                        <td className="border p-2">{res.vehicle.companyName}</td>
                        <td className="border p-2">{res.startDate}</td>
                        <td className="border p-2">{res.endDate}</td>
                        <td className="border p-2">₹{res.totalCost}</td>
                        <td className="border p-2">
                          <span className={`px-2 py-1 rounded text-white ${
                            res.status === "Completed"
                              ? "bg-green-500"
                              : res.status === "Cancelled"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}>
                            {res.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="border p-2 text-center text-gray-500">
                        No reservations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  };
  

export default Dashboard;
