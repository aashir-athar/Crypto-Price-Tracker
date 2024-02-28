import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Declare a persistent key for AsyncStorage access
const STORAGE_KEY = "favouriteCoinIds";

// Create the context with clear types
export const FavContext = createContext({
  ids: [],
  addFavourite: (id) => {},
  removeFavourite: (id) => {},
});

// Main component managing context state and persistence
const FavouriteCoinsProvider = ({ children }) => {
  const [favouriteIds, setFavouriteIds] = useState([]);

  // Functions exposed through the context
  const addFavourite = (id) => {
    setFavouriteIds((prev) => [...prev, id]);
  };

  const removeFavourite = (id) => {
    setFavouriteIds((prev) => prev.filter((item) => item !== id));
  };

  // Data persistence logic
  const persistData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favouriteIds));
      console.log("Favourite coin IDs saved successfully!");
    } catch (error) {
      console.error("Error saving favourite coin IDs:", error);
    }
  };

  const loadPersistedData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedData = data ? JSON.parse(data) : [];
      setFavouriteIds(parsedData);
      console.log("Favourite coin IDs loaded from storage.");
    } catch (error) {
      console.error("Error loading favourite coin IDs:", error);
    }
  };

  // Use effect to handle persistence on state change or app mount
  useEffect(() => {
    if (favouriteIds.length > 0) {
      persistData();
    } else {
      loadPersistedData();
    }
  }, [favouriteIds]);

  // Provide context value
  const value = {
    ids: favouriteIds,
    addFavourite,
    removeFavourite,
  };

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
};

export default FavouriteCoinsProvider;
