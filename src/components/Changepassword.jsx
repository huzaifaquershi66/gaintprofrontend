import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Message for success or error feedback
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const userId = localStorage.getItem("userId"); // Get user ID from localStorage
      if (!userId) {
        setMessage("User ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        "https://ganto.work.gd/api/auth/updatepassword",
        {
          userId,
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);

      if (response.status === 200) {
        setMessage("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setMessage(response.data.message || "Failed to update password. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating password:", error);
      setMessage(error.response?.data?.message || "An error occurred while updating the password.");
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Change Password</h2>

        {message && (
          <div
            className={`mb-4 p-2 rounded-md text-sm ${
              message.includes("successfully") ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Old Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Old Password</label>
            <input
              type="password"
              className="w-full border-gray-300 border-2 rounded-md p-2"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              className="w-full border-gray-300 border-2 rounded-md p-2"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm New Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full border-gray-300 border-2 rounded-md p-2"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mb-4"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>

        {/* Back Button */}
        <button
          onClick={() => navigate("/setting")}
          className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Back to Settings
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
