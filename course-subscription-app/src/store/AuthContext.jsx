import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCart } from "./CartContext";
// import { fetchSubscribedCourses } from "../utils/api";

// Create the Auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { subscriptions, clearSubscribedCourses, updateSubscribedCourses } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      const parsedUser = JSON.parse(userData);

      if (parsedUser.role) {
        setUser(parsedUser);
      } else {
        console.warn("User data is incomplete, clearing storage.");
        logout();
      }
    }
    setLoading(false);
  }, []);

  // const getSubscriptions = async (learnerId) => {
  //   if (!learnerId) {
  //     console.warn("Learner ID is not available.");
  //     return;
  //   }

  //   try {
  //     const subscriptionData = await fetchSubscribedCourses(learnerId);

  //     if (subscriptionData.length === 0) {
  //       console.log("No subscriptions found.");
  //     } else {
  //       subscriptionData.map((sub) => ({
  //         subscriptionId: sub._id,
  //         courseId: { _id: sub.courseId._id, title: sub.courseId.title },
  //       }));
        
  //       updateSubscribedCourses(subscriptions);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching subscribed courses:", error);
  //   }
  // };

  const login = (userData) => {
    setUser(userData);
    // console.log("🚀 ~ login ~ userData:", userData);

    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userData.role);
    const learnerId = userData.id;
    localStorage.setItem("learnerId", learnerId);
    // getSubscriptions(learnerId);
     updateSubscribedCourses([]); 
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("learnerId");
    clearSubscribedCourses();
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin, subscriptions }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
