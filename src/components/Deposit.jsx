import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState,useEffect } from 'react';
import { faQuestionCircle ,faMicrophone, faMessage, faCommentDots,faXmark,faHeart,faBell,faCirclePlus,faUser,faTimes,faCheck,faCopy,faHome,faWallet,faArrowDown,faClipboardList,faFileAlt,faExchangeAlt,faCog} from '@fortawesome/free-solid-svg-icons';
import image1 from  "../assets/image2.png"
import image2 from "../assets/image3.png"
import CryptoMarket from './cryptomarket';
import BottomNavigation from './Bottomnavigation';
import RechargePage from './Recharge';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
  FaExchangeAlt,
  FaClipboard,
  FaNewspaper,
  FaCog,
  FaGlobe,
  FaGift,
  FaLock,
  FaUsers,
  FaShoppingCart,
} from "react-icons/fa";
const Button = ({ icon: Icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-2 text-white bg-gray-700 mt-10 w-full rounded-lg hover:bg-gray-700 hover:text-white transition duration-200">
    <Icon className="text-xl" />
    {label}
  </button>
);

const Deposit = () => {
    const [toggleform, settoggleform] = useState(false)
    const [copied, setCopied] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [uniqueId, setUniqueId] = useState("");

    const [deposit, setDeposit] = useState({ usdt: 0, trx: 0 });
    const generateUniqueID = () => {
      return Math.floor(1000000 + Math.random() * 9000000); // Ensures a 7-digit number
    };
  
   
    const [error, setError] = useState(null);

    const handleClick = () => {
      setShowMessage(true);
    };
  const payID = "7474747";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(payID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };
  useEffect(() => {
    // Check if an ID already exists in localStorage
    const storedId = localStorage.getItem("uniqueId");
    if (storedId) {
      setUniqueId(storedId); // Use the existing ID
    } else {
      const newId = generateUniqueID(); // Generate a new ID
      localStorage.setItem("uniqueId", newId); // Save to localStorage
      setUniqueId(newId); // Set state
    }
  }, []);
  
  
  const handletoggleform =()=>{
    settoggleform(!toggleform)
  }
  const handleclick = ()=>{
    navigate("/placeadd")
    settoggleform(!toggleform)
  }
  useEffect(() => {
    const fetchDeposit = async () => {
      try {
        // Get the token from localStorage or sessionStorage
        // const token = localStorage.getItem("token"); // Replace with your token storage method
        
        // Make the request with the token
        const response = await axios.get("https://ganto.work.gd/api/auth/userdeposit", {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials: true, 
        });
  
        // Update state with the fetched deposit
        setDeposit(response.data.data.deposit);
        //  console.log(response.data)
      } catch (err) {
        // Handle error (e.g., unauthorized)
        setError("Failed to fetch deposit details");
      }
    };
  
    fetchDeposit();
  }, []);
  

  const coins = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$43,000",
      change: "+3.2%",
      image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png", // Replace with the actual image URL
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "$3,200",
      change: "-1.5%",
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png", // Replace with the actual image URL
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "$55",
      change: "+5.0%",
      image: "https://cryptologos.cc/logos/solana-sol-logo.png", // Replace with the actual image URL
    },
    {
      name: "Matic",
      symbol: "MATIC",
      price: "$1.20",
      change: "+2.8%",
      image: "https://cryptologos.cc/logos/polygon-matic-logo.png", // Replace with the actual image URL
    },
  ];
  return (
    <>
<div className='bg-gray-300 h-[1200px]  w-full'>
  <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 h-96 w-full">
    {/* Header Section */}
    <div className="flex items-center justify-between h-20 w-full px-6">
      {/* Menu Icon */}
      <div className="h-12 w-12 md:mx-20 border-purple-400 border-[3px] rounded-xl flex items-center justify-center" onClick={handletoggleform}>
        <img
          src="data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='SVGRepo_bgCarrier'%20stroke-width='0'%3e%3c/g%3e%3cg%20id='SVGRepo_tracerCarrier'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3c/g%3e%3cg%20id='SVGRepo_iconCarrier'%3e%3cg%20id='Menu%20/%20Menu_Alt_03'%3e%3cpath%20id='Vector'%20d='M5%2017H13M5%2012H19M5%207H13'%20stroke='%23ffffff'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e"
          alt="Menu Icon"
          className="h-8 w-8"
        />
      </div>

      {/* Center Text */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text font-extrabold text-3xl md:text-4xl tracking-wide drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
        Gain
        <span className="text-white text-opacity-90 drop-shadow-[0_3px_5px_rgba(255,255,255,0.6)] italic underline decoration-purple-300 decoration-2 underline-offset-2">
          Pro
        </span>
      </div>

      {/* Icon Section */}
      <div className="flex space-x-4">
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-white text-3xl cursor-pointer hover:text-purple-300 transition-all duration-300"
        />
      </div>
    </div>
    
    <div className="flex flex-col md:flex-row justify-center gap-4 p-4">
  {/* First Card */}
  <div className="p-4 rounded-3xl shadow-lg w-full max-w-[380px] mx-auto">
    {/* Total Balance Title */}
    <h3 className="text-lg font-manrope font-semibold text-gray-300">Total Balance</h3>

    {/* Total Balance Value */}
    <p className="text-3xl font-roboto font-bold text-gray-100 mt-2">{deposit.usdt}USDT</p>

    {/* Equivalent Dollar Value */}
    <p className="text-lg font-sansing text-gray-400 mt-2">= {deposit.usdt}$</p>
  </div>

  {/* Second Card */}
  <div className="p-4 rounded-3xl shadow-lg w-full max-w-[380px] mx-auto">
    {/* Transaction Title */}
    <h3 className="text-lg font-manrope font-semibold text-gray-300">Total Transactions</h3>

    {/* Total Transactions Value */}
    <p className="text-3xl font-roboto font-bold text-gray-100 mt-2">{deposit.trx} TRX</p>

    {/* Equivalent Dollar Value */}
    <p className="text-lg font-sansing text-gray-400 mt-2">={deposit.trx}$</p>
  </div>
</div>


    <div className="h-46 w-full px-2 rounded-3xl relative">
      {/* Card Image */}
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-LkeyHBd9LpeJ3i5MBvDW_0ns2xVUDFb1Q&s"
        className="object-cover h-full w-full rounded-3xl"
        alt="Card Image"
      />

      {/* Overlay Content */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-between items-center w-full px-4">
        {/* Visa Text */}
        <p className="text-white text-2xl font-roboto font-semibold">VISA</p>

        {/* Card Number with Copy Icon */}
        <div className="flex items-center space-x-2">
      <p className="text-white text-xl font-roboto">{uniqueId}</p>
      <i
        className="fa fa-copy text-white text-2xl cursor-pointer"
        onClick={() => navigator.clipboard.writeText(uniqueId)}
      />
    </div>
      </div>

      <div className="absolute glass-effect top-20 left-0 flex flex-col  justify-start items-start w-full px-4">
        {/* Trending Wallet Text */}
        <p className="text-white text-sm font-roboto font-semibold my-3">Trending Wallet</p>

        {/* USDT Amount */}
        <div className="flex justify-between items-center gap-4">
  {/* First Item */}
  <div className="flex items-center">
    <p className="text-white text-3xl font-montserrat">{deposit.usdt}</p>
    <p className="text-white text-sm font-helveticaLight ml-2">USDT</p>
  </div>

  {/* Second Item */}
  <div className="flex items-center">
    <p className="text-white text-3xl font-montserrat">{deposit.trx}</p>
    <p className="text-white text-sm font-helveticaLight ml-2">TRX</p>
  </div>
</div>


        <div className="flex flex-wrap justify-between items-center mt-10 space-x-8 ">
          {/* Deposit Card */}
          <Link to="/transfer">
          <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex flex-col justify-between items-center p-2">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2976/2976467.png" 
              alt="Deposit Icon" 
              className="w-16 h-16 object-cover"
            />
            <p className="text-purple-500 text-sm font-roboto mt-6">Deposit</p>
          </div>
          </Link>

          {/* Withdraw Card */}
          <Link to="/withdraw">
          <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex flex-col justify-between items-center p-2">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/9976/9976760.png" 
              alt="Withdraw Icon" 
              className="w-16 h-16 object-cover"
            />
            <p className="text-purple-600 text-sm font-roboto mt-6">Withdraw</p>
          </div>
          </Link>
          {/* Transfer Card */}
          <div>
      {/* Transfer Button */}
      <div 
        className="h-16 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex flex-col justify-between items-center p-2 cursor-pointer"
        onClick={handleClick}
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/512/179/179793.png" 
          alt="Transfer Icon" 
          className="w-16 h-16 object-cover"
        />
        <p className="text-purple-600 text-sm font-roboto mt-6">Transfer</p>
      </div>

      {/* Popup Message */}
      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-center text-lg font-roboto text-gray-700">Not open yet</p>
            <button 
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl" 
              onClick={() => setShowMessage(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
        </div>

        <div className='h-[1px] w-full'></div>
        <div className="space-y-2 p-4  text-gray-800">
          <Link to={"/trade"}>
      <Button icon={FaShoppingCart} label="Trade" />
</Link>
      <Link to="/trade">
      <Button icon={FaClipboard} label="Record" />
      </Link>
 
     <Link to={"/transactions"}>
      <Button icon={FaExchangeAlt} label="Exchange" />
      </Link>
      <Link to="/myteam">
      <Button icon={FaUsers} label="My Team" />
      </Link>
      <Link to="/setting">
      <Button icon={FaUsers} label="Setting" />
      </Link>
    </div>
      </div>
    </div>
  </div>
{/* 

  {/* Sidebar */}


</div>

<BottomNavigation/>
</>
  )
}

export default Deposit
