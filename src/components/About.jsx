import React from "react";
import BottomNavigation from "./Bottomnavigation";

const AboutUsPage = () => {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-indigo-200 text-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-700">
            Discover who we are, our mission, vision, and how we help traders succeed.
          </p>
        </header>

        {/* Our Mission Section */}
        <section className="bg-white text-gray-900 py-12 rounded-lg shadow-lg mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Mission</h2>
            <p className="text-lg text-gray-600">
              At <strong>TradingPlatform</strong>, our mission is to empower traders worldwide with advanced technology,
              real-time insights, and user-friendly tools that enable them to make informed trading decisions.
            </p>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="py-12 bg-indigo-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Vision</h2>
            <p className="text-lg text-gray-700">
              We envision a world where everyone has the opportunity to trade and invest in financial markets,
              making financial freedom accessible to all, breaking barriers, and democratizing wealth creation.
            </p>
          </div>
        </section>

        {/* Get in Touch Section */}
        <section className="bg-white text-gray-900 py-12 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Get in Touch</h2>
            <p className="text-lg mb-6 text-gray-600">Have any questions? We're here to assist you!</p>
            <a
              href="mailto:support@tradingplatform.com"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
    <BottomNavigation/>
    </>
  );
};

export default AboutUsPage;
