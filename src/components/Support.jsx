import React, { useEffect } from 'react';
import BottomNavigation from "./Bottomnavigation";

const SupportPage = () => {
  // useEffect(() => {
  //   // Add Tidio's script dynamically
  //   const script = document.createElement('script');
  //   script.src = '//code.tidio.co/2tdb8phixpcppoebkjwstz2r3uqnv5lb.js'; // Tidio's script
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script); // Clean up script on component unmount
  //   };
  // }, []);

  return (
    <>
      {/* <div
        className="min-h-screen bg-gradient-to-r from-purple-800 via-indigo-600 to-blue-600 text-white p-8"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto bg-white text-gray-900 rounded-lg shadow-2xl p-8">
          <h2 className="text-5xl font-extrabold text-center mb-6 text-gray-800">Support</h2>
          <p className="text-lg text-center text-gray-600 mb-6">
            Welcome to our support page. If you need help, our chatbot is here to assist you!
          </p>

          <div className="text-center">
            <p className="text-2xl text-gray-800 mb-4">Chat with us:</p>
            <p className="text-lg text-gray-600">
              Our chatbot is ready to assist you with your queries. Simply type your question!
            </p>
          </div>
        </div>
      </div>
      <BottomNavigation /> */}
    </>
  );
};

export default SupportPage;
