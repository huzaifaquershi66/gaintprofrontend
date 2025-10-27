import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../store/formslice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import reacting from '../assets/reacting.svg';
import 'font-awesome/css/font-awesome.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form); // Access form data from Redux store
  const [isLoading, setIsLoading] = useState(false); // State to handle loading spinner

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader during API call

    try {
      const response = await axios.post(
        'https://ganto.work.gd/api/auth/signup',
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log('Signup successful:', response.data);
        navigate('/'); // Redirect to home page
      } else {
        console.error('Signup failed:', response.data);
      }
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
    } finally {
      setIsLoading(false); // Hide loader after API call
    }
  };

  return (
    <div className="h-[1300px] w-full relative overflow-y-auto">
      {/* Hero Section */}
      <div className="w-full h-[450px]">
        <img src={reacting} alt="Reacting" className="w-full h-full object-cover" />
      </div>

      {/* Welcome Section */}
      <div className="absolute inset-0 mb-[800px] flex flex-col justify-center items-center text-center">
        <div className="flex justify-center items-center w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl">
          <div className="text-center">
            <span className="block text-white text-5xl font-black tracking-widest">
              G<span className="text-yellow-300">P</span>
            </span>
            <span className="block text-gray-100 text-base tracking-wide font-semibold mt-2">
              Gaint<span className="text-yellow-300">Pro</span>
            </span>
          </div>
          <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-xl"></div>
        </div>
        <h1 className="text-white text-3xl font-roboto font-bold mb-2">Welcome To GainPro</h1>
        <p className="text-white text-2xl font-roboto">After login, you can Trade.</p>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-6 px-6 mt-10">
        {/* Full Name */}
        <div className="relative">
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="h-[76px] w-full bg-[#e5e7eb] rounded-3xl pl-14 font-roboto text-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
          <i className="fa fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-3xl" />
        </div>

        {/* Username */}
        <div className="relative">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="h-[76px] w-full bg-[#e5e7eb] rounded-3xl pl-14 font-roboto text-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
          <i className="fa fa-user-circle absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-3xl" />
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="h-[76px] w-full bg-[#e5e7eb] rounded-3xl pl-14 font-roboto text-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
          />
          <i className="fa fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-3xl" />
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="h-[76px] w-full bg-[#e5e7eb] rounded-3xl pl-14 font-roboto text-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          <i className="fa fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-3xl" />
        </div>

        {/* Withdraw Pin */}
        <div className="relative">
          <input
            type="number"
            name="withdrawpin"
            value={formData.withdrawpin}
            onChange={handleChange}
            className="h-[76px] w-full bg-[#e5e7eb] rounded-3xl pl-14 font-roboto text-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your withdraw pin"
          />
          <i className="fa fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-3xl" />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="h-14 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-3xl shadow-lg hover:bg-gradient-to-l"
          disabled={isLoading}
        >
          {isLoading ? 'Loading, please wait...' : 'Register'}
        </button>

        {/* Loader */}
        {isLoading && (
          <div className="flex justify-center mt-4">
            <div className="loader"></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
