import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faExchangeAlt, faClipboardList, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Link,useNavigate } from 'react-router-dom';

const BottomNavigation = () => {
  const [active, setActive] = useState('home');
  const navigate = useNavigate();
  const handleSupportClick = () => {
    localStorage.setItem('openChat', 'true'); // Set flag to open chatbot on the home page
    navigate('/home'); ; // Navigate to the home page
  };

  return (
    <div className=" fixed bottom-[-16px] left-0   right-0 bg-gray-800 p-4 shadow-lg z-50">
      <div className="flex justify-around items-center">
        
        {/* Home */}
        <div
          className={`flex flex-col items-center ${active === 'home' ? 'text-teal-400' : 'text-white'}`}
          onClick={() => setActive('home')}
        >
              <Link to="/home">
          <FontAwesomeIcon icon={faHome} className="text-2xl" />
          <p className="text-xs">Home</p>
          </Link>
        </div>
        
        {/* Markets */}
        <div
          className={`flex flex-col items-center ${active === 'markets' ? 'text-teal-400' : 'text-white'}`}
          onClick={() => setActive('markets')}
        >
             <Link to="/transactions">
          <FontAwesomeIcon icon={faChartLine} className="text-2xl" />
          <p className="text-xs">Transactions</p>
          </Link>
        </div>
        <div
          className={`flex flex-col items-center ${active === 'markets' ? 'text-teal-400' : 'text-white'}`}
          onClick={() => setActive('markets')}
        >
             <Link to="/myteam">
          <FontAwesomeIcon icon={faChartLine} className="text-2xl" />
          <p className="text-xs">My team</p>
          </Link>
        </div>
        {/* Trade */}
        <div
          className={`flex flex-col items-center ${active === 'trade' ? 'text-teal-400' : 'text-white'}`}
          onClick={() => setActive('trade')}
        >
              <Link to="/trade">
          <FontAwesomeIcon icon={faExchangeAlt} className="text-2xl" />
          <p className="text-xs">Trade</p>
          </Link>
        </div>
        
        {/* <div
          className={`flex flex-col items-center hover:cursor-pointer ${active === 'support' ? 'text-teal-400' : 'text-white'}`}
          onClick={handleSupportClick}
        >
             
          <FontAwesomeIcon icon={faExchangeAlt} className="text-2xl" />
          <p className="text-xs">Support</p>
         
        </div> */}
        {/* Orders */}
        {/* <div
          className={`flex flex-col items-center ${active === 'orders' ? 'text-teal-400' : 'text-white'}`}
          onClick={() => setActive('orders')}
        >
          <FontAwesomeIcon icon={faClipboardList} className="text-2xl" />
          <p className="text-xs">Orders</p>
        </div> */}
        
        {/* Wallet */}
        <div
          className={`flex flex-col items-center ${active === 'wallet' ? 'text-teal-400' : 'text-white'}`}
          onClick={() => setActive('wallet')}
        >
          <Link to="/deposit">
          <FontAwesomeIcon icon={faWallet} className="text-2xl" />

          <p className="text-xs" >Wallet</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
