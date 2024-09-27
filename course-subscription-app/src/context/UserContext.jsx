import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SN_API_URL_USER,
          {
            auth: {
              username: import.meta.env.VITE_SN_USERNAME,
              password: import.meta.env.VITE_SN_PASSWORD,
            },
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setUser(response.data.result);
        console.log(
          "🚀 ~ fetchUser ~ response.data.result:",
          response.data.result
        );
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
