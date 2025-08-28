import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // logged in user object or null
  const [error, setError] = useState(null);

  // Simple login function (mock)
  const login = (username, password) => {
    if (username === "user" && password === "pass") {
      setUser({ name: username });
      setError(null);
    } else {
      setError("Invalid username or password");
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <UserContext.Provider value={{ user, error, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
