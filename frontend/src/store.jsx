import { createContext, useContext, useEffect } from "react";
import { content } from "./data";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  useEffect(() => {
    localStorage.removeItem("qs-lang");
    localStorage.removeItem("qs-theme");
    localStorage.removeItem("ja-lang");
    localStorage.setItem("ja-theme", "dark");
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <AppContext.Provider value={{ lang: "id", setLang: () => {}, dark: true, setDark: () => {}, t: content }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
