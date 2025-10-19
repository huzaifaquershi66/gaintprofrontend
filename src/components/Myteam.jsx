import React, { useState } from "react";
import QRCode from "react-qr-code";
import BottomNavigation from './Bottomnavigation';

const MyTeam = () => {
  const [copied, setCopied] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const inviteLink = "https:gaintpro.com/signup"; // Update with your actual website login page

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-50 p-8">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">My Team</h1>
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowStats(false)}
            className={`px-6 py-3 rounded-full text-white font-semibold transition-all ${
              !showStats
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700"
            }`}
          >
            QR & Invite Link
          </button>
          <button
            onClick={() => setShowStats(true)}
            className={`px-6 py-3 rounded-full text-white font-semibold transition-all ${
              showStats
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700"
            }`}
          >
            Team Stats
          </button>
        </div>

        {!showStats ? (
          <div>
            <QRCode value={inviteLink} size={180} className="mx-auto mb-6" />
            <p className="text-gray-600 mb-6 text-lg">
              Scan the QR code or use the link below to invite someone:
            </p>
            <button
              onClick={handleCopyLink}
              className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
            >
              {copied ? "Link Copied!" : "Invite by Link"}
            </button>
          </div>
        ) : (
          <div className="bg-blue-50 rounded-lg p-8 shadow-inner">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">Team Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <p className="text-gray-500">Current Level</p>
                <p className="text-2xl font-bold text-gray-800">Level 2</p>
                <p className="text-sm text-gray-500 mt-2">
                  Invite 10 members to reach Level 3
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <p className="text-gray-500">TRX</p>
                <p className="text-2xl font-bold text-gray-800">0</p>
                <p className="text-sm text-gray-500 mt-2">Total Income</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <p className="text-gray-500">USDT</p>
                <p className="text-2xl font-bold text-gray-800">0</p>
                <p className="text-sm text-gray-500 mt-2">Total Income</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <BottomNavigation/>
    </>
  );
};

export default MyTeam;
