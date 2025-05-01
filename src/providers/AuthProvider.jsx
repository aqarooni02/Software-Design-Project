import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    console.log("From auth provider", user)
    const login = (userData) => {
      setUser(userData);
    };
  
    const logout = () => {
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  