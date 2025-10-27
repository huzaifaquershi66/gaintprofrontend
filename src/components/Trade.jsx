import React, { useState, useEffect } from "react";
import axios from "axios";
import BottomNavigation from "./Bottomnavigation";

const TradePage = () => {
  const [tradeHistory, setTradeHistory] = useState([]);
  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);

  useEffect(() => {
    const savedTrades = JSON.parse(localStorage.getItem("purchasedCoins")) || [];
    if (!Array.isArray(savedTrades)) {
      console.error("Invalid trade data found in localStorage");
      localStorage.removeItem("purchasedCoins");
      return;
    }

    const userId = localStorage.getItem("userId");

    const processTrades = (trades) => {
      return trades.map((trade) => {
        if (trade.result === undefined) {
          const isProfit = Math.random() > 0.5;
          const result = isProfit ? trade.amount * 2 : 0;

          if (isProfit) {
            updateDeposit(userId, trade.currencyType?.toLowerCase(), result);
          }

          return { ...trade, result };
        }
        return trade;
      });
    };

    const updatedTrades = processTrades(savedTrades);

    // Sort trades by date (newest first)
    const sortedTrades = updatedTrades.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setTradeHistory(sortedTrades);

    const { calculatedProfit, calculatedLoss } = sortedTrades.reduce(
      (acc, trade) => {
        if (trade.result > 0) acc.calculatedProfit += trade.result;
        else acc.calculatedLoss += trade.amount;
        return acc;
      },
      { calculatedProfit: 0, calculatedLoss: 0 }
    );

    localStorage.setItem("purchasedCoins", JSON.stringify(sortedTrades));
    localStorage.setItem("profit", JSON.stringify(calculatedProfit));
    localStorage.setItem("loss", JSON.stringify(calculatedLoss));

    setProfit(calculatedProfit);
    setLoss(calculatedLoss);
  }, []);

  const updateDeposit = async (userId, currency, amount) => {
    try {
      await axios.post(
        "https://ganto.work.gd/api/auth/updateDeposit",
        {
          userId,
          currency,
          amount,
        }
      );
    } catch (error) {
      console.error("Error updating deposit:", error);
      alert("Failed to update the deposit. Please try again.");
    }
  };

  return (
    <>
      <div className="h-[1600px] bg-gray-100 p-4 md:p-6">
        <div className="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
            Trade History
          </h1>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left text-sm sm:text-lg">
                    Currency
                  </th>
                  <th className="px-4 py-2 text-left text-sm sm:text-lg">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left text-sm sm:text-lg">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-sm sm:text-lg">Date</th>
                  <th className="px-4 py-2 text-left text-sm sm:text-lg">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-4">
                      No trades yet. Start trading to see history!
                    </td>
                  </tr>
                ) : (
                  tradeHistory.map((trade, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 text-sm sm:text-base">
                        {trade.currencyType}
                      </td>
                      <td className="px-4 py-2 text-sm sm:text-base">
                        {trade.amount}
                      </td>
                      <td className="px-4 py-2 text-sm sm:text-base">
                        <span
                          className={
                            trade.result > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {trade.result > 0 ? "Profit" : "Loss"}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm sm:text-base">
                        {new Date(trade.date).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-sm sm:text-base">
                        {trade.result > 0
                          ? `${trade.result} USDT`
                          : "0 USDT"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default TradePage;
