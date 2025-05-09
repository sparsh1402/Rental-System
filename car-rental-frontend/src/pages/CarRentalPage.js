import { useContext, useEffect, useState } from "react";
import CarRental from "../components/CarRental";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CarRentalPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [search, setSearch] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const {isLogged,user,logout} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/vehicles");
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        console.log(data);
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCars();
  }, []);
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    setShowSignIn(false);
    logout();
    navigate("/"); // Redirect to Home after logout

};
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilteredCars(
      cars.filter((car) =>
        car.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
    <Navbar onSignUpClick={() => setShowSignUp(true)} onSignInClick={() => setShowSignIn(true)} onLogout={handleLogout} />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Rent A Car</h1>
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for a car..."
            value={search}
            onChange={handleSearch}
            className="p-2 border rounded w-1/2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => <CarRental key={car.id} car={car} />)
          ) : (
            <p className="text-center col-span-3">No cars available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarRentalPage;
