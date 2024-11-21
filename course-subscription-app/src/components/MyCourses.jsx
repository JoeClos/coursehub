import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Subscription from "./Subscription";

const MyCourses = () => {
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const learnerId = localStorage.getItem("learnerId");

  useEffect(() => {
    const fetchSubscribedCourses = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const fullUrl = `${baseUrl}/api/subscriptions/${learnerId}`;
      try {
        const response = await axios.get(fullUrl);

        if (response.data.length === 0) {
          console.log("No subscriptions found.");
        } else {
          const subscriptions = response.data.map((sub) => ({
            subscriptionId: sub._id,
            courseId: { _id: sub.courseId._id, title: sub.courseId.title },
          }));
          setSubscribedCourses(subscriptions);
          console.log(
            "🚀 ~ fetchSubscribedCourses ~ response.data:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching subscribed courses:", error);
      }
    };

    if (learnerId) {
      fetchSubscribedCourses();
    }
  }, [learnerId]);

  return (
    <Box>
      <Subscription subscribedCourses={subscribedCourses} />
    </Box>
  );
};

export default MyCourses;
