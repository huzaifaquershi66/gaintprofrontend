import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WithdrawPage = () => {
  const [newWithdrawPin, setNewWithdrawPin] = useState("");
  const [confirmWithdrawPin, setConfirmWithdrawPin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleUpdateWithdrawPin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newWithdrawPin !== confirmWithdrawPin) {
      setError("New withdraw PIN and confirmation PIN do not match.");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("User ID is not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.put(
        "https://ganto.work.gd/api/auth/update-withdraw-pin",
        {
          userId,
          newWithdrawPin,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data && response.data.message === "Withdraw pin updated successfully") {
        setSuccess("Withdraw PIN updated successfully!");
        setTimeout(() => {
          navigate("/setting"); // Redirect back to the settings page after success
        }, 2000);
      } else {
        setError(response.data.message || "Failed to update withdraw PIN.");
      }
    } catch (err) {
      setError("An error occurred while updating the withdraw PIN.");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex justify-center items-center px-6">
      <div className="bg-white w-full max-w-md shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Update Withdraw PIN</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleUpdateWithdrawPin}>
          {/* New Withdraw PIN */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">New Withdraw PIN</label>
            <input
              type="password"
              value={newWithdrawPin}
              onChange={(e) => setNewWithdrawPin(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Confirm Withdraw PIN */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Confirm New Withdraw PIN</label>
            <input
              type="password"
              value={confirmWithdrawPin}
              onChange={(e) => setConfirmWithdrawPin(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Update PIN
          </button>
          <button
          onClick={() => navigate("/setting")}
          className="w-full bg-gray-300 text-gray-700 py-2 mt-2 rounded-lg hover:bg-gray-400 transition"
        >
          Back to Settings
        </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawPage;
