import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; // Import axios for making API calls

const Withdrawpage = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('USDT');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [address, setAddress] = useState('');
  const [fee] = useState(1); // Fixed fee for TRX
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [withdrawPin, setWithdrawPin] = useState(''); // New state for Withdraw PIN
  const [error, setError] = useState(''); // State to handle errors
  const [userId, setUserId] = useState(null); // State to hold user ID
  const navigate = useNavigate(); // useNavigate for back navigation

  useEffect(() => {
    // Fetch the authenticated user's ID when the component mounts
    const user = localStorage.getItem('userId'); // Replace with your method of getting the userId
    if (user) {
      setUserId(user); // Set user ID from your session management
    }
  }, []);

  const handleWithdrawAmountChange = (e) => {
    const amount = e.target.value;
    setWithdrawAmount(amount);
    if (selectedNetwork === 'TRX') {
      // Deducting fee for TRX network withdrawal
      setReceiveAmount(amount - fee);
    } else {
      setReceiveAmount(amount); // For USDT, no fee
    }
  };

  const handleNetworkChange = (e) => {
    setSelectedNetwork(e.target.value);
    // Reset the amounts and address for the new network
    setWithdrawAmount('');
    setReceiveAmount(0);
  };

  const handleBack = () => {
    navigate('/deposit'); // Redirect to deposit page
  };

  const handleWithdrawRequest = async () => {
    if (!userId) {
      setError('User is not authenticated.');
      return;
    }
  
    if (!withdrawAmount || !address || !withdrawPin) {
      setError('Please fill in all the fields.');
      return;
    }
  
    try {
      // Fetch user details and validate withdraw PIN
      const response = await axios.get(`https://ganto.work.gd/api/auth/getuser/${userId}`, {
        withCredentials: true,
        params: {
          withdrawpin: withdrawPin // Send the PIN to the backend
        }
      });
  
      if (response.data.success) {
        // If the PIN is correct, proceed with the withdrawal request
        const withdrawData = {
          userId,
          selectedNetwork,
          withdrawAmount,
          address,
          receiveAmount,
          withdrawPin
        };
  
        // Make the API call to create the withdrawal request
        const withdrawResponse = await axios.post('https://ganto.work.gd/api/auth/createwithdraw', withdrawData,{  withCredentials: true,});

        if (withdrawResponse.data.success) {
          alert('Withdrawal Requested! Your request will be reviewed by the admin.');
          setError(''); // Reset error on success
        } else {
          setError('Failed to create withdrawal request.');
        }
      } else {
        setError('Incorrect Withdraw PIN.');
      }
    } catch (error) {
      console.error('Error during withdrawal:', error);
      setError('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md relative">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 p-2 text-gray-500 hover:text-gray-700"
      >
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <h2 className="text-2xl font-semibold text-center mb-6">Withdraw</h2>

      {/* Wallet Selection */}
      <div className="mb-4">
        <label htmlFor="network" className="block text-sm font-medium text-gray-700">Select Wallet</label>
        <select
          id="network"
          value={selectedNetwork}
          onChange={handleNetworkChange}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="USDT">USDT</option>
          <option value="TRX">TRX</option>
        </select>
      </div>

      {/* Withdraw Address */}
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Withdraw Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your withdraw address"
        />
      </div>

      {/* Withdraw Amount */}
      <div className="mb-4">
        <label htmlFor="withdrawAmount" className="block text-sm font-medium text-gray-700">Withdraw Amount</label>
        <input
          type="number"
          id="withdrawAmount"
          value={withdrawAmount}
          onChange={handleWithdrawAmountChange}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount to withdraw"
        />
      </div>

      {/* PIN for Withdraw */}
      <div className="mb-4">
        <label htmlFor="withdrawPin" className="block text-sm font-medium text-gray-700">Enter Withdraw PIN</label>
        <input
          type="password"
          id="withdrawPin"
          value={withdrawPin}
          onChange={(e) => setWithdrawPin(e.target.value)}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your withdraw PIN"
        />
      </div>

      {/* Error message */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Receive Quantity */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Receive Quantity</label>
        <p className="text-xl font-semibold">{receiveAmount} {selectedNetwork}</p>
      </div>

      {/* Confirm Button */}
      <div className="mt-6">
        <button
          onClick={handleWithdrawRequest}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Withdrawpage;
