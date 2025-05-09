import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import UserPanelPage from "./pages/UserPanelPage";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import "./styles/global.css";
import CarRentalPage from "./pages/CarRentalPage";
import BookingPage from "./pages/BookingPage";

const App = () => {
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/user-panel" element={<UserPanelPage />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
          <Route path="/car-rental" element={<CarRentalPage />} />
          <Route path="/car-rental/:carName" element={<BookingPage />} />

        </Routes>
    </AuthProvider>
  );
};

export default App;
