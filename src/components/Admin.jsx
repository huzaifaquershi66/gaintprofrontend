import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [depositValues, setDepositValues] = useState({});
  // const [withdrawals, setWithdrawals] = useState([]);
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [completedWithdrawals, setCompletedWithdrawals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of users per page
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [username, setUsername] = useState(""); // Track username input
  const [password, setPassword] = useState(""); // Track password input
  const [loginError, setLoginError] = useState(""); // Error message for invalid credentials

  // Fetch all users data
  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://ganto.work.gd/api/auth/getalluser");
      if (Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        console.error("Data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const response = await axios.get("https://ganto.work.gd/api/auth/allwithdrawls");
  
      if (Array.isArray(response.data.data)) {
        // Treat all withdrawals as "pending" by default
        setPendingWithdrawals(response.data.data);
        setCompletedWithdrawals([]);
  
        // Save withdrawals to localStorage
        localStorage.setItem('pendingWithdrawals', JSON.stringify(response.data.data));
        localStorage.setItem('completedWithdrawals', JSON.stringify([]));
      } else {
        console.error("Data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  };
  
  useEffect(() => {
    fetchUsers();
    fetchWithdrawals();
  }, []);
  const handleApprove = (id) => {
    setPendingWithdrawals((prev) => {
      const updatedPending = prev.filter((withdrawal) => withdrawal._id !== id);
      const approvedWithdrawal = prev.find((withdrawal) => withdrawal._id === id);
  
      if (approvedWithdrawal) {
        // Move the approved withdrawal to the completed list
        setCompletedWithdrawals((prevCompleted) => {
          const newCompleted = [...prevCompleted, approvedWithdrawal];
          localStorage.setItem('completedWithdrawals', JSON.stringify(newCompleted)); // Update localStorage
          return newCompleted;
        });
      }
  
      // Update localStorage with updated pending list
      localStorage.setItem('pendingWithdrawals', JSON.stringify(updatedPending));
      return updatedPending;
    });
  };
  

  // Reject a withdrawal (optional: remove from the list)
  const handleReject = (id) => {
    setPendingWithdrawals((prev) => {
      const updatedPending = prev.filter((withdrawal) => withdrawal._id !== id);
      localStorage.setItem('pendingWithdrawals', JSON.stringify(updatedPending)); // Update localStorage
      return updatedPending;
    });
  };
  

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleInputChange = (userId, field, value) => {
    setDepositValues((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: value,
      },
    }));
  };

  const handleUpdateDeposit = async (userId) => {
    const { usdt = 0, trx = 0 } = depositValues[userId] || {};
    try {
      await axios.post("https://ganto.work.gd/api/auth/updatedeposit", {
        userId,
        currency: "usdt",
        amount: parseFloat(usdt) || 0,
      });
      await axios.post("https://ganto.work.gd/api/auth/updatedeposit", {
        userId,
        currency: "trx",
        amount: parseFloat(trx) || 0,
      });
      alert("Deposit updated successfully!");
    } catch (error) {
      console.error("Error updating deposit:", error);
      alert("Failed to update deposit. Please try again.");
    }
  };

  const handleLogin = () => {
    // Hardcoded credentials
    const correctUsername = "Ehti786";
    const correctPassword = "water1122";

    if (username === correctUsername && password === correctPassword) {
      setIsLoggedIn(true);
      setLoginError(""); // Clear any previous errors
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  };


  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center mb-4">Admin Panel Login</h2>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            {loginError && <p className="text-red-500 text-center">{loginError}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-md p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border border-gray-300 px-4 py-2">Username</th>
                  <th className="border border-gray-300 px-4 py-2">Full Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">USDT</th>
                  <th className="border border-gray-300 px-4 py-2">TRX</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id} className="text-gray-700">
                    <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.fullname}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        placeholder="USDT"
                        className="w-full p-1 border rounded"
                        value={(depositValues[user._id]?.usdt || "")}
                        onChange={(e) => handleInputChange(user._id, "usdt", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        placeholder="TRX"
                        className="w-full p-1 border rounded"
                        value={(depositValues[user._id]?.trx || "")}
                        onChange={(e) => handleInputChange(user._id, "trx", e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleUpdateDeposit(user._id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Withdrawal Requests</h2>

      {/* Pending Withdrawals */}
      <h3 className="text-lg font-semibold text-gray-600 mb-2">Pending Requests</h3>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 px-4 py-2">User</th>
            <th className="border border-gray-300 px-4 py-2">Network</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingWithdrawals.map((withdrawal) => (
            <tr key={withdrawal._id} className="text-gray-700">
              <td className="border border-gray-300 px-4 py-2">
                {withdrawal.userId && withdrawal.userId.username ? withdrawal.userId.username : withdrawal.userId}
              </td>
              <td className="border border-gray-300 px-4 py-2">{withdrawal.selectedNetwork}</td>
              <td className="border border-gray-300 px-4 py-2">{withdrawal.withdrawAmount}</td>
              <td className="border border-gray-300 px-4 py-2">{withdrawal.address}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-green-500 text-white border-gray-900 px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => handleApprove(withdrawal._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 border-2 border-gray-900 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                  onClick={() => handleReject(withdrawal._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Completed Withdrawals */}
      <h3 className="text-lg font-semibold text-gray-600 mb-2">Completed Requests</h3>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 px-4 py-2">User</th>
            <th className="border border-gray-300 px-4 py-2">Network</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {completedWithdrawals.map((withdrawal) => (
            <tr key={withdrawal._id} className="text-gray-700">
              <td className="border border-gray-300 px-4 py-2">
                {withdrawal.userId && withdrawal.userId.username ? withdrawal.userId.username : withdrawal.userId}
              </td>
              <td className="border border-gray-300 px-4 py-2">{withdrawal.selectedNetwork}</td>
              <td className="border border-gray-300 px-4 py-2">{withdrawal.withdrawAmount}</td>
              <td className="border border-gray-300 px-4 py-2">{withdrawal.address}</td>
              <td className="border border-gray-300 px-4 py-2 text-green-600 font-bold">{withdrawal.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AdminPanel;
