import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext<UserContextProps | null>(null);

export function UserRoleProvider({ children }: UserRoleProviderProps) {
  const [role, setRole] = useState(localStorage.getItem("role") || "anonymous");

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    }
  }, [role]);

  return (
    <userContext.Provider value={{ role, setRole }}>
      {children}
    </userContext.Provider>
  );
}

export function useRoles() {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("Le user context doit exister");
  }

  return context;
}
