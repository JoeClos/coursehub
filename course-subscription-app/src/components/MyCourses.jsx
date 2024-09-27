import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Box, Typography, Grid, Button } from "@mui/material";
import UserContext from "../context/UserContext";

const MyCourses = () => {
  const { user } = useContext(UserContext);
  console.log("🚀 ~ MyCourses ~ user:", user);
  const [subscribedCourses, setSubscribedCourses] = useState([]);

  useEffect(() => {
    const fetchSubscribedCourses = async () => {
      const url = import.meta.env.VITE_SN_API_URL_BASE;
      const learnerId = "8c17c7f0eb32010045e1a5115206fe17"; // Example learner ID

      try {
        const response = await axios.get(
          `${url}/x_quo_coursehub_course_subscription?sysparm_query=learner=${learnerId}`,
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

        // Extract the subscribed courses from the response
        const subscriptions = response.data.result;
        setSubscribedCourses(subscriptions);

        // Log to see the full fetched data
        console.log("Fetched subscriptions:", subscriptions);
      } catch (error) {
        console.error("Error fetching subscribed courses:", error);
      }
    };
    fetchSubscribedCourses();
  }, []);

  const unsubscribeCourse = async (subscriptionId) => {
    const url = import.meta.env.VITE_SN_API_URL_BASE;
    try {
      const response = await axios.delete(
        `${url}/x_quo_coursehub_course_subscription/${subscriptionId}`,
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
      console.log("Unsubscribed successfully", response.data);

      // Update state to remove the unsubscribed course
      setSubscribedCourses((prevCourses) =>
        prevCourses.filter((sub) => sub.sys_id !== subscriptionId)
      );
    } catch (error) {
      console.error("Error unsubscribing", error);
    }
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        My courses
      </Typography>
      <Grid container spacing={3}>
        {subscribedCourses.length === 0 ? (
          <Typography>No subscribed courses available.</Typography>
        ) : (
          subscribedCourses.map((sub) => (
            <div key={sub.sys_id}>
              <p>{sub.course.value}</p>
              <Button onClick={() => unsubscribeCourse(sub.sys_id)}>
                Unsubscribe
              </Button>
            </div>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default MyCourses;
