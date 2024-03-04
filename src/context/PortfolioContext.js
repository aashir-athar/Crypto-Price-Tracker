import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Declare a persistent key for AsyncStorage access
const STORAGE_KEY = "portfolioCoinIds";

// Create the context with clear types
export const PortfolioContext = createContext({
  coins: [],
  addCoin: (id, entryPrice, numberOfCoins) => {},
  removeCoin: (id, entryPrice, numberOfCoins) => {},
});

// Main component managing context state and persistence
const PortfolioCoinsProvider = ({ children }) => {
  const [portCoins, setPortCoins] = useState([]);

  // Functions exposed through the context
  const addCoin = (id, entryPrice, numberOfCoins) => {
    let initialInvestment = entryPrice * numberOfCoins;
    let coin = {
      id: id,
      entryPrice: entryPrice,
      numberOfCoins: numberOfCoins,
      initialInvestment: initialInvestment
    };
    setPortCoins((prev) => [...prev, coin]);
  };

  const removeCoin = (id) => {
    setPortCoins((prev) => prev.filter((item) => item.id !== id));
  };

  // Data persistence logic
  const persistData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(portCoins));
      console.log("Portfolio coins saved successfully!");
    } catch (error) {
      console.error("Error saving portfolio coin:", error);
    }
  };

  const loadPersistedData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedData = data ? JSON.parse(data) : [];
      setPortCoins(parsedData);
        console.log("Portfolio coins loaded from storage.");
    } catch (error) {
        console.error("Error loading portfolio coins:", error);
    }
  };

  // Use effect to handle persistence on state change or app mount
  useEffect(() => {
    if (portCoins.length > 0) {
      persistData();
    } else {
      loadPersistedData();
    }
  }, [portCoins]);

  // Provide context value
  const value = {
    coins: portCoins,
    addCoin,
    removeCoin,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioCoinsProvider;
