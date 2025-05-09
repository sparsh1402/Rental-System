import { createContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? storedToken : null;
  });

  // Check localStorage on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser&& storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsLogged(true);
      
    }
  }, []);

  // Login function
  const login = (userData,jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    setIsLogged(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userId" , userData.id);
    localStorage.setItem("token", jwtToken);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLogged(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLogged, user, token, login, logout , setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};
