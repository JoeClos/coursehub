import { createContext, useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { subscribeToCourse as apiSubscribeToCourse, unsubscribeFromCourse as apiUnsubscribeFromCourse,  } from "../utils/api";
import { deleteSubscription } from "../utils/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [subscribedCourses, setSubscribedCourses] = useState([]);

  const updateSubscribedCourses = (courses) => {
    setSubscribedCourses(courses);
  };

  const clearSubscribedCourses = () => {
    setSubscribedCourses([]);
  };

  const subscribeToCourse = useCallback(async (learnerId, course) => {
    if (!course) {
      console.error("Course is undefined");
      return;
    }
    const newSubscription = await apiSubscribeToCourse(learnerId, course._id);
    setSubscribedCourses((prev) => [
      ...prev,
      {
        ...newSubscription,
        courseId: {
          _id: course._id,
          title: course.title,
        },
      },
    ]);
  }, []);

  const unsubscribeFromCourse = useCallback(async (subscriptionId) => {
    await apiUnsubscribeFromCourse(subscriptionId);
    setSubscribedCourses((prev) =>
      prev.filter((sub) => sub._id !== subscriptionId)
    );
  }, []);

  const deleteSubscriptionById = useCallback(async (subscriptionId) => {
    console.log("🚀 ~ deleteSubscriptionById called with subscriptionId:", subscriptionId);
    try {
      const response = await deleteSubscription(subscriptionId);
      console.log("🚀 ~ deleteSubscriptionById ~ response:", response);
      setSubscribedCourses((prev) =>
        prev.filter((sub) => sub._id !== subscriptionId)
      );
    } catch (error) {
      console.error("Error in deleteSubscriptionById:", error);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        subscribedCourses,
        updateSubscribedCourses,
        clearSubscribedCourses,
        subscribeToCourse,
        unsubscribeFromCourse,
        deleteSubscriptionById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};