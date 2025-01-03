import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCart } from './CartContext';
import { fetchSubscriptionsForLearner } from "../utils/api";

// Create the Auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { clearSubscribedCourses, updateSubscribedCourses } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      // console.log("🚀 ~ useEffect ~ parsedUser:", parsedUser)
      setUser(parsedUser); // Restore user data from local storage
    }
    setLoading(false);
  }, []);

  const getSubscriptions = async (learnerId) => {
    if (!learnerId) {
      console.warn("Learner ID is not available.");
      return;
    }

    try {
      const subscriptionsData = await fetchSubscriptionsForLearner(learnerId);

      if (subscriptionsData.length === 0) {
        console.log("No subscriptions found.");
      } else {
        const subscriptions = subscriptionsData.map((sub) => ({
          subscriptionId: sub._id,
          courseId: { _id: sub.courseId._id, title: sub.courseId.title },
        }));
        updateSubscribedCourses(subscriptions);
      }
    } catch (error) {
      console.error("Error fetching subscribed courses:", error);
    }
  };

  const login = (userData) => {
    setUser(userData);
    console.log("🚀 ~ login ~ userData:", userData)

    localStorage.setItem("token", userData.token);
    localStorage.setItem("id", userData.id);
    console.log("🚀 ~ login ~ userData.id:", userData.id)

    localStorage.setItem("firstName", userData.firstName);
    localStorage.setItem("user", JSON.stringify(userData));
    const learnerId = userData.id;
    localStorage.setItem("learnerId", learnerId);
    console.log("🚀 ~ login ~ LearnerId:", learnerId)
    getSubscriptions(learnerId);

  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("user");
    localStorage.removeItem("learnerId");
    clearSubscribedCourses();
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
