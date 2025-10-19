import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BottomNavigation from "./components/Bottomnavigation";

const SettingsPage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios
      .get(`https://tradingbackend-production.up.railway.app/api/auth/getuser/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleChangePassword = () => {
    navigate("/change-password"); // Navigate to the change password page
  };

  const handleChangeWithdrawPin = () => {
    navigate("/change-withdraw-pin"); // Navigate to the change withdraw pin page
  };

  return (
    <>
      <div className="h-[1000px] bg-gradient-to-b from-gray-100 to-gray-300 flex justify-center items-center px-6">
        <div className="bg-white w-full max-w-4xl shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-lg font-semibold text-gray-800">{user.username || "Loading..."}</p>
            </div>

            {/* Gender */}
            <div>
              <p className="text-sm font-medium text-gray-500">Gender</p>
              <p className="text-lg font-semibold text-gray-800">Unknown</p>
            </div>

            {/* Email */}
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-800">{user.email || "Loading..."}</p>
            </div>

            {/* Change Login Password */}
            <div>
              <p className="text-sm font-medium text-gray-500">Change Login Password</p>
              <button
                onClick={handleChangePassword}
                className="text-blue-500 font-medium hover:underline mt-1"
              >
                Change
              </button>
            </div>

            {/* Change Withdraw Pin */}
            <div>
              <p className="text-sm font-medium text-gray-500">Change Withdraw Pin</p>
              <button
                onClick={handleChangeWithdrawPin}
                className="text-blue-500 font-medium hover:underline mt-1"
              >
                Change
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white font-medium py-3 rounded-lg hover:bg-red-600 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default SettingsPage;
