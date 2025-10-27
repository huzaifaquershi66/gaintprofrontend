import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';
// import image1 from  "../assets/image2.png"
// const getRandomAdSequence = () => {
//   const adTypes = ["Single", "Double"];
//   const isBig = Math.random() > 0.5;
//   const mainAd = isBig ? "Big" : "Small";
//   const randomAdType = adTypes[Math.floor(Math.random() * adTypes.length)];
//   return [`${mainAd}`, `${randomAdType}`, `${mainAd} ${randomAdType}`];
// };


// const randomSequence = getRandomAdSequence();
// console.log("Random Ad Sequence:", randomSequence.join(" "));


// const createRandomOrder = (id) => {
//   const currentTime = new Date();
//   return {
//     id: `order-${id}-${Date.now()}`, // Ensure unique ID
//     orderNumber: Math.floor(Math.random() * 10000000000000),
//     amount: Math.floor(Math.random() * (92000 - 91000 + 1)) + 91000,
//     adTypes: getRandomAdSequence(),
//     time: currentTime.toLocaleTimeString(),
//     rawTime: currentTime.toISOString(),
//   };
// };



// Example usage
// const orders = [];
// const baseTime = new Date(); // Get the base time only once
// for (let i = 0; i < 5; i++) {
//   orders.push(createRandomOrder(i, baseTime));
// }
// console.log(orders);

const CryptoMarket = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [timeLeft, setTimeLeft] = useState(() => {
    // Retrieve the stored time from localStorage (if available)
    const savedTime = localStorage.getItem('timeLeft');
    return savedTime ? parseInt(savedTime, 10) : 60; // Default to 60 seconds if no saved time
  });
  // const [isTimerActive, setIsTimerActive] = useState(false); // To track if the timer is running

   const [profit, setProfit] = useState(0);
    const [loss, setLoss] = useState(0);

    const [deposit, setDeposit] = useState({ USDT: 0, TRX: 0 });
  const [isBuyPopupOpen, setIsBuyPopupOpen] = useState(false); // New state
  const [orders, setOrders] = useState( []
    // Load orders from localStorage or start with an empty array
  
  );

   const [isFiveMinute, setIsFiveMinute] = useState(false); // To toggle between 1 min and 5 min

    const intervalRef = useRef(null); // Ref to hold the interval ID
    const timerRef = useRef(null);
    const adAddedRef = useRef(false); // UseRef for adAdded flag
 // Ref to prevent duplicate additions

  const [userBalance, setUserBalance] = useState(10); // Example: user balance
  const [isInsufficientBalance, setIsInsufficientBalance] = useState(false);
  const [purchasedCoins, setPurchasedCoins] = useState([]);
  const [timerStarted, setTimerStarted] = useState(false);
   const [timer, setTimer] = useState(0);
 
  
  
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Button disabled state

  // To track if the timer has started

  const [activeButton, setActiveButton] = useState(null);
   // Function to start or reset the timer for a specific order

   const countdownIntervalRef = useRef(null);
   const oneMinIntervalRef = useRef(null);
   const fiveMinIntervalRef = useRef(null);
 

   const handleClick = (index) => {
    setActiveButton(index);
    const userSelection = buttons[index].label;

    if (orders.length > 0) {
      const recentOrder = orders[0];
      const matched = recentOrder.adTypes.includes(userSelection);

      const storedProfit = JSON.parse(localStorage.getItem("profit")) || 0;
      const storedLoss = JSON.parse(localStorage.getItem("loss")) || 0;

      if (matched) {
        const newProfit = storedProfit + 1;
        setProfit(newProfit);
        localStorage.setItem("profit", JSON.stringify(newProfit));
        setResultMessage("Profit! Your choice matched the recent ad.");
      } else {
        const newLoss = storedLoss + 1;
        setLoss(newLoss);
        localStorage.setItem("loss", JSON.stringify(newLoss));
        setResultMessage("Loss! Your choice did not match the recent ad.");
      }
    }
  };
 
 // This useEffect manages the timer update

  // useEffect(() => {
  //     const fetchTimer = async () => {
  //       try {
  //         const response = await fetch("https://tradingbackend-production.up.railway.app/timer");
  //         const data = await response.json();
  //         setTimer(data.remainingTime);
  
  //         // Jab timer 1 ho, toh adRandomAd() call kare aur timer reset kare
  //         if (data.remainingTime === 1) {
  //           addRandomAd();
  //           await fetch("https://tradingbackend-production.up.railway.app/reset-timer", { method: "POST" });
  //         }
  //       } catch (error) {
  //         console.error("Error fetching timer:", error);
  //       }
  //     };
  
  //     fetchTimer(); // Pehli dafa fetch karega
  
  //     intervalRef.current = setInterval(fetchTimer, 1000); // Backend se har second updated time fetch karega
  
  //     return () => clearInterval(intervalRef.current);
  //   }, []);
