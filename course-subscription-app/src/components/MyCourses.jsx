import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Subscription from "./Subscription";
import { fetchSubscribedCourses } from "../utils/api";

const MyCourses = () => {
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  console.log("🚀 ~ MyCourses ~ subscribedCourses:", subscribedCourses)
  const learnerId = localStorage.getItem("learnerId");

  useEffect(() => {
    const getSubscriptions = async () => {
      if (!learnerId) {
        console.warn("Learner ID is not available.");
        return;
      }

      try {
        const subscriptionsData = await fetchSubscribedCourses(learnerId);

        if (subscriptionsData.length === 0) {
          console.log("No subscriptions found.");
        } else {
          const subscriptions = subscriptionsData.map((sub) => ({
            subscriptionId: sub._id,
            courseId: { _id: sub.courseId._id, title: sub.courseId.title },
          }));
          setSubscribedCourses(subscriptions);
        }
      } catch (error) {
        console.error("Error fetching subscribed courses:", error);
      }
    };

    getSubscriptions();
  }, [learnerId]);

  return (
    <Box>
      <Subscription subscribedCourses={subscribedCourses} />
    </Box>
  );
};

export default MyCourses;
