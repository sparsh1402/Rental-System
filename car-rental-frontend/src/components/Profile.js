import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Footer from "./Footer";

const Profile = () => {
    const {isLogged,user,logout} = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("userId");
    const { token } = useContext(AuthContext);
    
    useEffect(() => {
      const fetchUserData = async () => {
        if (!userId) return;
        try {
          const response = await fetch(`http://localhost:8080/api/users/${userId}`);
          console.log(response);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
        } catch (err) {
          setError("Failed to load user data. Please try again later.");
        }
      };
      fetchUserData();
    }, [userId]);
  
    const handleUpdate = async () => {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ ...user, password: newPassword }),
        });
        if (!response.ok) {
          throw new Error("Update failed");
        }
        alert("Profile updated successfully!");
      } catch (err) {
        setError("Failed to update profile.");
      }
    };
  
    return (
      <div className="bg-white shadow p-6 rounded-lg flex-1">
        <h3 className="text-xl font-bold mb-4">Update Profile</h3>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Enter Username"
            value={user.name}
            className="border p-2 w-full"
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={user.email}
            className="border p-2 w-full"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="password"
            placeholder="Re-Enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button className="mt-4 bg-black text-white py-2 px-6 rounded" onClick={handleUpdate}>
          Update Profile
        </button>
      </div>
    );
  };
  
export default Profile;
