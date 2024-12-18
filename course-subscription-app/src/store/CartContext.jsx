import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import {
  subscribeToCourse as apiSubscribeToCourse,
  unsubscribeFromCourse as apiUnsubscribeFromCourse,
  fetchSubscriptionsForLearner,
  fetchAllSubscriptions,
} from "../utils/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // const [subscribedCourses, setSubscribedCourses] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [learnerId, setLearnerId] = useState(null);

  const updateSubscribedCourses = useCallback((courses) => {
    setSubscriptions((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(courses)) {
        return courses;
      }
      return prev;
    });
  }, []);

  const clearSubscribedCourses = () => {
    if (subscriptions.length > 0) {
      setSubscriptions([]);
    }
    // setSubscribedCourses([]);
  };

  const subscribeToCourse = useCallback(async (learnerId, course) => {
    if (!course) {
      console.error("Course is undefined");
      return;
    }
    const newSubscription = await apiSubscribeToCourse(learnerId, course._id);
    setSubscriptions((prev) => [
      ...prev,
      {
        ...newSubscription,
        courseId: { _id: course._id, title: course.title },
      },
    ]);
  }, []);

  const unsubscribeFromCourse = useCallback(async (subscriptionId) => {
    // console.log("Unsubscribing from course with ID:", subscriptionId);
    try {
      await apiUnsubscribeFromCourse(subscriptionId);
      setSubscriptions((prev) =>
        prev.filter((sub) => sub._id !== subscriptionId)
      );
      // console.log("Unsubscribed successfully:", subscriptionId);
    } catch (error) {
      console.error("Error unsubscribing from course:", error);
    }
  }, []);

  // Fetch subscriptions for a specific learner
  const getSubscriptionsForLearner = useCallback(
    async (learnerId) => {
      try {
        if (!learnerId) {
          console.error("Learner ID is required to fetch subscriptions");
          return;
        }
        const subscriptionData = await fetchSubscriptionsForLearner(learnerId);
        if (subscriptionData.length === 0) {
          console.log("No subscriptions found.");
        } else {
          updateSubscribedCourses(subscriptionData);
        }
      } catch (error) {
        console.error("Error fetching subscriptions for learner:", error);
      }
    },
    [updateSubscribedCourses]
  );

  // Fetch all subscriptions (for admin)
  const getAllSubscriptions = useCallback(async () => {
    try {
      const subscriptionData = await fetchAllSubscriptions();
      if (subscriptionData.length === 0) {
        console.log("No subscriptions found.");
      } else {
        updateSubscribedCourses(subscriptionData);
      }
    } catch (error) {
      console.error("Error fetching all subscriptions:", error);
    }
  }, [updateSubscribedCourses]);

  // Fetch subscriptions when learnerId changes
  useEffect(() => {
    if (learnerId) {
      getSubscriptionsForLearner(learnerId); // Fetch for a specific learner
    } else {
      getAllSubscriptions(); // Fetch all subscriptions for admin
    }
  }, [learnerId, getSubscriptionsForLearner, getAllSubscriptions]);

  return (
    <CartContext.Provider
      value={{
        subscriptions,
        clearSubscribedCourses,
        updateSubscribedCourses,
        subscribeToCourse,
        unsubscribeFromCourse,
        getSubscriptionsForLearner,
        getAllSubscriptions,
        setLearnerId,
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
