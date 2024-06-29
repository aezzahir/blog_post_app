import React, { createContext, useState } from "react";

// Create UserContext with an initial empty object
export const UserContext = createContext({});

// Define the UserContextProvider component
export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
