import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import reacting from "../assets/reacting.svg";
import "font-awesome/css/font-awesome.css";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    try {
      const response = await axios.post(
        "https://ganto.work.gd/api/auth/login",
        { username, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const userId = response.data.data.user._id;
      localStorage.setItem("userId", userId);
      
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid username or password");
      } else if (err.request) {
        setError("No response from the server. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="h-full w-full relative">
      <div className="w-full h-[450px]">
        <img src={reacting} alt="Reacting" className="w-full h-full object-cover" />
      </div>

      <div className="absolute inset-0 mb-80 flex flex-col justify-center items-center text-center">
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
        <p className="text-white text-2xl font-roboto">After login you can Trade.</p>
      </div>

      <div className="space-y-4 h-52 w-full px-6 mt-10">
        <div className="relative">
          <input
            type="text"
            className="h-[76px] w-full bg-[#e5e7eb] rounded-3xl pl-14 font-roboto pr-4 text-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <i className="fa fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-3xl" />
        </div>

        <div className="relative">
          <input
            type="password"
            className="h-[76px] w-full bg-[#e5e7eb] rounded-2xl pl-14 pr-4 text-lg font-roboto focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="fa fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-center mt-4">
          <p>{error}</p>
        </div>
      )}

      <div className="relative px-20">
        <button
          type="submit"
          className="w-full h-[70px] text-[22px] font-raleway bg-gradient-to-r from-purple-600 to-blue-500 text-white text-lg font-semibold rounded-3xl shadow-md hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
          onClick={handleSubmit}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <i className="fa fa-spinner fa-spin mr-2"></i> Logging In...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </div>

      <div className="relative mt-6">
        <h3 className="text-center text-lg text-gray-700 font-manrope">
          Not a member?{" "}
          <a href="/signup" className="text-purple-600 font-semibold hover:text-blue-500">
            Signup Now
          </a>
        </h3>
      </div>
    </div>
  );
};

export default SignIn;
