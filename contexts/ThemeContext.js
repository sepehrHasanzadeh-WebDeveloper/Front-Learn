"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeg, setThemeg] = useState("light");

  // load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setThemeg(saved);
  }, []);

  // apply theme to body
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(themeg);
    localStorage.setItem("theme", themeg);
  }, [themeg]);

  const toggleTheme = () => {
    setThemeg((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ themeg, setThemeg, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);