import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("Token being sent:", token);
    const userData = localStorage.getItem("user");
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser); // Restore user data from local storage
      console.log("Restored user:", parsedUser); // Log restored user
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    console.log("🚀 ~ login ~ userData:", userData);

    localStorage.setItem("token", userData.token);
    console.log("🚀 ~ login ~ userData.token:", userData.token);

    localStorage.setItem("username", userData.username);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
