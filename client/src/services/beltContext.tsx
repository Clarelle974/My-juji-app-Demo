import { createContext, useContext, useEffect, useState } from "react";

import { getBelts } from "./requests";

const BeltContext = createContext<BeltContextProps | null>(null);

export function BeltProvider({ children }: { children: React.ReactNode }) {
  const [belts, setBelts] = useState<BeltData[]>([]);

  useEffect(() => {
    getBelts()
      .then((data) => setBelts(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des ceintures :", error),
      );
  }, []);

  return (
    <BeltContext.Provider value={{ belts }}>{children}</BeltContext.Provider>
  );
}
export function useBelts() {
  const context = useContext(BeltContext);
  if (!context) {
    throw new Error("useBelts must be used within a BeltProvider");
  }
  return context;
}