// useEffect(() => {
//   // Fix order when navigating back
//   const savedOrders = localStorage.getItem("orders");
//   if (savedOrders) {
//     const parsedOrders = JSON.parse(savedOrders);

//     // Remove duplicates in case there are any
//     const uniqueOrders = Array.from(
//       new Map(parsedOrders.map(order => [order.orderNumber, order])).values()
//     );

//     // Set filtered orders ensuring no duplicates
//     setOrders(uniqueOrders);
//     localStorage.setItem("orders", JSON.stringify(uniqueOrders)); // Sync with localStorage
//   }
// }, []);
const fetchOrders = async () => {
  try {
    const response = await fetch("https://ganto.work.gd/api/orders");
    const data = await response.json();
    setOrders(data);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};
const fetchTimer = async () => {
  try {
    const response = await fetch("https://ganto.work.gd/api/timer"); // ✅ Change HTTPS → HTTP
    const data = await response.json();
    setTimer(data.countdown);
    fetchOrders(); 
      // ✅ **Jab Timer `0` Pe Aaye Tabhi New Order Fetch Ho**
      if (data.countdown === 0) {
     
        fetchOrders(); 
      }
  } catch (error) {
    console.error("Error fetching timer:", error);
  }
};

// useEffect(() => {
//   fetchOrders(); // Initial fetch
//   const orderInterval = setInterval(fetchOrders, 6000);
//   return () => clearInterval(orderInterval);
// }, []);

// ✅ **Har second timer update ho**

useEffect(() => {
  fetchTimer();
  fetchOrders()

  const interval = setInterval(fetchTimer, 1000);
  return () => clearInterval(interval);
}, []);

  const buttons = [
    { label: "Big", price: 1.95 },
    { label: "Small", price: 1.95 },
    { label: "Single", price: 1.95 },
    { label: "Double", price: 1.95 },
    { label: "Big Single", price: 3.8 },
    { label: "Small Single", price: 3.8 },
    { label: "Big Double", price: 3.8 },
    { label: "Small Double", price: 3.8 },
  ];
  {buttons.map((button, index) => {
    // Determine the color based on the label
    let sizeColor = "";
  
    if (button.label.includes("Small")) {
      sizeColor = "bg-red-500"; // Red for Small
    } 
    if (button.label.includes("Big")) {
      sizeColor = "bg-green-500"; // Green for Big
    } 
    if (button.label.includes("Single")) {
      sizeColor = "bg-blue-500"; // Blue for Single
    } 
    if (button.label.includes("Double")) {
      sizeColor = "bg-orange-500"; // Orange for Double
    }
  
  })
}
  const [popupDetails, setPopupDetails] = useState({
    currencyType: "USDT",
    amount: "",
    totalBet: 0,
    totalAmount: 0,
  });
 


  useEffect(() => {
    // Load purchased coins from localStorage
    const storedCoins = JSON.parse(localStorage.getItem("purchasedCoins")) || [];
    setPurchasedCoins(storedCoins);
  }, []);
  
  
    // Function to add a new random order every minute
   
    // const addRandomAd = async () => {
    //   const newOrder = createRandomOrder(orders.length);
    
    //   try {
    //     const response = await fetch("https://tradingbackend-production.up.railway.app/api/orders", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(newOrder),
    //     });
    
    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log("Order added to MongoDB:", data);
    
    //       // Frontend state update
    //       setOrders((prevOrders) => [data.order, ...prevOrders]);
    //     } else {
    //       console.error("Failed to add order");
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };
    
    
       // Start the interval timer
      //  const startTimer = () => {
      //   if (!intervalRef.current) {
      //     intervalRef.current = setInterval(() => {
     
      //     },6000); // Generate one ad every minute
      //   }
      // };
  
      useEffect(() => {
   
      
         // Load initial profit and loss from localStorage
         const storedProfit = JSON.parse(localStorage.getItem("profit")) || 0;
         const storedLoss = JSON.parse(localStorage.getItem("loss")) || 0;
     
         setProfit(storedProfit);
         setLoss(storedLoss);
     
        //  startTimer();
     
         return () => {
           if (intervalRef.current) {
             clearInterval(intervalRef.current);
             intervalRef.current = null;
           }
         };
       }, []);
    useEffect(() => {
      const fetchDeposit = async () => {
        try {
          // Get the token from localStorage or sessionStorage
          // const token = localStorage.getItem("token"); // Replace with your token storage method
          
          // Make the request with the token
          const response = await axios.get("https://ganto.work.gd/api/auth/userdeposit", {
           
            withCredentials: true, 
          });
    
          // Update state with the fetched deposit
          setDeposit(response.data.data.deposit);
        } catch (err) {
          // Handle error (e.g., unauthorized)
          setError("Failed to fetch deposit details");
        }
      };
    
      fetchDeposit();
    }, []);
  // Button handlers
  const handleSmallClick = (orderId) => {
    console.log(`Small clicked for Order ID: ${orderId}`);
  };

  const handleBigClick = (orderId) => {
    console.log(`Big clicked for Order ID: ${orderId}`);
  };

  const handleSingleClick = (orderId) => {
    console.log(`Single clicked for Order ID: ${orderId}`);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 4,
              page: 1,
            },
          }
        );
        setCoins(response.data);
        
        // Automatically select Bitcoin if it exists in the response
        // const bitcoin = response.data.find((coin) => coin.id === "bitcoin");
        // if (bitcoin) {
        //   setSelectedCoin(bitcoin);
        // }
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };
    fetchCoins();
  }, []);
  

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
  };

  const closePopup = () => {
    setSelectedCoin(null);
    setPopupDetails({
      currencyType: "USDT",
      amount: "",
      totalBet: 0,
      totalAmount: 0,
    });
  };

  const handlePopupInputChange = (e) => {
    const { name, value } = e.target;
    setPopupDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleConfirm = () => {
    console.log("Popup Details Submitted:", popupDetails);
    alert(`Order placed for ${selectedCoin.name}`);
    closePopup();
  };

  const handleBuyClick = () => {
    setIsBuyPopupOpen(true);
    setIsInsufficientBalance(false);
  };
 
 
  const handleBuyClickf = async () => {
    if (timer < 15) {
      alert("Trade cannot be completed. Time is less than 15 seconds.");
      return;
    }
  
    const { amount, currencyType } = popupDetails;
  
    // Ensure currencyType is in lowercase for validation
    const currency = currencyType.toLowerCase();
  
    // Check if the currencyType is supported (convert to lowercase)
    if (currency !== "usdt" && currency !== "trx") {
      alert("Unsupported currency");
      return;
    }
  
    // Validate the amount and currencyType
    if (!currencyType || amount <= 0) {
      alert("Invalid purchase details.");
      return;
    }
  
    // Fetch the current available balance from userDeposit state
    const availableBalance = deposit[currency];
  
    // Check if the trade amount meets the conditions
    if (amount < 1) {
      alert("Trade amount must be at least 1 USDT or 1 TRX.");
      return;
    }
  
    if (amount > availableBalance) {
      alert(`Insufficient balance. You only have ${availableBalance} ${currency} available.`);
      return;
    }
  
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 10000);
      // Simulate profit or loss calculation
      const isProfit = profit > loss; // Example logic, adjust as per your calculation

    // Proceed with the trade
    const newPurchase = {
      id: Date.now(), // Unique ID for the trade
      currencyType: currencyType,
      amount,
      date: new Date().toISOString(),
      isProfit, // Add the isProfit field
      profit: isProfit ? profit : 0, // Save profit if it's a profit trade
      loss: !isProfit ? loss : 0, // Save loss if it's a loss trade

    };
  
    // Deduct amount from user deposit
    const updatedDeposit = { ...deposit, [currency]: availableBalance - amount };
  
    // Update the deposit state with the new balance
    setDeposit(updatedDeposit);
  
    // Make an API request to update the user's deposit on the server
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log(userId); // Ensure this is the correct userId from storage or session
    
      await axios.post(
        "https://ganto.work.gd/api/auth/updateDeposit",
        {
          userId: userId, // Pass the correct user ID here
          currency: currency,
          amount: -amount, // Deduct the trade amount from the deposit
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    
      // Delay saving trade to localStorage by 1 minute
      setTimeout(() => {
        const existingTrades = JSON.parse(localStorage.getItem("purchasedCoins")) || [];
        const updatedTrades = [...existingTrades, newPurchase];
        localStorage.setItem("purchasedCoins", JSON.stringify(updatedTrades));
        console.log("Trade added to localStorage after 1 minute:", newPurchase);
      }, 30000); // 1 minute delay
    
      alert("Trade completed successfully!");
    
      // Close the buy popup and reset state
      setIsBuyPopupOpen(false);
      setIsInsufficientBalance(false);
    } catch (error) {
      console.error("Error updating deposit:", error);
      alert("Failed to update deposit.");
    }
    
  }
  
  const saveTradeDetails = (coin, previousAmount, updatedAmount, type) => {
    const tradeDetails = {
      coin,
      previousAmount,
      updatedAmount,
      type, // "Profit" or "Loss"
      date: new Date().toISOString(),
    };
    
    const existingTrades = JSON.parse(localStorage.getItem("tradeHistory")) || [];
    existingTrades.push(tradeDetails);
    localStorage.setItem("tradeHistory", JSON.stringify(existingTrades));
  };


  const closeBuyPopup = () => {
    setIsBuyPopupOpen(false);
    setIsInsufficientBalance(false);
  }
 
  useEffect(() => {
    let timer;
    
    if (isBuyPopupOpen) {
      // Start timer when popup is open
      timer = setInterval(() => {
        setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
  
    // Clean up the timer when the popup closes or the component unmounts
    return () => clearInterval(timer);
  }, [isBuyPopupOpen]);
  

const getColorForLabel = (label) => {
  if (label.includes("Small")) return "bg-red-500"; // Red for Small
  if (label.includes("Big")) return "bg-green-500"; // Green for Big
  if (label.includes("Single")) return "bg-blue-500"; // Blue for Single
  if (label.includes("Double")) return "bg-orange-500"; // Orange for Double
  return "bg-gray-500"; // Default color if none matches
};
  return (
    <div className="p-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Crypto Market</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="flex flex-col items-start p-4 bg-white border-2 border-pink-600 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2 cursor-pointer"
            onClick={() => handleCoinClick(coin)}
          >
            <div className="flex items-center w-full mb-4">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-14 h-14 rounded-full bg-gray-600 mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {coin.name}
                </h3>
                <span className="ml-2 text-xl font-medium text-purple-700">
                  ${coin.current_price}
                </span>
                <p className="text-sm text-gray-500">
                  {coin.symbol.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCoin && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
    <div className="relative bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-4xl w-full">
      <button
        className="absolute top-7 right-3 text-gray-500 hover:text-gray-800 text-xl  font-bold"
        onClick={closePopup}
      >
        &times;
      </button>
      <h3 className="text-2xl font-bold mb-4">
        {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})
      </h3>
      <div id="tradingview_chart" className="h-64 mb-6">
      <iframe
  src={`https://s.tradingview.com/widgetembed/?symbol=${selectedCoin.symbol.toUpperCase()}USD&interval=D&theme=light&style=1&locale=en&toolbarbg=f1f3f6&hide_top_toolbar=1&hide_side_toolbar=1`}
  width="100%"
  height="100%"
  allowFullScreen
  frameBorder="0"
></iframe>

      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1
        style={{
          fontSize: "3rem",
          textDecoration: timer < 15 ? "line-through" : "none", // Add line-through when timer < 15
          color: timer < 15 ? "red" : "black", // Optional: Change color for better visibility
        }}
      >
       Timer: {timer}
      </h1>
    </div>
      <div className="relative bg-gray-100 p-4 rounded-md max-h-80 overflow-y-auto">
  <h4 className="text-lg font-semibold mb-2 text-center sm:text-left">
    Order Details
  </h4>
  <table className="table-auto w-full text-left mb-4 border-collapse">
    <thead className="bg-gray-200">
      <tr>
        <th className="px-2 sm:px-4 py-2 border">Order Number</th>
        <th className="px-2 sm:px-4 py-2 border">Amount</th>
        <th className="px-2 sm:px-4 py-2 border">Result</th>
        <th className="px-2 sm:px-4 py-2 border">Time</th>
      </tr>
    </thead>
    <tbody>
    {orders.map((order) => (
    <tr key={order.id} className="odd:bg-white even:bg-gray-50">
      <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm">
        {order.orderNumber}
      </td>
      <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm">
        {order.amount}
      </td>
      <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm">
      <div className="flex flex-wrap gap-2">
        {order.adTypes.map((adType) => (
    <button
      key={adType}
      className={`px-2 py-1 border rounded ${
        adType.toLowerCase() === "small"
          ? "border-red-500 text-red-500"
          : adType.toLowerCase() === "big"
          ? "border-green-500 text-green-500"
          : adType.toLowerCase() === "single"
          ? "border-blue-500 text-blue-500"
           
          : adType.toLowerCase() === "double"
          ? "border-orange-500 text-orange-500"
          : "border-gray-500 text-gray-500" // Default case
      }`}
    >
      {adType}
    </button>
  ))}
        </div>
      </td>
      <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm">
      {new Date(order.rawTime).toLocaleTimeString()}
      </td>
      
    </tr>
  ))}

</tbody>


  </table>
 
  {/* Fixed Buy Button */}
  <div className="fixed bottom-0 left-0 w-full bg-gray-100 p-4">
    <button
      type="button"
      className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      onClick={handleBuyClick}
    >
      Buy
    </button>
  </div>
</div>



    </div>
  </div>
)}



 {/* Insufficient Balance Popup */}
 {isInsufficientBalance && isBuyPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
          <div className="relative bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={closeBuyPopup}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4">Insufficient Balance for Trade</h3>
            <p className="text-lg text-red-500">You do not have enough balance to proceed with this trade.</p>
            <button
              onClick={closeBuyPopup}
              className="px-4 py-2 bg-gray-500 text-white rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Buy Popup */}
      {!isInsufficientBalance && isBuyPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
          <div className="relative bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={closeBuyPopup}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4">Place Your Order</h3>
            <div className="flex justify-between mb-4">
        {/* Timer Display */}
        <span className="text-lg">Time Left: {timeLeft}s</span>
      </div>

            <div className="space-y-4">
              {/* Buttons for the options in a single row */}
              <div className="grid grid-cols-4 gap-4">
      {/* Render the buttons dynamically */}
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)} // Pass the index to handleClick
          className={`border border-gray-300 text-lg p-2 rounded shadow ${
            activeButton === index ? "bg-blue-500 text-white" : "bg-transparent hover:bg-gray-100"
          }`}
        >
          {button.label} <br /> {button.price}
        </button>
      ))}
    </div>

              {/* Currency Type and Amount Input */}
              <div className="flex items-center justify-between">
                <label className="text-lg">Currency Type</label>
                <select
                  name="currencyType"
                  value={popupDetails.currencyType}
                  onChange={handlePopupInputChange}
                  className="border p-2 rounded"
                >
                  <option value="USDT">USDT</option>
                  <option value="TRX">TRX</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-lg">Amount</label>
                <div className="flex items-center space-x-2">
                  {/* Input field with default value of 0 */}
                  <input
                    type="number"
                    name="amount"
                    value={popupDetails.amount}
                    onChange={handlePopupInputChange}
                    className="border p-2 rounded w-32"
                  />
                  {/* "All" button with black background */}
                  {/* <button
                    onClick={handleAllButtonClick}
                    className="bg-black text-white p-2 rounded"
                  >
                    All
                  </button> */}
                </div>
              </div>

              {/* Total Bet and Total Amount */}
              <div className="flex items-center justify-between">
  <label className="text-lg">Total Bet</label>
  <span className="text-lg">
    {popupDetails.amount ? `${popupDetails.amount} ${popupDetails.currencyType}` : `0 ${popupDetails.currencyType}`}
  </span>
</div>
<div className="flex items-center justify-between">
  <label className="text-lg">Total Amount</label>
  <span className="text-lg">
    {popupDetails.amount ? `${popupDetails.amount} ${popupDetails.currencyType}` : `0 ${popupDetails.currencyType}`}
  </span>
</div>

              {/* Confirm Order Button */}
              <div>
              <button
    className={`px-4 py-2 text-white rounded ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"}`}
    onClick={handleBuyClickf}
    disabled={isButtonDisabled} // Disable button based on state
  >
    Confirm Order
  </button>
              </div>
            </div>
          </div>
        </div>
      )}
    {/* </div> */}


    </div>
  );
};

export default CryptoMarket;
