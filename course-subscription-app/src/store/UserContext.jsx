  import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchUser, fetchUsers } from "../utils/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  
  // Fetch all users
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response);
        // console.log("🚀 ~ getUsers ~ response:", response)

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

  // Function to fetch course by ID and set it
  const getUserById = async (userId) => {
    try {
      const userData = await fetchUser(userId);
      console.log("🚀 ~ getCourseById ~ courseData:", userData);

      setUser(userData); // Store the course data for display or update
    } catch (err) {
      console.log("Failed to fetch course data.", err);
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, users, getUserById, getUsers}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UserContext);
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

