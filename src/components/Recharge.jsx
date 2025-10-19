import React from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import { FiArrowLeft } from "react-icons/fi";  // Importing the back icon from react-icons

const RechargePage = () => {
  const navigate = useNavigate(); // Using useNavigate for navigation

  // Function to navigate back to the deposit page
  const handleBackClick = () => {
    navigate("/deposit"); // Navigating to the /deposit page
  };
  const originalString = "TJNUz9WwHHjtrhzPjF5Y1c1xx7QBTUkHXB";
  const getModifiedString = (str) => {
    const chars = str.split(""); // Convert string to array
    const randomIndex1 = Math.floor(Math.random() * chars.length); // Random index
    chars[randomIndex1] = getRandomCharacter(); // Replace with random character
  
    // Optionally change another character
    if (Math.random() > 0.5) {
      const randomIndex2 = Math.floor(Math.random() * chars.length);
      chars[randomIndex2] = getRandomCharacter();
    }
  
    return chars.join(""); // Convert back to string
  };
  
  // Helper function to generate a random alphanumeric character
  const getRandomCharacter = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return characters.charAt(Math.floor(Math.random() * characters.length));
  };
  
  const modifiedString = getModifiedString(originalString);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="text-gray-700 flex items-center mb-6 space-x-2 text-lg hover:text-blue-500 transition"
        >
          <FiArrowLeft />
          <span>Back to Deposit</span>
        </button>
        
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Recharge Information</h1>
        
        {/* Recharge Address */}
        <div className="bg-gray-100 p-6 rounded-md mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Recharge Address</h2>
          <p className="text-sm text-gray-800 font-medium break-words">
          {modifiedString}
          </p>
        </div>

        {/* Deposit Info */}
        <div className="bg-blue-50 p-6 rounded-md mb-6">
          <p className="text-sm text-gray-800">
            This address only accepts <strong className="text-blue-600">TRX/USDT</strong> deposits.
          </p>
        </div>

        {/* Recharge Network */}
        <div className="bg-gray-100 p-6 rounded-md mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Recharge Network</h2>
          <p className="text-sm text-gray-700 font-medium">TRX/TRC20</p>
        </div>

        {/* Refresh Balance */}
        <div className="mb-6">
  <p className="text-sm text-gray-800">
    <span className="font-semibold">Didn't receive recharge?</span>
    <br />
    <button
      className="text-blue-600 hover:underline"
      onClick={() => window.location.reload()}
    >
      Click to refresh balance
    </button>
  </p>
</div>


        {/* Transaction Info */}
        <div className="bg-gray-100 p-6 rounded-md mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Transaction Information</h2>
          <ul className="space-y-4 text-sm text-gray-800">
            <li><strong>Minimum Recharge Amount:</strong> 1 TRX/USDT</li>
            <li><strong>Expected Arrival:</strong> 1 network confirmation</li>
            <li><strong>Expected Unlock:</strong> 1 network confirmation</li>
            <li>
              <strong>Remark:</strong> Please do not deposit any non-TRC20-USDT assets to the above address, as they will not be retrieved.
            </li>
          </ul>
        </div>

        {/* Additional Instructions */}
        <div className="bg-gray-100 p-6 rounded-md shadow-sm">
  <h2 className="text-xl font-semibold mb-4 text-gray-700">Remark</h2> {/* Heading for Remarks */}
  <p className="text-sm text-gray-800 mb-2">
    After depositing to the above address, you need to confirm the entire network node. The account will receive the funds after 1 network confirmation, and you can withdraw coins after 1 network confirmation.
  </p>
  <p className="text-sm text-gray-800 mb-2">
    The minimum deposit amount is $1. Deposits less than the minimum amount will not be credited to the account and will be returned.
  </p>
  <p className="text-sm text-gray-800 mb-2">
    Your deposit address will not change frequently, and you can continue to use it. If there are any changes, we will make our best effort to notify you via website announcements or emails.
  </p>
  <p className="text-sm text-gray-800">
    Please ensure that your computer and browser are secure to prevent any information from being tampered with or leaked.
  </p>
</div>

      </div>
    </div>
  );
};

export default RechargePage;
