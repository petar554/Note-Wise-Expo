import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
  const [localization, setLocalization] = useState({});

  useEffect(() => {
    const loadLocalization = async () => {
      try {
        const storedLocalization = await AsyncStorage.getItem("localization");
        if (storedLocalization) {
          const parsedLocalization = JSON.parse(storedLocalization);
          setLocalization(parsedLocalization);
          console.log(
            "Loaded localization from AsyncStorage:",
            parsedLocalization
          );
        } else {
          console.log("No localization data found in AsyncStorage.");
        }
      } catch (error) {
        console.error(
          "Failed to load localization data from AsyncStorage:",
          error
        );
      }
    };

    loadLocalization();
  }, []);

  useEffect(() => {
    const saveLocalization = async () => {
      if (Object.keys(localization).length > 0) {
        try {
          await AsyncStorage.setItem(
            "localization",
            JSON.stringify(localization)
          );
          console.log("Updated localization in AsyncStorage:", localization);
        } catch (error) {
          console.error(
            "Failed to save localization data to AsyncStorage:",
            error
          );
        }
      }
    };

    saveLocalization();
  }, [localization]);

  return (
    <LocalizationContext.Provider value={{ localization, setLocalization }}>
      {children}
    </LocalizationContext.Provider>
  );
};
