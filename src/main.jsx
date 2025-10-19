import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import SignIn from './components/login.jsx';
import Register from './components/Register.jsx';
import Deposit from './components/Deposit.jsx';
import { Home } from './components/home.jsx';
import RechargePage from './components/Recharge.jsx';
import store from "./store/store.js"
import { Provider } from 'react-redux';
import WithdrawPage from './components/Withdraw.jsx';
import TradePage from './components/Trade.jsx';
import SupportPage from './components/Support.jsx';
import Aboutus from "./components/About.jsx"
import Transactions from './components/Transaction.jsx';
import Transactions2 from "./components/Transactions2.jsx"
 import Settingpage from "./Settingpage.jsx"
import MyTeam from './components/Myteam.jsx';
import AdminPanel from './components/Admin.jsx';
import Changepassword from "./components/Changepassword.jsx"
import Withdrawpin from "./components/Withdrawpin.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
     <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path='/signup' element={<Register/>}/>
        <Route path='/deposit' element={<Deposit/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/transfer' element={<RechargePage/>}/>
        <Route path='/withdraw' element={<WithdrawPage/>}/>

      <Route path = "/trade" element={<TradePage/>}/>
      <Route path = "/support" element={<SupportPage/>}/>
      <Route path = "/aboutus" element={<Aboutus/>}/>
      <Route path = "/transactions" element={<Transactions/>}/>
      <Route path = "/transactions2" element ={<Transactions2/>}/>
      <Route path = "/myteam" element ={<MyTeam/>}/>
      <Route path = "/adminpanel" element ={<AdminPanel/>}/>
      <Route path = "/setting" element ={<Settingpage/>}/>
      <Route path = "/change-password" element ={<Changepassword/>}/>
      <Route path = "/change-withdraw-pin" element ={<Withdrawpin/>}/>




      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
