import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString());
    const root = document.documentElement;

    if (isDarkMode) {
      root.style.setProperty("--strongcolor", "#0a0144");
      root.style.setProperty("--mediumcolor", "#140141");
      root.style.setProperty("--grey", "#58a4b0");
      root.style.setProperty("--mediumgrey", "rgb(94, 113, 126)");
      root.style.setProperty("--darkgrey", "#38375d");
      root.style.setProperty("--contrast1", "#090931");
      root.style.setProperty("--contrast2", "rgb(212, 208, 209)");
      root.style.setProperty("--red", "#e30434");
      root.style.setProperty("--pcolor", "black");
      root.style.setProperty("--hcolor", "rgb(250, 250, 250)");
    } else {
      root.style.setProperty("--strongcolor", "#0a0144");
      root.style.setProperty("--mediumcolor", "#140141");
      root.style.setProperty("--grey", "#58a4b0");
      root.style.setProperty("--mediumgrey", "rgb(94, 113, 126)");
      root.style.setProperty("--darkgrey", "#38375d");
      root.style.setProperty("--contrast1", "#090931");
      root.style.setProperty("--contrast2", "rgb(248, 248, 248)");
      root.style.setProperty("--hcolor", "rgb(242, 241, 241)");
      root.style.setProperty("--red", "#e30434");
      root.style.setProperty("--pcolor", "rgb(28, 28, 28)");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
