import React, { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if dark mode is enabled in localStorage
    const savedMode = localStorage.getItem("darkMode") === "true";
    // Apply initial dark mode class
    if (savedMode) {
      document.documentElement.classList.add("dark");
    }
    return savedMode;
  });

  useEffect(() => {
    // Update dark mode class and localStorage when isDarkMode changes
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      console.log("Dark mode enabled");
    } else {
      document.documentElement.classList.remove("dark");
      console.log("Dark mode disabled");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    console.log("Toggling dark mode from:", isDarkMode);
    setIsDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
